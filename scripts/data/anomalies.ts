// Anomalies du rapport data/report.md : chacune avec son décompte et les collèges (ou secteurs, communes…) concernés.
// Calculées par assemblerDataset à partir des données du rapport ; aucun accès au réseau.
import type { College, IndicateurKey } from '../../src/types';
import { normalizeNom } from '../../src/lib/normalize';
import { groupBy } from './lib/util';
import { collegeAParis } from '../../src/lib/territoires';
import type { ReportData } from './report';

export type FamilleAnomalie = 'jointures' | 'secteursParis' | 'ecartsParis' | 'sansSecteur' | 'doublons' | 'manquantes' | 'corrections' | 'controles';

/** Familles dans l'ordre du rapport : titre et précision commune à leurs anomalies. */
export const FAMILLES: Record<FamilleAnomalie, { titre: string; note?: string }> = {
  jointures: {
    titre: 'Jointures ratées, par source',
    note: "Jointure sur l'UAI. Les hors contrat ne figurent dans aucun jeu statistique : seuls les collèges publics et sous contrat sont comptés.",
  },
  secteursParis: { titre: 'Secteurs parisiens non reliés', note: 'Les secteurs de la Ville désignent les collèges par leur nom (jointure par nom).' },
  ecartsParis: { titre: 'Écarts entre les polygones parisiens et la carte nationale' },
  sansSecteur: { titre: 'Collèges publics sans secteur' },
  doublons: { titre: 'Doublons' },
  manquantes: { titre: 'Données manquantes inattendues' },
  corrections: { titre: 'Corrections manuelles et vérifications', note: 'Fichiers de data/overrides/.' },
  controles: { titre: 'Contrôles par géocodage (Géoplateforme)' },
};

/** Élément concerné : un collège (UAI et nom), ou un secteur, une commune, un événement (UAI nul). */
export interface ElementAnomalie {
  uai: string | null;
  libelle: string | null;
  detail?: string;
}

export interface Anomalie {
  /** Identifiant stable (tests, comparaison d'un rapport à l'autre). */
  id: string;
  famille: FamilleAnomalie;
  titre: string;
  note?: string;
  elements: ElementAnomalie[];
}

/** Données dont les anomalies sont tirées : celles du rapport connues sans réseau. */
export type DonneesAnomalies = Omit<ReportData, 'anomalies' | 'offline' | 'fetchWarnings' | 'verifVoies' | 'verifSecteurs' | 'tailles' | 'dureeSecondes'>;

/** En dessous de ce score, la position géocodée d'un collège est douteuse (autre rue, autre numéro). */
export const SCORE_GEOCODAGE_SUR = 0.7;

const MOTS_GENERIQUES = new Set(['DE', 'DU', 'DES', 'LA', 'LE', 'LES', 'L', 'D', 'ET', 'SAINT', 'SAINTE', 'NOTRE', 'DAME', 'ECOLE']);

/** Vrai si deux noms n'ont aucun mot significatif en commun. */
export function nomsDivergents(a: string, b: string): boolean {
  const ta = normalizeNom(a).split(' ').filter((w) => w.length > 1 && !MOTS_GENERIQUES.has(w));
  const tb = new Set(normalizeNom(b).split(' ').filter((w) => w.length > 1 && !MOTS_GENERIQUES.has(w)));
  if (ta.length === 0 || tb.size === 0) return false;
  return !ta.some((w) => tb.has(w));
}


