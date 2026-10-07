// Effectifs des collèges par niveau, sexe et langue vivante (rentrées 2019 -> dernière).
// Les valeurs inférieures à 5 sont masquées (null) par le producteur.
import type { Niveau } from '../../../src/types';
import { odsExport, odsList } from '../lib/fetch';
import { annee, num } from '../lib/util';

export const EFFECTIFS_ID = 'fr-en-college-effectifs-niveau-sexe-lv';

export interface EffectifsRow {
  annee: number;
  uai: string;
  nom: string | null;
  total: number | null;
  segpa: number | null;
  ulis: number | null;
  parNiveau: Record<Niveau, number | null>;
  /** Élèves par langue : lv1/lv2 -> langue -> total sur les 4 niveaux (null si tout est masqué). */
  langues: { lv1: Record<string, number | null>; lv2: Record<string, number | null> };
}

const NIVEAUX: [Niveau, string][] = [
  ['6e', '6emes'],
  ['5e', '5emes'],
  ['4e', '4emes'],
  ['3e', '3emes'],
];

export async function loadEffectifs(uais: string[]): Promise<EffectifsRow[]> {
  const raw = await odsExport<Record<string, unknown>>(EFFECTIFS_ID, { where: `numero_college in ${odsList(uais)}` });
  return raw.map((r) => {
    const parNiveau = Object.fromEntries(NIVEAUX.map(([n, k]) => [n, num(r[`nombre_total_de_${k}`])])) as Record<Niveau, number | null>;
    const langues: EffectifsRow['langues'] = { lv1: {}, lv2: {} };
    for (const key of Object.keys(r)) {
      const m = /^nombre_de_(\d)emes_(lv[12])_(.+)$/.exec(key);
      if (!m) continue;
      const lv = m[2] as 'lv1' | 'lv2';
      const langue = m[3];
      const v = num(r[key]);
      const prev = langues[lv][langue];
      langues[lv][langue] = v === null ? (prev ?? null) : (prev ?? 0) + v;
    }
    return {
      annee: annee(r.rentree_scolaire) ?? 0,
      uai: String(r.numero_college),
      nom: (r.patronyme as string | null) ?? null,
      total: num(r.nombre_eleves_total),
      segpa: num(r.nombre_d_eleves_total_segpa),
      ulis: num(r.nombre_d_eleves_total_ulis),
      parNiveau,
      langues,
    };
  });
}
