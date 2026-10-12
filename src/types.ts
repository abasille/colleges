// Contrat de données entre le script `npm run data` (scripts/data) et l'application.
// Fichiers produits dans public/data/ :
//   colleges.json            -> Dataset (fichier léger, JSON minifié, chargé au démarrage)
//   colleges-<dép>.json      -> DetailDepartement (un par département, chargé à l'ouverture
//                               de la première fiche du département ; ex. colleges-75.json)
//   events.json              -> EventsFile
//   contours.geojson         -> FeatureCollection, properties: { code: string, libelle: string } (communes présentes)
//   secteurs-paris.geojson   -> FeatureCollection, properties: SecteurParisProps
//   carte-scolaire-94.json   -> CarteScolaireRow[]

export type Academie = 'Paris' | 'Créteil' | 'Versailles';
export type Departement = '75' | '77' | '78' | '91' | '92' | '93' | '94' | '95';
/** Académie ou département auquel s'applique une date officielle, selon qui la publie (rectorat ou direction départementale). */
export type Territoire = Academie | Departement;
export type Statut = 'public' | 'prive_sous_contrat' | 'hors_contrat';
export type Niveau = '6e' | '5e' | '4e' | '3e';

/** Indicateurs numériques à plat, utilisés pour les filtres, les tris et la coloration de la carte. */
export type IndicateurKey =
  | 'note' // note maison /20
  | 'brevet' // taux de réussite au brevet, moyenne des 3 dernières sessions (%)
  | 'brevetDernier' // taux de réussite, dernière session (%)
  | 'noteEcrit' // note moyenne à l'écrit, moyenne 3 sessions (/20)
  | 'vaTaux' // valeur ajoutée du taux de réussite, moyenne 3 sessions (points)
  | 'vaNote' // valeur ajoutée de la note à l'écrit, moyenne 3 sessions (points)
  | 'mentionsTB' // part de mentions Très bien parmi les candidats, 3 sessions (%)
  | 'mentions' // part de candidats avec une mention, 3 sessions (%)
  | 'accesSixiemeTroisieme' // taux d'accès 6e -> 3e, dernière session (%)
  | 'ips' // IPS, dernière rentrée
  | 'effectif' // nombre d'élèves, dernière rentrée
  | 'elevesParClasse' // E/S, dernière rentrée
  | 'heuresParEleve' // H/E, dernière rentrée
  | 'eval6Francais' // score moyen évaluations 6e français, dernière année
  | 'eval6Maths'; // score moyen évaluations 6e maths, dernière année

export type Indicateurs = Record<IndicateurKey, number | null>;

export interface SerieAnnuelle {
  /** Session du brevet (ex. 2025) ou année de rentrée (ex. 2025 pour 2025-2026). */
  annee: number;
  valeur: number | null;
}

export interface BrevetSession {
  session: number;
  /** Taux de réussite (%). DNB jusqu'en 2021 (tous candidats), IVAC à partir de 2022 (série générale). */
  taux: number | null;
  candidats: number | null;
  source: 'dnb' | 'ivac';
  mentionsTB: number | null; // nombres de mentions
  mentionsB: number | null;
  mentionsAB: number | null;
  noteEcrit: number | null; // IVAC uniquement
  vaTaux: number | null; // IVAC uniquement
  vaNote: number | null; // IVAC uniquement
  accesSixiemeTroisieme: number | null; // IVAC uniquement
}

export interface Lycee {
  uai: string;
  nom: string;
  adresse: string | null;
  voies: string[]; // 'générale', 'technologique (STMG)', 'professionnelle'…
}

export type LienLycee = 'cite_scolaire' | 'meme_etablissement_prive' | 'groupe_scolaire_autre_site' | 'aucun';
export type Passage = 'garanti' | 'sous_reserve' | 'non_garanti' | 'inconnu';

