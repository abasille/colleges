/**
 * Aide à la commande /college-suivre (.claude/commands/college-suivre.md). N'écrit aucun fichier.
 *
 *   npm run suivre -- trouver <nom ou UAI>   collège(s) du périmètre, ce qui est déjà relevé pour lui,
 *                                            et les dates officielles de son territoire
 *   npm run suivre -- robots <url>…          ce que robots.txt permet de demander (un robots.txt lu par hôte),
 *                                            puis, pour chaque URL autorisée seulement, la réponse que
 *                                            recevra la surveillance (agent colleges-watch, sans redirection)
 * Code de sortie de `robots` : 2 si au moins une URL est interdite.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fold } from '../src/lib/filters';
import { collegeAParis, libelleTerritoire } from '../src/lib/territoires';
import type {
  Academie,
  CollegeDetail,
  CollegeEvent,
  CollegeResume,
  Departement,
  DetailDepartement,
  EventsFile,
  Territoire,
} from '../src/types';
import { USER_AGENT, type WatchFile } from './watch-pages';
import { ALLOW_ALL, DISALLOW_ALL, crawlDelay, isAllowed, parseRobots, productToken, type Robots } from './watch/robots';

export type CollegeCherche = Pick<CollegeResume, 'uai' | 'nom' | 'statut' | 'communeLibelle' | 'departement' | 'academie' | 'suivi'>;

const mots = (s: string): string[] => fold(s).split(/[^a-z0-9]+/).filter(Boolean);

/**
 * Collèges dont l'UAI est la requête ; sinon ceux dont le nom et la commune contiennent un mot
 * commençant par chaque mot de la requête (sans tenir compte des accents ni de la ponctuation),
 * en préférant ceux qui contiennent les mots entiers.
 */
export function chercherColleges<C extends CollegeCherche>(colleges: C[], requete: string): C[] {
  const q = requete.trim().toUpperCase();
  if (!q) return [];
  const parUai = colleges.filter((c) => c.uai === q);
  if (parUai.length) return parUai;
  const voulus = mots(requete);
  const avecMots = colleges.map((c) => ({ c, presents: mots(`${c.nom} ${c.communeLibelle}`) }));
  const entiers = avecMots.filter(({ presents }) => voulus.every((m) => presents.includes(m)));
  const retenus = entiers.length
    ? entiers
    : avecMots.filter(({ presents }) => voulus.every((m) => presents.some((p) => p.startsWith(m))));
  return retenus.map(({ c }) => c);
}

export interface EtatTerritoire {
  territoire: Territoire;
  /** Nombre de dates officielles de la saison courante. */
  saisonCourante: number;
  /** Saison la plus récente qui a au moins une date officielle, null s'il n'y en a aucune. */
  derniereSaison: string | null;
}

/**
 * Dates officielles des territoires d'un collège : son académie, puis son département
 * (à Paris, rectorat et direction départementale ne font qu'un : « Paris »).
 */
export function datesOfficielles(
  college: { academie: Academie; departement: Departement },
  events: CollegeEvent[],
  saison: string,
): EtatTerritoire[] {
  const territoires: Territoire[] =
    collegeAParis(college) ? ['Paris'] : [college.academie, college.departement];
  return territoires.map((territoire) => {
    const saisons = events.filter((e) => e.type === 'officiel' && e.territoire === territoire).map((e) => e.saison);
    return {
      territoire,
      saisonCourante: saisons.filter((s) => s === saison).length,
      derniereSaison: saisons.length ? saisons.reduce((a, b) => (b > a ? b : a)) : null,
    };
  });
}

/** Agents d'Anthropic qui lisent une page à la demande : un site qui en exclut un n'est pas consulté (SPEC §15). */
const AGENTS_ANTHROPIC = ['Claude-User', 'Claude-Web', 'anthropic-ai'];
/** Agents qui liront la page : WebFetch, puis la surveillance hebdomadaire (npm run watch-pages). */
const AGENTS_LECTEURS = ['Claude-User', productToken(USER_AGENT)];

/**
 * Peut-on demander ce chemin (« /a/b?x=1 ») ? Il faut que le site n'exclue pas les agents d'Anthropic
 * (au-delà du robot d'indexation ClaudeBot), et que ni le groupe `*` ni le groupe d'un agent lecteur ne l'interdise.
 */
