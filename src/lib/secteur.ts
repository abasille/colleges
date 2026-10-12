import type { CarteScolaireDepartement, CollegeResume, PlageCarteScolaire, SecteurParisProps } from '../types';
import { distanceToGeometryM, pointInGeometry, type AreaGeometry } from './geo';
import { normalizeVoie } from './normalize';
import { departementDuCode, inseeAParis } from './territoires';

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
 * Comment le collège de secteur a été trouvé (ADR 0002) : `polygone` à Paris (secteurs de la Ville) ;
 * ailleurs, par la carte scolaire nationale : `adresse` (plage d'adresses de la voie), `commune_entiere`
 * (commune formant un seul secteur, ou reste de la commune hors des voies listées) et `deduit`
 * (commune absente de la carte, avec un seul collège public).
 */
export type MethodeSecteur = 'polygone' | 'adresse' | 'commune_entiere' | 'deduit';

export interface SecteurResult {
  /** Collèges de secteur (plusieurs pour un secteur partagé), vide si introuvable. */
  uais: string[];
  /** null quand aucun collège de secteur n'est trouvé. */
  methode: MethodeSecteur | null;
  /** Polygone du secteur (méthode `polygone` uniquement). */
  feature: SecteurFeature | null;
  /** Explication quand aucun collège n'est trouvé, ou mention qui accompagne le résultat (« déduit : … »). */
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
export type DonneesSecteur = { type: 'polygones'; features: SecteurFeature[] } | { type: 'carte'; carte: CarteScolaireDepartement };

/** Fichier à télécharger pour trouver le collège de secteur d'une adresse ; null hors Île-de-France. */
export function sourceSecteur(adresse: Pick<Adresse, 'citycode'>): SourceSecteur | null {
  const departement = departementDuCode(adresse.citycode);
  if (!departement) return null;
  if (inseeAParis(adresse.citycode)) return { fichier: 'secteurs-paris.geojson', type: 'polygones' };
  return { fichier: `carte-scolaire-${departement}.json`, type: 'carte' };
}

/** Lit le JSON d'un fichier de sectorisation. */
export function lireDonneesSecteur(source: SourceSecteur, json: unknown): DonneesSecteur {
  return source.type === 'polygones'
    ? { type: 'polygones', features: (json as { features: SecteurFeature[] }).features }
    : { type: 'carte', carte: json as CarteScolaireDepartement };
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

const uaisDe = (plages: PlageCarteScolaire[]) => [...new Set(plages.map(([, , , , uai]) => uai))].sort();

/** Plages de la voie qui contiennent le numéro (bornes et parité) ; sans numéro, toutes les plages de la voie. */
function plagesDuNumero(plages: PlageCarteScolaire[], voie: string, n: number | null): PlageCarteScolaire[] {
  return plages.filter(([v, debut, fin, parite]) => {
    if (v !== voie) return false;
    if (n === null) return true;
    if (parite === 'P' && n % 2 !== 0) return false;
    if (parite === 'I' && n % 2 === 0) return false;
    if (debut !== null && n < debut) return false;
    if (fin !== null && n > fin) return false;
    return true;
  });
}

const introuvable = (message: string): SecteurResult => ({ uais: [], methode: null, feature: null, message });
const trouve = (uais: string[], methode: MethodeSecteur, message: string | null = null): SecteurResult => ({ uais, methode, feature: null, message });

export const MESSAGE_HORS_IDF = 'Adresse hors Île-de-France : pas de collège de secteur.';
export const MENTION_DEDUIT = 'déduit : seul collège public de la commune';

/**
 * Collège de secteur déduit d'une commune absente de la carte scolaire nationale : son seul collège
 * public, null s'il n'en a aucun ou plusieurs. Même règle dans l'application et dans le rapport.
 */
export function collegeDeduit<C extends Pick<CollegeResume, 'uai' | 'commune' | 'statut'>>(commune: string, colleges: readonly C[]): C | null {
  const publics = colleges.filter((c) => c.statut === 'public' && c.commune === commune);
  return publics.length === 1 ? publics[0] : null;
}

/** Adresse hors Paris : lignes de la carte scolaire nationale de sa commune. */
function findSecteurCarte(adresse: Adresse, carte: CarteScolaireDepartement, colleges: readonly Pick<CollegeResume, 'uai' | 'commune' | 'statut'>[]): SecteurResult {
  const plages = carte.communes[adresse.citycode] ?? [];
  if (plages.length === 0) {
    const deduit = collegeDeduit(adresse.citycode, colleges);
    if (deduit) return trouve([deduit.uai], 'deduit', MENTION_DEDUIT);
    return introuvable('Secteur inconnu pour cette commune (absente de la carte scolaire nationale).');
  }
  // Lignes « secteur unique » (sans voie) : toute la commune, ou le reste de la commune hors des voies listées.
  const reste = plages.filter(([voie]) => voie === '');
  if (reste.length === plages.length) return trouve(uaisDe(reste), 'commune_entiere');
  if (!adresse.street) return introuvable('Précisez la rue : cette commune compte plusieurs secteurs.');
  const voie = normalizeVoie(adresse.street);
  const n = parseNumero(adresse.housenumber);
  const uais = uaisDe(plagesDuNumero(plages, voie, n));
  if (uais.length) return trouve(uais, 'adresse', n === null && uais.length > 1 ? 'Plusieurs secteurs sur cette voie : précisez le numéro.' : null);
  if (reste.length) return trouve(uaisDe(reste), 'commune_entiere', 'adresse absente des voies listées : collège du reste de la commune');
  if (plages.some(([v]) => v === voie)) return introuvable(`Numéro hors des plages de cette rue dans la carte scolaire.`);
  return introuvable('Rue introuvable dans la carte scolaire de cette commune.');
}

/**
 * Collège de secteur d'une adresse (ADR 0002), dans cet ordre : hors des huit départements, aucun ;
 * à Paris, le polygone ; ailleurs, la carte scolaire nationale de la commune (commune entière, puis voie
 * et numéro), sinon le seul collège public d'une commune absente de la carte (`deduit`).
 * `donnees` : contenu du fichier indiqué par `sourceSecteur`, null quand aucun ne couvre l'adresse
 * (hors Île-de-France). `colleges` : fichier léger (collèges publics d'une commune absente de la carte).
 */
export function findSecteur(
  adresse: Adresse,
  donnees: DonneesSecteur | null,
  colleges: readonly Pick<CollegeResume, 'uai' | 'commune' | 'statut'>[],
): SecteurResult {
  if (!donnees) return introuvable(MESSAGE_HORS_IDF);
  if (donnees.type === 'carte') return findSecteurCarte(adresse, donnees.carte, colleges);
  const f = findSecteurParis(adresse, donnees.features);
  if (!f) return introuvable('Secteur introuvable pour cette adresse.');
  if (!f.properties.uais.length) return introuvable(`Collège de secteur non identifié (${f.properties.noms.join(' ou ')}).`);
  return { uais: f.properties.uais, methode: 'polygone', feature: f, message: null };
}
