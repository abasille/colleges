// Rapport data/report.md, relu à chaque mise à jour des données, en trois parties :
// 1. les totaux (par département et par statut, puis millésimes, sources et fichiers) ;
// 2. les anomalies, chacune avec son décompte et les collèges concernés (voir anomalies.ts) ;
// 3. le détail des collèges suivis. Les autres collèges n'apparaissent que dans les totaux et les anomalies.
import type { Academie, College, Dataset, IndicateurKey } from '../../src/types';
import type { Config } from './lib/config';
import type { AnnuaireRow } from './sources/annuaire';
import type { Candidat, DetectionLien } from './sources/continuite';
import type { OnisepStructure } from './sources/onisep';
import type { CarteScolaireResult, SecteursParisResult } from './sources/secteurs';
import type { VerifSecteur, VerifVoie } from './controles';
import type { EventsResult } from './events';
import { FAMILLES, type Anomalie, type ElementAnomalie, type FamilleAnomalie } from './anomalies';
import { groupBy } from './lib/util';
import { collegeAParis } from '../../src/lib/territoires';
import { collegeDeduit } from '../../src/lib/secteur';

export interface ReportData {
  generatedAt: string;
  offline: boolean;
  fetchWarnings: string[];
  cfg: Config;
  exclus: AnnuaireRow[];
  /** UAI présents sur plusieurs lignes de l'annuaire, fusionnés sur le site principal. */
  doublons: { garde: AnnuaireRow; ecartes: AnnuaireRow[] }[];
  /** Collèges sans coordonnées dans l'annuaire, placés par le géocodage de leur adresse. */
  geocodes: { uai: string; adresse: string; label: string; score: number }[];
  /** Tous les collèges du périmètre (totaux, anomalies) ; le détail n'est rendu que pour les suivis. */
  colleges: {
    college: College;
    annuaire: AnnuaireRow;
    detection: { candidats: Candidat[]; choix: DetectionLien };
    sourceLangues: string;
    dispositifsInconnus: string[];
    /** Étiquettes posées par les détections automatiques, avant correction manuelle (le collège publié tient compte de la correction). */
    etiquettesAuto: { recrutementParticulier: boolean; sansSixieme: boolean };
    noms: Record<string, string | null>;
    presence: Record<string, boolean>;
    aVerifier: string | null;
    demiPension: { demiPensionnaires: number | null; annee: number | null; restauration: boolean };
  }[];
  /** UAI de data/overrides/suivis.json absents du périmètre, avec la raison (nom si l'annuaire le connaît). */
  suivisHorsPerimetre: { uai: string; nom: string | null; raison: string }[];
  /** Anomalies connues sans réseau (voir anomalies.ts) ; le rendu y ajoute les contrôles par géocodage. */
  anomalies: Anomalie[];
  sessionsRef: number[];
  derniereSession: number;
  derniereIps: number;
  derniersEffectifs: number;
  eval6Annee: number | null;
  moyensAnnee: number | null;
  distributions: Record<string, number>;
  references: Dataset['references'];
  onisep: { structuresIgnorees: OnisepStructure[]; dispositifsIgnores: { uai: string; intitule: string; typeEtablissement: string | null }[] };
  secteursParis: SecteursParisResult;
  collegesParisPublics: string[];
  /** Carte scolaire nationale, Paris compris ; `uais`/`communes` : présents dans la carte. */
  carte: Pick<CarteScolaireResult, 'rows' | 'doublons' | 'ecartees' | 'uais' | 'communes'> & {
    /** Contrôle croisé à Paris : UAI des polygones de la Ville absents de la carte, et inversement. */
    ecartsParis: { polygonesSeuls: string[]; carteSeule: string[] };
  };
  verifVoies: VerifVoie[];
  verifSecteurs: VerifSecteur[];
  affelnet: { lignes: number };
  /** Communes présentes absentes du fichier de contours d'Etalab. */
  contoursManquants: { code: string; libelle: string }[];
  events: EventsResult;
  tailles: Record<string, number>;
  indicateurs: IndicateurKey[];
  dureeSecondes: number;
}