export interface Continuite {
  lien: LienLycee;
  lycee: Lycee | null;
  /** Vrai seulement si le lycée lié accueille des élèves en 2nde générale et technologique. */
  secondeGtSurPlace: boolean;
  passage: Passage;
  /** Formulation affichée (citation de l'établissement ou texte générique). */
  passageTexte: string;
  sources: string[];
}

export interface ScoreMaison {
  note: number; // /20, 1 décimale
  lettre: 'A' | 'B' | 'C' | 'D' | 'E';
  rang: number; // rang parmi tous les collèges notés du périmètre
  sur: number;
  partielle: boolean; // une composante manque
  composantes: { brevet: number | null; noteEcrit: number | null; va: number | null }; // /20 chacune
}

export interface LibelleValeur {
  label: string;
  valeur: string;
}

/** Collège complet, tel qu'affiché dans la fiche : publié en deux parties, CollegeResume et CollegeDetail. */
export interface College {
  uai: string;
  nom: string; // ex. « Collège Claude Monet »
  statut: Statut;
  contrat: 'association' | 'simple' | null;
  /** Code INSEE de la commune ; à Paris, celui de l'arrondissement (« 75113 »). */
  commune: string;
  communeLibelle: string; // « Paris 13e », « Ivry-sur-Seine »
  departement: string; // « 75 », « 94 »
  academie: Academie; // lue dans l'annuaire
  adresse: string;
  codePostal: string;
  lat: number;
  lon: number;
  web: string | null;
  telephone: string | null;
  mail: string | null;
  ficheOnisep: string | null;
  rep: 'REP' | 'REP+' | null;
  /** Raison affichée si le collège a un recrutement particulier, sinon null. */
  recrutementParticulier: string | null;
  niveaux: Niveau[];
  accueilSixieme: boolean;
  remarques: string[];
  demiPension: boolean | null;

  indicateurs: Indicateurs;
  /** Raison de l'absence d'un indicateur (« hors contrat : non publié », « effectif trop faible »…). */
  manquants: Partial<Record<IndicateurKey, string>>;
  score: ScoreMaison | null;

  /** Sessions 2015 -> dernière, ordre croissant. */
  brevet: BrevetSession[];
  ips: {
    historique: SerieAnnuelle[];
    ecartType: number | null;
    references: { national: number | null; academique: number | null; departemental: number | null };
  } | null;
  effectifs: {
    annee: number;
    total: number | null;
    parNiveau: Record<Niveau, number | null>;
    segpa: number | null;
    ulis: number | null;
    historique: SerieAnnuelle[];
  } | null;
  evaluations6e: { annee: number; francais: number | null; maths: number | null } | null;
  encadrement: { annee: number; heuresParEleve: number | null; elevesParClasse: number | null } | null;

  langues: { lv1: string[]; lv2: string[]; anciennes: string[]; lce: string[] };
  options: {
    bilangue: string[]; // langues de la section bilangue, vide si aucune
    sectionsInternationales: string[]; // ex. « britannique », « chinoise »
    cha: string[]; // classes à horaires aménagés : « musique », « danse », « théâtre »…
    sectionsSportives: string[]; // sports
    sportEtudes: string[];
    dispositifs: string[]; // ULIS, SEGPA, UPE2A, dispositif relais, 3e prépa-métiers…
  };
  /** Étiquettes normalisées pour le filtre « propose… » (clés de Dataset.optionLabels). */
  optionTags: string[];

  continuite: Continuite;
  /** Lycées de secteur 1 Affelnet 2026 (collèges publics parisiens), null si non disponible. */
  affelnetSecteur1: { uai: string; nom: string }[] | null;

  personnel: LibelleValeur[]; // section « Autres »
  labels: string[];
  pix: LibelleValeur[];
}

