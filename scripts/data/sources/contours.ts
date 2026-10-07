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

export async function loadContours(
  zones: { code: ZoneCode; libelle: string }[],
  opts: { tolerance: number; decimals: number },
): Promise<FeatureCollection<{ code: ZoneCode; libelle: string }>> {
  const features: Feature<{ code: ZoneCode; libelle: string }>[] = [];
  for (const z of zones) {
    const f = await fetchJson<{ geometry: SurfaceGeometry; properties: { code: string } }>(contourUrl(z.code));
    if (f.properties?.code !== z.code) throw new Error(`Contour ${z.code} : code inattendu ${f.properties?.code}`);
    const geometry = simplifyGeometry(f.geometry, opts.tolerance, opts.decimals);
    if (!geometry) throw new Error(`Contour ${z.code} : géométrie vide après simplification`);
    features.push({ type: 'Feature', properties: { code: z.code, libelle: z.libelle }, geometry });
  }
  return { type: 'FeatureCollection', features };
}
