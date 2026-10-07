/**
 * Surveillance des pages qui annoncent portes ouvertes, réunions et inscriptions (SPEC.md §7).
 *
 *   npm run watch-pages -- [--summary résumé.md] [--dry-run] [--only <UAI ou morceau d'URL>]
 *
 * Pour chaque page surveillée : vérifie robots.txt (agent `colleges-watch`), télécharge poliment
 * la page, extrait le texte visible, calcule son empreinte sha256 et la compare à l'état précédent.
 * Écrit un résumé Markdown (sortie standard et --summary) et met à jour data/watch-state.json.
 * Code de sortie 0 même s'il y a des changements ou des erreurs de pages ; 1 seulement en cas de plantage.
 *
 * ── data/overrides/watch.json ─────────────────────────────────────────────────────────────────
 * {
 *   "discovery": [ { "label": "…", "url": "https://…", "note": "…" } ],
 *   "colleges":  { "<UAI>": [ { "url": "https://…", "label": "…" } ] }
 * }
 * - discovery : sources transversales qui annoncent des événements de plusieurs collèges
 *   (recherche plein texte de pia.ac-paris.fr, flux RSS Skolengo *.moncollege.valdemarne.fr) ;
 * - colleges : 1 à 3 pages par collège (inscriptions, actualités ou agenda, accueil portant le bloc
 *   des portes ouvertes). Un collège sans page exploitable n'a pas d'entrée.
 *
 * ── data/watch-state.json (versionné) ────────────────────────────────────────────────────────
 * { "<url>": { "hash": sha256 du texte, "checkedAt": "AAAA-MM-JJ", "changedAt": "AAAA-MM-JJ",
 *              "excerpt": passages autour des mots-clés } }
 * Une page en erreur garde son entrée précédente ; une URL retirée de watch.json est retirée de l'état.
 *
 * ── .watch-cache/ (non versionné, conservé par actions/cache en CI) ───────────────────────────
 * Dernier texte extrait de chaque page, pour citer les lignes ajoutées plutôt que les seuls extraits.
 *
 * Politesse : User-Agent identifiable, une requête à la fois par hôte, 1,5 s minimum entre deux
 * requêtes au même hôte (ou le Crawl-delay demandé, plafonné à 30 s), délai d'attente de 20 s,
 * une seule nouvelle tentative. Une page interdite par robots.txt n'est jamais téléchargée :
 * elle est signalée « à vérifier à la main ».
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALLOW_ALL, crawlDelay, isAllowed, parseRobots, type Robots } from './watch/robots';
import { buildExcerpt, detectCharset, feedToText, htmlToText, isFeed } from './watch/extract';
import { changeHighlights, classify, nextEntry, pruneState, sha256, type WatchState } from './watch/diff';
import { countResults, renderSummary, type PageResult, type WatchTarget } from './watch/summary';

export const USER_AGENT = 'colleges-watch (+https://github.com/abasille/colleges)';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WATCH_FILE = path.join(ROOT, 'data/overrides/watch.json');
const STATE_FILE = path.join(ROOT, 'data/watch-state.json');
const CONFIG_FILE = path.join(ROOT, 'data/config.json');
const COLLEGES_FILE = path.join(ROOT, 'public/data/colleges.json');
const CACHE_DIR = path.join(ROOT, '.watch-cache');

const TIMEOUT_MS = 20_000;
const MIN_DELAY_MS = 1_500;
const MAX_CRAWL_DELAY_S = 30;
const RETRY_DELAY_MS = 5_000;
const HOST_CONCURRENCY = 4;
const MAX_BYTES = 5 * 1024 * 1024;
const MAX_REDIRECTS = 5;

export interface WatchFile {
  discovery: { label: string; url: string; note?: string }[];
  colleges: Record<string, { url: string; label: string }[]>;
}

interface Args {
  summary: string | null;
  dryRun: boolean;
  only: string | null;
}

function parseArgs(argv: string[]): Args {
  const args: Args = { summary: null, dryRun: false, only: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--summary') args.summary = argv[++i] ?? null;
    else if (a === '--dry-run') args.dryRun = true;
    else if (a === '--only') args.only = argv[++i] ?? null;
    else if (a === '--help' || a === '-h') {
      console.log('Usage : npm run watch-pages -- [--summary fichier.md] [--dry-run] [--only <UAI|URL>]');
      process.exit(0);
    } else throw new Error(`Argument inconnu : ${a}`);
  }
  return args;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** Date du jour à Paris, AAAA-MM-JJ. */
const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Paris' }).format(new Date());

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8')) as T;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return fallback;
    throw e;
  }
}

/** Liste des cibles, une par URL (une même page peut concerner plusieurs collèges). */
export function buildTargets(watch: WatchFile, exclude: Set<string>): Map<string, WatchTarget[]> {
  const byUrl = new Map<string, WatchTarget[]>();
  const add = (t: WatchTarget) => byUrl.set(t.url, [...(byUrl.get(t.url) ?? []), t]);
  for (const d of watch.discovery ?? []) add({ url: d.url, label: d.label, uai: null, note: d.note });
  for (const uai of Object.keys(watch.colleges ?? {}).sort()) {
    if (exclude.has(uai)) continue;
    for (const p of watch.colleges[uai]) add({ url: p.url, label: p.label, uai });
  }
  return byUrl;
}