const STATUTS: [College['statut'], string][] = [
  ['public', 'public'],
  ['prive_sous_contrat', 'privé sous contrat'],
  ['hors_contrat', 'hors contrat'],
];

function table(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const esc = (v: string | number | null | undefined) => (v === null || v === undefined ? '' : String(v).replace(/\|/g, '\\|').replace(/\n/g, ' '));
  return [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n');
}

function nomCourt(c: College): string {
  return `${c.nom} (${c.uai})`;
}

const compte = <T,>(l: T[], f: (x: T) => string) =>
  [...groupBy(l, f).entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, xs]) => `${k} ${xs.length}`)
    .join(', ');

/** Écarts de l'échantillon de voies géocodées : anomalie ajoutée au rendu (contrôle réseau fait après l'assemblage). */
function anomalieVoies(verif: VerifVoie[]): Anomalie {
  const diagnostic = (v: VerifVoie) => {
    if (!v.obtenu) return 'aucun résultat du géocodeur';
    if (v.citycode !== v.insee) return 'autre commune renvoyée';
    const a = new Set(v.attendu.split(' '));
    const commun = v.obtenu.split(' ').filter((w) => a.has(w)).length;
    return commun / Math.max(a.size, 1) < 0.6 ? 'autre voie renvoyée (voie inconnue du géocodeur ?)' : 'écart de normalisation';
  };
  const ko = verif.filter((v) => !v.ok);
  return {
    id: 'normalisation-voies',
    famille: 'controles',
    titre: `Libellés de la carte scolaire différents du géocodeur après normalisation (échantillon de ${verif.length})`,
    note: `Imputables à la normalisation : ${ko.filter((v) => diagnostic(v) === 'écart de normalisation').length}.`,
    elements: ko.map((v) => ({ uai: null, libelle: `${v.libelle} (${v.insee})`, detail: `géocodeur : ${v.rueGeocodeur ?? '—'} → ${v.obtenu ?? '—'} ; ${diagnostic(v)}` })),
  };
}

function libelleElement(e: ElementAnomalie): string {
  const nom = e.libelle && e.uai ? `${e.libelle} (${e.uai})` : (e.libelle ?? e.uai ?? '?');
  return e.detail ? `${nom} — ${e.detail}` : nom;
}