export function detecterAnomalies(d: DonneesAnomalies): Anomalie[] {
  const out: Anomalie[] = [];
  const cs = d.colleges.map((x) => x.college);
  const byUai = new Map(cs.map((c) => [c.uai, c]));
  const college = (c: College, detail?: string): ElementAnomalie => ({ uai: c.uai, libelle: c.nom, ...(detail ? { detail } : {}) });
  const parUai = (uai: string, detail?: string): ElementAnomalie =>
    byUai.has(uai) ? college(byUai.get(uai)!, detail) : { uai, libelle: null, detail: ['hors périmètre', detail].filter(Boolean).join(' ; ') };
  const ajouter = (famille: FamilleAnomalie, id: string, titre: string, elements: ElementAnomalie[], note?: string) =>
    out.push({ id, famille, titre, ...(note ? { note } : {}), elements });
  const nonHorsContrat = d.colleges.filter((x) => x.college.statut !== 'hors_contrat');

  // ---------------------------------------------------------------- jointures ratées, par source
  const jeux: [string, string][] = [
    ['ivac', `IVAC session ${d.derniereSession}`],
    ['dnb2021', 'DNB session 2021'],
    ['ips', `IPS ${d.derniereIps}`],
    ['effectifs', `Effectifs ${d.derniersEffectifs}`],
    ['eval6', `Évaluations 6e ${d.eval6Annee ?? ''}`.trim()],
    ['encadrement', `Encadrement ${d.moyensAnnee ?? ''}`.trim()],
    ['personnel', 'Personnel'],
    ['hebergement', 'Hébergement (demi-pension)'],
    ['onisepStructures', 'ONISEP Idéo-Structures'],
    ['onisepLangues', 'ONISEP Idéo-Langues'],
  ];
  for (const [cle, libelle] of jeux) {
    ajouter('jointures', `absent-${cle}`, `Absents du jeu « ${libelle} »`, nonHorsContrat.filter((x) => !x.presence[cle]).map((x) => college(x.college)));
  }
  const parisPublics = d.collegesParisPublics.flatMap((uai) => byUai.get(uai) ?? []);
  ajouter(
    'jointures',
    'absent-affelnet',
    'Collèges publics parisiens absents de la carte Affelnet',
    parisPublics.filter((c) => c.affelnetSecteur1 === null).map((c) => college(c)),
  );
  const divergents: ElementAnomalie[] = [];
  for (const x of d.colleges) {
    for (const [src, nom] of Object.entries(x.noms)) {
      if (nom && nomsDivergents(x.annuaire.nom_etablissement, nom)) divergents.push(college(x.college, `${src} : « ${nom} »`));
    }
  }
  ajouter('jointures', 'noms-divergents', "Nom dans une source sans mot commun avec celui de l'annuaire", divergents, 'Renommage ou erreur d’UAI.');
  ajouter(
    'jointures',
    'onisep-structures-ecartees',
    "Fiches Idéo-Structures écartées (même UAI qu'un collège, autre type)",
    d.onisep.structuresIgnorees.map((s) => ({ uai: s.uai, libelle: s.nom, detail: s.type })),
  );
  ajouter(
    'jointures',
    'onisep-dispositifs-ecartes',
    'Dispositifs ONISEP écartés (lieu non collège)',
    d.onisep.dispositifsIgnores.map((s) => ({ uai: s.uai, libelle: s.intitule, detail: s.typeEtablissement ?? undefined })),
  );

  // ---------------------------------------------------------------- secteurs parisiens non reliés
  const sp = d.secteursParis;
  ajouter(
    'secteursParis',
    'secteurs-sans-college',
    'Secteurs reliés à aucun collège',
    sp.secteursSansCollege.map((s) => ({ uai: null, libelle: `secteur ${s.libelle}`, detail: s.noms.join(', ') || 'aucun nom publié' })),
  );
  ajouter(
    'secteursParis',
    'noms-secteur-sans-college',
    'Noms publiés sans collège',
    sp.correspondances
      .filter((m) => !m.match.uai)
      .map((m) => ({
        uai: null,
        libelle: m.nom,
        detail: `secteur ${m.libelle}${m.match.candidats.length > 1 ? ` ; ambigu : ${m.match.candidats.join(', ')}` : ''}`,
      })),
  );
  const relies = sp.correspondances.filter((m) => m.match.uai);
  ajouter(
    'secteursParis',
    'secteurs-multiples',
    'Collèges reliés à plusieurs secteurs',
    [...groupBy(relies, (m) => m.match.uai!).entries()]
      .filter(([, l]) => new Set(l.map((m) => m.libelle)).size > 1)
      .map(([uai, l]) => parUai(uai, [...new Set(l.map((m) => m.libelle))].join(', '))),
  );
  ajouter(
    'secteursParis',
    'adresse-secteur-discordante',
    "Collèges reliés par leur nom, adresse publiée différente de l'annuaire",
    relies.filter((m) => m.match.adresseConcordante === false).map((m) => parUai(m.match.uai!, `secteur ${m.libelle}`)),
  );

  // ---------------------------------------------------------------- écarts polygones parisiens / carte nationale
  ajouter('ecartsParis', 'polygones-hors-carte', 'Collèges des polygones de la Ville absents de la carte nationale', d.carte.ecartsParis.polygonesSeuls.map((u) => parUai(u)));
  ajouter('ecartsParis', 'carte-sans-polygone', 'Collèges de la carte nationale à Paris sans polygone de la Ville', d.carte.ecartsParis.carteSeule.map((u) => parUai(u)));

  // ---------------------------------------------------------------- collèges publics sans secteur
  const relieParis = new Set(relies.map((m) => m.match.uai!));
  ajouter(
    'sansSecteur',
    'paris-sans-secteur',
    'Collèges publics parisiens sans secteur de la Ville',
    d.collegesParisPublics.filter((u) => !relieParis.has(u)).map((u) => parUai(u)),
  );
  const publicsHorsParis = cs.filter((c) => c.statut === 'public' && !collegeAParis(c));
  ajouter(
    'sansSecteur',
    'absents-carte',
    'Collèges publics absents de la carte nationale alors que leur commune y figure',
    d.colleges
      .filter((x) => x.etiquettesAuto.recrutementParticulier)
      .map((x) => college(x.college, `${x.college.communeLibelle} ; publié : « ${x.college.recrutementParticulier ?? 'aucun recrutement particulier'} »`)),
    'Étiquetés automatiquement « recrutement particulier » ; une correction (data/overrides/colleges.json) peut préciser le libellé.',
  );
  const horsCarte = groupBy(
    publicsHorsParis.filter((c) => !d.carte.communes.has(c.commune)),
    (c) => c.commune,
  );
  ajouter(
    'sansSecteur',
    'commune-hors-carte',
    'Collèges publics d’une commune absente de la carte nationale qui en compte plusieurs',
    [...horsCarte.values()].filter((l) => l.length > 1).flatMap((l) => l.map((c) => college(c, c.communeLibelle))),
    'Une commune absente de la carte avec un seul collège public y est rattachée par déduction : elle n’est pas comptée ici.',
  );

  // ---------------------------------------------------------------- doublons
  ajouter(
    'doublons',
    'doublons-annuaire',
    "UAI présents sur plusieurs lignes de l'annuaire",
    d.doublons.map((x) =>
      parUai(
        x.garde.identifiant_de_l_etablissement,
        `gardé « ${x.garde.nom_etablissement} » (${x.garde.adresse_1 ?? '?'}), écarté ${x.ecartes.map((r) => `« ${r.nom_etablissement} » (${r.adresse_1 ?? '?'})`).join(', ')}`,
      ),
    ),
    `Fusionnés sur le site principal. La carte scolaire nationale avait aussi ${d.carte.doublons} lignes en double après normalisation des voies, retirées.`,
  );

  // ---------------------------------------------------------------- données manquantes inattendues
  ajouter(
    'manquantes',
    'valeurs-sans-raison',
    'Valeurs manquantes sans raison',
    cs
      .map((c) => [c, d.indicateurs.filter((k) => c.indicateurs[k] === null && !c.manquants[k])] as const)
      .filter(([, ks]) => ks.length)
      .map(([c, ks]) => college(c, ks.join(', '))),
  );
  const resultats: IndicateurKey[] = ['brevet', 'brevetDernier', 'vaTaux', 'vaNote'];
  ajouter(
    'manquantes',
    'sous-contrat-sans-resultat',
    'Collèges publics ou sous contrat (hors contrat simple) sans résultat au brevet ou sans valeur ajoutée',
    cs
      .filter((c) => c.statut !== 'hors_contrat' && c.contrat !== 'simple' && resultats.some((k) => c.indicateurs[k] === null))
      .map((c) => college(c, resultats.filter((k) => c.indicateurs[k] === null).map((k) => `${k} : ${c.manquants[k] ?? '?'}`).join(' ; '))),
  );
  const geocode = (g: DonneesAnomalies['geocodes'][number]) => `« ${g.adresse} » → « ${g.label} » (score ${g.score.toFixed(2)})`;
  ajouter(
    'manquantes',
    'geocodes',
    "Sans coordonnées dans l'annuaire, placés par le géocodage de leur adresse",
    d.geocodes.map((g) => parUai(g.uai, geocode(g))),
  );
  ajouter(
    'manquantes',
    'geocodage-incertain',
    `Géocodage incertain (score < ${String(SCORE_GEOCODAGE_SUR).replace('.', ',')})`,
    d.geocodes.filter((g) => g.score < SCORE_GEOCODAGE_SUR).map((g) => parUai(g.uai, geocode(g))),
    "Adresse à vérifier à la main ; la corriger dans l'annuaire ou dans data/overrides/colleges.json.",
  );
  ajouter(
    'manquantes',
    'geolocalisation-approximative',
    "Géolocalisation approximative dans l'annuaire",
    d.colleges
      .filter((x) => x.annuaire.precision_localisation && !/num[ée]ro de rue/i.test(x.annuaire.precision_localisation))
      .map((x) => college(x.college, x.annuaire.precision_localisation!)),
  );
  ajouter(
    'manquantes',
    'demi-pension-desaccord',
    "Demi-pension (jeu « hébergement », retenu) en désaccord avec le champ `restauration` de l'annuaire",
    d.colleges
      .filter((x) => x.demiPension.demiPensionnaires !== null && x.demiPension.demiPensionnaires > 0 !== x.demiPension.restauration)
      .map((x) =>
        college(x.college, `${x.demiPension.demiPensionnaires} demi-pensionnaires en ${x.demiPension.annee}, restauration ${x.demiPension.restauration ? '1' : '0'}`),
      ),
  );
  ajouter(
    'manquantes',
    'demi-pension-inconnue',
    'Collèges publics ou sous contrat à la demi-pension inconnue',
    nonHorsContrat.filter((x) => x.college.demiPension === null).map((x) => college(x.college)),
  );
  ajouter(
    'manquantes',
    'sans-site-web',
    "Collèges publics ou sous contrat sans site web (ni dans l'annuaire, ni corrigé)",
    nonHorsContrat.filter((x) => !x.annuaire.web && !x.college.web).map((x) => college(x.college)),
    `Hors contrat sans site web : ${d.colleges.filter((x) => x.college.statut === 'hors_contrat' && !x.annuaire.web && !x.college.web).length}.`,
  );
  ajouter(
    'manquantes',
    'sans-langues',
    'Collèges publics ou sous contrat sans LV1 ni LV2 connues',
    nonHorsContrat.filter((x) => x.sourceLangues === 'aucune').map((x) => college(x.college)),
  );
  ajouter(
    'manquantes',
    'dispositifs-non-classes',
    'Dispositifs ONISEP non classés',
    d.colleges.flatMap((x) => x.dispositifsInconnus.map((t) => college(x.college, t))),
  );
  ajouter(
    'manquantes',
    'passage-inconnu',
    'Passage au lycée « inconnu »',
    cs.filter((c) => c.continuite.passage === 'inconnu').map((c) => college(c)),
  );
  ajouter(
    'manquantes',
    'contours-manquants',
    'Communes sans contour (contours-<dép>.geojson)',
    d.contoursManquants.map((c) => ({ uai: null, libelle: `${c.libelle} (${c.code})` })),
  );

  // ---------------------------------------------------------------- corrections manuelles et vérifications
  ajouter(
    'corrections',
    'suivis-hors-perimetre',
    'Collèges suivis hors du périmètre (data/overrides/suivis.json)',
    d.suivisHorsPerimetre.map((s) => ({ uai: s.uai, libelle: s.nom, detail: s.raison })),
    "Ignorés : aucun collège publié n'est marqué suivi pour eux.",
  );
  ajouter(
    'corrections',
    'a-verifier',
    'À vérifier à la main (data/overrides/colleges.json, `aVerifier`)',
    d.colleges.filter((x) => x.aVerifier).map((x) => college(x.college, x.aVerifier!)),
  );
  ajouter(
    'corrections',
    'sans-sixieme-detecte',
    'Collèges sans 6e détectés (effectif de 6e nul à la dernière rentrée connue)',
    d.colleges
      .filter((x) => x.etiquettesAuto.sansSixieme)
      .map((x) => college(x.college, x.college.accueilSixieme ? 'corrigé : accueille en 6e' : `niveaux publiés : ${x.college.niveaux.join(', ')}`)),
    'Collège qui ouvre ou ferme, 6e transférée : à confirmer, et corriger `niveaux` si besoin.',
  );
  ajouter(
    'corrections',
    'passage-non-ecrit',
    'Collèges suivis privés sous contrat avec lycée, sans formulation écrite sur le passage',
    cs
      .filter((c) => c.suivi && c.statut === 'prive_sous_contrat' && c.continuite.lien === 'meme_etablissement_prive' && c.continuite.passage === 'non_garanti')
      .map((c) => college(c)),
    '« Poursuite habituelle, non garantie par écrit » : à relever sur le site du collège (data/overrides/continuite.json).',
  );
  ajouter(
    'corrections',
    'evenements-rejetes',
    'Événements rejetés (data/overrides/events.json)',
    d.events.rejetes.map((r) => ({ uai: null, libelle: r.id, detail: r.raisons.join(', ') })),
  );
  ajouter(
    'corrections',
    'evenements-hors-perimetre',
    'Événements et inscriptions de collèges hors périmètre (data/overrides/events.json)',
    [
      ...d.events.horsPerimetre.map((e) => ({ uai: null, libelle: e, detail: 'événement' })),
      ...d.events.inscriptionsHorsPerimetre.map((u) => ({ uai: u, libelle: null, detail: 'inscriptions' })),
    ],
  );
  return out;
}
