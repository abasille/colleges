import type { CarteScolaireRow, SecteurParisProps } from '../types';
import { pointInGeometry, type AreaGeometry } from './geo';
import { normalizeVoie } from './normalize';

export interface SecteurFeature {
  type: 'Feature';
  geometry: AreaGeometry;
  properties: SecteurParisProps;
}

export interface Adresse {
  label: string;
  lat: number;
  lon: number;
  citycode: string;
  street: string | null;
  housenumber: string | null;
}

export interface SecteurResult {
  /** Collèges de secteur présents dans le périmètre. */
  uais: string[];
  /** Noms publiés (utile quand le collège de secteur est hors périmètre). */
  noms: string[];
  /** Polygone du secteur (Paris uniquement). */
  feature: SecteurFeature | null;
  message: string | null;
}

export function findSecteurParis(adresse: Pick<Adresse, 'lat' | 'lon'>, features: SecteurFeature[]): SecteurFeature | null {
  return features.find((f) => pointInGeometry(adresse.lon, adresse.lat, f.geometry)) ?? null;
}

export function parseNumero(housenumber: string | null): number | null {
  if (!housenumber) return null;
  const m = housenumber.match(/^\d+/);
  return m ? Number(m[0]) : null;
}

/** Collèges de secteur pour une adresse d'Ivry ou de Vitry (table de plages d'adresses). */
export function findSecteur94(adresse: Pick<Adresse, 'citycode' | 'street' | 'housenumber'>, rows: CarteScolaireRow[]): string[] {
  if (!adresse.street) return [];
  const voie = normalizeVoie(adresse.street);
  const n = parseNumero(adresse.housenumber);
  const uais = new Set<string>();
  for (const r of rows) {
    if (r.insee !== adresse.citycode || r.voie !== voie) continue;
    if (n !== null) {
      if (r.parite === 'P' && n % 2 !== 0) continue;
      if (r.parite === 'I' && n % 2 === 0) continue;
      if (r.debut !== null && n < r.debut) continue;
      if (r.fin !== null && n > r.fin) continue;
    }
    uais.add(r.uai);
  }
  return [...uais];
}

export function findSecteur(
  adresse: Adresse,
  parisFeatures: SecteurFeature[],
  rows94: CarteScolaireRow[],
): SecteurResult {
  if (adresse.citycode.startsWith('751')) {
    const f = findSecteurParis(adresse, parisFeatures);
    if (!f) return { uais: [], noms: [], feature: null, message: 'Secteur introuvable pour cette adresse.' };
    return { uais: f.properties.uais, noms: f.properties.noms, feature: f, message: null };
  }
  if (adresse.citycode === '94041' || adresse.citycode === '94081') {
    const uais = findSecteur94(adresse, rows94);
    return {
      uais,
      noms: [],
      feature: null,
      message: uais.length ? null : 'Rue introuvable dans la carte scolaire du Val-de-Marne.',
    };
  }
  return { uais: [], noms: [], feature: null, message: 'Sectorisation disponible seulement pour Paris, Ivry et Vitry.' };
}
