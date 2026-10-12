// Contours des arrondissements et communes du périmètre (geo.api.gouv.fr).
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

export async function loadContoursBruts(communes: string[]): Promise<ContourBrut[]> {
  const out: ContourBrut[] = [];
  for (const code of communes) {
    const f = await fetchJson<{ geometry: SurfaceGeometry; properties: { code: string } }>(contourUrl(code));
    if (f.properties?.code !== code) throw new Error(`Contour ${code} : code inattendu ${f.properties?.code}`);
    out.push({ code, geometry: f.geometry });
  }
  return out;
}

/** Contours simplifiés, dans l'ordre des communes données (sans accès réseau). */
export function simplifierContours(
  bruts: ContourBrut[],
  communes: { code: string; libelle: string }[],
  opts: { tolerance: number; decimals: number },
): FeatureCollection<{ code: string; libelle: string }> {
  const features: Feature<{ code: string; libelle: string }>[] = [];
  for (const c of communes) {
    const brut = bruts.find((b) => b.code === c.code);
    if (!brut) throw new Error(`Contour ${c.code} : absent des données chargées`);
    const geometry = simplifyGeometry(brut.geometry, opts.tolerance, opts.decimals);
    if (!geometry) throw new Error(`Contour ${c.code} : géométrie vide après simplification`);
    features.push({ type: 'Feature', properties: { code: c.code, libelle: c.libelle }, geometry });
  }
  return { type: 'FeatureCollection', features };
}