// ── Réseau ─────────────────────────────────────────────────────────────────────────────────────

class HostScheduler {
  private last = new Map<string, number>();
  private delays = new Map<string, number>();
  setDelay(host: string, seconds: number | null) {
    const ms = seconds === null ? MIN_DELAY_MS : Math.min(seconds, MAX_CRAWL_DELAY_S) * 1000;
    this.delays.set(host, Math.max(MIN_DELAY_MS, ms));
  }
  async wait(host: string) {
    const prev = this.last.get(host);
    const delay = this.delays.get(host) ?? MIN_DELAY_MS;
    if (prev !== undefined) {
      const remaining = prev + delay - Date.now();
      if (remaining > 0) await sleep(remaining);
    }
    this.last.set(host, Date.now());
  }
}

const scheduler = new HostScheduler();

async function politeFetch(url: string, redirect: 'follow' | 'manual'): Promise<Response> {
  const host = new URL(url).host;
  for (let attempt = 0; ; attempt++) {
    await scheduler.wait(host);
    try {
      const res = await fetch(url, {
        redirect,
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml,application/rss+xml,application/xml;q=0.9,*/*;q=0.5',
          'Accept-Language': 'fr-FR,fr;q=0.9',
        },
      });
      if ((res.status === 429 || res.status >= 500) && attempt === 0) {
        await res.body?.cancel();
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      return res;
    } catch (e) {
      if (attempt === 0) {
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      throw e;
    }
  }
}

type RobotsResult = { ok: true; robots: Robots } | { ok: false; error: string };
const robotsCache = new Map<string, Promise<RobotsResult>>();

function robotsFor(origin: string): Promise<RobotsResult> {
  let p = robotsCache.get(origin);
  if (!p) {
    p = (async (): Promise<RobotsResult> => {
      try {
        const res = await politeFetch(`${origin}/robots.txt`, 'follow');
        if (res.ok) {
          const text = await res.text();
          // Certains serveurs répondent 200 avec une page HTML : pas de robots.txt réel.
          const robots = /^\s*</.test(text) ? ALLOW_ALL : parseRobots(text);
          scheduler.setDelay(new URL(origin).host, crawlDelay(robots, USER_AGENT));
          return { ok: true, robots };
        }
        await res.body?.cancel();
        if (res.status >= 400 && res.status < 500 && res.status !== 429) return { ok: true, robots: ALLOW_ALL };
        return { ok: false, error: `robots.txt injoignable (HTTP ${res.status})` };
      } catch (e) {
        return { ok: false, error: `robots.txt injoignable (${errorMessage(e)})` };
      }
    })();
    robotsCache.set(origin, p);
  }
  return p;
}

function errorMessage(e: unknown): string {
  if (e instanceof Error) {
    const cause = (e as Error & { cause?: { code?: string; message?: string } }).cause;
    if (e.name === 'TimeoutError') return 'délai dépassé';
    return cause?.code ?? cause?.message ?? e.message;
  }
  return String(e);
}

async function readBody(res: Response): Promise<Uint8Array> {
  const reader = res.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      break;
    }
  }
  const out = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) {
    out.set(c.subarray(0, Math.min(c.byteLength, size - offset)), offset);
    offset += c.byteLength;
  }
  return out;
}

function decode(bytes: Uint8Array, contentType: string | null): string {
  const head = new TextDecoder('latin1').decode(bytes.subarray(0, 4096));
  const charset = detectCharset(contentType, head);
  try {
    return new TextDecoder(charset).decode(bytes);
  } catch {
    return new TextDecoder('utf-8').decode(bytes);
  }
}

type FetchOutcome =
  | { kind: 'ok'; text: string; finalUrl: string }
  | { kind: 'robots'; detail: string }
  | { kind: 'erreur'; detail: string };

/** Télécharge une page en suivant les redirections à la main, robots.txt vérifié à chaque saut. */
export async function fetchPage(url: string): Promise<FetchOutcome> {
  let current = url;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const u = new URL(current);
    const robots = await robotsFor(u.origin);
    if (!robots.ok) return { kind: 'erreur', detail: robots.error };
    if (!isAllowed(robots.robots, USER_AGENT, u.pathname + u.search)) {
      return { kind: 'robots', detail: hop ? `redirection vers ${current} interdite` : 'chemin interdit' };
    }
    let res: Response;
    try {
      res = await politeFetch(current, 'manual');
    } catch (e) {
      return { kind: 'erreur', detail: errorMessage(e) };
    }
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      await res.body?.cancel();
      current = new URL(res.headers.get('location')!, current).toString();
      continue;
    }
    if (!res.ok) {
      await res.body?.cancel();
      return { kind: 'erreur', detail: `HTTP ${res.status}` };
    }
    const type = res.headers.get('content-type') ?? '';
    if (type && !/html|xml|text\/plain/i.test(type)) {
      await res.body?.cancel();
      return { kind: 'erreur', detail: `type de contenu non pris en charge (${type.split(';')[0]})` };
    }
    const body = decode(await readBody(res), type);
    const feed = isFeed(body, type);
    const text = feed ? feedToText(body) || '(flux sans article)' : htmlToText(body);
    if (!text.trim()) return { kind: 'erreur', detail: 'page sans texte (contenu chargé en JavaScript ?)' };
    return { kind: 'ok', text, finalUrl: current };
  }
  return { kind: 'erreur', detail: 'trop de redirections' };
}

// ── Cache local du texte ──────────────────────────────────────────────────────────────────────

function cachePath(url: string): string {
  return path.join(CACHE_DIR, sha256(url).slice(0, 32) + '.txt');
}

function readCache(url: string): string | null {
  try {
    return fs.readFileSync(cachePath(url), 'utf8');
  } catch {
    return null;
  }
}

function writeCache(url: string, text: string) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(cachePath(url), text);
}

// ── Programme principal ───────────────────────────────────────────────────────────────────────

function loadNames(watch: WatchFile): Record<string, string> {
  const names: Record<string, string> = {};
  for (const [uai, pages] of Object.entries(watch.colleges ?? {})) {
    // Repli : le libellé commence par le nom court du collège (« Sévigné — inscriptions »).
    const short = pages[0]?.label.split(' — ')[0];
    if (short) names[uai] = short;
  }
  const dataset = readJson<{ colleges?: { uai: string; nom: string }[] } | null>(COLLEGES_FILE, null);
  for (const c of dataset?.colleges ?? []) names[c.uai] = c.nom;
  return names;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const watch = readJson<WatchFile | null>(WATCH_FILE, null);
  if (!watch) throw new Error(`Fichier introuvable : ${WATCH_FILE}`);
  const config = readJson<{ exclure?: string[]; saisonCourante?: string }>(CONFIG_FILE, {});
  const rentree = Number((config.saisonCourante ?? '2026-27').slice(0, 4)) + 1;
  const names = loadNames(watch);

  const allTargets = buildTargets(watch, new Set(config.exclure ?? []));
  const targets = new Map(
    [...allTargets].filter(([url, owners]) => !args.only || url.includes(args.only) || owners.some((o) => o.uai === args.only)),
  );
  const state = readJson<WatchState>(STATE_FILE, {});
  const nextState: WatchState = { ...state };
  const date = today();

  // Une file par hôte, plusieurs hôtes en parallèle.
  const queues = new Map<string, string[]>();
  for (const url of targets.keys()) {
    const host = new URL(url).host;
    queues.set(host, [...(queues.get(host) ?? []), url]);
  }
  const results = new Map<string, PageResult>();
  const hostList = [...queues.keys()];
  let done = 0;

  async function worker() {
    for (let host = hostList.shift(); host; host = hostList.shift()) {
      for (const url of queues.get(host)!) {
        const owners = targets.get(url)!;
        const outcome = await fetchPage(url);
        done++;
        process.stderr.write(`[${done}/${targets.size}] ${outcome.kind === 'ok' ? 'ok' : outcome.kind} ${url}\n`);
        if (outcome.kind !== 'ok') {
          results.set(url, { url, owners, kind: outcome.kind, detail: outcome.detail });
          continue;
        }
        const hash = sha256(outcome.text);
        const prev = state[url];
        const status = classify(prev, hash);
        const excerpt = buildExcerpt(outcome.text, { rentree });
        const result: PageResult = { url, owners, kind: status };
        if (status === 'modifiee') {
          result.highlights = changeHighlights({
            oldText: readCache(url),
            newText: outcome.text,
            oldExcerpt: prev?.excerpt ?? '',
            newExcerpt: excerpt,
            rentree,
          });
        }
        results.set(url, result);
        nextState[url] = nextEntry(prev, hash, excerpt, date);
        if (!args.dryRun) writeCache(url, outcome.text);
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(HOST_CONCURRENCY, hostList.length) }, worker));

  // Résultats dans l'ordre de watch.json.
  const ordered = [...targets.keys()].map((u) => results.get(u)!);
  const summary = renderSummary(ordered, { date, names });
  process.stdout.write(summary + '\n');
  if (args.summary) fs.writeFileSync(args.summary, summary + '\n');

  if (!args.dryRun) {
    const finalState = args.only ? nextState : pruneState(nextState, allTargets.keys());
    const sorted = pruneState(finalState, Object.keys(finalState));
    fs.writeFileSync(STATE_FILE, JSON.stringify(sorted, null, 2) + '\n');
  }

  const counts = countResults(ordered);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(
      process.env.GITHUB_OUTPUT,
      `changed=${counts.changed}\nrelevant=${counts.relevant}\nerrors=${counts.errors}\nrobots=${counts.robots}\n`,
    );
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
