// Coordonnées des collèges que l'annuaire ne géolocalise pas (ouverture récente…), d'après leur adresse
// géocodée par la Géoplateforme (même service que le navigateur ; réponses mises en cache).
import { fetchJson } from '../lib/fetch';
import type { AnnuaireRow } from './annuaire';

export const GEOCODEUR = 'https://data.geopf.fr/geocodage/search';

export interface CoordonneesGeocodees {
  lat: number;
  lon: number;
  /** Adresse trouvée par le géocodeur (rapport). */
  label: string;
  score: number;
}

interface GeoResponse {
  features?: { geometry: { coordinates: [number, number] }; properties: { label?: string; score?: number } }[];
}

/** Géocode l'adresse de chaque établissement, filtrée par code postal ; absent du résultat si rien n'est trouvé. */
export async function geocoderEtablissements(etabs: AnnuaireRow[]): Promise<Map<string, CoordonneesGeocodees>> {
  const out = new Map<string, CoordonneesGeocodees>();
  for (const r of etabs) {
    if (!r.adresse_1) continue;
    const params = new URLSearchParams({ q: r.adresse_1, limit: '1' });
    if (r.code_postal) params.set('postcode', r.code_postal);
    const f = (await fetchJson<GeoResponse>(`${GEOCODEUR}?${params}`)).features?.[0];
    if (!f) continue;
    const [lon, lat] = f.geometry.coordinates;
    out.set(r.identifiant_de_l_etablissement, { lat, lon, label: f.properties.label ?? '', score: f.properties.score ?? 0 });
  }
  return out;
}
