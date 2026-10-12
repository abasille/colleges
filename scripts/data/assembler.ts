// Assemblage du jeu de données publié : à partir des lignes déjà chargées de chaque source,
// des corrections manuelles et de la configuration, calcule tout ce qui sera écrit
// (public/data/* et les données de data/report.md). Aucun accès au réseau, au disque ni à l'horloge.
import type {
  Academie,
  BrevetSession,
  CarteScolaireDepartement,
  College,
  CollegeDetail,
  CollegeResume,
  CommunePresente,
  ContourCommuneProps,
  Dataset,
  Departement,
  DetailDepartement,
  EventsFile,
  IndicateurKey,
  Indicateurs,
  LibelleValeur,
  Niveau,
  ScoreMaison,
  SecteurParisProps,
  Source,
  Statut,
} from '../../src/types';
import { stripAccents } from '../../src/lib/normalize';
import { ACADEMIES, collegeAParis, estDepartement, inseeAParis } from '../../src/lib/territoires';
import { ANNEE_AFFELNET, ANNEE_CONTOURS, ANNEE_SECTEURS_PARIS, type Config } from './lib/config';
import { formatNombre, groupBy, niceCase, ratioOfSums, round, sortedObject, weightedMean } from './lib/util';
import type { Feature, FeatureCollection } from './lib/geo';
import { flag, type Annuaire, type AnnuaireBrut, type AnnuaireRow } from './sources/annuaire';
import type { IvacRow } from './sources/ivac';
import type { DnbRow } from './sources/dnb';
import type { IpsRow } from './sources/ips';
import type { EffectifsRow } from './sources/effectifs';
import type { Onisep } from './sources/onisep';
import type { Sections } from './sources/sections';
import type { Eval6, HebergementRow, Moyens, PixRow } from './sources/misc';
import {
  choisirLien,
  construireContinuite,
  detecterCandidats,
  indexerLycees,
  type CiteRow,
  type ContinuiteOverride,
  type VoiesLycee,
} from './sources/continuite';
import { compacterCarteScolaire, relierSecteursParis, type SecteurParisBrut } from './sources/secteurs';
import type { AffelnetRow } from './sources/affelnet';
import type { CoordonneesGeocodees } from './sources/geocodage';
import type { ContourCommuneBrut } from './sources/contours';
import { agregerIvac, INDICATEURS, raisonsManquantes, referencesIvac } from './indicateurs';
import { classer, composantes, distribution, noteMaison, type Distributions } from './score';
import { construireOptions, GROUPES, optionTags, type OptionLabel } from './options';
import { validerEvenements, type EvenementsBruts } from './events';
import type { ReportData } from './report';
import { detecterAnomalies } from './anomalies';

// ---------------------------------------------------------------- interface

/** Correction manuelle d'un collège (data/overrides/colleges.json) : l'emporte sur la valeur calculée. */
export interface CollegeOverride {
  nom?: string;
  recrutementParticulier?: string | null;
  niveaux?: Niveau[];
  remarques?: string[];
  web?: string | null;
  demiPension?: boolean | null;
  aVerifier?: string;
}

/** Corrections manuelles (data/overrides/), lues telles quelles. */
export interface Corrections {
  /** Par UAI (data/overrides/colleges.json, clé `colleges`). */
  colleges: Record<string, CollegeOverride>;
  /** Par UAI (data/overrides/continuite.json, clé `colleges`). */
  continuite: Record<string, ContinuiteOverride>;
  /** data/overrides/events.json non validé ; null si le fichier n'existe pas. */
  evenements: EvenementsBruts | null;
  /** UAI des collèges suivis (data/overrides/suivis.json, clés de `colleges`) ; un UAI hors périmètre est ignoré (anomalie du rapport). */
  suivis: string[];
}

/** Lignes déjà chargées de chaque source (réseau ou cache), telles que les rendent les chargeurs. */
export interface SourcesChargees {
  annuaire: AnnuaireBrut;
  /** France entière (centiles nationaux et références). */
  ivac: IvacRow[];
  dnb: DnbRow[];
  ips: IpsRow[];
  effectifs: EffectifsRow[];
  onisep: Onisep;
  sections: Sections;
  eval6: Eval6;
  moyens: Moyens;
  personnel: Record<string, unknown>[];
  hebergement: HebergementRow[];
  labels: Map<string, string[]>;
  pix: PixRow[];
  cites: CiteRow[];
  /** Voies des lycées liés (voir `lyceesLies`). */
  voiesLycees: Map<string, VoiesLycee>;
  affelnet: AffelnetRow[];
  /** Adresses géocodées des collèges sans coordonnées dans l'annuaire (voir `etablissementsAGeocoder`), par UAI. */
  geocodage: Map<string, CoordonneesGeocodees>;
  secteursParis: SecteurParisBrut[];
  /** Lignes brutes de fr-en-carte-scolaire-colleges-publics (communes des départements de la configuration). */
  carteScolaire: Record<string, unknown>[];
  /** Contours Etalab des communes des départements du périmètre (Paris en entier et ses arrondissements). */
  contours: ContourCommuneBrut[];
}

export interface EntreeAssemblage {
  config: Config;
  corrections: Corrections;
  sources: SourcesChargees;
  /** Horloge injectée : `generatedAt` et les millésimes « extraction du … ». */
  maintenant: Date;
}

/** Contenu des fichiers publiés (public/data/), avant sérialisation. */
export interface Publication {
  /** colleges.json : fichier léger, chargé au démarrage. */
  dataset: Dataset;
  /** colleges-<dép>.json : un par département, triés par code. */
  details: DetailDepartement[];
  /** events.json */
  evenements: EventsFile;
  /** secteurs-paris.geojson */
  secteursParis: FeatureCollection<SecteurParisProps>;
  /** carte-scolaire-<dép>.json : un par département hors Paris (à Paris, la carte ne sert qu'au contrôle croisé). */
  cartesScolaires: CarteScolaireDepartement[];
  /** contours-<dép>.geojson : communes présentes, par département ayant au moins un contour, triés par code. */
  contours: ContoursDepartement[];
}

export interface ContoursDepartement {
  departement: Departement;
  contours: FeatureCollection<ContourCommuneProps>;
}

/** Fichier prêt à écrire : chemin relatif à public/data/, contenu sérialisé. */
export interface FichierPublie {
  chemin: string;
  contenu: string;
}

