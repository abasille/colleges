// npm run data [-- --offline]
// Télécharge les sources (cache data/cache/), fusionne sur l'UAI, applique les corrections manuelles
// (data/overrides/), calcule indicateurs et note maison, écrit public/data/* et data/report.md.
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import type {
  Academie,
  BrevetSession,
  CarteScolaireRow,
  College,
  Dataset,
  IndicateurKey,
  Indicateurs,
  LibelleValeur,
  Niveau,
  ScoreMaison,
  Source,
  Statut,
  ZoneCode,
} from '../../src/types';
import { stripAccents } from '../../src/lib/normalize';
import { configureFetch, fetchWarnings } from './lib/fetch';
import { ANNEE_AFFELNET, ANNEE_SECTEURS_PARIS, loadConfig } from './lib/config';
import { formatNombre, groupBy, niceCase, ratioOfSums, round, sortedObject, weightedMean } from './lib/util';
import { flag, loadAnnuaire, loadAnnuaireUais, type AnnuaireRow } from './sources/annuaire';
import { loadIvacNational, type IvacRow } from './sources/ivac';
import { loadDnb } from './sources/dnb';
import { loadIps } from './sources/ips';
import { loadEffectifs } from './sources/effectifs';
import { loadOnisep } from './sources/onisep';
import { loadSections } from './sources/sections';
import { loadEval6, loadHebergement, loadLabels, loadMoyens, loadPersonnel, loadPix, type PixRow } from './sources/misc';
import {
  choisirLien,
  construireContinuite,
  detecterCandidats,
  loadCites,
  loadVoiesLycees,
  type ContinuiteOverrides,
} from './sources/continuite';
import { loadCarteScolaire, loadSecteursParis } from './sources/secteurs';
import { loadAffelnet } from './sources/affelnet';
import { loadContours } from './sources/contours';
import { agregerIvac, INDICATEURS, raisonsManquantes, referencesIvac } from './indicateurs';
import { classer, composantes, distribution, noteMaison, type Distributions } from './score';
import { construireOptions, GROUPES, optionTags, type OptionLabel } from './options';
import { chargerEvenements } from './events';
import { verifierSecteursParis, verifierVoies } from './controles';
import { renderReport, type ReportData } from './report';

const args = new Set(process.argv.slice(2));
const OFFLINE = args.has('--offline');

const OUT = 'public/data';
/** Tolérance Douglas–Peucker des secteurs parisiens (degrés, ≈ 5,5 m) : fichier < 1 Mo. */
const TOLERANCE_SECTEURS = 0.00005;
const NIVEAUX: Niveau[] = ['6e', '5e', '4e', '3e'];
interface CollegeOverride {
  nom?: string;
  recrutementParticulier?: string | null;
  niveaux?: Niveau[];
  remarques?: string[];
  web?: string | null;
  demiPension?: boolean | null;
  aVerifier?: string;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf-8')) as T;
}

function step(label: string) {
  console.log(`\n▸ ${label}`);
}

