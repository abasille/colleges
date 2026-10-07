// Annuaire de l'éducation : identité, géolocalisation, contacts des collèges du périmètre
// et des lycées de Paris / Val-de-Marne (pour la détection des lycées rattachés).
import { odsExport, odsList } from '../lib/fetch';
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

export interface Annuaire {
  /** Collèges du périmètre (exclusions appliquées), triés par UAI. */
  colleges: AnnuaireRow[];
  /** Établissements de nature collège du périmètre écartés par la configuration. */
  exclus: AnnuaireRow[];
  /** Lycées (natures NATURES_LYCEE) de Paris et du Val-de-Marne. */
  lycees: AnnuaireRow[];
  byUai: Map<string, AnnuaireRow>;
}

export async function loadAnnuaire(cfg: Config): Promise<Annuaire> {
  const communes = cfg.zones.map((z) => z.code);
  const colleges = await odsExport<AnnuaireRow>(ANNUAIRE_ID, {
    select: FIELDS,
    where: `code_commune in ${odsList(communes)} and code_nature in ${odsList(cfg.codesNature)}`,
  });
  const lycees = await odsExport<AnnuaireRow>(ANNUAIRE_ID, {
    select: FIELDS,
    where: `code_departement in ("075","094") and code_nature in ${odsList(NATURES_LYCEE)}`,
  });
  const exclure = new Set(cfg.exclure);
  const byUai = new Map<string, AnnuaireRow>();
  for (const r of [...lycees, ...colleges]) byUai.set(r.identifiant_de_l_etablissement, r);
  const sort = (a: AnnuaireRow, b: AnnuaireRow) => a.identifiant_de_l_etablissement.localeCompare(b.identifiant_de_l_etablissement);
  return {
    colleges: colleges.filter((r) => !exclure.has(r.identifiant_de_l_etablissement)).sort(sort),
    exclus: colleges.filter((r) => exclure.has(r.identifiant_de_l_etablissement)).sort(sort),
    lycees: lycees.sort(sort),
    byUai,
  };
}

/** Fiches de l'annuaire pour des UAI précis (lycées hors Paris / Val-de-Marne cités dans les corrections). */
export async function loadAnnuaireUais(uais: string[]): Promise<AnnuaireRow[]> {
  if (uais.length === 0) return [];
  return odsExport<AnnuaireRow>(ANNUAIRE_ID, {
    select: FIELDS,
    where: `identifiant_de_l_etablissement in ${odsList([...uais].sort())}`,
  });
}

export function flag(v: number | string | null | undefined): boolean {
  return v === 1 || v === '1';
}