/** Données du rapport connues sans réseau ; le point d'entrée ajoute le reste avant `renderReport`. */
export type RapportAssemble = Omit<ReportData, 'offline' | 'fetchWarnings' | 'verifVoies' | 'verifSecteurs' | 'tailles' | 'dureeSecondes'>;

export interface Assemblage {
  publication: Publication;
  /** La publication sérialisée, dans l'ordre d'écriture. */
  fichiers: FichierPublie[];
  /** Entrées des contrôles par géocodage (réseau), faits par le point d'entrée après l'assemblage. */
  controles: {
    voiesCarteScolaire: { insee: string; commune: string; libelle: string; uai: string }[];
    secteursParis: FeatureCollection<SecteurParisProps>;
  };
  rapport: RapportAssemble;
}

// ---------------------------------------------------------------- constantes et utilitaires

/** Tolérance Douglas–Peucker des secteurs parisiens (degrés, ≈ 5,5 m) : fichier < 1 Mo. */
const TOLERANCE_SECTEURS = 0.00005;
const NIVEAUX: Niveau[] = ['6e', '5e', '4e', '3e'];
/** Libellé générique du recrutement particulier détecté (une correction manuelle peut donner le libellé précis). */
const RECRUTEMENT_SANS_SECTEUR = 'sans secteur : recrutement sur dossier';

/** Académie d'après son libellé, quelle que soit la casse (« PARIS », « Créteil », « VERSAILLES »). */
function academieDe(s: string | null | undefined): Academie | null {
  const a = stripAccents(s ?? '').trim().toUpperCase();
  if (a === 'PARIS') return 'Paris';
  if (a === 'CRETEIL') return 'Créteil';
  if (a === 'VERSAILLES') return 'Versailles';
  return null;
}

/** Département d'un établissement de l'annuaire, sur deux caractères (« 075 » -> « 75 »). */
function departementDe(r: AnnuaireRow): string {
  const dep = r.code_departement ?? (r.code_commune ?? '').slice(0, 2);
  return dep.length === 3 && dep.startsWith('0') ? dep.slice(1) : dep;
}

/** Commune d'un établissement de l'annuaire ; à Paris, l'arrondissement (« Paris 13e », « Paris 1er »). */
function communeDe(r: AnnuaireRow): CommunePresente {
  const code = r.code_commune ?? '';
  const n = Number(code.slice(3));
  const libelle = inseeAParis(code) && n >= 1 && n <= 20 ? `Paris ${n === 1 ? '1er' : `${n}e`}` : (r.nom_commune ?? code);
  const departement = departementDe(r);
  if (!estDepartement(departement)) throw new Error(`${r.identifiant_de_l_etablissement} : département ${departement} hors Île-de-France`);
  return { code, libelle, departement };
}

function statutDe(r: AnnuaireRow): { statut: Statut; contrat: College['contrat'] } {
  if (r.statut_public_prive === 'Public') return { statut: 'public', contrat: null };
  const t = (r.type_contrat_prive ?? '').toUpperCase();
  if (t.includes('HORS CONTRAT')) return { statut: 'hors_contrat', contrat: null };
  if (t.includes('SIMPLE')) return { statut: 'prive_sous_contrat', contrat: 'simple' };
  return { statut: 'prive_sous_contrat', contrat: 'association' };
}

const pct = (v: number | null | undefined) => (v === null || v === undefined ? null : `${formatNombre(v, 0)} %`);

function personnelDe(r: Record<string, unknown> | undefined): LibelleValeur[] {
  if (!r) return [];
  const n = (k: string) => (typeof r[k] === 'number' ? (r[k] as number) : null);
  const out: [string, string | null][] = [
    ['Rentrée', r.annee_de_la_rentree_scolaire ? String(r.annee_de_la_rentree_scolaire) : null],
    ['Enseignants (équivalents temps plein)', n('etp_enseignants_hommes_et_femmes') === null ? null : formatNombre(n('etp_enseignants_hommes_et_femmes')!, 1)],
    ['Personnels de vie scolaire (ETP)', n('etp_de_personnels_de_vie_scolaire') === null ? null : formatNombre(n('etp_de_personnels_de_vie_scolaire')!, 1)],
    ['Enseignants agrégés', pct(n('proportion_agreges'))],
    ['Enseignants certifiés', pct(n('proportion_certifies'))],
    ['Enseignants non titulaires', pct(n('proportion_non_titulaires'))],
    ['Enseignants de moins de 35 ans', pct(n('proportion_moins_de_35_ans'))],
    ['Enseignants de 50 ans ou plus', pct(n('proportion_plus_de_50_ans'))],
    ["Dans l'établissement depuis moins de 2 ans", pct(n('anciennete_moins_de_2_ans'))],
    ["Dans l'établissement depuis 8 ans ou plus", pct(n('anciennete_8_ans'))],
  ];
  return out.filter((x): x is [string, string] => x[1] !== null).map(([label, valeur]) => ({ label, valeur }));
}

function niveauPix(n: string): string {
  const m = /^(\d)/.exec(n);
  return m ? `${m[1]}e` : n;
}

function pixDe(rows: PixRow[]): LibelleValeur[] {
  if (rows.length === 0) return [];
  const derniere = Math.max(...rows.map((r) => r.annee));
  const rs = rows.filter((r) => r.annee === derniere);
  const out: LibelleValeur[] = [{ label: 'Campagne de rentrée', valeur: String(derniere) }];
  const participants = rs.find((r) => r.participants !== null)?.participants;
  if (participants) out.push({ label: 'Élèves ayant participé', valeur: formatNombre(participants) });
  const parNiveau = groupBy(rs, (r) => r.niveau);
  for (const [niveau, list] of [...parNiveau.entries()].sort(([a], [b]) => b.localeCompare(a))) {
    const envois = list.find((r) => r.envoisNiveau !== null)?.envoisNiveau;
    const p3 = list.find((r) => r.palier === 3)?.auPalier ?? 0;
    if (!envois) continue;
    out.push({
      label: `${niveauPix(niveau)} : palier 3 (le plus élevé) atteint`,
      valeur: `${formatNombre((p3 / envois) * 100, 0)} % (${p3} sur ${envois})`,
    });
  }
  return out;
}