export function renderReport(d: ReportData): string {
  const L: string[] = [];
  const cs = d.colleges.map((x) => x.college);
  const byUai = new Map(cs.map((c) => [c.uai, c]));
  const n = cs.length;
  const anomalies = [...d.anomalies, anomalieVoies(d.verifVoies)];

  L.push('# Rapport de la mise à jour des données');
  L.push('');
  L.push(`Généré le ${d.generatedAt} par \`npm run data\`${d.offline ? ' (mode hors ligne : cache uniquement)' : ''} en ${d.dureeSecondes.toFixed(0)} s. Fichier régénéré à chaque exécution : ne pas éditer à la main.`);
  L.push('');
  L.push('Trois parties : les totaux, les anomalies (décompte et collèges concernés), le détail des seuls collèges suivis.');
  if (d.fetchWarnings.length) {
    L.push('');
    L.push('**Échecs de téléchargement (copie en cache réutilisée) :**');
    for (const w of d.fetchWarnings) L.push(`- ${w}`);
  }

  // ================================================================ 1. Totaux
  L.push('', '## 1. Totaux', '');
  const parStatut = groupBy(cs, (c) => c.statut);
  const simples = cs.filter((c) => c.contrat === 'simple');
  const nb = (s: College['statut']) => parStatut.get(s)?.length ?? 0;
  L.push(
    `**${n} collèges** : ${nb('public')} publics, ${nb('prive_sous_contrat')} privés sous contrat${simples.length ? ` (dont sous contrat simple : ${simples.map(nomCourt).join(', ')})` : ''}, ${nb('hors_contrat')} hors contrat. ${new Set(cs.map((c) => c.commune)).size} communes.`,
  );
  L.push('');
  const ligneTotaux = (l: College[]) => [
    new Set(l.map((c) => c.commune)).size,
    ...STATUTS.map(([s]) => l.filter((c) => c.statut === s).length),
    l.length,
  ];
  L.push(
    table(
      ['Département', 'Académie', 'Communes', ...STATUTS.map(([, lib]) => lib[0].toUpperCase() + lib.slice(1)), 'Total'],
      [
        ...[...groupBy(cs, (c) => c.departement).entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([dep, l]) => [dep, [...new Set(l.map((c) => c.academie))].join(', '), ...ligneTotaux(l)]),
        ['**Total**', '', ...ligneTotaux(cs)],
      ],
    ),
  );
  L.push('');
  L.push(`Par académie : ${compte(cs, (c) => c.academie)}. Collèges suivis : ${cs.filter((c) => c.suivi).length}.`);
  if (d.exclus.length) {
    L.push(`Écartés par \`data/config.json\` : ${d.exclus.map((r) => `${r.nom_etablissement} (${r.identifiant_de_l_etablissement})`).join(', ')}.`);
  }
  const exclusAbsents = d.cfg.exclure.filter((u) => !d.exclus.some((r) => r.identifiant_de_l_etablissement === u));
  if (exclusAbsents.length) {
    L.push(`Exclusions de précaution (UAI déjà hors des natures ${d.cfg.codesNature.join(', ')} : EREA, lycées) : ${exclusAbsents.join(', ')}.`);
  }

  L.push('', '### Millésimes', '');
  L.push(`- Brevet : moyenne des sessions ${d.sessionsRef.join(', ')} (IVAC, \`Dataset.sessions.brevet\`), dernière session ${d.derniereSession} ; historique DNB 2015–2021 (tous candidats) puis IVAC (série générale).`);
  L.push(`- IPS : rentrée ${d.derniereIps}-${d.derniereIps + 1}. Effectifs : rentrée ${d.derniersEffectifs}. Évaluations 6e : ${d.eval6Annee ?? '—'}. Encadrement : rentrée ${d.moyensAnnee ?? '—'}.`);
  L.push(`- Distributions nationales de la note maison (collèges ayant l'indicateur sur ${d.sessionsRef.join('–')}) : brevet ${d.distributions.brevet}, note à l'écrit ${d.distributions.noteEcrit}, VA du taux ${d.distributions.vaTaux}, VA de la note ${d.distributions.vaNote}.`);

  L.push('', '### Indicateurs', '');
  L.push(
    table(
      ['Indicateur', 'Renseignés', 'Manquants', 'Raisons'],
      d.indicateurs.map((k) => {
        const manq = cs.filter((c) => c.indicateurs[k] === null);
        const raisons = groupBy(manq, (c) => c.manquants[k] ?? '(sans raison !)');
        return [k, n - manq.length, manq.length, [...raisons.entries()].map(([r, l]) => `${r} : ${l.length}`).join(' ; ')];
      }),
    ),
  );
  L.push('');
  const notes = cs.filter((c) => c.score);
  const lettres = groupBy(notes, (c) => c.score!.lettre);
  L.push(
    `Note maison : ${notes.length} collèges notés sur ${n} (${notes.filter((c) => c.score!.partielle).length} notes partielles). Lettres : ${['A', 'B', 'C', 'D', 'E'].map((l) => `${l} ${lettres.get(l as 'A')?.length ?? 0}`).join(', ')}. Non notés : ${compte(cs.filter((c) => !c.score), (c) => c.manquants.note ?? '?')}.`,
  );
  L.push('');
  const academies = Object.keys(d.references.academies) as Academie[];
  const keys = [...new Set([...Object.keys(d.references.france), ...academies.flatMap((a) => Object.keys(d.references.academies[a]))])] as IndicateurKey[];
  L.push('Moyennes de référence :', '');
  L.push(
    table(
      ['Indicateur', 'France', ...academies.map((a) => `Académie de ${a}`)],
      keys.map((k) => [k, d.references.france[k], ...academies.map((a) => d.references.academies[a][k])]),
    ),
  );

  L.push('', '### Langues, continuité, lycée de secteur', '');
  L.push(`- Langues vivantes, source : ${compte(d.colleges, (x) => x.sourceLangues)}.`);
  L.push(
    `- Continuité : liens ${compte(cs, (c) => c.continuite.lien)} ; passage ${compte(cs, (c) => c.continuite.passage)} ; 2nde GT sur place ${cs.filter((c) => c.continuite.secondeGtSurPlace).length}. Liens corrigés à la main : ${
      d.colleges.filter((x) => x.college.continuite.lien !== x.detection.choix.lien || (x.college.continuite.lycee?.uai ?? null) !== x.detection.choix.lyceeUai).length
    }.`,
  );
  const parisPublics = d.collegesParisPublics.flatMap((uai) => byUai.get(uai) ?? []);
  L.push(
    `- Affelnet Paris : ${d.affelnet.lignes} lignes ArcGIS ; ${parisPublics.filter((c) => c.affelnetSecteur1 !== null).length}/${parisPublics.length} collèges publics parisiens avec une liste de lycées de secteur 1 (${parisPublics.filter((c) => c.affelnetSecteur1?.length).length} non vides).`,
  );

  L.push('', '### Secteurs', '');
  const sp = d.secteursParis;
  const relies = sp.correspondances.filter((m) => m.match.uai);
  L.push(
    `- Paris (polygones de la Ville) : ${sp.geojson.features.length} secteurs, ${sp.correspondances.length} noms de collèges publiés ; ${new Set(relies.map((m) => m.match.uai)).size}/${d.collegesParisPublics.length} collèges publics reliés (méthodes : ${compte(relies, (m) => m.match.methode ?? '?')}). Simplification : ${sp.positionsAvant} → ${sp.positionsApres} points, ${sp.polygonesAvant} → ${sp.polygonesApres} polygones. Les rues entre les îlots ne sont couvertes par aucun secteur : l'application retient le secteur le plus proche.`,
  );
  const vs = d.verifSecteurs;
  L.push(`- Contrôle de ${vs.length} adresses parisiennes géocodées : ${vs.filter((v) => v.contenant.length).length} dans un polygone, ${vs.filter((v) => !v.contenant.length).length} hors polygone (secteur le plus proche).`);
  const carte = d.carte;
  const rows = carte.rows;
  L.push(
    `- Carte scolaire nationale : ${rows.length} lignes après normalisation des voies (${carte.doublons} doublons retirés, ${carte.ecartees} écartées), ${carte.communes.size} communes, ${carte.uais.size} collèges. Une ligne sans voie (« secteur unique ») couvre toute la commune, ou le reste de la commune quand d'autres lignes listent des voies. Publiée par département hors Paris.`,
  );
  const communesAbsentes = new Set(cs.filter((c) => !collegeAParis(c) && !carte.communes.has(c.commune)).map((c) => c.commune));
  const deduites = [...communesAbsentes].sort().flatMap((commune) => collegeDeduit(commune, cs) ?? []);
  L.push(
    `- Communes absentes de la carte, rattachées par déduction à leur seul collège public (${deduites.length}) : ${deduites.map((c) => `${c.communeLibelle} (${c.commune}, ${c.nom})`).join(', ') || 'aucune'}. Une commune sans collège et absente de la carte (Coubron) n'a pas de secteur connu.`,
  );
  const horsPerim = [...new Set(rows.map((r) => r.uai))].filter((u) => !byUai.has(u)).sort();
  L.push(
    `- UAI de la carte hors périmètre (collèges hors d'Île-de-France desservant une commune francilienne) : ${horsPerim.join(', ') || 'aucun'}. Lignes rattachées à un collège d'une autre commune : ${rows.filter((r) => byUai.get(r.uai) && byUai.get(r.uai)!.commune !== r.insee).length}. Plages « toute la voie » (1–9999) : ${rows.filter((r) => r.voie && (r.debut ?? 0) <= 1 && (r.fin ?? 0) >= 9998).length}.`,
  );
  L.push('');
  const partage = (l: typeof rows) =>
    [...groupBy(l, (r) => `${r.insee}|${r.voie}|${r.debut}|${r.fin}|${r.parite}`).values()].filter((x) => new Set(x.map((r) => r.uai)).size > 1).length;
  L.push(
    table(
      ['Département', 'Communes', 'Lignes', 'Lignes sans voie', 'Communes à secteur unique', 'Tronçons partagés'],
      [...groupBy(rows, (r) => r.insee.slice(0, 2)).entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([dep, l]) => {
          const parCommune = groupBy(l, (r) => r.insee);
          return [dep, parCommune.size, l.length, l.filter((r) => !r.voie).length, [...parCommune.values()].filter((x) => x.every((r) => !r.voie)).length, partage(l)];
        }),
    ),
  );

  L.push('', '### Événements', '');
  const ev = d.events;
  if (!ev.present) L.push('`data/overrides/events.json` absent : fichier vide écrit (saison ' + ev.file.saisonCourante + ').');
  else {
    L.push(
      `${ev.total} événements lus, ${ev.file.events.length} publiés, ${ev.rejetes.length} rejetés, ${ev.horsPerimetre.length} hors périmètre. Statuts d'inscription : ${Object.keys(ev.file.inscriptions).length}.`,
    );
  }

  L.push('', '### Fichiers produits', '');
  L.push(table(['Fichier', 'Taille'], Object.entries(d.tailles).map(([p, t]) => [p, `${(t / 1024).toFixed(0)} ko`])));

  // ================================================================ 2. Anomalies
  L.push('', '## 2. Anomalies', '');
  L.push('Chaque anomalie avec son décompte et les éléments concernés ; « aucun » : contrôle fait, rien à signaler.');
  L.push('');
  const familles = Object.keys(FAMILLES) as FamilleAnomalie[];
  L.push(
    table(
      ['Famille', 'Anomalie', 'Nombre'],
      familles.flatMap((f) => anomalies.filter((a) => a.famille === f).map((a) => [FAMILLES[f].titre, a.titre, a.elements.length])),
    ),
  );
  for (const f of familles) {
    const liste = anomalies.filter((a) => a.famille === f);
    if (!liste.length) continue;
    L.push('', `### ${FAMILLES[f].titre}`, '');
    if (FAMILLES[f].note) L.push(FAMILLES[f].note!, '');
    for (const a of liste) {
      const tete = `**${a.titre} : ${a.elements.length || 'aucun'}.**${a.note ? ` ${a.note}` : ''}`;
      if (!a.elements.length) {
        L.push(tete, '');
      } else if (a.elements.some((e) => e.detail)) {
        const parDetail = groupBy(a.elements, (e) => e.detail ?? '');
        // Détails répétés (raison, précision) : une ligne par détail plutôt qu'une par élément.
        const lignes =
          parDetail.size * 2 <= a.elements.length
            ? [...parDetail.entries()].map(([detail, l]) => `- ${detail || '(sans précision)'} (${l.length}) : ${l.map((e) => libelleElement({ ...e, detail: undefined })).join(', ')}`)
            : a.elements.map((e) => `- ${libelleElement(e)}`);
        L.push(tete, '', ...lignes, '');
      } else {
        L.push(tete, '', `${a.elements.map(libelleElement).join(', ')}.`, '');
      }
    }
    L.pop();
  }

  // ================================================================ 3. Détail des collèges suivis
  L.push('', '## 3. Détail des collèges suivis', '');
  const suivis = d.colleges.filter((x) => x.college.suivi);
  L.push(`${suivis.length} collèges suivis (data/overrides/suivis.json), par UAI. Les autres collèges n'apparaissent que dans les totaux et les anomalies.`);
  if (suivis.length) {
    L.push('', '### Résultats et note maison', '');
    L.push(
      table(
        ['Collège', 'Commune', 'Statut', 'Rang', 'Note', 'Lettre', 'Brevet', 'Écrit', 'VA', 'Partielle', 'Brevet 3 ans (%)', 'Écrit 3 ans', 'VA taux', 'VA note', 'IPS', 'Effectif'],
        suivis.map(({ college: c }) => [
          nomCourt(c),
          c.communeLibelle,
          STATUTS.find(([s]) => s === c.statut)![1] + (c.contrat === 'simple' ? ' (simple)' : ''),
          c.score?.rang,
          c.score?.note,
          c.score?.lettre,
          c.score?.composantes.brevet,
          c.score?.composantes.noteEcrit,
          c.score?.composantes.va,
          c.score?.partielle ? 'oui' : '',
          c.indicateurs.brevet,
          c.indicateurs.noteEcrit,
          c.indicateurs.vaTaux,
          c.indicateurs.vaNote,
          c.indicateurs.ips,
          c.indicateurs.effectif,
        ]),
      ),
    );

    L.push('', '### Langues, options, dispositifs', '');
    L.push(
      table(
        ['Collège', 'Source des langues', 'LV1', 'LV2', 'Anciennes', 'LCE', 'Bilangue', 'SI', 'CHA', 'Sport', 'Dispositifs'],
        suivis.map(({ college: c, sourceLangues }) => [
          nomCourt(c),
          sourceLangues,
          c.langues.lv1.join(', '),
          c.langues.lv2.join(', '),
          c.langues.anciennes.join(', '),
          c.langues.lce.join(', '),
          c.options.bilangue.join(', '),
          c.options.sectionsInternationales.join(', '),
          c.options.cha.join(', '),
          [...c.options.sectionsSportives, ...c.options.sportEtudes.map((s) => `sport-études ${s}`)].join(', '),
          c.options.dispositifs.join(', '),
        ]),
      ),
    );

    L.push('', '### Continuité, secteur, demi-pension', '');
    const secteursDe = groupBy(relies, (m) => m.match.uai!);
    const secteur = (c: College) => {
      if (c.statut !== 'public') return '—';
      if (collegeAParis(c)) return [...new Set((secteursDe.get(c.uai) ?? []).map((m) => m.libelle))].join(', ') || 'aucun';
      return carte.uais.has(c.uai) ? 'carte nationale' : 'absent de la carte';
    };
    L.push(
      table(
        ['Collège', 'Lien', 'Lycée', '2nde GT', 'Passage', 'Détection', 'Lycées de secteur 1 (Affelnet)', 'Secteur', 'Demi-pension', 'Site web'],
        suivis.map((x) => {
          const c = x.college.continuite;
          const auto = x.detection.choix;
          const corr = c.lien !== auto.lien || (c.lycee?.uai ?? null) !== auto.lyceeUai ? ` → corrigé (${c.lien})` : '';
          const ignores = auto.ignores.length ? ` ; non retenus : ${auto.ignores.map((i) => `${i.uai} [${i.regles.join(', ')}]`).join(' ; ')}` : '';
          return [
            nomCourt(x.college),
            c.lien,
            c.lycee ? `${c.lycee.nom} (${c.lycee.uai})` : '',
            c.secondeGtSurPlace ? 'oui' : 'non',
            c.passage,
            `${auto.lien}${auto.regles.length ? ` [${auto.regles.join(', ')}]` : ''}${corr}${ignores}`,
            x.college.affelnetSecteur1?.map((l) => l.nom).join(', ') ?? '',
            secteur(x.college),
            x.college.demiPension === null ? 'inconnue' : x.college.demiPension ? 'oui' : 'non',
            x.college.web ?? '',
          ];
        }),
      ),
    );

    L.push('', '### Anomalies des collèges suivis', '');
    const signalees = suivis
      .map((x) => [x.college, anomalies.filter((a) => a.elements.some((e) => e.uai === x.college.uai))] as const)
      .filter(([, l]) => l.length);
    L.push(signalees.length ? table(['Collège', 'Anomalies'], signalees.map(([c, l]) => [nomCourt(c), l.map((a) => a.titre).join(' ; ')])) : 'Aucune.');
  }
  L.push('');
  return L.join('\n');
}
