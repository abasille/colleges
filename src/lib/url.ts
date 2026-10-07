import type { IndicateurKey, Statut, ZoneCode } from '../types';
import { DEFAULT_FILTERS, DEFAULT_SORT, type Filters, type Sort, type SortKey, type ValueKey } from './filters';
import { INDICATEURS } from './indicateurs';

export type Vue = 'carte' | 'calendrier';
export type ColorBy = 'statut' | IndicateurKey;

export interface UrlState {
  filters: Filters;
  sort: Sort;
  selected: string | null;
  vue: Vue;
  colorBy: ColorBy;
}

const STATUTS: Statut[] = ['public', 'prive_sous_contrat', 'hors_contrat'];
const ZONES: ZoneCode[] = ['75105', '75106', '75113', '75114', '94041', '94081'];
const VALUE_KEYS = new Set<string>([...Object.keys(INDICATEURS), 'distance']);
const SORT_KEYS = new Set<string>([...VALUE_KEYS, 'nom']);

const list = (s: string | null) => (s ? s.split(',').filter(Boolean) : []);

export function parseUrlState(search: string): UrlState {
  const p = new URLSearchParams(search);
  const ranges: Filters['ranges'] = {};
  for (const [k, v] of p) {
    if (!k.startsWith('r.')) continue;
    const key = k.slice(2);
    const [a, b] = v.split('~').map(Number);
    if (VALUE_KEYS.has(key) && Number.isFinite(a) && Number.isFinite(b)) ranges[key as ValueKey] = [a, b];
  }
  const rep = p.get('rep');
  const filters: Filters = {
    q: p.get('q') ?? '',
    statuts: list(p.get('st')).filter((s): s is Statut => STATUTS.includes(s as Statut)),
    zones: list(p.get('z')).filter((s): s is ZoneCode => ZONES.includes(s as ZoneCode)),
    rep: rep === 'rep' || rep === 'hors_rep' ? rep : 'tous',
    accueilSixieme: p.get('s6') !== '0',
    masquerRecrutementParticulier: p.get('rp') === '1',
    lyceeGeneral: p.get('ly') === '1',
    passageGaranti: p.get('pg') === '1',
    favoris: p.get('fav') === '1',
    options: list(p.get('opt')),
    ranges,
    inclureSansDonnee: p.get('nd') === '1',
  };
  let sort = DEFAULT_SORT;
  const t = p.get('tri');
  if (t) {
    const [key, dir] = t.split('.');
    if (SORT_KEYS.has(key)) sort = { key: key as SortKey, dir: dir === 'desc' ? 'desc' : 'asc' };
  }
  const col = p.get('col');
  return {
    filters,
    sort,
    selected: p.get('c'),
    vue: p.get('vue') === 'calendrier' ? 'calendrier' : 'carte',
    colorBy: col && col in INDICATEURS ? (col as IndicateurKey) : 'statut',
  };
}

export function serializeUrlState(s: UrlState): string {
  const p = new URLSearchParams();
  const f = s.filters;
  if (f.q) p.set('q', f.q);
  if (f.statuts.length) p.set('st', f.statuts.join(','));
  if (f.zones.length) p.set('z', f.zones.join(','));
  if (f.rep !== 'tous') p.set('rep', f.rep);
  if (f.accueilSixieme !== DEFAULT_FILTERS.accueilSixieme) p.set('s6', f.accueilSixieme ? '1' : '0');
  if (f.masquerRecrutementParticulier) p.set('rp', '1');
  if (f.lyceeGeneral) p.set('ly', '1');
  if (f.passageGaranti) p.set('pg', '1');
  if (f.favoris) p.set('fav', '1');
  if (f.options.length) p.set('opt', f.options.join(','));
  for (const [k, r] of Object.entries(f.ranges)) if (r) p.set(`r.${k}`, `${r[0]}~${r[1]}`);
  if (f.inclureSansDonnee) p.set('nd', '1');
  if (s.sort.key !== DEFAULT_SORT.key || s.sort.dir !== DEFAULT_SORT.dir) p.set('tri', `${s.sort.key}.${s.sort.dir}`);
  if (s.selected) p.set('c', s.selected);
  if (s.vue !== 'carte') p.set('vue', s.vue);
  if (s.colorBy !== 'statut') p.set('col', s.colorBy);
  const out = p.toString();
  return out ? `?${out}` : '';
}
