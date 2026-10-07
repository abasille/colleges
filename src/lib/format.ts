import type { IndicateurKey } from '../types';
import { INDICATEURS } from './indicateurs';

const nf = new Map<number, Intl.NumberFormat>();

export function formatNombre(v: number, decimales = 0): string {
  let f = nf.get(decimales);
  if (!f) {
    f = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: decimales, maximumFractionDigits: decimales });
    nf.set(decimales, f);
  }
  return f.format(v);
}

/** Valeur formatée avec son unité, « — » si absente. */
export function formatIndicateur(key: IndicateurKey, v: number | null | undefined, avecUnite = true): string {
  if (v === null || v === undefined || Number.isNaN(v)) return '—';
  const m = INDICATEURS[key];
  const signe = (key === 'vaTaux' || key === 'vaNote') && v > 0 ? '+' : '';
  const s = signe + formatNombre(v, m.decimales);
  if (!avecUnite || !m.unite) return s;
  if (m.unite.startsWith('/')) return `${s}${m.unite}`;
  return `${s} ${m.unite}`;
}

export function formatDistance(km: number): string {
  return km < 1 ? `${Math.round(km * 1000 / 10) * 10} m` : `${formatNombre(km, 1)} km`;
}

const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MOIS_LONG = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

export function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function toISODate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

/** « sam. 21 nov. 2026 » */
export function formatDate(iso: string, avecAnnee = true): string {
  const d = parseISODate(iso);
  return `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}${avecAnnee ? ` ${d.getFullYear()}` : ''}`;
}

export function formatMois(annee: number, mois0: number): string {
  const s = `${MOIS_LONG[mois0]} ${annee}`;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatPeriode(debut: string, fin: string | null): string {
  if (!fin || fin === debut) return formatDate(debut);
  return `du ${formatDate(debut, false)} au ${formatDate(fin)}`;
}

export function formatHeures(debut: string | null, fin: string | null): string {
  const h = (s: string) => s.replace(':', 'h').replace(/h00$/, 'h');
  if (debut && fin) return `${h(debut)} – ${h(fin)}`;
  if (debut) return h(debut);
  return '';
}

/** Retire le préfixe « Collège » pour les affichages compacts. */
export function nomCourt(nom: string): string {
  return nom.replace(/^Coll[eè]ge\s+(priv[ée]\s+)?/i, '').trim() || nom;
}
