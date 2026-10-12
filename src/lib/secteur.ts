import type { CarteScolaireRow, SecteurParisProps } from '../types';
import { distanceToGeometryM, pointInGeometry, type AreaGeometry } from './geo';
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

/**
 * Comment le collège de secteur a été trouvé (ADR 0002) : `polygone` à Paris (secteurs de la Ville),
 * `adresse` par une plage d'adresses de la carte scolaire ; #14 ajoute `commune_entiere` (commune
 * formant un seul secteur) et `deduit` (commune absente de la carte, avec un seul collège public).
 */
export type MethodeSecteur = 'polygone' | 'adresse' | 'commune_entiere' | 'deduit';

export interface SecteurResult {
  /** Collèges de secteur (plusieurs pour un secteur partagé), vide si introuvable. */
  uais: string[];
  /** null quand aucun collège de secteur n'est trouvé. */
  methode: MethodeSecteur | null;
  /** Polygone du secteur (méthode `polygone` uniquement). */
  feature: SecteurFeature | null;
  /** Explication quand aucun collège n'est trouvé. */
  message: string | null;
}

/**
 * Fichier de sectorisation d'un département, téléchargé seulement après la saisie d'une adresse
 * dans ce département : polygones à Paris, carte scolaire (plages d'adresses) ailleurs.
 */
export interface SourceSecteur {
  /** Chemin dans public/data. */
  fichier: string;
  type: DonneesSecteur['type'];
}

/** Contenu d'un fichier de sectorisation, une fois téléchargé. */
export type DonneesSecteur = { type: 'polygones'; features: SecteurFeature[] } | { type: 'carte'; rows: CarteScolaireRow[] };

/** Communes couvertes par la carte scolaire publiée (provisoire : #14 publie une carte par département). */
const COMMUNES_CARTE_SCOLAIRE = ['94041', '94081'];

/** Fichier à télécharger pour trouver le collège de secteur d'une adresse ; null si aucun ne la couvre. */
export function sourceSecteur(adresse: Pick<Adresse, 'citycode'>): SourceSecteur | null {
  if (adresse.citycode.startsWith('751')) return { fichier: 'secteurs-paris.geojson', type: 'polygones' };
  if (COMMUNES_CARTE_SCOLAIRE.includes(adresse.citycode)) return { fichier: 'carte-scolaire-94.json', type: 'carte' };
  return null;
}

/** Lit le JSON d'un fichier de sectorisation. */
export function lireDonneesSecteur(source: SourceSecteur, json: unknown): DonneesSecteur {
  return source.type === 'polygones'
    ? { type: 'polygones', features: (json as { features: SecteurFeature[] }).features }
    : { type: 'carte', rows: json as CarteScolaireRow[] };
}

/** Au-delà, une adresse hors de tout îlot n'est pas rattachée au secteur le plus proche. */
export const SECTEUR_TOLERANCE_M = 60;

/**
 * Les secteurs parisiens sont des unions d'îlots : une adresse géocodée tombe souvent dans la rue,
 * juste à côté de tout polygone. On retient alors le secteur le plus proche, dans la limite de la tolérance.
 */
export function findSecteurParis(adresse: Pick<Adresse, 'lat' | 'lon'>, features: SecteurFeature[]): SecteurFeature | null {
  const inside = features.find((f) => pointInGeometry(adresse.lon, adresse.lat, f.geometry));
  if (inside) return inside;
  let best: SecteurFeature | null = null;
  let bestD = SECTEUR_TOLERANCE_M;
  for (const f of features) {
    const d = distanceToGeometryM(adresse.lon, adresse.lat, f.geometry);
    if (d < bestD) {
      bestD = d;
      best = f;
    }
  }
  return best;
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

const introuvable = (message: string): SecteurResult => ({ uais: [], methode: null, feature: null, message });

/**
 * Collège de secteur d'une adresse, à partir des données de sectorisation de son département
 * (`donnees` : contenu du fichier indiqué par `sourceSecteur`, null si aucun fichier ne couvre l'adresse).
 */
export function findSecteur(adresse: Adresse, donnees: DonneesSecteur | null): SecteurResult {
  if (!donnees) return introuvable('Sectorisation disponible seulement pour Paris, Ivry et Vitry.');
  if (donnees.type === 'polygones') {
    const f = findSecteurParis(adresse, donnees.features);
    if (!f) return introuvable('Secteur introuvable pour cette adresse.');
    if (!f.properties.uais.length) return introuvable(`Collège de secteur non identifié (${f.properties.noms.join(' ou ')}).`);
    return { uais: f.properties.uais, methode: 'polygone', feature: f, message: null };
  }
  const uais = findSecteur94(adresse, donnees.rows);
  return uais.length ? { uais, methode: 'adresse', feature: null, message: null } : introuvable('Rue introuvable dans la carte scolaire du Val-de-Marne.');
}
