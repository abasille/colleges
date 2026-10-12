// Contours des arrondissements et communes du périmètre (geo.api.gouv.fr).
import type { ZoneCode } from '../../../src/types';
import { fetchJson } from '../lib/fetch';
import { simplifyGeometry, type Feature, type FeatureCollection, type SurfaceGeometry } from '../lib/geo';

export const GEO_API = 'https://geo.api.gouv.fr';

export function contourUrl(code: string): string {
  return code.startsWith('751')
    ? `${GEO_API}/communes/${code}?type=arrondissement-municipal&format=geojson&geometry=contour`
    : `${GEO_API}/communes/${code}?format=geojson&geometry=contour`;
}

/** Contour tel que publié (géométrie non simplifiée). */
export interface ContourBrut {
  code: string;
  geometry: SurfaceGeometry;
}

export async function loadContoursBruts(zones: { code: ZoneCode }[]): Promise<ContourBrut[]> {
  const out: ContourBrut[] = [];
  for (const z of zones) {
    const f = await fetchJson<{ geometry: SurfaceGeometry; properties: { code: string } }>(contourUrl(z.code));
    if (f.properties?.code !== z.code) throw new Error(`Contour ${z.code} : code inattendu ${f.properties?.code}`);
    out.push({ code: z.code, geometry: f.geometry });
  }
  return out;
}

/** Contours simplifiés, dans l'ordre des zones (sans accès réseau). */
export function simplifierContours(
  bruts: ContourBrut[],
  zones: { code: ZoneCode; libelle: string }[],
  opts: { tolerance: number; decimals: number },
): FeatureCollection<{ code: ZoneCode; libelle: string }> {
  const features: Feature<{ code: ZoneCode; libelle: string }>[] = [];
  for (const z of zones) {
    const brut = bruts.find((b) => b.code === z.code);
    if (!brut) throw new Error(`Contour ${z.code} : absent des données chargées`);
    const geometry = simplifyGeometry(brut.geometry, opts.tolerance, opts.decimals);
    if (!geometry) throw new Error(`Contour ${z.code} : géométrie vide après simplification`);
    features.push({ type: 'Feature', properties: { code: z.code, libelle: z.libelle }, geometry });
  }
  return { type: 'FeatureCollection', features };
}
