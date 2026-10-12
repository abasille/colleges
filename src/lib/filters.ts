import type { CollegeResume, Departement, IndicateurKey, Statut } from '../types';
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
  // Sélection géographique : union des communes et des départements choisis ; les deux vides = toute l'Île-de-France.
  communes: string[]; // codes INSEE (arrondissement à Paris)
  departements: Departement[];
  rep: 'tous' | 'rep' | 'hors_rep';
  accueilSixieme: boolean;
  masquerRecrutementParticulier: boolean;
  lyceeGeneral: boolean;
  passageGaranti: boolean;
  favoris: boolean;
  /** Seulement les collèges suivis (relevé manuel des portes ouvertes, du passage au lycée…). */
  suivis: boolean;
  options: string[]; // ET logique
  ranges: Partial<Record<ValueKey, [number, number]>>;
  inclureSansDonnee: boolean;
}

export const DEFAULT_FILTERS: Filters = {
  q: '',
  statuts: [],
  communes: [],
  departements: [],
  rep: 'tous',
  accueilSixieme: true,
  masquerRecrutementParticulier: false,
  lyceeGeneral: false,
  passageGaranti: false,
  favoris: false,
  suivis: false,
  options: [],
  ranges: {},
  inclureSansDonnee: false,
};

export const DEFAULT_SORT: Sort = { key: 'nom', dir: 'asc' };

export interface FilterContext {
  favoris: ReadonlySet<string>;
  distances: ReadonlyMap<string, number> | null;
}

export function getValue(c: CollegeResume, key: ValueKey, ctx: Pick<FilterContext, 'distances'>): number | null {
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

export function hasLyceeGeneral(c: CollegeResume): boolean {
  return c.continuite.secondeGtSurPlace;
}

/** Passage garanti par écrit ; seul un collège suivi a un passage au lycée renseigné (ADR 0001). */
export function aPassageGaranti(c: CollegeResume): boolean {
  return c.suivi && c.continuite.passage === 'garanti';
}

export function matches(c: CollegeResume, f: Filters, ctx: FilterContext): boolean {
  if (f.q.trim()) {
    const words = fold(f.q).split(/\s+/).filter(Boolean);
    const hay = fold(`${c.nom} ${c.communeLibelle}`);
    if (!words.every((w) => hay.includes(w))) return false;
  }
  if (f.statuts.length && !f.statuts.includes(c.statut)) return false;
  if (f.communes.length || f.departements.length) {
    const retenu = f.communes.includes(c.commune) || (f.departements as readonly string[]).includes(c.departement);
    if (!retenu) return false;
  }
  if (f.rep === 'rep' && !c.rep) return false;
  if (f.rep === 'hors_rep' && c.rep) return false;
  if (f.accueilSixieme && !c.accueilSixieme) return false;
  if (f.masquerRecrutementParticulier && c.recrutementParticulier) return false;
  if (f.lyceeGeneral && !hasLyceeGeneral(c)) return false;
  if (f.passageGaranti && !aPassageGaranti(c)) return false;
  if (f.favoris && !ctx.favoris.has(c.uai)) return false;
  if (f.suivis && !c.suivi) return false;
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

/** Les codes de commune absents des collèges donnés (lien ancien ou erroné) sont ignorés. */
export function applyFilters(colleges: CollegeResume[], f: Filters, ctx: FilterContext): CollegeResume[] {
  const presentes = new Set(colleges.map((c) => c.commune));
  const effectif = { ...f, communes: f.communes.filter((code) => presentes.has(code)) };
  return colleges.filter((c) => matches(c, effectif, ctx));
}

const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

/** Tri stable ; les valeurs manquantes sont toujours en dernier, quel que soit le sens. */
export function sortColleges(colleges: CollegeResume[], sort: Sort, ctx: Pick<FilterContext, 'distances'>): CollegeResume[] {
  const byName = (a: CollegeResume, b: CollegeResume) => collator.compare(nomCourt(a.nom), nomCourt(b.nom));
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
export function domainOf(colleges: CollegeResume[], key: ValueKey, ctx: Pick<FilterContext, 'distances'>): [number, number] | null {
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
  if (f.communes.length || f.departements.length) n++;
  if (f.rep !== 'tous') n++;
  if (f.accueilSixieme !== DEFAULT_FILTERS.accueilSixieme) n++;
  if (f.masquerRecrutementParticulier) n++;
  if (f.lyceeGeneral) n++;
  if (f.passageGaranti) n++;
  if (f.favoris) n++;
  if (f.suivis) n++;
  n += f.options.length;
  n += Object.keys(f.ranges).length;
  return n;
}