/** GeoJSON / tableau : une entité par ligne (diffs lisibles). */
function jsonParLigne(items: unknown[], wrap?: (body: string) => string): string {
  const body = `[\n${items.map((x) => JSON.stringify(x)).join(',\n')}\n]`;
  return (wrap ? wrap(body) : body) + '\n';
}

const featureCollection = (b: string) => `{"type":"FeatureCollection","features":${b}}`;

/** Carte scolaire compacte : une commune par ligne (diffs lisibles). */
function carteParLigne(c: CarteScolaireDepartement): string {
  const communes = Object.entries(c.communes).map(([insee, plages]) => `${JSON.stringify(insee)}:${JSON.stringify(plages)}`);
  return `{"departement":${JSON.stringify(c.departement)},"communes":{${communes.length ? `\n${communes.join(',\n')}\n` : ''}}}\n`;
}

/** Sépare un collège entre le fichier léger et le fichier de détail de son département. */
function decouper(c: College): { resume: CollegeResume; detail: CollegeDetail } {
  const {
    uai,
    nom,
    statut,
    contrat,
    commune,
    communeLibelle,
    departement,
    academie,
    lat,
    lon,
    rep,
    recrutementParticulier,
    niveaux,
    accueilSixieme,
    suivi,
    indicateurs,
    optionTags,
    score,
    ...reste
  } = c;
  const resume: CollegeResume = {
    uai,
    nom,
    statut,
    contrat,
    commune,
    communeLibelle,
    departement,
    academie,
    lat,
    lon,
    rep,
    recrutementParticulier,
    niveaux,
    accueilSixieme,
    suivi,
    indicateurs,
    score: score && { note: score.note, lettre: score.lettre, rang: score.rang, sur: score.sur, partielle: score.partielle },
    continuite: { secondeGtSurPlace: c.continuite.secondeGtSurPlace, passage: c.continuite.passage },
    optionTags,
  };
  return { resume, detail: { uai, ...reste, composantes: score?.composantes ?? null } };
}

// ---------------------------------------------------------------- sélection et plan de chargement

/** Ligne du site principal parmi les lignes d'un même UAI : l'annexe passe après (puis ordre stable par nom et adresse). */
function sitePrincipal(lignes: AnnuaireRow[]): AnnuaireRow {
  const annexe = (r: AnnuaireRow) => Number(/^\s*annexe\b/i.test(r.nom_etablissement));
  return lignes
    .slice()
    .sort(
      (a, b) =>
        annexe(a) - annexe(b) ||
        a.nom_etablissement.localeCompare(b.nom_etablissement) ||
        (a.adresse_1 ?? '').localeCompare(b.adresse_1 ?? ''),
    )[0];
}

/**
 * Sélection du périmètre dans l'annuaire : département de la configuration, code nature retenu,
 * établissement ouvert ; doublons d'UAI fusionnés (site principal) ; exclusions manuelles ; tri par UAI ;
 * index de tous les établissements.
 */
function selectionnerAnnuaire(config: Config, brut: AnnuaireBrut): Annuaire {
  const departements = new Set<string>(config.departements);
  const natures = new Set(config.codesNature);
  const exclure = new Set(config.exclure);
  const parUai = groupBy(
    brut.colleges.filter((r) => departements.has(departementDe(r)) && natures.has(r.code_nature) && r.etat === 'OUVERT'),
    (r) => r.identifiant_de_l_etablissement,
  );
  const retenus: AnnuaireRow[] = [];
  const doublons: Annuaire['doublons'] = [];
  for (const lignes of parUai.values()) {
    const garde = sitePrincipal(lignes);
    retenus.push(garde);
    if (lignes.length > 1) doublons.push({ garde, ecartes: lignes.filter((r) => r !== garde) });
  }
  const byUai = new Map<string, AnnuaireRow>();
  for (const r of [...brut.lycees, ...retenus, ...brut.complements]) byUai.set(r.identifiant_de_l_etablissement, r);
  const sort = (a: AnnuaireRow, b: AnnuaireRow) => a.identifiant_de_l_etablissement.localeCompare(b.identifiant_de_l_etablissement);
  return {
    colleges: retenus.filter((r) => !exclure.has(r.identifiant_de_l_etablissement)).sort(sort),
    exclus: retenus.filter((r) => exclure.has(r.identifiant_de_l_etablissement)).sort(sort),
    doublons: doublons.sort((a, b) => sort(a.garde, b.garde)),
    lycees: brut.lycees.slice().sort(sort),
    byUai,
  };
}

/** UAI des collèges du périmètre, triés : liste à charger pour les sources interrogées par UAI. */
export function uaisDuPerimetre(config: Config, annuaire: AnnuaireBrut): string[] {
  return selectionnerAnnuaire(config, annuaire).colleges.map((r) => r.identifiant_de_l_etablissement);
}

/** Collèges du périmètre sans coordonnées dans l'annuaire : adresses à géocoder. */
export function etablissementsAGeocoder(config: Config, annuaire: AnnuaireBrut): AnnuaireRow[] {
  return selectionnerAnnuaire(config, annuaire).colleges.filter((r) => r.latitude === null || r.longitude === null);
}

function detecterLiens(ann: Annuaire, cites: CiteRow[]) {
  const index = indexerLycees(ann.lycees, cites);
  return new Map(
    ann.colleges.map((c) => {
      const cands = detecterCandidats(c, index);
      return [c.identifiant_de_l_etablissement, { candidats: cands, choix: choisirLien(c, cands) }] as const;
    }),
  );
}

/** UAI des lycées liés aux collèges (détection, sauf correction manuelle), triés : voies à charger. */
export function lyceesLies(config: Config, corrections: Pick<Corrections, 'continuite'>, annuaire: AnnuaireBrut, cites: CiteRow[]): string[] {
  const lies = new Set<string>();
  for (const [uai, d] of detecterLiens(selectionnerAnnuaire(config, annuaire), cites)) {
    const o = corrections.continuite[uai];
    const l = o?.lyceeUai !== undefined ? o.lyceeUai : d.choix.lyceeUai;
    if (l) lies.add(l);
  }
  return [...lies].sort();
}

// ---------------------------------------------------------------- assemblage

/**
 * Calcule tout ce qui sera écrit à partir des sources chargées.
 * Lève une erreur si l'académie d'un collège est inconnue ou s'il n'a pas de coordonnées.
 */
