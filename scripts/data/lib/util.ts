import Papa from 'papaparse';

/** Convertit une valeur brute (nombre, « 86,3% », « 1.02 », null) en nombre ou null. */
export function num(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'string') {
    const s = v.trim().replace(/%$/, '').replace(/\s/g, '').replace(',', '.');
    if (s === '' || s === '-' || s.toLowerCase() === 'nd') return null;
    const n = Number(s);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

/** Année (4 chiffres) en tête d'une valeur « 2024 », « 2024-01-01T… », « 2023-2024 », 2020.0. */
export function annee(v: unknown): number | null {
  if (typeof v === 'number') return Math.trunc(v);
  if (typeof v === 'string') {
    const m = /^(\d{4})/.exec(v.trim());
    return m ? Number(m[1]) : null;
  }
  return null;
}

export function round(v: number | null | undefined, decimals = 1): number | null {
  if (v === null || v === undefined || !Number.isFinite(v)) return null;
  const f = 10 ** decimals;
  return Math.round(v * f) / f;
}

export function mean(values: (number | null | undefined)[]): number | null {
  const xs = values.filter((x): x is number => typeof x === 'number' && Number.isFinite(x));
  if (xs.length === 0) return null;
  return xs.reduce((a, b) => a + b, 0) / xs.length;
}

/** Moyenne pondérée des couples (valeur, poids) dont les deux sont renseignés et le poids > 0. */
export function weightedMean(pairs: [number | null | undefined, number | null | undefined][]): number | null {
  let s = 0;
  let w = 0;
  for (const [v, p] of pairs) {
    if (typeof v !== 'number' || typeof p !== 'number' || !Number.isFinite(v) || !(p > 0)) continue;
    s += v * p;
    w += p;
  }
  return w > 0 ? s / w : null;
}

/** Ratio de sommes (en %) sur les couples complets. */
export function ratioOfSums(pairs: [number | null | undefined, number | null | undefined][], factor = 100): number | null {
  let a = 0;
  let b = 0;
  for (const [x, y] of pairs) {
    if (typeof x !== 'number' || typeof y !== 'number' || !(y > 0)) continue;
    a += x;
    b += y;
  }
  return b > 0 ? (a / b) * factor : null;
}

export function groupBy<T, K>(items: T[], key: (t: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const it of items) {
    const k = key(it);
    const arr = m.get(k);
    if (arr) arr.push(it);
    else m.set(k, [it]);
  }
  return m;
}

export function uniq<T>(xs: Iterable<T>): T[] {
  return [...new Set(xs)];
}

export function parseCsv(text: string, delimiter = ';'): Record<string, string>[] {
  const res = Papa.parse<Record<string, string>>(text.replace(/^﻿/, ''), {
    header: true,
    delimiter,
    skipEmptyLines: true,
  });
  return res.data;
}

const PETITS_MOTS = new Set(['de', 'du', 'des', 'la', 'le', 'les', 'et', 'en', 'à', 'au', 'aux', 'sur', 'sous', "d'", "l'"]);

/**
 * Casse « Titre » pour un libellé en majuscules (« JEAN DE LA FONTAINE » -> « Jean de la Fontaine »).
 * Les articles et prépositions restent en minuscules sauf en tête.
 */
export function niceCase(s: string): string {
  const lower = s.toLowerCase().replace(/\s+/g, ' ').trim();
  return lower.replace(/[\p{L}']+/gu, (w, offset: number) => {
    if (offset > 0 && PETITS_MOTS.has(w)) return w;
    if (/^[dl]'/.test(w) && offset > 0) return w.slice(0, 2) + w.charAt(2).toUpperCase() + w.slice(3);
    return w.charAt(0).toUpperCase() + w.slice(1);
  });
}

/** Première lettre en majuscule. */
export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function sortedObject<T>(o: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
}

export function formatNombre(v: number, decimals = 0): string {
  return v.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).replace(/ /g, ' ');
}
