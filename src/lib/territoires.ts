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
  return t in DEPARTEMENTS ? DEPARTEMENTS[t as Departement] : `Académie de ${t}`;
}
