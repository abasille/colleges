// Note maison /20 (SPEC §5) : fonctions pures.
//  - 3 composantes à poids égal : brevet (3 ans), note à l'écrit (3 ans), valeur ajoutée
//    (moyenne des centiles de la VA du taux et de la VA de la note, ou celui disponible) ;
//  - composante = centile du collège parmi tous les collèges de France ayant l'indicateur × 20 ;
//  - note = moyenne des composantes disponibles si au moins 2 (« partielle » s'il en manque une) ;
//  - lettre A ≥ 16, B ≥ 12, C ≥ 8, D ≥ 4, sinon E ; rang dans la zone (ex æquo au même rang).
import type { ScoreMaison } from '../../src/types';
import { round } from './lib/util';

/** Distribution triée d'un indicateur (valeurs finies uniquement). */
export function distribution(values: (number | null | undefined)[]): number[] {
  return values.filter((v): v is number => typeof v === 'number' && Number.isFinite(v)).sort((a, b) => a - b);
}

function lowerBound(sorted: number[], v: number): number {
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (sorted[mid] < v) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function upperBound(sorted: number[], v: number): number {
  let lo = 0;
  let hi = sorted.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (sorted[mid] <= v) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * Rang centile (0–1) de `v` dans la distribution triée : part des valeurs strictement inférieures,
 * plus la moitié des valeurs égales (rang moyen des ex æquo).
 */
export function percentileRank(sorted: number[], v: number): number {
  if (sorted.length === 0) throw new Error('distribution vide');
  const below = lowerBound(sorted, v);
  const equal = upperBound(sorted, v) - below;
  return (below + equal / 2) / sorted.length;
}

export interface Distributions {
  brevet: number[];
  noteEcrit: number[];
  vaTaux: number[];
  vaNote: number[];
}

export interface ValeursScore {
  brevet: number | null;
  noteEcrit: number | null;
  vaTaux: number | null;
  vaNote: number | null;
}

export type Composantes = ScoreMaison['composantes'];

export function composantes(v: ValeursScore, d: Distributions): Composantes {
  const c = (x: number | null, dist: number[]) => (x === null || dist.length === 0 ? null : percentileRank(dist, x) * 20);
  const vaParts = [c(v.vaTaux, d.vaTaux), c(v.vaNote, d.vaNote)].filter((x): x is number => x !== null);
  return {
    brevet: round(c(v.brevet, d.brevet), 1),
    noteEcrit: round(c(v.noteEcrit, d.noteEcrit), 1),
    va: vaParts.length ? round(vaParts.reduce((a, b) => a + b, 0) / vaParts.length, 1) : null,
  };
}

export function lettre(note: number): ScoreMaison['lettre'] {
  if (note >= 16) return 'A';
  if (note >= 12) return 'B';
  if (note >= 8) return 'C';
  if (note >= 4) return 'D';
  return 'E';
}

/** Note et lettre à partir des composantes ; null si moins de 2 composantes. Le rang est fixé ensuite. */
export function noteMaison(c: Composantes): Omit<ScoreMaison, 'rang' | 'sur'> | null {
  const dispo = [c.brevet, c.noteEcrit, c.va].filter((x): x is number => x !== null);
  if (dispo.length < 2) return null;
  const note = round(dispo.reduce((a, b) => a + b, 0) / dispo.length, 1)!;
  return { note, lettre: lettre(note), partielle: dispo.length < 3, composantes: c };
}

/** Rangs « compétition » (1, 2, 2, 4…) par note décroissante ; `sur` = nombre de notés. */
export function classer<T extends { uai: string; note: number }>(items: T[]): Map<string, { rang: number; sur: number }> {
  const sorted = [...items].sort((a, b) => b.note - a.note || a.uai.localeCompare(b.uai));
  const out = new Map<string, { rang: number; sur: number }>();
  sorted.forEach((it, i) => {
    const rang = i > 0 && sorted[i - 1].note === it.note ? out.get(sorted[i - 1].uai)!.rang : i + 1;
    out.set(it.uai, { rang, sur: sorted.length });
  });
  return out;
}