export function assemblerDataset({ config: cfg, corrections, sources: src, maintenant }: EntreeAssemblage): Assemblage {
  const collegeOverrides = corrections.colleges;
  const contOverrides = corrections.continuite;
  const suivis = new Set(corrections.suivis);
  const ann = selectionnerAnnuaire(cfg, src.annuaire);
  const perimetre = new Set(ann.colleges.map((r) => r.identifiant_de_l_etablissement));

  const ivacAll = src.ivac;
  const sessionsIvac = [...new Set(ivacAll.map((r) => r.session))].sort((a, b) => a - b);
  const derniereSession = sessionsIvac[sessionsIvac.length - 1];
  const sessionsRef = sessionsIvac.slice(-3);
  const ivacByUai = groupBy(ivacAll, (r) => r.uai);

  const dnb = groupBy(src.dnb, (r) => r.uai);
  const ipsRows = src.ips;
  const ips = groupBy(ipsRows, (r) => r.uai);
  const derniereIps = Math.max(...ipsRows.map((r) => r.annee));
  const effRows = src.effectifs;
  const eff = groupBy(effRows, (r) => r.uai);
  const derniersEffectifs = Math.max(...effRows.map((r) => r.annee));

  const { onisep, sections, eval6, moyens, labels, affelnet } = src;
  const eval6ByUai = groupBy(eval6.perimetre, (r) => r.uai);
  const moyensByUai = groupBy(moyens.perimetre, (r) => r.uai);
  const personnelRows = src.personnel;
  const personnelByUai = groupBy(personnelRows, (r) => String(r.identifiant_de_l_etablissement));
  const heberg = groupBy(src.hebergement, (r) => r.uai);
  const pix = groupBy(src.pix, (r) => r.uai);

  const detections = detecterLiens(ann, src.cites);
  const voies = src.voiesLycees;

  const collegesParisPublics = ann.colleges.filter((c) => inseeAParis(c.code_commune ?? '') && c.statut_public_prive === 'Public');
  const secteursParis = relierSecteursParis(
    src.secteursParis,
    collegesParisPublics.map((c) => ({ uai: c.identifiant_de_l_etablissement, nom: c.nom_etablissement, adresse: c.adresse_1 })),
    { tolerance: TOLERANCE_SECTEURS, decimals: 5, minHoleArea: 100, minPolygonArea: 10 },
  );
  const carte = compacterCarteScolaire(src.carteScolaire, cfg.departements);
  // UAI et communes présents dans la carte nationale (Paris compris) : #15 y lit la règle du recrutement
  // particulier (collège public absent de la carte alors que sa commune y figure).
  const presenceCarte = { uais: carte.uais, communes: carte.communes };
  // Contrôle croisé à Paris (ADR 0002) : UAI des polygones de la Ville absents de la carte, et inversement.
  const uaisPolygones = new Set(secteursParis.geojson.features.flatMap((f) => f.properties.uais));
  const uaisCarteParis = new Set(carte.rows.filter((r) => inseeAParis(r.insee)).map((r) => r.uai));
  const ecartsParis = {
    polygonesSeuls: [...uaisPolygones].filter((u) => !uaisCarteParis.has(u)).sort(),
    carteSeule: [...uaisCarteParis].filter((u) => !uaisPolygones.has(u)).sort(),
  };

  const events = validerEvenements(corrections.evenements, perimetre, cfg.saisonCourante);

  // ---------------------------------------------------------------- calculs nationaux
  const aggNational = [...ivacByUai.entries()].map(([uai, rows]) => ({ uai, agg: agregerIvac(rows, sessionsRef) }));
  const dists: Distributions = {
    brevet: distribution(aggNational.map((x) => x.agg.brevet)),
    noteEcrit: distribution(aggNational.map((x) => x.agg.noteEcrit)),
    vaTaux: distribution(aggNational.map((x) => x.agg.vaTaux)),
    vaNote: distribution(aggNational.map((x) => x.agg.vaNote)),
  };

  // ---------------------------------------------------------------- assemblage par collège
  const optionLabels = new Map<string, OptionLabel>();
  const scores = new Map<string, Omit<ScoreMaison, 'rang' | 'sur'>>();
  const colleges: College[] = [];
  const rapportColleges: ReportData['colleges'] = [];

  for (const r of ann.colleges) {
    const uai = r.identifiant_de_l_etablissement;
    const commune = communeDe(r);
    const academie = academieDe(r.libelle_academie);
    if (!academie) throw new Error(`${uai} : académie inconnue (${r.libelle_academie})`);
    const { statut, contrat } = statutDe(r);
    const ov = collegeOverrides[uai] ?? {};

    // Résultats
    const ivacRows = (ivacByUai.get(uai) ?? []).slice().sort((a, b) => a.session - b.session);
    const ivacRef = ivacRows.filter((x) => sessionsRef.includes(x.session));
    const agg = agregerIvac(ivacRows, sessionsRef);
    const last: IvacRow | undefined = ivacRows.find((x) => x.session === derniereSession);
    const dnbRows = (dnb.get(uai) ?? []).slice().sort((a, b) => a.session - b.session);
    const brevetMap = new Map<number, BrevetSession>();
    for (const d of dnbRows) {
      brevetMap.set(d.session, {
        session: d.session,
        taux: round(d.taux, 1),
        candidats: d.presents,
        source: 'dnb',
        mentionsTB: d.mentionsTB,
        mentionsB: d.mentionsB,
        mentionsAB: d.mentionsAB,
        noteEcrit: null,
        vaTaux: null,
        vaNote: null,
        accesSixiemeTroisieme: null,
      });
    }
    for (const x of ivacRows) {
      brevetMap.set(x.session, {
        session: x.session,
        taux: x.taux,
        candidats: x.candidats,
        source: 'ivac',
        mentionsTB: x.mentionsTB,
        mentionsB: x.mentionsB,
        mentionsAB: x.mentionsAB,
        noteEcrit: x.noteEcrit,
        vaTaux: x.vaTaux,
        vaNote: x.vaNote,
        accesSixiemeTroisieme: x.accesSixiemeTroisieme,
      });
    }
    const brevet = [...brevetMap.values()].sort((a, b) => a.session - b.session);

    // IPS
    const ipsList = (ips.get(uai) ?? []).slice().sort((a, b) => a.annee - b.annee);
    const ipsLast = ipsList[ipsList.length - 1];
    const ipsCourant = ipsList.find((x) => x.annee === derniereIps);

    // Effectifs
    const effList = (eff.get(uai) ?? []).slice().sort((a, b) => a.annee - b.annee);
    const effLast = effList[effList.length - 1];

    // Évaluations 6e
    const e6 = eval6ByUai.get(uai) ?? [];
    const e6Annee = e6.length ? Math.max(...e6.map((x) => x.annee)) : null;
    const e6Last = e6.filter((x) => x.annee === e6Annee);
    const evaluations6e =
      e6Annee === null
        ? null
        : {
            annee: e6Annee,
            francais: e6Last.find((x) => x.discipline === 'francais')?.score ?? null,
            maths: e6Last.find((x) => x.discipline === 'maths')?.score ?? null,
          };

    // Encadrement
    const mo = (moyensByUai.get(uai) ?? []).slice().sort((a, b) => a.annee - b.annee);
    const moLast = mo[mo.length - 1];
    const encadrement = moLast
      ? { annee: moLast.annee, heuresParEleve: round(moLast.heuresParEleve, 2), elevesParClasse: round(moLast.elevesParClasse, 1) }
      : null;

    // Demi-pension
    const hb = (heberg.get(uai) ?? []).slice().sort((a, b) => a.annee - b.annee);
    const hbLast = hb[hb.length - 1];
    let demiPension: boolean | null = null;
    if (hbLast && hbLast.demiPensionnaires !== null) demiPension = hbLast.demiPensionnaires > 0;
    else if (flag(r.restauration)) demiPension = true;
    if (ov.demiPension !== undefined) demiPension = ov.demiPension;

    // Langues, options
    const opt = construireOptions({
      structure: onisep.structures.get(uai),
      languesOnisep: onisep.langues.get(uai),
      offreLangues: sections.offreLangues.get(uai),
      dispositifs: onisep.dispositifs.get(uai) ?? [],
      sectionsInternationales: sections.internationales.get(uai) ?? [],
      sectionsSportives: sections.sportives.get(uai) ?? [],
      sportEtudes: sections.sportEtudes.get(uai) ?? [],
      ulis: flag(r.ulis) || (effLast?.ulis ?? 0) > 0,
      segpa: flag(r.segpa) || (effLast?.segpa ?? 0) > 0,
    });
    const tags = optionTags(opt.langues, opt.options);
    for (const [k, v] of tags) optionLabels.set(k, v);

    // Continuité
    const det = detections.get(uai)!;
    const continuite = construireContinuite({
      college: r,
      statut,
      detection: det.choix,
      override: contOverrides[uai],
      annuaire: ann.byUai,
      voies,
    });

    // Affelnet (collèges publics parisiens)
    let affelnetSecteur1: College['affelnetSecteur1'] = null;
    if (statut === 'public' && collegeAParis(commune)) {
      const reseau = affelnet.filter((a) => a.reseau === uai);
      if (reseau.length) {
        affelnetSecteur1 = reseau
          .filter((a) => a.secteur === '1' && a.type === 'LYC')
          .map((a) => ({ uai: a.uai, nom: ann.byUai.get(a.uai)?.nom_etablissement ?? `Lycée ${niceCase(a.nom)}` }))
          .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
      }
    }

    // Niveaux
    let niveaux: Niveau[] = effLast ? NIVEAUX.filter((n) => effLast.parNiveau[n] !== 0) : NIVEAUX.slice();
    if (niveaux.length === 0) niveaux = NIVEAUX.slice();
    if (ov.niveaux) niveaux = NIVEAUX.filter((n) => ov.niveaux!.includes(n));
    // Détections automatiques (une correction manuelle l'emporte toujours).
    // Accueil en 6e : faux si l'effectif de 6e vaut 0 à la dernière rentrée connue du collège ; supposé vrai
    // quand la donnée manque (hors contrat, 6e masquée).
    const sansSixieme = effLast?.parNiveau['6e'] === 0;
    const accueilSixieme = ov.niveaux ? niveaux.includes('6e') : !sansSixieme;
    // Recrutement particulier : collège public absent de la carte scolaire alors que sa commune y figure.
    const sansSecteur = statut === 'public' && presenceCarte.communes.has(commune.code) && !presenceCarte.uais.has(uai);
    const recrutementParticulier =
      ov.recrutementParticulier !== undefined ? ov.recrutementParticulier : sansSecteur ? RECRUTEMENT_SANS_SECTEUR : null;

    // Indicateurs
    const valeursScore = { brevet: agg.brevet, noteEcrit: agg.noteEcrit, vaTaux: agg.vaTaux, vaNote: agg.vaNote };
    const comp = composantes(valeursScore, dists);
    const nm = noteMaison(comp);
    if (nm) scores.set(uai, nm);
    const indicateurs: Indicateurs = {
      note: nm?.note ?? null,
      brevet: round(agg.brevet, 1),
      brevetDernier: round(last?.taux, 1),
      noteEcrit: round(agg.noteEcrit, 1),
      vaTaux: round(agg.vaTaux, 1),
      vaNote: round(agg.vaNote, 1),
      mentionsTB: round(agg.mentionsTB, 1),
      mentions: round(agg.mentions, 1),
      accesSixiemeTroisieme: round(last?.accesSixiemeTroisieme, 1),
      ips: round(ipsCourant?.ips, 1),
      effectif: effLast && effLast.annee === derniersEffectifs ? effLast.total : null,
      elevesParClasse: moLast && moLast.annee === moyens.derniereAnnee ? round(moLast.elevesParClasse, 1) : null,
      heuresParEleve: moLast && moLast.annee === moyens.derniereAnnee ? round(moLast.heuresParEleve, 2) : null,
      eval6Francais: evaluations6e && e6Annee === eval6.derniereAnnee ? evaluations6e.francais : null,
      eval6Maths: evaluations6e && e6Annee === eval6.derniereAnnee ? evaluations6e.maths : null,
    };

    // Raisons des valeurs manquantes
    const manquants = raisonsManquantes(indicateurs, { statut, contrat, ivacRef, derniere: last });

    const geocode = src.geocodage.get(uai);
    const lat = r.latitude ?? onisep.structures.get(uai)?.lat ?? geocode?.lat ?? null;
    const lon = r.longitude ?? onisep.structures.get(uai)?.lon ?? geocode?.lon ?? null;
    if (lat === null || lon === null) throw new Error(`${uai} : coordonnées manquantes`);
    const persoRows = (personnelByUai.get(uai) ?? []).sort((a, b) =>
      String(b.annee_de_la_rentree_scolaire).localeCompare(String(a.annee_de_la_rentree_scolaire)),
    );

    const college: College = {
      uai,
      nom: ov.nom ?? r.nom_etablissement,
      statut,
      contrat,
      commune: commune.code,
      communeLibelle: commune.libelle,
      departement: commune.departement,
      academie,
      adresse: r.adresse_1 ?? '',
      codePostal: r.code_postal ?? '',
      lat: round(lat, 6)!,
      lon: round(lon, 6)!,
      web: ov.web !== undefined ? ov.web : r.web || null,
      telephone: r.telephone || null,
      mail: r.mail || null,
      ficheOnisep: r.fiche_onisep || null,
      rep: r.appartenance_education_prioritaire === 'REP+' ? 'REP+' : r.appartenance_education_prioritaire === 'REP' ? 'REP' : null,
      recrutementParticulier,
      niveaux,
      accueilSixieme,
      suivi: suivis.has(uai),
      remarques: ov.remarques ?? [],
      demiPension,
      indicateurs,
      manquants,
      score: null, // rempli après le classement
      brevet,
      ips: ipsList.length
        ? {
            historique: ipsList.map((x) => ({ annee: x.annee, valeur: x.ips })),
            ecartType: ipsLast.ecartType,
            references: { national: ipsLast.national, academique: ipsLast.academique, departemental: ipsLast.departemental },
          }
        : null,
      effectifs: effLast
        ? {
            annee: effLast.annee,
            total: effLast.total,
            parNiveau: effLast.parNiveau,
            segpa: effLast.segpa,
            ulis: effLast.ulis,
            historique: effList.map((x) => ({ annee: x.annee, valeur: x.total })),
          }
        : null,
      evaluations6e,
      encadrement,
      langues: opt.langues,
      options: opt.options,
      optionTags: [...tags.keys()].sort(),
      continuite,
      affelnetSecteur1,
      personnel: personnelDe(persoRows[0]),
      labels: (labels.get(uai) ?? []).slice().sort((a, b) => a.localeCompare(b, 'fr')),
      pix: pixDe(pix.get(uai) ?? []),
    };
    colleges.push(college);
    rapportColleges.push({
      college,
      annuaire: r,
      detection: det,
      sourceLangues: opt.sourceLangues,
      dispositifsInconnus: opt.inconnus,
      etiquettesAuto: { recrutementParticulier: sansSecteur, sansSixieme },
      noms: {
        ivac: last?.nom ?? ivacRows[ivacRows.length - 1]?.nom ?? null,
        dnb: dnbRows[dnbRows.length - 1]?.nom ?? null,
        ips: ipsLast?.nom ?? null,
        effectifs: effLast?.nom ?? null,
        onisep: onisep.structures.get(uai)?.nom ?? null,
      },
      presence: {
        ivac: !!last,
        dnb2021: dnbRows.some((d) => d.session === 2021),
        ips: !!ipsCourant,
        effectifs: effLast?.annee === derniersEffectifs,
        eval6: e6Annee === eval6.derniereAnnee,
        encadrement: moLast?.annee === moyens.derniereAnnee,
        personnel: persoRows.length > 0,
        hebergement: !!hbLast,
        onisepStructures: onisep.structures.has(uai),
        onisepLangues: onisep.langues.has(uai),
        onisepDispositifs: onisep.dispositifs.has(uai),
      },
      aVerifier: ov.aVerifier ?? null,
      demiPension: { demiPensionnaires: hbLast?.demiPensionnaires ?? null, annee: hbLast?.annee ?? null, restauration: flag(r.restauration) },
    });
  }

  // Rang parmi les collèges notés du périmètre
  const rangs = classer([...scores.entries()].map(([uai, s]) => ({ uai, note: s.note })));
  for (const c of colleges) {
    const s = scores.get(c.uai);
    const rg = rangs.get(c.uai);
    if (s && rg) c.score = { ...s, ...rg };
  }

  // ---------------------------------------------------------------- références
  const references: Dataset['references'] = { france: {}, academies: { Paris: {}, Créteil: {}, Versailles: {} } };
  const setRef = (target: Partial<Record<IndicateurKey, number>>, values: Partial<Record<IndicateurKey, number | null>>) => {
    for (const [k, v] of Object.entries(values)) {
      const d = k === 'heuresParEleve' ? 2 : 1;
      const rv = round(v, d);
      if (rv !== null) target[k as IndicateurKey] = rv;
    }
  };
  setRef(references.france, referencesIvac(ivacAll, sessionsRef, derniereSession));
  for (const ac of ACADEMIES) {
    setRef(references.academies[ac], referencesIvac(ivacAll.filter((x) => academieDe(x.academie) === ac), sessionsRef, derniereSession));
  }
  const ipsCourants = ipsRows.filter((x) => x.annee === derniereIps);
  setRef(references.france, { ips: ipsCourants.find((x) => x.national !== null)?.national ?? null });
  for (const ac of ACADEMIES) {
    setRef(references.academies[ac], { ips: ipsCourants.find((x) => academieDe(x.academie) === ac && x.academique !== null)?.academique ?? null });
  }
  const e6Ref = (rows: typeof eval6.national) => ({
    eval6Francais: weightedMean(rows.filter((x) => x.discipline === 'francais').map((x) => [x.score, x.effectif])),
    eval6Maths: weightedMean(rows.filter((x) => x.discipline === 'maths').map((x) => [x.score, x.effectif])),
  });
  setRef(references.france, e6Ref(eval6.national));
  for (const ac of ACADEMIES) setRef(references.academies[ac], e6Ref(eval6.national.filter((x) => academieDe(x.academie) === ac)));
  const moRef = (rows: typeof moyens.national) => ({
    elevesParClasse: ratioOfSums(rows.map((x) => [x.numES, x.denES]), 1),
    heuresParEleve: ratioOfSums(rows.map((x) => [x.numHE, x.denHE]), 1),
  });
  setRef(references.france, moRef(moyens.national));
  for (const ac of ACADEMIES) setRef(references.academies[ac], moRef(moyens.national.filter((x) => academieDe(x.academie) === ac)));
  references.france = sortedObject(references.france);
  for (const ac of ACADEMIES) references.academies[ac] = sortedObject(references.academies[ac]);

  // ---------------------------------------------------------------- sources
  const dnbSessions = [...dnb.values()].flat().map((d) => d.session);
  const ipsAnnees = ipsRows.map((x) => x.annee);
  const effAnnees = effRows.map((x) => x.annee);
  const today = maintenant.toISOString().slice(0, 10);
  const ed = (id: string) => `https://data.education.gouv.fr/explore/dataset/${id}/`;
  const LO = 'Licence Ouverte 2.0';
  const sourcesPubliees: Source[] = [
    { id: 'annuaire', label: "Annuaire de l'éducation", url: ed('fr-en-annuaire-education'), licence: LO, millesime: `extraction du ${today}` },
    { id: 'ivac', label: 'Indicateurs de valeur ajoutée des collèges (IVAC)', url: ed('fr-en-indicateurs-valeur-ajoutee-colleges'), licence: LO, millesime: `sessions ${sessionsIvac[0]}–${derniereSession}` },
    { id: 'dnb', label: 'Diplôme national du brevet par établissement', url: ed('fr-en-dnb-par-etablissement'), licence: LO, millesime: `sessions ${Math.min(...dnbSessions)}–${Math.max(...dnbSessions)}` },
    { id: 'ips', label: 'Indices de position sociale des collèges', url: ed('fr-en-ips-colleges-ap2023'), licence: LO, millesime: `rentrées ${Math.min(...ipsAnnees)}–${derniereIps}` },
    { id: 'effectifs', label: 'Effectifs des collèges par niveau, sexe et langue', url: ed('fr-en-college-effectifs-niveau-sexe-lv'), licence: LO, millesime: `rentrées ${Math.min(...effAnnees)}–${derniersEffectifs}` },
    { id: 'eval6', label: 'Évaluations nationales de 6e par établissement', url: ed('fr-en-evaluations_nationales_6eme_par_etablissement'), licence: LO, millesime: String(eval6.derniereAnnee ?? '—') },
    { id: 'encadrement', label: "Moyens enseignants (heures par élève, élèves par structure), public et privé", url: ed('fr-en-moyens_enseignants_2d_public'), licence: LO, millesime: `rentrée ${moyens.derniereAnnee ?? '—'}` },
    { id: 'personnel', label: 'Indicateurs sur les personnels des établissements du second degré', url: ed('fr-en-indicateurs_personnels_etablissements2d'), licence: LO, millesime: `rentrée ${Math.max(...personnelRows.map((x) => Number(x.annee_de_la_rentree_scolaire) || 0))}` },
    { id: 'hebergement', label: "Mode d'hébergement des élèves (demi-pension)", url: ed('fr-en-mode-hebergement-eleves-etablissements-2d'), licence: LO, millesime: `rentrée ${Math.max(0, ...[...heberg.values()].flat().map((x) => x.annee))}` },
    { id: 'sections-internationales', label: 'Sections internationales', url: ed('fr-en-sections-internationales'), licence: LO, millesime: 'en vigueur' },
    { id: 'sections-sportives', label: 'Sections sportives scolaires', url: ed('fr-en-sections-sportives-scolaires'), licence: LO, millesime: 'en vigueur' },
    { id: 'sport-etudes', label: 'Classes sport-études', url: ed('fr-en-sport-etudes'), licence: LO, millesime: 'en vigueur' },
    { id: 'offre-langues', label: 'Offre de langues dans le second degré', url: ed('fr-en-offre-langues-2d'), licence: LO, millesime: 'en vigueur' },
    { id: 'labels', label: 'Labels Génération 2030, Euroscol, égalité filles-garçons ; cités éducatives', url: ed('fr-en-etablissements-labellises-generation-2030'), licence: LO, millesime: 'en vigueur' },
    { id: 'pix', label: 'Pix : résultats des parcours de rentrée par établissement', url: ed('fr-en-pix_resultats_des_campagnes_de_rentree_par_eple'), licence: LO, millesime: `rentrée ${Math.max(0, ...[...pix.values()].flat().map((x) => x.annee))}` },
    { id: 'cites-scolaires', label: 'Cités scolaires', url: ed('fr-en-cites_scolaires'), licence: LO, millesime: `extraction du ${today}` },
    { id: 'lycees-effectifs', label: 'Effectifs des lycées (2nde GT sur place, voies)', url: ed('fr-en-lycee_gt-effectifs-niveau-sexe-lv'), licence: LO, millesime: `rentrée ${Math.max(0, ...[...voies.values()].map((v) => v.annee))}` },
    { id: 'onisep-structures', label: "ONISEP – Idéo-Structures d'enseignement secondaire", url: 'https://api.opendata.onisep.fr/downloads/5fa5816ac6a6e/5fa5816ac6a6e.csv', licence: 'ODbL', millesime: `extraction du ${today}` },
    { id: 'onisep-langues', label: 'ONISEP – Idéo-Langues au collège', url: 'https://api.opendata.onisep.fr/downloads/66263935522cd/66263935522cd.csv', licence: 'ODbL', millesime: `extraction du ${today}` },
    { id: 'onisep-dispositifs', label: 'ONISEP – Idéo-Actions de dispositif (Île-de-France)', url: 'https://api.opendata.onisep.fr/downloads/5fa532b036477/5fa532b036477.zip', licence: 'ODbL', millesime: `extraction du ${today}` },
    { id: 'secteurs-paris', label: 'Secteurs scolaires des collèges (Ville de Paris)', url: 'https://opendata.paris.fr/explore/dataset/secteurs-scolaires-colleges/', licence: 'ODbL', millesime: ANNEE_SECTEURS_PARIS },
    { id: 'carte-scolaire', label: 'Carte scolaire des collèges publics (plages d’adresses)', url: ed('fr-en-carte-scolaire-colleges-publics'), licence: LO, millesime: `extraction du ${today}` },
    { id: 'affelnet', label: 'Affectation en 2nde : lycées de secteur (académie de Paris)', url: 'https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0', licence: 'Données publiques de l’académie de Paris (licence non précisée)', millesime: `rentrée ${ANNEE_AFFELNET}` },
    { id: 'contours', label: 'Contours des communes, arrondissements à Paris (Etalab, d’après Admin Express IGN)', url: 'https://www.data.gouv.fr/datasets/contours-administratifs', licence: 'ODbL', millesime: `${ANNEE_CONTOURS}, généralisés à 100 m` },
    { id: 'geocodage', label: 'Géocodage des adresses (Géoplateforme IGN, dans le navigateur)', url: 'https://data.geopf.fr/geocodage', licence: LO, millesime: 'en direct' },
  ];

  // ---------------------------------------------------------------- publication
  colleges.sort((a, b) => a.uai.localeCompare(b.uai));
  const optionLabelsObj = Object.fromEntries(
    [...optionLabels.entries()].sort(
      ([ka, a], [kb, b]) => GROUPES.indexOf(a.groupe) - GROUPES.indexOf(b.groupe) || a.label.localeCompare(b.label, 'fr') || ka.localeCompare(kb),
    ),
  );
  const communes = [...new Map(colleges.map((c) => [c.commune, { code: c.commune, libelle: c.communeLibelle, departement: c.departement }])).values()].sort(
    (a, b) => a.code.localeCompare(b.code),
  );
  const decoupes = colleges.map(decouper);
  const dataset: Dataset = {
    generatedAt: maintenant.toISOString(),
    sessions: { brevet: sessionsRef, ips: derniereIps, effectifs: derniersEffectifs },
    communes,
    references,
    optionLabels: optionLabelsObj,
    sources: sourcesPubliees,
    colleges: decoupes.map((x) => x.resume),
  };
  const details: DetailDepartement[] = [...groupBy(decoupes, (x) => x.resume.departement).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([departement, xs]) => ({ departement, colleges: xs.map((x) => x.detail) }));
  // Contours des communes présentes, sous le libellé de l'application (« Paris 13e »).
  const contourParCode = new Map(src.contours.map((f) => [f.properties.code, f]));
  const contoursPublies: Feature<ContourCommuneProps>[] = [];
  const contoursManquants: CommunePresente[] = [];
  for (const c of communes) {
    const f = contourParCode.get(c.code);
    if (f) contoursPublies.push({ type: 'Feature', properties: { code: c.code, libelle: c.libelle }, geometry: f.geometry });
    else contoursManquants.push(c);
  }
  const departementDeCommune = new Map(communes.map((c) => [c.code, c.departement]));
  const contours: ContoursDepartement[] = [...groupBy(contoursPublies, (f) => departementDeCommune.get(f.properties.code)!).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([departement, features]) => ({ departement, contours: { type: 'FeatureCollection', features } }));
  const publication: Publication = {
    dataset,
    details,
    evenements: events.file,
    secteursParis: secteursParis.geojson,
    cartesScolaires: carte.departements.filter((c) => c.departement !== '75'),
    contours,
  };
  const fichiers: FichierPublie[] = [
    { chemin: 'colleges.json', contenu: JSON.stringify(publication.dataset) + '\n' },
    ...publication.details.map((d) => ({ chemin: `colleges-${d.departement}.json`, contenu: JSON.stringify(d) + '\n' })),
    { chemin: 'secteurs-paris.geojson', contenu: jsonParLigne(publication.secteursParis.features, featureCollection) },
    ...publication.cartesScolaires.map((c) => ({ chemin: `carte-scolaire-${c.departement}.json`, contenu: carteParLigne(c) })),
    ...publication.contours.map((d) => ({ chemin: `contours-${d.departement}.geojson`, contenu: jsonParLigne(d.contours.features, featureCollection) })),
    { chemin: 'events.json', contenu: JSON.stringify(publication.evenements, null, 1) + '\n' },
  ];

  // ---------------------------------------------------------------- rapport
  const rapportSansAnomalies: Omit<RapportAssemble, 'anomalies'> = {
    generatedAt: dataset.generatedAt,
    cfg,
    exclus: ann.exclus,
    doublons: ann.doublons,
    geocodes: ann.colleges
      .filter((r) => (r.latitude === null || r.longitude === null) && !onisep.structures.get(r.identifiant_de_l_etablissement)?.lat && src.geocodage.has(r.identifiant_de_l_etablissement))
      .map((r) => ({ uai: r.identifiant_de_l_etablissement, adresse: `${r.adresse_1 ?? ''} ${r.code_postal ?? ''}`.trim(), ...src.geocodage.get(r.identifiant_de_l_etablissement)! }))
      .map(({ uai, adresse, label, score }) => ({ uai, adresse, label, score })),
    colleges: rapportColleges,
    suivisHorsPerimetre: corrections.suivis
      .filter((uai) => !perimetre.has(uai))
      .sort()
      .map((uai) => {
        const r = src.annuaire.colleges.find((x) => x.identifiant_de_l_etablissement === uai);
        const raison = ann.exclus.some((x) => x.identifiant_de_l_etablissement === uai)
          ? 'écarté par data/config.json'
          : r
            ? `hors sélection de l'annuaire (département ${departementDe(r)}, nature ${r.code_nature}, état ${r.etat})`
            : "absent de l'annuaire des collèges";
        return { uai, nom: r?.nom_etablissement ?? null, raison };
      }),
    sessionsRef,
    derniereSession,
    derniereIps,
    derniersEffectifs,
    eval6Annee: eval6.derniereAnnee,
    moyensAnnee: moyens.derniereAnnee,
    distributions: { brevet: dists.brevet.length, noteEcrit: dists.noteEcrit.length, vaTaux: dists.vaTaux.length, vaNote: dists.vaNote.length },
    references,
    onisep: { structuresIgnorees: onisep.structuresIgnorees, dispositifsIgnores: onisep.dispositifsIgnores },
    secteursParis,
    collegesParisPublics: collegesParisPublics.map((c) => c.identifiant_de_l_etablissement),
    carte: { rows: carte.rows, doublons: carte.doublons, ecartees: carte.ecartees, ...presenceCarte, ecartsParis },
    affelnet: { lignes: affelnet.length },
    contoursManquants: contoursManquants.map(({ code, libelle }) => ({ code, libelle })),
    events,
    indicateurs: INDICATEURS,
  };
  const rapport: RapportAssemble = { ...rapportSansAnomalies, anomalies: detecterAnomalies(rapportSansAnomalies) };

  return {
    publication,
    fichiers,
    controles: { voiesCarteScolaire: carte.brut.filter((r) => !inseeAParis(r.insee)), secteursParis: secteursParis.geojson },
    rapport,
  };
}
