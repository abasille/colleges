import type { EventType, Statut } from '../types';

export const STATUT_COLORS: Record<Statut, string> = {
  public: '#2563eb',
  prive_sous_contrat: '#d97706',
  hors_contrat: '#7c3aed',
};

export const EVENT_COLORS: Record<EventType, string> = {
  portes_ouvertes: '#059669',
  reunion_information: '#2563eb',
  immersion: '#0891b2',
  inscription: '#d97706',
  date_limite: '#dc2626',
  officiel: '#475569',
};

export const MISSING_COLOR = '#a1a1aa';

// Échelle séquentielle (viridis), perceptuellement uniforme et lisible par les daltoniens.
const STOPS = ['#440154', '#3b528b', '#21918c', '#5ec962', '#fde725'];

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** t dans [0, 1] → couleur. */
export function sequential(t: number): string {
  const x = Math.min(1, Math.max(0, t)) * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(x));
  const f = x - i;
  const a = hexToRgb(STOPS[i]);
  const b = hexToRgb(STOPS[i + 1]);
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
}

export function scaleColor(v: number | null, domain: [number, number] | null, inverser = false): string {
  if (v === null || !domain) return MISSING_COLOR;
  const [min, max] = domain;
  const t = max === min ? 0.5 : (v - min) / (max - min);
  return sequential(inverser ? 1 - t : t);
}
