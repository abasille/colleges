// Fabriques de test du pipeline : petites lignes écrites à la main, valeurs neutres par défaut.
// Utilisées par les tests de assemblerDataset et des modules de calcul (aucun accès réseau ni disque).
import type { EntreeAssemblage, SourcesChargees } from './assembler';
import type { Config } from './lib/config';
import type { AnnuaireRow } from './sources/annuaire';
import type { IvacRow } from './sources/ivac';

/** Fiche de l'annuaire : collège public du 5e arrondissement, ouvert. */
export function etab(p: Partial<AnnuaireRow>): AnnuaireRow {
  return {
    identifiant_de_l_etablissement: '0750000A',
    nom_etablissement: 'x',
    type_etablissement: null,
    statut_public_prive: 'Public',
    type_contrat_prive: 'SANS OBJET',
    adresse_1: null,
    code_postal: '75005',
    code_commune: '75105',
    nom_commune: 'Paris',
    code_departement: '075',
    libelle_academie: 'Paris',
    latitude: 48.8,
    longitude: 2.3,
    precision_localisation: null,
    telephone: null,
    web: null,
    mail: null,
    fiche_onisep: null,
    restauration: 1,
    ulis: 0,
    segpa: '0',
    appartenance_education_prioritaire: null,
    siren_siret: null,
    etablissement_mere: null,
    code_nature: 340,
    libelle_nature: null,
    voie_generale: null,
    voie_technologique: null,
    voie_professionnelle: null,
    date_ouverture: null,
    etat: 'OUVERT',
    ...p,
  };
}

/** Ligne IVAC (une session d'un collège). */
export function ligneIvac(p: Partial<IvacRow>): IvacRow {
  return {
    session: 2025,
    uai: '0750000A',
    nom: null,
    academie: 'PARIS',
    secteur: 'PU',
    candidats: null,
    taux: null,
    vaTaux: null,
    noteEcrit: null,
    vaNote: null,
    accesSixiemeTroisieme: null,
    mentionsAB: null,
    mentionsB: null,
    mentionsTB: null,
    mentionsGlobal: null,
    ...p,
  };
}

/** Ligne brute de la carte scolaire nationale (fr-en-carte-scolaire-colleges-publics) : une plage d'Ivry, toute la voie. */
export function ligneCarte(p: Record<string, unknown>): Record<string, unknown> {
  return {
    code_insee: '94041',
    libelle_commune: 'IVRY-SUR-SEINE',
    type_et_libelle: 'RUE DE LA REPUBLIQUE',
    n_de_voie_debut: 1.0,
    n_de_voie_fin: 9999.0,
    parite: 'PI',
    code_rne: '0940001A',
    secteur_unique: 'N',
    ...p,
  };
}

/** Configuration : les huit départements d'Île-de-France, aucune exclusion. */
export function config(p: Partial<Config> = {}): Config {
  return {
    departements: ['75', '77', '78', '91', '92', '93', '94', '95'],
    codesNature: [340, 352],
    exclure: [],
    saisonCourante: '2026-27',
    ...p,
  };
}

/** Toutes les sources vides : chaque test ne remplit que ce qu'il observe. */
export function sourcesVides(): SourcesChargees {
  return {
    annuaire: { colleges: [], lycees: [], complements: [] },
    ivac: [],
    dnb: [],
    ips: [],
    effectifs: [],
    onisep: { structures: new Map(), structuresIgnorees: [], langues: new Map(), dispositifs: new Map(), dispositifsIgnores: [] },
    sections: { internationales: new Map(), sportives: new Map(), sportEtudes: new Map(), offreLangues: new Map() },
    eval6: { perimetre: [], national: [], derniereAnnee: null },
    moyens: { perimetre: [], national: [], derniereAnnee: null },
    personnel: [],
    hebergement: [],
    labels: new Map(),
    pix: [],
    cites: [],
    voiesLycees: new Map(),
    affelnet: [],
    geocodage: new Map(),
    secteursParis: [],
    carteScolaire: [],
  };
}

/**
 * Entrée complète de assemblerDataset. `colleges` remplit l'annuaire ; les autres sources
 * sont vides sauf si `sources` les fournit. Horloge figée au 12 octobre 2026.
 */
export function entree(
  p: { colleges?: AnnuaireRow[]; config?: Partial<Config>; corrections?: Partial<EntreeAssemblage['corrections']>; sources?: Partial<SourcesChargees> } = {},
): EntreeAssemblage {
  const sources = { ...sourcesVides(), ...p.sources };
  if (p.colleges) sources.annuaire = { ...sources.annuaire, colleges: p.colleges };
  const cfg = config(p.config);
  return {
    config: cfg,
    corrections: { colleges: {}, continuite: {}, evenements: null, suivis: [], ...p.corrections },
    sources,
    maintenant: new Date('2026-10-12T08:00:00Z'),
  };
}