export function verdictRobots(robots: Robots, chemin: string): { autorise: boolean; motif: string | null } {
  const ferme = AGENTS_ANTHROPIC.find((a) => isAllowed(robots, '*', '/') && !isAllowed(robots, a, '/'));
  if (ferme) return { autorise: false, motif: `site fermé aux agents d'Anthropic (${ferme})` };
  if (!isAllowed(robots, '*', chemin)) return { autorise: false, motif: 'interdit par le groupe *' };
  const interdit = AGENTS_LECTEURS.find((a) => !isAllowed(robots, a, chemin));
  if (interdit) return { autorise: false, motif: `interdit pour ${interdit}` };
  return { autorise: true, motif: null };
}

// ── Ligne de commande ─────────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lire = <T>(fichier: string): T => JSON.parse(fs.readFileSync(path.join(ROOT, fichier), 'utf8')) as T;

const STATUTS: Record<CollegeResume['statut'], string> = {
  public: 'public',
  prive_sous_contrat: 'privé sous contrat',
  hors_contrat: 'privé hors contrat',
};

function trouver(requete: string): number {
  const colleges = lire<{ colleges: CollegeResume[] }>('public/data/colleges.json').colleges;
  const trouves = chercherColleges(colleges, requete);
  const ligne = (c: CollegeResume) =>
    `${c.uai}  ${c.nom} — ${c.communeLibelle} (${c.departement}), ${STATUTS[c.statut]}${c.suivi ? ' — déjà suivi' : ''}`;
  if (!trouves.length) {
    console.log(`Aucun collège du périmètre ne correspond à « ${requete} ».`);
    return 1;
  }
  if (trouves.length > 1) {
    console.log(`${trouves.length} collèges correspondent à « ${requete} » : choisir par l'UAI.\n`);
    for (const c of trouves.slice(0, 40)) console.log(ligne(c));
    if (trouves.length > 40) console.log(`… et ${trouves.length - 40} autres : préciser la requête.`);
    return 0;
  }

  const c = trouves[0];
  const detail = lire<DetailDepartement>(`public/data/colleges-${c.departement}.json`).colleges.find(
    (d: CollegeDetail) => d.uai === c.uai,
  );
  const suivis = lire<{ colleges: Record<string, string> }>('data/overrides/suivis.json').colleges;
  const watch = lire<WatchFile>('data/overrides/watch.json').colleges[c.uai] ?? [];
  const corrections = lire<{ colleges: Record<string, unknown> }>('data/overrides/colleges.json').colleges[c.uai];
  const continuite = lire<{ colleges: Record<string, unknown> }>('data/overrides/continuite.json').colleges[c.uai];
  const events = lire<EventsFile>('data/overrides/events.json');
  const json = (v: unknown) => (v === undefined ? '—' : JSON.stringify(v));
  const k = detail?.continuite;

  console.log(ligne(c));
  console.log(`Académie : ${c.academie}`);
  console.log(`Site (annuaire) : ${detail?.web ?? '—'}`);
  console.log(`Fiche ONISEP : ${detail?.ficheOnisep ?? '—'}`);
  console.log(`\nÉtiquettes publiées :`);
  console.log(`  recrutement particulier : ${c.recrutementParticulier ?? '—'}`);
  console.log(`  niveaux : ${c.niveaux.join(', ')} ; accueil en 6e : ${c.accueilSixieme ? 'oui' : 'non'}`);
  console.log(`  remarques : ${detail?.remarques.length ? detail.remarques.join(' | ') : '—'}`);
  console.log(`\nContinuité publiée (détection automatique, texte par défaut) :`);
  console.log(
    `  lien : ${k?.lien ?? '?'}${k?.lycee ? ` — ${k.lycee.nom} (${k.lycee.uai}), voies : ${k.lycee.voies.join(', ') || '—'}` : ''}`,
  );
  console.log(`  2nde GT sur place : ${c.continuite.secondeGtSurPlace ? 'oui' : 'non'}`);
  console.log(`  passage : ${c.continuite.passage} — « ${k?.passageTexte ?? '?'} »`);
  console.log(`\nDéjà relevé :`);
  console.log(`  suivis.json : ${suivis[c.uai] ? 'oui' : 'non'}`);
  console.log(`  watch.json : ${watch.length ? watch.map((p) => p.url).join(' ; ') : 'aucune page'}`);
  console.log(`  colleges.json : ${json(corrections)}`);
  console.log(`  continuite.json : ${json(continuite)}`);
  console.log(`  inscriptions (events.json) : ${json(events.inscriptions[c.uai])}`);
  console.log(`  événements du collège : ${events.events.filter((e) => e.uai === c.uai).length}`);
  console.log(`\nDates officielles (saison courante ${events.saisonCourante}) :`);
  for (const t of datesOfficielles(c, events.events, events.saisonCourante)) {
    const etat = t.saisonCourante
      ? `${t.saisonCourante} date(s)`
      : `MANQUANTES (dernière saison renseignée : ${t.derniereSaison ?? 'aucune'})`;
    console.log(`  ${libelleTerritoire(t.territoire)} (« ${t.territoire} ») : ${etat}`);
  }
  return 0;
}

