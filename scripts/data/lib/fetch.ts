// Téléchargements avec cache disque (data/cache/, ignoré par git).
// - mode normal : télécharge, écrit le cache ; en cas d'échec réseau, réutilise le cache s'il existe ;
// - mode --offline : lit uniquement le cache (erreur si absent).
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface FetchConfig {
  offline: boolean;
  cacheDir: string;
  log: (msg: string) => void;
}

const config: FetchConfig = {
  offline: false,
  cacheDir: 'data/cache',
  log: (msg) => console.log(msg),
};

/** Avertissements (échecs réseau compensés par le cache) repris dans le rapport. */
export const fetchWarnings: string[] = [];

export function configureFetch(c: Partial<FetchConfig>): void {
  Object.assign(config, c);
}

export function isOffline(): boolean {
  return config.offline;
}

function cachePath(url: string, ext: string): string {
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 12);
  const path = url.replace(/^https?:\/\/[^/]+/, '').replace(/\?.*$/, '');
  let slug = path
    .split('/')
    .filter(Boolean)
    .slice(-3)
    .join('-')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .slice(0, 80)
    .replace(/^-+|-+$/g, '');
  if (!slug) slug = 'x';
  return join(config.cacheDir, `${slug}-${hash}${ext}`);
}

function formatSize(n: number): string {
  if (n > 1e6) return `${(n / 1e6).toFixed(1)} Mo`;
  if (n > 1e3) return `${(n / 1e3).toFixed(0)} ko`;
  return `${n} o`;
}

async function download(url: string, headers?: Record<string, string>): Promise<Buffer> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'colleges-data-pipeline (github.com/abasille/colleges)', ...headers },
        signal: AbortSignal.timeout(300_000),
      });
      if (!res.ok) {
        const body = (await res.text().catch(() => '')).slice(0, 300);
        const err = new Error(`HTTP ${res.status} ${res.statusText} ${body}`);
        if (res.status >= 400 && res.status < 500 && res.status !== 429) throw Object.assign(err, { fatal: true });
        throw err;
      }
      return Buffer.from(await res.arrayBuffer());
    } catch (e) {
      lastErr = e;
      if ((e as { fatal?: boolean }).fatal) break;
      if (attempt < 3) await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  throw new Error(`Échec du téléchargement ${url} : ${String(lastErr)}`);
}

/** Télécharge `url` (ou lit le cache). `ext` : extension du fichier de cache. */
export async function fetchCached(url: string, ext = '.bin', headers?: Record<string, string>): Promise<Buffer> {
  const path = cachePath(url, ext);
  if (config.offline) {
    if (!existsSync(path)) throw new Error(`Absent du cache (relancer sans --offline) : ${url}`);
    return readFileSync(path);
  }
  try {
    const buf = await download(url, headers);
    mkdirSync(config.cacheDir, { recursive: true });
    writeFileSync(path, buf);
    config.log(`  ↓ ${formatSize(buf.length).padStart(8)}  ${url.length > 140 ? url.slice(0, 137) + '…' : url}`);
    return buf;
  } catch (e) {
    if (existsSync(path)) {
      const when = statSync(path).mtime.toISOString().slice(0, 10);
      const msg = `${String(e)} — copie en cache du ${when} réutilisée`;
      fetchWarnings.push(msg);
      config.log(`  ! ${msg}`);
      return readFileSync(path);
    }
    throw e;
  }
}

export async function fetchText(url: string, ext = '.txt'): Promise<string> {
  return (await fetchCached(url, ext)).toString('utf-8');
}

export async function fetchJson<T = unknown>(url: string): Promise<T> {
  return JSON.parse(await fetchText(url, '.json')) as T;
}

// --- Opendatasoft (data.education.gouv.fr, opendata.paris.fr) ---

export const ODS_EDUCATION = 'https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets';
export const ODS_PARIS = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets';

export interface OdsQuery {
  where?: string;
  select?: string;
  orderBy?: string;
  base?: string;
}

export function odsExportUrl(dataset: string, q: OdsQuery = {}, format = 'json'): string {
  const params = new URLSearchParams();
  if (q.select) params.set('select', q.select);
  if (q.where) params.set('where', q.where);
  if (q.orderBy) params.set('order_by', q.orderBy);
  const qs = params.toString();
  return `${q.base ?? ODS_EDUCATION}/${dataset}/exports/${format}${qs ? `?${qs}` : ''}`;
}

/** Export JSON complet (sans pagination) d'un jeu Opendatasoft. */
export async function odsExport<T = Record<string, unknown>>(dataset: string, q: OdsQuery = {}): Promise<T[]> {
  return fetchJson<T[]>(odsExportUrl(dataset, q));
}

/** Liste ODSQL : ("a","b") */
export function odsList(values: Iterable<string | number>): string {
  return `(${[...values].map((v) => (typeof v === 'number' ? String(v) : `"${v}"`)).join(',')})`;
}