function academieDe(s: string | null | undefined): Academie | null {
  const a = stripAccents(s ?? '').trim();
  if (a === 'PARIS') return 'Paris';
  if (a === 'CRETEIL') return 'Créteil';
  return null;
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

function fileSize(path: string): number {
  return statSync(path).size;
}

/** GeoJSON / tableau : une entité par ligne (diffs lisibles). */
function jsonParLigne(items: unknown[], wrap?: (body: string) => string): string {
  const body = `[\n${items.map((x) => JSON.stringify(x)).join(',\n')}\n]`;
  return (wrap ? wrap(body) : body) + '\n';
}

async function main() {
  const t0 = Date.now();
  configureFetch({ offline: OFFLINE });
  console.log(`Pipeline de données${OFFLINE ? ' (hors ligne : cache uniquement)' : ''}`);
  const cfg = loadConfig();
  const zoneByCode = new Map(cfg.zones.map((z) => [z.code, z]));
  const collegeOverrides = readJson<{ colleges: Record<string, CollegeOverride> }>('data/overrides/colleges.json').colleges;
  const contOverrides = readJson<ContinuiteOverrides>('data/overrides/continuite.json').colleges;

  step("Annuaire de l'éducation");
  const ann = await loadAnnuaire(cfg);
  const uais = ann.colleges.map((r) => r.identifiant_de_l_etablissement);
  const perimetre = new Set(uais);
  console.log(`  ${uais.length} collèges dans le périmètre, ${ann.lycees.length} lycées (75, 94)`);
  const lyceesOverrides = Object.values(contOverrides)
    .map((o) => o.lyceeUai)
    .filter((u): u is string => !!u && !ann.byUai.has(u));
  for (const r of await loadAnnuaireUais(lyceesOverrides)) ann.byUai.set(r.identifiant_de_l_etablissement, r);

  step('IVAC (France entière)');
  const ivacAll = await loadIvacNational();
  const sessionsIvac = [...new Set(ivacAll.map((r) => r.session))].sort((a, b) => a - b);
  const derniereSession = sessionsIvac[sessionsIvac.length - 1];
  const sessionsRef = sessionsIvac.slice(-3);
  const ivacByUai = groupBy(ivacAll, (r) => r.uai);
  console.log(`  ${ivacAll.length} lignes, sessions ${sessionsIvac.join(', ')} ; référence ${sessionsRef.join(', ')}`);

  step('Brevet (DNB), IPS, effectifs');
  const dnb = groupBy(await loadDnb(uais), (r) => r.uai);
  const ipsRows = await loadIps(uais);
  const ips = groupBy(ipsRows, (r) => r.uai);
  const derniereIps = Math.max(...ipsRows.map((r) => r.annee));
  const effRows = await loadEffectifs(uais);
  const eff = groupBy(effRows, (r) => r.uai);
  const derniersEffectifs = Math.max(...effRows.map((r) => r.annee));

  step('ONISEP, sections, langues');
  const onisep = await loadOnisep(uais);
  const sections = await loadSections(uais);

  step('Évaluations 6e, encadrement, personnel, demi-pension, labels, Pix');
  const eval6 = await loadEval6(uais);
  const eval6ByUai = groupBy(eval6.perimetre, (r) => r.uai);
  const moyens = await loadMoyens(uais);
  const moyensByUai = groupBy(moyens.perimetre, (r) => r.uai);
  const personnelRows = await loadPersonnel(uais);
  const personnelByUai = groupBy(personnelRows, (r) => String(r.identifiant_de_l_etablissement));
  const heberg = groupBy(await loadHebergement(uais), (r) => r.uai);
  const labels = await loadLabels(uais);
  const pix = groupBy(await loadPix(uais), (r) => r.uai);

  step('Continuité (cités scolaires, lycées)');
  const cites = await loadCites();
  const detections = new Map(
    ann.colleges.map((c) => {
      const cands = detecterCandidats(c, ann.lycees, cites);
      return [c.identifiant_de_l_etablissement, { candidats: cands, choix: choisirLien(c, cands) }] as const;
    }),
  );
  const lyceesLies = new Set<string>();
  for (const [uai, d] of detections) {
    const o = contOverrides[uai];
    const l = o?.lyceeUai !== undefined ? o.lyceeUai : d.choix.lyceeUai;
    if (l) lyceesLies.add(l);
  }
  const voies = await loadVoiesLycees([...lyceesLies].sort());

  step('Affelnet Paris');
  const affelnet = await loadAffelnet();

  step('Contours et secteurs');
  const contours = await loadContours(cfg.zones, { tolerance: 0.00002, decimals: 5 });
  const collegesParisPublics = ann.colleges.filter((c) => c.code_commune?.startsWith('751') && c.statut_public_prive === 'Public');
  const secteursParis = await loadSecteursParis(
    collegesParisPublics.map((c) => ({ uai: c.identifiant_de_l_etablissement, nom: c.nom_etablissement, adresse: c.adresse_1 })),
    { tolerance: TOLERANCE_SECTEURS, decimals: 5, minHoleArea: 100, minPolygonArea: 10 },
  );
  const communes94 = cfg.zones.filter((z) => z.code.startsWith('94')).map((z) => z.code);
  const carte = await loadCarteScolaire(communes94);

  step('Contrôles (normalisation des voies, secteurs parisiens)');
  const verifVoies = await verifierVoies(carte.brut, 25);
  console.log(`  ${verifVoies.filter((v) => v.ok).length}/${verifVoies.length} libellés identiques après normalisation`);
  const verifSecteurs = await verifierSecteursParis(secteursParis.geojson);
  console.log(`  secteurs parisiens : ${verifSecteurs.filter((v) => v.contenant.length).length}/${verifSecteurs.length} adresses test dans un polygone`);

  step('Événements');
  const events = chargerEvenements('data/overrides/events.json', perimetre, cfg.saisonCourante);

  // ---------------------------------------------------------------- calculs nationaux
  step('Calculs');
  const aggNational = [...ivacByUai.entries()].map(([uai, rows]) => ({ uai, agg: agregerIvac(rows, sessionsRef) }));
  const dists: Distributions = {
    brevet: distribution(aggNational.map((x) => x.agg.brevet)),
    noteEcrit: distribution(aggNational.map((x) => x.agg.noteEcrit)),
    vaTaux: distribution(aggNational.map((x) => x.agg.vaTaux)),
    vaNote: distribution(aggNational.map((x) => x.agg.vaNote)),
  };
  console.log(
    `  distributions nationales : brevet ${dists.brevet.length}, note écrit ${dists.noteEcrit.length}, VA taux ${dists.vaTaux.length}, VA note ${dists.vaNote.length} collèges`,
  );

  // ---------------------------------------------------------------- assemblage par collège
  const optionLabels = new Map<string, OptionLabel>();
  const scores = new Map<string, Omit<ScoreMaison, 'rang' | 'sur'>>();
  const colleges: College[] = [];
  const rapportColleges: ReportData['colleges'] = [];

  for (const r of ann.colleges) {
    const uai = r.identifiant_de_l_etablissement;
    const zone = zoneByCode.get(r.code_commune as ZoneCode);
    if (!zone) throw new Error(`${uai} : commune ${r.code_commune} hors configuration`);
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
    if (statut === 'public' && zone.academie === 'Paris') {
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

    const lat = r.latitude ?? onisep.structures.get(uai)?.lat ?? null;
    const lon = r.longitude ?? onisep.structures.get(uai)?.lon ?? null;
    if (lat === null || lon === null) throw new Error(`${uai} : coordonnées manquantes`);
    const persoRows = (personnelByUai.get(uai) ?? []).sort((a, b) =>
      String(b.annee_de_la_rentree_scolaire).localeCompare(String(a.annee_de_la_rentree_scolaire)),
    );

    const college: College = {
      uai,
      nom: ov.nom ?? r.nom_etablissement,
      statut,
      contrat,
      zone: zone.code,
      zoneLibelle: zone.libelle,
      academie: zone.academie,
      adresse: r.adresse_1 ?? '',
      codePostal: r.code_postal ?? '',
      lat: round(lat, 6)!,
      lon: round(lon, 6)!,
      web: ov.web !== undefined ? ov.web : r.web || null,
      telephone: r.telephone || null,
      mail: r.mail || null,
      ficheOnisep: r.fiche_onisep || null,
      rep: r.appartenance_education_prioritaire === 'REP+' ? 'REP+' : r.appartenance_education_prioritaire === 'REP' ? 'REP' : null,
      recrutementParticulier: ov.recrutementParticulier ?? null,
      niveaux,
      accueilSixieme: niveaux.includes('6e'),
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

  // Rang dans la zone
  const rangs = classer([...scores.entries()].map(([uai, s]) => ({ uai, note: s.note })));
  for (const c of colleges) {
    const s = scores.get(c.uai);
    const rg = rangs.get(c.uai);
    if (s && rg) c.score = { ...s, ...rg };
  }

  // ---------------------------------------------------------------- références
  const references: Dataset['references'] = { france: {}, academies: { Paris: {}, Créteil: {} } };
  const setRef = (target: Partial<Record<IndicateurKey, number>>, values: Partial<Record<IndicateurKey, number | null>>) => {
    for (const [k, v] of Object.entries(values)) {
      const d = k === 'heuresParEleve' ? 2 : 1;
      const rv = round(v, d);
      if (rv !== null) target[k as IndicateurKey] = rv;
    }
  };
  setRef(references.france, referencesIvac(ivacAll, sessionsRef, derniereSession));
  for (const ac of ['Paris', 'Créteil'] as Academie[]) {
    setRef(references.academies[ac], referencesIvac(ivacAll.filter((x) => academieDe(x.academie) === ac), sessionsRef, derniereSession));
  }
  const ipsCourants = ipsRows.filter((x) => x.annee === derniereIps);
  setRef(references.france, { ips: ipsCourants.find((x) => x.national !== null)?.national ?? null });
  for (const ac of ['Paris', 'Créteil'] as Academie[]) {
    setRef(references.academies[ac], { ips: ipsCourants.find((x) => academieDe(x.academie) === ac && x.academique !== null)?.academique ?? null });
  }
  const e6Ref = (rows: typeof eval6.national) => ({
    eval6Francais: weightedMean(rows.filter((x) => x.discipline === 'francais').map((x) => [x.score, x.effectif])),
    eval6Maths: weightedMean(rows.filter((x) => x.discipline === 'maths').map((x) => [x.score, x.effectif])),
  });
  setRef(references.france, e6Ref(eval6.national));
  for (const ac of ['Paris', 'Créteil'] as Academie[]) setRef(references.academies[ac], e6Ref(eval6.national.filter((x) => academieDe(x.academie) === ac)));
  const moRef = (rows: typeof moyens.national) => ({
    elevesParClasse: ratioOfSums(rows.map((x) => [x.numES, x.denES]), 1),
    heuresParEleve: ratioOfSums(rows.map((x) => [x.numHE, x.denHE]), 1),
  });
  setRef(references.france, moRef(moyens.national));
  for (const ac of ['Paris', 'Créteil'] as Academie[]) setRef(references.academies[ac], moRef(moyens.national.filter((x) => academieDe(x.academie) === ac)));
  references.france = sortedObject(references.france);
  references.academies = { Paris: sortedObject(references.academies.Paris), Créteil: sortedObject(references.academies['Créteil']) };

  // ---------------------------------------------------------------- sources
  const dnbSessions = [...dnb.values()].flat().map((d) => d.session);
  const ipsAnnees = ipsRows.map((x) => x.annee);
  const effAnnees = effRows.map((x) => x.annee);
  const today = new Date().toISOString().slice(0, 10);
  const ed = (id: string) => `https://data.education.gouv.fr/explore/dataset/${id}/`;
  const LO = 'Licence Ouverte 2.0';
  const sources: Source[] = [
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
    { id: 'contours', label: 'Contours des communes et arrondissements (geo.api.gouv.fr)', url: 'https://geo.api.gouv.fr/decoupage-administratif', licence: LO, millesime: `extraction du ${today}` },
    { id: 'geocodage', label: 'Géocodage des adresses (Géoplateforme IGN, dans le navigateur)', url: 'https://data.geopf.fr/geocodage', licence: LO, millesime: 'en direct' },
  ];

  // ---------------------------------------------------------------- écriture
  colleges.sort((a, b) => a.uai.localeCompare(b.uai));
  const optionLabelsObj = Object.fromEntries(
    [...optionLabels.entries()].sort(
      ([ka, a], [kb, b]) => GROUPES.indexOf(a.groupe) - GROUPES.indexOf(b.groupe) || a.label.localeCompare(b.label, 'fr') || ka.localeCompare(kb),
    ),
  );
  const dataset: Dataset = {
    generatedAt: new Date().toISOString(),
    sessions: { brevet: sessionsRef, ips: derniereIps, effectifs: derniersEffectifs },
    zones: cfg.zones,
    references,
    optionLabels: optionLabelsObj,
    sources,
    colleges,
  };
  mkdirSync(OUT, { recursive: true });
  const files = {
    colleges: `${OUT}/colleges.json`,
    contours: `${OUT}/contours.geojson`,
    secteurs: `${OUT}/secteurs-paris.geojson`,
    carte: `${OUT}/carte-scolaire-94.json`,
    events: `${OUT}/events.json`,
  };
  writeFileSync(files.colleges, JSON.stringify(dataset, null, 1) + '\n');
  writeFileSync(files.contours, jsonParLigne(contours.features, (b) => `{"type":"FeatureCollection","features":${b}}`));
  writeFileSync(files.secteurs, jsonParLigne(secteursParis.geojson.features, (b) => `{"type":"FeatureCollection","features":${b}}`));
  const carteRows: CarteScolaireRow[] = carte.rows;
  writeFileSync(files.carte, jsonParLigne(carteRows));
  writeFileSync(files.events, JSON.stringify(events.file, null, 1) + '\n');

  const tailles = Object.fromEntries(Object.values(files).map((p) => [p, fileSize(p)]));

  // ---------------------------------------------------------------- rapport
  const report: ReportData = {
    generatedAt: dataset.generatedAt,
    offline: OFFLINE,
    fetchWarnings,
    cfg,
    exclus: ann.exclus,
    colleges: rapportColleges,
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
    carte: { rows: carte.rows, doublons: carte.doublons },
    verifVoies,
    verifSecteurs,
    affelnet: { lignes: affelnet.length },
    events,
    tailles,
    indicateurs: INDICATEURS,
    dureeSecondes: (Date.now() - t0) / 1000,
  };
  writeFileSync('data/report.md', renderReport(report));

  console.log('\nFichiers écrits :');
  for (const [p, n] of Object.entries(tailles)) console.log(`  ${p.padEnd(36)} ${(n / 1024).toFixed(0).padStart(6)} ko`);
  console.log(`  data/report.md`);
  const parStatut = groupBy(colleges, (c) => c.statut);
  console.log(
    `\n${colleges.length} collèges (${[...parStatut.entries()].map(([s, l]) => `${l.length} ${s}`).join(', ')}), ${scores.size} notés, en ${((Date.now() - t0) / 1000).toFixed(1)} s`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
