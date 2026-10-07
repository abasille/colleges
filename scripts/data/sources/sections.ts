// Sections internationales, sections sportives scolaires, sport-études (ministère)
// et offre de langues (fr-en-offre-langues-2d, en secours de l'ONISEP).
import { odsExport, odsList } from '../lib/fetch';

export const SI_ID = 'fr-en-sections-internationales';
export const SSS_ID = 'fr-en-sections-sportives-scolaires';
export const SPORT_ETUDES_ID = 'fr-en-sport-etudes';
export const OFFRE_LANGUES_ID = 'fr-en-offre-langues-2d';

export interface Sections {
  internationales: Map<string, { section: string; ouverture: string | null }[]>;
  sportives: Map<string, string[]>;
  sportEtudes: Map<string, string[]>;
  offreLangues: Map<string, { lv1: string[]; lv2: string[] }>;
}

function toList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === 'string' && v.trim()) return v.split(/[,;]/).map((s) => s.trim());
  return [];
}

function push<T>(m: Map<string, T[]>, k: string, ...v: T[]) {
  const arr = m.get(k) ?? [];
  arr.push(...v);
  m.set(k, arr);
}

export async function loadSections(uais: string[]): Promise<Sections> {
  const where = `uai in ${odsList(uais)}`;
  const internationales = new Map<string, { section: string; ouverture: string | null }[]>();
  for (const r of await odsExport<Record<string, unknown>>(SI_ID, { where })) {
    const niveau = String(r.niveau ?? '');
    if (niveau && !/coll/i.test(niveau)) continue;
    push(internationales, String(r.uai), {
      section: String(r.section ?? '').toLowerCase(),
      ouverture: (r.ouverture_rentree_suivante as string | null) ?? null,
    });
  }
  const sportives = new Map<string, string[]>();
  for (const r of await odsExport<Record<string, unknown>>(SSS_ID, { where })) {
    push(sportives, String(r.uai), ...toList(r.sections_scolaires));
  }
  const sportEtudes = new Map<string, string[]>();
  for (const r of await odsExport<Record<string, unknown>>(SPORT_ETUDES_ID, { where })) {
    push(sportEtudes, String(r.uai), ...toList(r.pratique_proposee));
  }
  const offreLangues = new Map<string, { lv1: string[]; lv2: string[] }>();
  for (const r of await odsExport<Record<string, unknown>>(OFFRE_LANGUES_ID, { where })) {
    const uai = String(r.uai);
    const e = String(r.enseignements ?? '').toUpperCase();
    const o = offreLangues.get(uai) ?? { lv1: [], lv2: [] };
    const langs = toList(r.langues).map((s) => s.toLowerCase());
    if (e.includes('LV1')) o.lv1.push(...langs);
    else if (e.includes('LV2')) o.lv2.push(...langs);
    offreLangues.set(uai, o);
  }
  return { internationales, sportives, sportEtudes, offreLangues };
}
