import type { CollegeResume } from '../types';
import type { ColorBy } from './url';
import { scaleColor, STATUT_COLORS } from './colors';
import { countActive, domainOf, type Filters } from './filters';
import { INDICATEURS } from './indicateurs';

/** Emprise [[sud, ouest], [nord, est]], au format des bornes Leaflet. */
export type Emprise = [[number, number], [number, number]];

/** Emprise de la région Île-de-France : cadrage de la carte à l'ouverture. */
export const CADRAGE_ILE_DE_FRANCE: Emprise = [
  [48.12, 1.44],
  [49.24, 3.56],
];

/** Ce qui décide de l'apparence des points : coloration, filtres, sélection, favoris, secteur. */
export interface EtatCarte {
  colorBy: ColorBy;
  /** Collèges retenus par les filtres ; les autres sont atténués. */
  retenus: Set<string>;
  selectionne: string | null;
  favoris: readonly string[];
  /** UAI du ou des collèges de secteur de l'adresse. */
  secteur: readonly string[];
}

/** Un collège tel que la carte le dessine. */
export interface PointCarte {
  uai: string;
  couleur: string;
  attenue: boolean;
  selectionne: boolean;
  favori: boolean;
  secteur: boolean;
}

/**
 * Points de la carte, dans l'ordre de dessin : les collèges écartés par les filtres d'abord
 * (donc en dessous), puis les retenus, et le collège sélectionné en dernier.
 */
export function pointsDeLaCarte(colleges: CollegeResume[], etat: EtatCarte): PointCarte[] {
  const couleurDe = couleurs(colleges, etat.colorBy);
  const favoris = new Set(etat.favoris);
  const secteur = new Set(etat.secteur);
  const rang = (p: PointCarte) => (p.selectionne ? 2 : p.attenue ? 0 : 1);
  return colleges
    .map((c) => ({
      uai: c.uai,
      couleur: couleurDe(c),
      attenue: !etat.retenus.has(c.uai),
      selectionne: c.uai === etat.selectionne,
      favori: favoris.has(c.uai),
      secteur: secteur.has(c.uai),
    }))
    .sort((a, b) => rang(a) - rang(b));
}

/** Étendue de l'indicateur de coloration sur tous les collèges (null pour le statut ou sans aucune donnée). */
export function domaineDeCouleur(colleges: CollegeResume[], colorBy: ColorBy): [number, number] | null {
  return colorBy === 'statut' ? null : domainOf(colleges, colorBy, { distances: null });
}

function couleurs(colleges: CollegeResume[], colorBy: ColorBy): (c: CollegeResume) => string {
  if (colorBy === 'statut') return (c) => STATUT_COLORS[c.statut];
  const domaine = domaineDeCouleur(colleges, colorBy);
  const inverser = INDICATEURS[colorBy].plusHautMieux === false;
  return (c) => scaleColor(c.indicateurs[colorBy], domaine, inverser);
}

/** Plus petite emprise contenant les collèges (null s'il n'y en a aucun). */
export function emprise(colleges: readonly Pick<CollegeResume, 'lat' | 'lon'>[]): Emprise | null {
  if (colleges.length === 0) return null;
  let sud = Infinity;
  let ouest = Infinity;
  let nord = -Infinity;
  let est = -Infinity;
  for (const c of colleges) {
    if (c.lat < sud) sud = c.lat;
    if (c.lat > nord) nord = c.lat;
    if (c.lon < ouest) ouest = c.lon;
    if (c.lon > est) est = c.lon;
  }
  return [
    [sud, ouest],
    [nord, est],
  ];
}

/**
 * Cadrage à l'ouverture : l'Île-de-France sans filtre ; sinon (lien partagé qui porte une commune,
 * un département, une recherche…) les collèges retenus, s'il y en a.
 */
export function cadrageInitial(filtres: Filters, retenus: readonly Pick<CollegeResume, 'lat' | 'lon'>[]): Emprise {
  const filtre = countActive(filtres) > 0 || filtres.q.trim() !== '';
  return (filtre && emprise(retenus)) || CADRAGE_ILE_DE_FRANCE;
}

/**
 * Rayon d'un point, en pixels, selon le zoom : 8 px (16 px de diamètre) à l'échelle d'un quartier,
 * moins à l'échelle de la région pour que les points denses de Paris et de la petite couronne restent lisibles.
 */
export function rayonDuPoint(zoom: number): number {
  return Math.min(8, Math.max(3, zoom - 5));
}
