// Rapport d'anomalies data/report.md (relu à chaque mise à jour des données).
import type { CarteScolaireRow, College, Dataset, IndicateurKey } from '../../src/types';
import { normalizeNom } from '../../src/lib/normalize';
import type { Config } from './lib/config';
import type { AnnuaireRow } from './sources/annuaire';
import type { Candidat, DetectionLien } from './sources/continuite';
import type { OnisepStructure } from './sources/onisep';
import type { SecteursParisResult } from './sources/secteurs';
import type { VerifSecteur, VerifVoie } from './controles';
import type { EventsResult } from './events';
import { groupBy } from './lib/util';

export interface ReportData {
  generatedAt: string;
  offline: boolean;
  fetchWarnings: string[];
  cfg: Config;
  exclus: AnnuaireRow[];
  colleges: {
    college: College;
    annuaire: AnnuaireRow;
    detection: { candidats: Candidat[]; choix: DetectionLien };
    sourceLangues: string;
    dispositifsInconnus: string[];
    noms: Record<string, string | null>;
    presence: Record<string, boolean>;
    aVerifier: string | null;
    demiPension: { demiPensionnaires: number | null; annee: number | null; restauration: boolean };
  }[];
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
  carte: { rows: CarteScolaireRow[]; doublons: number };
  verifVoies: VerifVoie[];
  verifSecteurs: VerifSecteur[];
  affelnet: { lignes: number };
  events: EventsResult;
  tailles: Record<string, number>;
  indicateurs: IndicateurKey[];
  dureeSecondes: number;
}

const STATUTS: Record<string, string> = { public: 'public', prive_sous_contrat: 'privé sous contrat', hors_contrat: 'hors contrat' };