/** Champs du collège publiés dans le fichier léger (liste, carte, filtres, tris, couleurs). */
export type ChampResume =
  | 'uai'
  | 'nom'
  | 'statut'
  | 'contrat'
  | 'commune'
  | 'communeLibelle'
  | 'departement'
  | 'academie'
  | 'lat'
  | 'lon'
  | 'rep'
  | 'recrutementParticulier'
  | 'niveaux'
  | 'accueilSixieme'
  | 'indicateurs'
  | 'manquants'
  | 'optionTags';

/** Collège dans le fichier léger : sans historiques ni détail de la fiche. */
export type CollegeResume = Pick<College, ChampResume> & {
  score: Omit<ScoreMaison, 'composantes'> | null;
  /** Catégorie de lycée sur place et de passage (filtres « lycée général », « passage garanti »). */
  continuite: Pick<Continuite, 'lien' | 'secondeGtSurPlace' | 'passage'>;
};

/** Collège dans le fichier de son département : le reste de la fiche. */
export type CollegeDetail = { uai: string } & Omit<College, ChampResume | 'score'> & {
    /** Composantes de la note maison, null si le collège n'est pas noté. */
    composantes: ScoreMaison['composantes'] | null;
  };

/** colleges-<dép>.json : détail des collèges d'un département, triés par UAI. */
export interface DetailDepartement {
  departement: string;
  colleges: CollegeDetail[];
}

export interface Source {
  id: string;
  label: string;
  url: string;
  licence: string;
  millesime: string;
}

export interface CommunePresente {
  code: string;
  libelle: string;
  departement: string;
}

export interface Dataset {
  generatedAt: string; // ISO
  sessions: { brevet: number[]; ips: number; effectifs: number };
  /** Communes où se trouve au moins un collège publié, triées par code. */
  communes: CommunePresente[];
  /** Moyennes de référence pour les comparaisons de la fiche. */
  references: {
    france: Partial<Record<IndicateurKey, number>>;
    academies: Record<Academie, Partial<Record<IndicateurKey, number>>>;
  };
  optionLabels: Record<string, { label: string; groupe: string }>;
  sources: Source[];
  colleges: CollegeResume[];
}

// --- Événements (portes ouvertes, inscriptions, dates officielles) ---

export type EventType =
  | 'portes_ouvertes'
  | 'reunion_information'
  | 'immersion'
  | 'inscription'
  | 'date_limite'
  | 'officiel';

export interface CollegeEvent {
  id: string;
  /** UAI du collège ; null pour une date officielle. */
  uai: string | null;
  territoire: Territoire | null; // renseigné pour type 'officiel', null sinon
  type: EventType;
  date: string; // YYYY-MM-DD
  dateFin: string | null; // période (ex. inscriptions du 3 au 28 novembre)
  heureDebut: string | null; // HH:MM
  heureFin: string | null;
  titre: string;
  inscriptionRequise: boolean | null;
  saison: string; // « 2026-27 » = entrée en 6e en septembre 2027
  source: string; // URL
  verifieLe: string; // YYYY-MM-DD
  confiance: 'haute' | 'moyenne' | 'basse';
}

export type StatutInscriptions = 'ouvertes' | 'closes' | 'a_venir' | 'inconnu';

export interface EventsFile {
  saisonCourante: string; // « 2026-27 »
  events: CollegeEvent[];
  /** Statut constaté des inscriptions dans le privé, par UAI. */
  inscriptions: Record<string, { statut: StatutInscriptions; constateLe: string; detail: string; source: string }>;
}

// --- Sectorisation ---

export interface SecteurParisProps {
  libelle: string;
  /** UAI des collèges du secteur présents dans le périmètre (peut être vide). */
  uais: string[];
  /** Noms des collèges du secteur tels que publiés (y compris hors périmètre). */
  noms: string[];
}

export interface CarteScolaireRow {
  insee: string; // commune de l'adresse
  voie: string; // libellé normalisé (majuscules, sans accents, abréviations développées)
  debut: number | null;
  fin: number | null;
  parite: 'P' | 'I' | 'PI';
  uai: string;
}
