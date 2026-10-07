// Indice de position sociale (IPS) des collèges, 2016-17 -> dernière rentrée.
import { odsExport, odsList } from '../lib/fetch';
import { annee, num } from '../lib/util';

export const IPS_IDS = ['fr-en-ips-colleges-ap2023', 'fr-en-ips-colleges-ap2022', 'fr-en-ips_colleges'] as const;

export interface IpsRow {
  /** Première année de la rentrée (2025 pour 2025-2026). */
  annee: number;
  uai: string;
  nom: string | null;
  academie: string | null;
  ips: number | null;
  ecartType: number | null;
  national: number | null;
  academique: number | null;
  departemental: number | null;
  source: string;
}

export async function loadIps(uais: string[]): Promise<IpsRow[]> {
  const out: IpsRow[] = [];
  const seen = new Set<string>();
  for (const id of IPS_IDS) {
    const raw = await odsExport<Record<string, unknown>>(id, { where: `uai in ${odsList(uais)}` });
    for (const r of raw) {
      const a = annee(r.rentree_scolaire);
      const uai = String(r.uai ?? '');
      if (a === null || !uai) continue;
      const key = `${uai}|${a}`;
      if (seen.has(key)) continue; // le jeu le plus récent prime
      seen.add(key);
      out.push({
        annee: a,
        uai,
        nom: ((r.nom_de_l_etablissement ?? r.nom_de_l_etablissment) as string | null) ?? null,
        academie: (r.academie as string | null) ?? null,
        ips: num(r.ips),
        ecartType: num(r.ecart_type_de_l_ips),
        national: num(r.ips_national),
        academique: num(r.ips_academique),
        departemental: num(r.ips_departemental),
        source: id,
      });
    }
  }
  return out;
}
