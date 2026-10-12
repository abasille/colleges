// Annuaire de l'éducation : identité, géolocalisation, contacts des collèges du périmètre
// et des lycées des mêmes départements (pour la détection des lycées rattachés).
import { odsExport, odsExportParLots, odsList } from '../lib/fetch';
import { NATURES_LYCEE, type Config } from '../lib/config';

export const ANNUAIRE_ID = 'fr-en-annuaire-education';

export interface AnnuaireRow {
  identifiant_de_l_etablissement: string;
  nom_etablissement: string;
  type_etablissement: string | null;
  statut_public_prive: string | null;
  type_contrat_prive: string | null;
  adresse_1: string | null;
  code_postal: string | null;
  code_commune: string | null;
  nom_commune: string | null;
  code_departement: string | null;
  libelle_academie: string | null;
  latitude: number | null;
  longitude: number | null;
  precision_localisation: string | null;
  telephone: string | null;
  web: string | null;
  mail: string | null;
  fiche_onisep: string | null;
  restauration: number | string | null;
  ulis: number | string | null;
  segpa: number | string | null;
  appartenance_education_prioritaire: string | null;
  siren_siret: string | null;
  etablissement_mere: string | null;
  code_nature: number;
  libelle_nature: string | null;
  voie_generale: string | null;
  voie_technologique: string | null;
  voie_professionnelle: string | null;
  date_ouverture: string | null;
  etat: string | null;
}

const FIELDS = [
  'identifiant_de_l_etablissement',
  'nom_etablissement',
  'type_etablissement',
  'statut_public_prive',
  'type_contrat_prive',
  'adresse_1',
  'code_postal',
  'code_commune',
  'nom_commune',
  'code_departement',
  'libelle_academie',
  'latitude',
  'longitude',
  'precision_localisation',
  'telephone',
  'web',
  'mail',
  'fiche_onisep',
  'restauration',
  'ulis',
  'segpa',
  'appartenance_education_prioritaire',
  'siren_siret',
  'etablissement_mere',
  'code_nature',
  'libelle_nature',
  'voie_generale',
  'voie_technologique',
  'voie_professionnelle',
  'date_ouverture',
  'etat',
].join(',');

/** Lignes de l'annuaire telles que chargées, sans sélection. */
export interface AnnuaireBrut {
  /** Établissements des départements et codes nature de la configuration, tous états (sélection non appliquée). */
  colleges: AnnuaireRow[];
  /** Lycées (natures NATURES_LYCEE) des départements de la configuration. */
  lycees: AnnuaireRow[];
  /** Lycées cités par les corrections de continuité mais absents des deux listes précédentes. */
  complements: AnnuaireRow[];
}

export interface Annuaire {
  /** Collèges du périmètre (sélection, doublons fusionnés, exclusions appliquées), triés par UAI. */
  colleges: AnnuaireRow[];
  /** Établissements de nature collège du périmètre écartés par la configuration. */
  exclus: AnnuaireRow[];
  /** UAI présents sur plusieurs lignes : la ligne gardée (site principal) et les lignes écartées (annexes). */
  doublons: { garde: AnnuaireRow; ecartes: AnnuaireRow[] }[];
  /** Lycées (natures NATURES_LYCEE) des départements de la configuration, triés par UAI. */
  lycees: AnnuaireRow[];
  byUai: Map<string, AnnuaireRow>;
}

/** Code département tel que l'écrit l'annuaire (« 075 », « 092 »). */
export function departementAnnuaire(dep: string): string {
  return dep.padStart(3, '0');
}

export async function loadAnnuaire(cfg: Config, continuite: Record<string, { lyceeUai?: string | null }>): Promise<AnnuaireBrut> {
  const departements = odsList(cfg.departements.map(departementAnnuaire));
  const colleges = await odsExport<AnnuaireRow>(ANNUAIRE_ID, {
    select: FIELDS,
    where: `code_departement in ${departements} and code_nature in ${odsList(cfg.codesNature)}`,
  });
  const lycees = await odsExport<AnnuaireRow>(ANNUAIRE_ID, {
    select: FIELDS,
    where: `code_departement in ${departements} and code_nature in ${odsList(NATURES_LYCEE)}`,
  });
  const charges = new Set([...colleges, ...lycees].map((r) => r.identifiant_de_l_etablissement));
  const manquants = Object.values(continuite)
    .map((o) => o.lyceeUai)
    .filter((u): u is string => !!u && !charges.has(u));
  return { colleges, lycees, complements: await loadAnnuaireUais(manquants) };
}

/** Fiches de l'annuaire pour des UAI précis (lycées hors périmètre cités dans les corrections). */
export async function loadAnnuaireUais(uais: string[]): Promise<AnnuaireRow[]> {
  return odsExportParLots<AnnuaireRow>(ANNUAIRE_ID, 'identifiant_de_l_etablissement', uais, { select: FIELDS });
}

export function flag(v: number | string | null | undefined): boolean {
  return v === 1 || v === '1';
}
