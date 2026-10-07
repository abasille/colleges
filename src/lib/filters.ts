import type { College, IndicateurKey, Statut, ZoneCode } from '../types';
import { nomCourt } from './format';

export type ValueKey = IndicateurKey | 'distance';
export type SortKey = ValueKey | 'nom';
export type SortDir = 'asc' | 'desc';

export interface Sort {
  key: SortKey;
  dir: SortDir;
}

export interface Filters {
  q: string;
  statuts: Statut[]; // vide = tous
  zones: ZoneCode[]; // vide = toutes
  rep: 'tous' | 'rep' | 'hors_rep';
  accueilSixieme: boolean;
  masquerRecrutementParticulier: boolean;
  lyceeGeneral: boolean;
  passageGaranti: boolean;
  favoris: boolean;
  options: string[]; // ET logique
  ranges: Partial<Record<ValueKey, [number, number]>>;
  inclureSansDonnee: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  q: '',
  statuts: [],
  zones: [],
  rep: 'tous',
  accueilSixieme: true,
  masquerRecrutementParticulier: false,
  lyceeGeneral: false,
  passageGaranti: false,
  favoris: false,
  options: [],
  ranges: {},
  inclureSansDonnee: false,
};

export const DEFAULT_SORT: Sort = { key: 'nom', dir: 'asc' };

export interface FilterContext {
  favoris: ReadonlySet<string>;
  distances: ReadonlyMap<string, number> | null;
}

export function getValue(c: College, key: ValueKey, ctx: Pick<FilterContext, 'distances'>): number | null {
  if (key === 'distance') return ctx.distances?.get(c.uai) ?? null;
  return c.indicateurs[key];
}

/** Minuscules, sans accents, pour la recherche par nom. */
export function fold(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function hasLyceeGeneral(c: College): boolean {
  return c.continuite.lien !== 'aucun' && c.continuite.secondeGtSurPlace;
}

export function matches(c: College, f: Filters, ctx: FilterContext): boolean {
  if (f.q.trim()) {
    const words = fold(f.q).split(/\s+/).filter(Boolean);
    const hay = fold(`${c.nom} ${c.zoneLibelle}`);
    if (!words.every((w) => hay.includes(w))) return false;
  }
  if (f.statuts.length && !f.statuts.includes(c.statut)) return false;
  if (f.zones.length && !f.zones.includes(c.zone)) return false;
  if (f.rep === 'rep' && !c.rep) return false;
  if (f.rep === 'hors_rep' && c.rep) return false;
  if (f.accueilSixieme && !c.accueilSixieme) return false;
  if (f.masquerRecrutementParticulier && c.recrutementParticulier) return false;
  if (f.lyceeGeneral && !hasLyceeGeneral(c)) return false;
  if (f.passageGaranti && c.continuite.passage !== 'garanti') return false;
  if (f.favoris && !ctx.favoris.has(c.uai)) return false;
  if (f.options.length && !f.options.every((o) => c.optionTags.includes(o))) return false;
  for (const [key, range] of Object.entries(f.ranges) as [ValueKey, [number, number]][]) {
    if (!range) continue;
    const v = getValue(c, key, ctx);
    if (v === null) {
      if (!f.inclureSansDonnee) return false;
      continue;
    }
    if (v < range[0] || v > range[1]) return false;
  }
  return true;
}

export function applyFilters(colleges: College[], f: Filters, ctx: FilterContext): College[] {
  return colleges.filter((c) => matches(c, f, ctx));
}

const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

/** Tri stable ; les valeurs manquantes sont toujours en dernier, quel que soit le sens. */
export function sortColleges(colleges: College[], sort: Sort, ctx: Pick<FilterContext, 'distances'>): College[] {
  const byName = (a: College, b: College) => collator.compare(nomCourt(a.nom), nomCourt(b.nom));
  const out = [...colleges];
  if (sort.key === 'nom') {
    out.sort((a, b) => (sort.dir === 'asc' ? byName(a, b) : byName(b, a)));
    return out;
  }
  const key = sort.key;
  out.sort((a, b) => {
    const va = getValue(a, key, ctx);
    const vb = getValue(b, key, ctx);
    if (va === null && vb === null) return byName(a, b);
    if (va === null) return 1;
    if (vb === null) return -1;
    if (va === vb) return byName(a, b);
    return sort.dir === 'asc' ? va - vb : vb - va;
  });
  return out;
}

/** Bornes [min, max] observées d'un indicateur, pour initialiser les curseurs. */
export function domainOf(colleges: College[], key: ValueKey, ctx: Pick<FilterContext, 'distances'>): [number, number] | null {
  let min = Infinity;
  let max = -Infinity;
  for (const c of colleges) {
    const v = getValue(c, key, ctx);
    if (v === null) continue;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  return min === Infinity ? null : [min, max];
}

/** Nombre de critères actifs (hors recherche texte), pour le badge du bouton Filtres. */
export function countActive(f: Filters): number {
  let n = 0;
  if (f.statuts.length) n++;
  if (f.zones.length) n++;
  if (f.rep !== 'tous') n++;
  if (f.accueilSixieme !== DEFAULT_FILTERS.accueilSixieme) n++;
  if (f.masquerRecrutementParticulier) n++;
  if (f.lyceeGeneral) n++;
  if (f.passageGaranti) n++;
  if (f.favoris) n++;
  n += f.options.length;
  n += Object.keys(f.ranges).length;
  return n;
}