/** robots.txt d'une origine, interprété comme le fait la surveillance (scripts/watch-pages.ts). */
async function robotsDe(origine: string): Promise<{ robots: Robots; note: string }> {
  try {
    const res = await fetch(`${origine}/robots.txt`, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(20_000),
    });
    const texte = await res.text();
    if (res.ok) {
      // Certains serveurs répondent 200 avec une page HTML : pas de robots.txt réel.
      return /^\s*</.test(texte)
        ? { robots: ALLOW_ALL, note: 'page HTML au lieu de robots.txt : tout autorisé' }
        : { robots: parseRobots(texte), note: 'robots.txt lu' };
    }
    if (res.status >= 400 && res.status < 500 && res.status !== 429) {
      return { robots: ALLOW_ALL, note: `pas de robots.txt (HTTP ${res.status}) : tout autorisé` };
    }
    return { robots: DISALLOW_ALL, note: `robots.txt injoignable (HTTP ${res.status}) : tout interdit` };
  } catch (e) {
    return { robots: DISALLOW_ALL, note: `robots.txt injoignable (${(e as Error).message}) : tout interdit` };
  }
}

async function robots(urls: string[]): Promise<number> {
  const parOrigine = new Map<string, URL[]>();
  for (const u of urls) {
    const url = new URL(u);
    parOrigine.set(url.origin, [...(parOrigine.get(url.origin) ?? []), url]);
  }
  let interdits = 0;
  for (const [origine, liste] of parOrigine) {
    const { robots: r, note } = await robotsDe(origine);
    const delai = Math.max(crawlDelay(r, 'Claude-User') ?? 0, crawlDelay(r, USER_AGENT) ?? 0);
    console.log(`${origine} — ${note}${delai ? ` ; Crawl-delay ${delai} s` : ''}`);
    for (const url of liste) {
      const v = verdictRobots(r, url.pathname + url.search);
      if (!v.autorise) {
        interdits++;
        console.log(`  INTERDIT (${v.motif})  ${url.href}`);
        continue;
      }
      await new Promise((ok) => setTimeout(ok, Math.max(1.5, delai) * 1000));
      console.log(`  autorisé — ${await reponseSurveillance(url)}  ${url.href}`);
    }
  }
  return interdits ? 2 : 0;
}

/** Ce que la surveillance hebdomadaire obtiendra pour une page autorisée (une requête, sans suivre de redirection). */
async function reponseSurveillance(url: URL): Promise<string> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT }, redirect: 'manual', signal: AbortSignal.timeout(20_000) });
    await res.body?.cancel();
    const location = res.headers.get('location');
    if (location) return `HTTP ${res.status}, redirection vers ${new URL(location, url).href} (à vérifier à son tour)`;
    return `HTTP ${res.status}${res.ok ? `, ${res.headers.get('content-type') ?? 'type inconnu'}` : ' : page non surveillable telle quelle'}`;
  } catch (e) {
    return `injoignable (${(e as Error).message})`;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [action, ...args] = process.argv.slice(2);
  if (action === 'trouver' && args.length) process.exit(trouver(args.join(' ')));
  else if (action === 'robots' && args.length) void robots(args).then((code) => process.exit(code));
  else {
    console.error('Usage : npm run suivre -- trouver <nom ou UAI> | robots <url>…');
    process.exit(1);
  }
}
