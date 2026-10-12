import type { CommunePresente } from '../types';
import type { Filters } from './filters';
import { lieuxChoisis } from './lieux';

/**
 * Contours à afficher : ceux des communes choisies dans le filtre (un département choisi n'entraîne pas
 * ses communes), et les départements dont il faut charger le fichier contours-<dép>.geojson.
 * Sans commune choisie, rien à charger.
 */
export function contoursAAfficher(
  choix: Pick<Filters, 'communes' | 'departements'>,
  communes: readonly CommunePresente[],
): { codes: string[]; departements: string[] } {
  const choisies = lieuxChoisis(choix, communes).flatMap((l) => (l.type === 'commune' ? [l] : []));
  return {
    codes: [...new Set(choisies.map((c) => c.code))].sort(),
    departements: [...new Set(choisies.map((c) => c.departement))].sort(),
  };
}