function table(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const esc = (v: string | number | null | undefined) => (v === null || v === undefined ? '' : String(v).replace(/\|/g, '\\|').replace(/\n/g, ' '));
  return [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.map(esc).join(' | ')} |`)].join('\n');
}

function nomCourt(c: College): string {
  return `${c.nom} (${c.uai})`;
}

const MOTS_GENERIQUES = new Set(['DE', 'DU', 'DES', 'LA', 'LE', 'LES', 'L', 'D', 'ET', 'SAINT', 'SAINTE', 'NOTRE', 'DAME', 'ECOLE']);

/** Vrai si deux noms n'ont aucun mot significatif en commun. */
export function nomsDivergents(a: string, b: string): boolean {
  const ta = normalizeNom(a).split(' ').filter((w) => w.length > 1 && !MOTS_GENERIQUES.has(w));
  const tb = new Set(normalizeNom(b).split(' ').filter((w) => w.length > 1 && !MOTS_GENERIQUES.has(w)));
  if (ta.length === 0 || tb.size === 0) return false;
  return !ta.some((w) => tb.has(w));
}

export function renderReport(d: ReportData): string {
  const L: string[] = [];
  const cs = d.colleges.map((x) => x.college);
  const byUai = new Map(cs.map((c) => [c.uai, c]));
  const n = cs.length;

  L.push('# Rapport de la mise à jour des données');
  L.push('');
  L.push(`Généré le ${d.generatedAt} par \`npm run data\`${d.offline ? ' (mode hors ligne : cache uniquement)' : ''} en ${d.dureeSecondes.toFixed(0)} s. Fichier régénéré à chaque exécution : ne pas éditer à la main.`);
  if (d.fetchWarnings.length) {
    L.push('');
    L.push('**Échecs de téléchargement (copie en cache réutilisée) :**');
    for (const w of d.fetchWarnings) L.push(`- ${w}`);
  }

  // Périmètre
  L.push('', '## 1. Périmètre', '');
  const parStatut = groupBy(cs, (c) => c.statut);
  L.push(`**${n} collèges** : ${[...parStatut.entries()].map(([s, l]) => `${l.length} ${STATUTS[s]}`).join(', ')}.`);
  const simples = cs.filter((c) => c.contrat === 'simple');
  if (simples.length) L.push(`Dont sous contrat simple : ${simples.map(nomCourt).join(', ')}.`);
  L.push('');
  L.push(
    table(
      ['Zone', 'Public', 'Privé sous contrat', 'Hors contrat', 'Total'],
      d.cfg.zones.map((z) => {
        const l = cs.filter((c) => c.zone === z.code);
        return [z.libelle, l.filter((c) => c.statut === 'public').length, l.filter((c) => c.statut === 'prive_sous_contrat').length, l.filter((c) => c.statut === 'hors_contrat').length, l.length];
      }),
    ),
  );
  L.push('');
  if (d.exclus.length) {
    L.push(`Collèges (natures ${d.cfg.codesNature.join(', ')}) écartés par \`data/config.json\` : ${d.exclus.map((r) => `${r.nom_etablissement} (${r.identifiant_de_l_etablissement})`).join(', ')}.`);
  }
  const exclusAbsents = d.cfg.exclure.filter((u) => !d.exclus.some((r) => r.identifiant_de_l_etablissement === u));
  if (exclusAbsents.length) {
    L.push(`UAI exclus par \`data/config.json\` déjà hors des natures ${d.cfg.codesNature.join(', ')} (EREA, lycées) — exclusion de précaution : ${exclusAbsents.join(', ')}.`);
  }
  const fermes = d.colleges.filter((x) => x.annuaire.etat && x.annuaire.etat !== 'OUVERT');
  if (fermes.length) L.push(`⚠️ Établissements non « OUVERT » dans l'annuaire : ${fermes.map((x) => nomCourt(x.college)).join(', ')}.`);
  const geoloc = d.colleges.filter((x) => x.annuaire.precision_localisation && !/num[ée]ro de rue/i.test(x.annuaire.precision_localisation));
  if (geoloc.length) L.push(`Géolocalisation approximative (annuaire) : ${geoloc.map((x) => `${nomCourt(x.college)} — ${x.annuaire.precision_localisation}`).join(' ; ')}.`);
  const dpConflits = d.colleges.filter((x) => x.demiPension.demiPensionnaires !== null && (x.demiPension.demiPensionnaires > 0) !== x.demiPension.restauration);
  if (dpConflits.length) {
    L.push(
      `Demi-pension (jeu « hébergement » retenu) en désaccord avec le champ \`restauration\` de l'annuaire : ${dpConflits
        .map((x) => `${nomCourt(x.college)} — ${x.demiPension.demiPensionnaires} demi-pensionnaires en ${x.demiPension.annee}, restauration ${x.demiPension.restauration ? '1' : '0'}`)
        .join(' ; ')}.`,
    );
  }
  const dpInconnue = cs.filter((c) => c.demiPension === null);
  L.push(`Demi-pension inconnue : ${dpInconnue.map(nomCourt).join(', ') || 'aucun'}.`);
  const sansWeb = d.colleges.filter((x) => !x.annuaire.web);
  L.push(
    `Sans site web dans l'annuaire : ${sansWeb.length ? sansWeb.map((x) => `${nomCourt(x.college)}${x.college.web ? ' (corrigé)' : ''}`).join(', ') : 'aucun'}.`,
  );

  // Millésimes
  L.push('', '## 2. Millésimes', '');
  L.push(`- Brevet : moyenne des sessions ${d.sessionsRef.join(', ')} (IVAC, \`Dataset.sessions.brevet\`), dernière session ${d.derniereSession} ; historique DNB 2015–2021 (tous candidats) puis IVAC (série générale).`);
  L.push(`- IPS : rentrée ${d.derniereIps}-${d.derniereIps + 1}. Effectifs : rentrée ${d.derniersEffectifs}. Évaluations 6e : ${d.eval6Annee ?? '—'}. Encadrement : rentrée ${d.moyensAnnee ?? '—'}.`);
  L.push(`- Distributions nationales de la note maison (collèges ayant l'indicateur sur ${d.sessionsRef.join('–')}) : brevet ${d.distributions.brevet}, note à l'écrit ${d.distributions.noteEcrit}, VA du taux ${d.distributions.vaTaux}, VA de la note ${d.distributions.vaNote}.`);

  // Indicateurs manquants
  L.push('', '## 3. Valeurs manquantes par indicateur', '');
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
  const sansRaison = cs.flatMap((c) => d.indicateurs.filter((k) => c.indicateurs[k] === null && !c.manquants[k]).map((k) => `${c.uai}.${k}`));
  if (sansRaison.length) L.push('', `⚠️ Valeurs manquantes sans raison : ${sansRaison.join(', ')}.`);
  L.push('');
  L.push('Détail des collèges sous contrat (hors contrat simple) sans résultat ou sans valeur ajoutée :');
  L.push('');
  const detail = cs.filter((c) => c.statut !== 'hors_contrat' && c.contrat !== 'simple' && (c.indicateurs.brevet === null || c.indicateurs.vaTaux === null || c.indicateurs.brevetDernier === null));
  if (detail.length === 0) L.push('- aucun');
  for (const c of detail) {
    const parts = (['brevet', 'brevetDernier', 'vaTaux', 'vaNote'] as IndicateurKey[]).filter((k) => c.indicateurs[k] === null).map((k) => `${k} : ${c.manquants[k]}`);
    L.push(`- ${nomCourt(c)} — ${parts.join(' ; ')}`);
  }

  // Note maison
  L.push('', '## 4. Note maison', '');
  const notes = cs.filter((c) => c.score).sort((a, b) => a.score!.rang - b.score!.rang);
  const partielles = notes.filter((c) => c.score!.partielle);
  const lettres = groupBy(notes, (c) => c.score!.lettre);
  L.push(`${notes.length} collèges notés sur ${n} (${partielles.length} notes partielles). Lettres : ${['A', 'B', 'C', 'D', 'E'].map((l) => `${l} ${lettres.get(l as 'A')?.length ?? 0}`).join(', ')}.`);
  L.push('');
  L.push(
    table(
      ['Rang', 'Collège', 'Note', 'Lettre', 'Brevet', 'Écrit', 'VA', 'Partielle', 'Brevet 3 ans (%)', 'Écrit 3 ans', 'VA taux', 'VA note'],
      notes.map((c) => [
        c.score!.rang,
        nomCourt(c),
        c.score!.note,
        c.score!.lettre,
        c.score!.composantes.brevet,
        c.score!.composantes.noteEcrit,
        c.score!.composantes.va,
        c.score!.partielle ? 'oui' : '',
        c.indicateurs.brevet,
        c.indicateurs.noteEcrit,
        c.indicateurs.vaTaux,
        c.indicateurs.vaNote,
      ]),
    ),
  );
  const nonNotes = cs.filter((c) => !c.score);
  L.push('', `Non notés (${nonNotes.length}) : ${nonNotes.map((c) => `${c.nom} (${c.manquants.note ?? '?'})`).join(' ; ')}.`);

  // Références
  L.push('', '## 5. Moyennes de référence', '');
  const keys = [...new Set([...Object.keys(d.references.france), ...Object.keys(d.references.academies.Paris), ...Object.keys(d.references.academies['Créteil'])])] as IndicateurKey[];
  L.push(table(['Indicateur', 'France', 'Académie de Paris', 'Académie de Créteil'], keys.map((k) => [k, d.references.france[k], d.references.academies.Paris[k], d.references.academies['Créteil'][k]])));

  // Absences par jeu
  L.push('', '## 6. Collèges absents de chaque jeu de données', '');
  L.push('Les hors contrat ne sont présents dans aucun jeu statistique ; ils sont listés à part.');
  L.push('');
  const libJeux: Record<string, string> = {
    ivac: `IVAC session ${d.derniereSession}`,
    dnb2021: 'DNB session 2021',
    ips: `IPS ${d.derniereIps}`,
    effectifs: `Effectifs ${d.derniersEffectifs}`,
    eval6: `Évaluations 6e ${d.eval6Annee ?? ''}`,
    encadrement: `Encadrement ${d.moyensAnnee ?? ''}`,
    personnel: 'Personnel',
    hebergement: 'Hébergement (demi-pension)',
    onisepStructures: 'ONISEP Idéo-Structures',
    onisepLangues: 'ONISEP Idéo-Langues',
    onisepDispositifs: 'ONISEP dispositifs (aucune entrée)',
  };
  const hc = d.colleges.filter((x) => x.college.statut === 'hors_contrat');
  const sousContrat = d.colleges.filter((x) => x.college.statut !== 'hors_contrat');
  L.push(
    table(
      ['Jeu', 'Absents (public / sous contrat)', 'Hors contrat présents'],
      Object.entries(libJeux).map(([k, lib]) => [
        lib,
        sousContrat.filter((x) => !x.presence[k]).map((x) => nomCourt(x.college)).join(', ') || '—',
        `${hc.filter((x) => x.presence[k]).length}/${hc.length}`,
      ]),
    ),
  );

  // Noms divergents
  L.push('', '## 7. Noms divergents entre sources', '');
  L.push("Collèges dont le nom dans une source n'a aucun mot significatif commun avec celui de l'annuaire (jointure faite sur l'UAI, à vérifier : renommage, erreur d'UAI…).");
  L.push('');
  const div: string[][] = [];
  for (const x of d.colleges) {
    for (const [src, nom] of Object.entries(x.noms)) {
      if (nom && nomsDivergents(x.annuaire.nom_etablissement, nom)) div.push([x.college.uai, x.annuaire.nom_etablissement, src, nom]);
    }
  }
  L.push(div.length ? table(['UAI', 'Annuaire', 'Source', 'Nom dans la source'], div) : '- aucun');
  const renomme = d.colleges.filter((x) => x.college.nom !== x.annuaire.nom_etablissement);
  if (renomme.length) {
    L.push('', 'Noms corrigés par `data/overrides/colleges.json` :', '');
    for (const x of renomme) L.push(`- ${x.college.uai} : « ${x.annuaire.nom_etablissement} » → « ${x.college.nom} »`);
  }

  // Options
  L.push('', '## 8. Langues, options, dispositifs', '');
  const srcL = groupBy(d.colleges, (x) => x.sourceLangues);
  L.push(`Langues vivantes : ${[...srcL.entries()].map(([s, l]) => `${s} ${l.length}`).join(', ')}.`);
  const sansLv = d.colleges.filter((x) => x.sourceLangues === 'aucune').map((x) => nomCourt(x.college));
  if (sansLv.length) L.push(`Sans LV1/LV2 connues : ${sansLv.join(', ')}.`);
  if (d.onisep.structuresIgnorees.length) {
    L.push(`Fiches Idéo-Structures écartées (même UAI qu'un collège mais autre type) : ${d.onisep.structuresIgnorees.map((s) => `${s.uai} « ${s.nom} » (${s.type})`).join(' ; ')}.`);
  }
  if (d.onisep.dispositifsIgnores.length) {
    L.push(`Dispositifs ONISEP écartés (lieu non collège) : ${d.onisep.dispositifsIgnores.map((s) => `${s.uai} ${s.intitule} (${s.typeEtablissement})`).join(' ; ')}.`);
  }
  const inconnus = d.colleges.flatMap((x) => x.dispositifsInconnus.map((t) => `${x.college.uai} : ${t}`));
  if (inconnus.length) L.push(`Dispositifs ONISEP non classés : ${inconnus.join(' ; ')}.`);
  L.push('');
  L.push(
    table(
      ['Collège', 'LV1', 'LV2', 'Anciennes', 'LCE', 'Bilangue', 'SI', 'CHA', 'Sport', 'Dispositifs'],
      cs.map((c) => [
        nomCourt(c),
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

  // Continuité
  L.push('', "## 9. Continuité jusqu'au bac", '');
  const parLien = groupBy(cs, (c) => c.continuite.lien);
  const parPassage = groupBy(cs, (c) => c.continuite.passage);
  L.push(`Liens : ${[...parLien.entries()].map(([k, l]) => `${k} ${l.length}`).join(', ')}. Passage : ${[...parPassage.entries()].map(([k, l]) => `${k} ${l.length}`).join(', ')}. 2nde GT sur place : ${cs.filter((c) => c.continuite.secondeGtSurPlace).length}.`);
  L.push('');
  L.push(
    table(
      ['Collège', 'Lien', 'Lycée', '2nde GT', 'Passage', 'Détection'],
      d.colleges
        .filter((x) => x.college.continuite.lien !== 'aucun' || x.detection.candidats.length)
        .map((x) => {
          const c = x.college.continuite;
          const auto = x.detection.choix;
          const corr = c.lien !== auto.lien || (c.lycee?.uai ?? null) !== auto.lyceeUai ? ` → corrigé (${c.lien})` : '';
          return [
            nomCourt(x.college),
            c.lien,
            c.lycee ? `${c.lycee.nom} (${c.lycee.uai})` : '',
            c.secondeGtSurPlace ? 'oui' : 'non',
            c.passage,
            `${auto.lien}${auto.regles.length ? ` [${auto.regles.join(', ')}]` : ''}${corr}`,
          ];
        }),
    ),
  );
  const ignores = d.colleges.filter((x) => x.detection.choix.ignores.length);
  if (ignores.length) {
    L.push('', 'Autres lycées candidats non retenus :', '');
    for (const x of ignores) L.push(`- ${nomCourt(x.college)} : ${x.detection.choix.ignores.map((c) => `${c.uai} [${c.regles.join(', ')}]`).join(' ; ')}`);
  }

  // Affelnet
  L.push('', '## 10. Lycées de secteur 1 (Affelnet Paris)', '');
  const parisPublics = cs.filter((c) => c.statut === 'public' && c.academie === 'Paris');
  const sansAff = parisPublics.filter((c) => c.affelnetSecteur1 === null);
  L.push(`${d.affelnet.lignes} lignes ArcGIS. ${parisPublics.length - sansAff.length}/${parisPublics.length} collèges publics parisiens avec une liste (${parisPublics.filter((c) => c.affelnetSecteur1?.length).length} non vides). Absents de la carte : ${sansAff.map(nomCourt).join(', ') || 'aucun'}.`);
  L.push('');
  for (const c of parisPublics.filter((c) => c.affelnetSecteur1)) {
    L.push(`- ${c.nom} : ${c.affelnetSecteur1!.map((l) => l.nom).join(', ')}`);
  }

  // Secteurs Paris
  L.push('', '## 11. Secteurs parisiens (jointure par nom)', '');
  const sp = d.secteursParis;
  const matched = new Set(sp.correspondances.filter((m) => m.match.uai).map((m) => m.match.uai!));
  const nonApparies = d.collegesParisPublics.filter((u) => !matched.has(u));
  L.push(`${sp.geojson.features.length} secteurs publiés, ${sp.correspondances.length} noms de collèges. ${matched.size}/${d.collegesParisPublics.length} collèges publics parisiens du périmètre associés à un secteur.`);
  L.push(`Collèges publics parisiens du périmètre sans secteur : ${nonApparies.map((u) => nomCourt(byUai.get(u)!)).join(', ') || 'aucun'} (Rognoni n'a pas de secteur : recrutement sur dossier).`);
  const sansPerimetre = sp.geojson.features.filter((f) => f.properties.uais.length === 0).length;
  L.push(`Secteurs sans collège du périmètre (autres arrondissements, conservés pour les adresses hors zone) : ${sansPerimetre}. Noms ambigus : ${sp.correspondances.filter((m) => !m.match.uai && m.match.candidats.length > 1).length}.`);
  L.push('');
  L.push(
    table(
      ['Secteur', 'Nom publié', 'Collège', 'Méthode', 'Adresse concordante'],
      sp.correspondances
        .filter((m) => m.match.uai || m.match.candidats.length)
        .map((m) => [
          m.libelle,
          m.nom,
          m.match.uai ? byUai.get(m.match.uai)?.nom ?? m.match.uai : `ambigu : ${m.match.candidats.join(', ')}`,
          m.match.methode,
          m.match.adresseConcordante === null ? '—' : m.match.adresseConcordante ? 'oui' : '⚠️ non',
        ]),
    ),
  );
  const multi = [...groupBy(sp.correspondances.filter((m) => m.match.uai), (m) => m.match.uai!).entries()].filter(([, l]) => l.length > 1);
  if (multi.length) L.push('', `Collèges associés à plusieurs secteurs : ${multi.map(([u, l]) => `${u} (${l.map((m) => m.libelle).join(', ')})`).join(' ; ')}.`);
  L.push(
    '',
    `Géométrie : chaque secteur publié est une union d'îlots (${sp.polygonesAvant} polygones au total) : **les rues entre les îlots ne sont couvertes par aucun secteur**. Une adresse géocodée sur la chaussée ou en façade tombe donc souvent hors de tout polygone : l'application doit retenir le secteur le plus proche. Simplification : ${sp.positionsAvant} → ${sp.positionsApres} points, ${sp.polygonesApres} polygones (Douglas–Peucker ≈ 5 m, arrondi à 5 décimales, îlots < 10 m² et trous < 100 m² retirés).`,
  );

  const vs = d.verifSecteurs;
  L.push('', `Contrôle sur ${vs.length} adresses géocodées (Géoplateforme) : ${vs.filter((v) => v.contenant.length).length} dans un polygone, ${vs.filter((v) => !v.contenant.length).length} hors polygone (secteur le plus proche indiqué).`, '');
  L.push(table(['Adresse', 'Géocodée', 'Secteur (polygone)', 'Secteur le plus proche', 'Distance (m)'], vs.map((v) => [v.adresse, v.label, v.contenant.join(', '), v.plusProche, v.distance])));

  // Carte scolaire 94
  L.push('', '## 12. Carte scolaire Ivry / Vitry (plages d’adresses)', '');
  const rows = d.carte.rows;
  const parInsee = groupBy(rows, (r) => r.insee);
  const uaisCarte = groupBy(rows, (r) => r.uai);
  L.push(`${rows.length} lignes (${[...parInsee.entries()].map(([k, l]) => `${k} : ${l.length}`).join(', ')}), ${d.carte.doublons} doublons exacts retirés.`);
  const horsPerim = [...uaisCarte.keys()].filter((u) => !byUai.has(u));
  if (horsPerim.length) L.push(`UAI hors périmètre : ${horsPerim.join(', ')}.`);
  const publics94 = cs.filter((c) => c.statut === 'public' && c.academie === 'Créteil');
  const sansRows = publics94.filter((c) => !uaisCarte.has(c.uai));
  L.push(`Collèges publics d'Ivry / Vitry sans adresse : ${sansRows.map(nomCourt).join(', ') || 'aucun'}.`);
  const transfrontaliers = rows.filter((r) => byUai.get(r.uai) && byUai.get(r.uai)!.zone !== r.insee);
  if (transfrontaliers.length) L.push(`Adresses d'une commune rattachées à un collège de l'autre : ${transfrontaliers.length} (${[...groupBy(transfrontaliers, (r) => `${r.insee} → ${byUai.get(r.uai)!.nom}`).entries()].map(([k, l]) => `${k} : ${l.length}`).join(' ; ')}).`);
  const parVoie = groupBy(rows, (r) => `${r.insee}|${r.voie}|${r.debut}|${r.fin}|${r.parite}`);
  const doubles = [...parVoie.entries()].filter(([, l]) => new Set(l.map((r) => r.uai)).size > 1);
  L.push(`Tronçons rattachés à plusieurs collèges : ${doubles.length}${doubles.length ? ` (${doubles.map(([k, l]) => `${k.split('|').slice(0, 2).join(' ')} : ${l.map((r) => r.uai).join('/')}`).join(' ; ')})` : ''}.`);
  L.push(`Plages « toute la voie » (1–9999) : ${rows.filter((r) => (r.debut ?? 0) <= 1 && (r.fin ?? 0) >= 9998).length}/${rows.length} ; \`debut\`/\`fin\` sont publiés tels quels (9999 = jusqu'au bout de la voie).`);

  // Normalisation des voies
  L.push('', '## 13. Normalisation des voies (contrôle Géoplateforme)', '');
  const ok = d.verifVoies.filter((v) => v.ok).length;
  L.push(`Échantillon de ${d.verifVoies.length} libellés de la carte scolaire géocodés « <libellé> <commune> » : **${ok}/${d.verifVoies.length}** identiques après \`normalizeVoie\` (et même code commune).`);
  const ko = d.verifVoies.filter((v) => !v.ok);
  const diagnostic = (v: VerifVoie) => {
    if (!v.obtenu) return 'aucun résultat du géocodeur';
    if (v.citycode !== v.insee) return 'autre commune renvoyée';
    const a = new Set(v.attendu.split(' '));
    const commun = v.obtenu.split(' ').filter((w) => a.has(w)).length;
    return commun / Math.max(a.size, 1) < 0.6 ? 'autre voie renvoyée (voie inconnue du géocodeur ?)' : 'écart de normalisation';
  };
  const ecartsNorm = ko.filter((v) => diagnostic(v) === 'écart de normalisation').length;
  L.push(`Écarts imputables à la normalisation : ${ecartsNorm}/${d.verifVoies.length}.`);
  if (ko.length) {
    L.push('');
    L.push(
      table(
        ['INSEE', 'Carte scolaire', 'Géocodeur (rue)', 'normalizeVoie(géocodeur)', 'Code commune', 'Diagnostic'],
        ko.map((v) => [v.insee, v.libelle, v.rueGeocodeur, v.obtenu, v.citycode, diagnostic(v)]),
      ),
    );
  }

  // Événements
  L.push('', '## 14. Événements', '');
  const ev = d.events;
  if (!ev.present) L.push('`data/overrides/events.json` absent : fichier vide écrit (saison ' + ev.file.saisonCourante + ').');
  else {
    L.push(`${ev.total} événements lus, ${ev.file.events.length} publiés, ${ev.rejetes.length} rejetés, ${ev.horsPerimetre.length} hors périmètre. Statuts d'inscription : ${Object.keys(ev.file.inscriptions).length}.`);
    for (const r of ev.rejetes) L.push(`- rejeté ${r.id} : ${r.raisons.join(', ')}`);
    if (ev.horsPerimetre.length) L.push(`- hors périmètre : ${ev.horsPerimetre.join(', ')}`);
    if (ev.inscriptionsHorsPerimetre.length) L.push(`- inscriptions hors périmètre : ${ev.inscriptionsHorsPerimetre.join(', ')}`);
  }

  // À vérifier
  L.push('', '## 15. À vérifier à la main', '');
  for (const x of d.colleges.filter((x) => x.aVerifier)) L.push(`- ${nomCourt(x.college)} : ${x.aVerifier}`);
  const inconnu = cs.filter((c) => c.continuite.passage === 'inconnu');
  if (inconnu.length) L.push(`- Passage au lycée « inconnu » : ${inconnu.map(nomCourt).join(', ')}.`);
  const nonGarantiPrive = cs.filter((c) => c.statut === 'prive_sous_contrat' && c.continuite.lien === 'meme_etablissement_prive' && c.continuite.passage === 'non_garanti');
  if (nonGarantiPrive.length) L.push(`- Privés sous contrat avec lycée sans formulation sur le passage (« poursuite habituelle, non garantie par écrit ») : ${nonGarantiPrive.length} — ${nonGarantiPrive.map((c) => c.nom).join(', ')}.`);

  // Fichiers
  L.push('', '## 16. Fichiers produits', '');
  L.push(table(['Fichier', 'Taille'], Object.entries(d.tailles).map(([p, t]) => [p, `${(t / 1024).toFixed(0)} ko`])));
  L.push('');
  return L.join('\n');
}
