import type { Academie, Departement, Territoire } from '../types';

export const ACADEMIES: readonly Academie[] = ['Paris', 'Créteil', 'Versailles'];

export const DEPARTEMENTS: Readonly<Record<Departement, string>> = {
  '75': 'Paris',
  '77': 'Seine-et-Marne',
  '78': 'Yvelines',
  '91': 'Essonne',
  '92': 'Hauts-de-Seine',
  '93': 'Seine-Saint-Denis',
  '94': 'Val-de-Marne',
  '95': 'Val-d’Oise',
};

/** Tous les territoires, dans l'ordre d'affichage : les académies, puis les départements. */
export const TERRITOIRES: readonly Territoire[] = [...ACADEMIES, ...(Object.keys(DEPARTEMENTS) as Departement[])];

export function estTerritoire(v: unknown): v is Territoire {
  return typeof v === 'string' && (TERRITOIRES as readonly string[]).includes(v);
}

/** « Académie de Paris », « Val-de-Marne ». */
export function libelleTerritoire(t: Territoire): string {
  return estDepartement(t) ? DEPARTEMENTS[t] : `Académie de ${t}`;
}

export function estDepartement(v: unknown): v is Departement {
  return typeof v === 'string' && Object.hasOwn(DEPARTEMENTS, v);
}

/** Département d'un code INSEE de commune (ou d'arrondissement), null hors Île-de-France. */
export function departementDuCode(codeInsee: string): Departement | null {
  const d = codeInsee.slice(0, 2);
  return estDepartement(d) ? d : null;
}

/** Une commune, un arrondissement ou une adresse (par son code INSEE) à Paris. */
export function inseeAParis(codeInsee: string): boolean {
  return departementDuCode(codeInsee) === '75';
}

/** Un collège à Paris : le département 75, qui forme à lui seul l'académie de Paris. */
export function collegeAParis(c: { departement: Departement }): boolean {
  return c.departement === '75';
}
