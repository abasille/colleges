// npm run data [-- --offline]
// Point d'entrée du pipeline, en trois temps : charger les sources (réseau, cache data/cache/, data/overrides/),
// appeler assemblerDataset (tout le calcul, voir assembler.ts), écrire public/data/* et data/report.md.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { configureFetch, fetchWarnings } from './lib/fetch';
import { loadConfig } from './lib/config';
import { loadAnnuaire } from './sources/annuaire';
import { loadIvacNational } from './sources/ivac';
import { loadDnb } from './sources/dnb';
import { loadIps } from './sources/ips';
import { loadEffectifs } from './sources/effectifs';
import { loadOnisep } from './sources/onisep';
import { loadSections } from './sources/sections';
import { loadEval6, loadHebergement, loadLabels, loadMoyens, loadPersonnel, loadPix } from './sources/misc';
import { loadCites, loadVoiesLycees, type ContinuiteOverrides } from './sources/continuite';
import { loadCarteScolaireBrute, loadSecteursParisBruts } from './sources/secteurs';
import { loadAffelnet } from './sources/affelnet';
import { geocoderEtablissements } from './sources/geocodage';
import { lireEvenements } from './events';
import { verifierSecteursParis, verifierVoies } from './controles';
import { renderReport } from './report';
import { assemblerDataset, etablissementsAGeocoder, lyceesLies, uaisDuPerimetre, type Corrections, type CollegeOverride } from './assembler';

const args = new Set(process.argv.slice(2));
const OFFLINE = args.has('--offline');

const OUT = 'public/data';

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf-8')) as T;
}

function step(label: string) {
  console.log(`\n▸ ${label}`);
}

async function main() {
  const t0 = Date.now();
  configureFetch({ offline: OFFLINE });
  console.log(`Pipeline de données${OFFLINE ? ' (hors ligne : cache uniquement)' : ''}`);

  // ---------------------------------------------------------------- chargement
  const config = loadConfig();
  const corrections: Corrections = {
    colleges: readJson<{ colleges: Record<string, CollegeOverride> }>('data/overrides/colleges.json').colleges,
    continuite: readJson<ContinuiteOverrides>('data/overrides/continuite.json').colleges,
    evenements: lireEvenements('data/overrides/events.json'),
  };

  step("Annuaire de l'éducation");
  const annuaire = await loadAnnuaire(config, corrections.continuite);
  const uais = uaisDuPerimetre(config, annuaire);
  console.log(`  ${uais.length} collèges dans le périmètre, ${annuaire.lycees.length} lycées (${config.departements.join(', ')})`);

  const aGeocoder = etablissementsAGeocoder(config, annuaire);
  const geocodage = await geocoderEtablissements(aGeocoder);
  if (aGeocoder.length) console.log(`  ${aGeocoder.length} sans coordonnées dans l'annuaire, ${geocodage.size} géocodés par leur adresse`);

  step('IVAC (France entière)');
  const ivac = await loadIvacNational();
  console.log(`  ${ivac.length} lignes`);

  step('Brevet (DNB), IPS, effectifs');
  const dnb = await loadDnb(uais);
  const ips = await loadIps(uais);
  const effectifs = await loadEffectifs(uais);

  step('ONISEP, sections, langues');
  const onisep = await loadOnisep(uais);
  const sections = await loadSections(uais);

  step('Évaluations 6e, encadrement, personnel, demi-pension, labels, Pix');
  const eval6 = await loadEval6(uais);
  const moyens = await loadMoyens(uais);
  const personnel = await loadPersonnel(uais);
  const hebergement = await loadHebergement(uais);
  const labels = await loadLabels(uais);
  const pix = await loadPix(uais);

  step('Continuité (cités scolaires, lycées)');
  const cites = await loadCites(config.departements);
  const voiesLycees = await loadVoiesLycees(lyceesLies(config, corrections, annuaire, cites));

  step('Affelnet Paris');
  const affelnet = await loadAffelnet();

  step('Secteurs');
  const secteursParis = await loadSecteursParisBruts();
  const carteScolaire = await loadCarteScolaireBrute();

  // ---------------------------------------------------------------- assemblage
  step('Calculs');
  const a = assemblerDataset({
    config,
    corrections,
    sources: {
      annuaire,
      ivac,
      dnb,
      ips,
      effectifs,
      onisep,
      sections,
      eval6,
      moyens,
      personnel,
      hebergement,
      labels,
      pix,
      cites,
      voiesLycees,
      affelnet,
      geocodage,
      secteursParis,
      carteScolaire,
    },
    maintenant: new Date(),
  });
  const d = a.rapport.distributions;
  console.log(`  distributions nationales : brevet ${d.brevet}, note écrit ${d.noteEcrit}, VA taux ${d.vaTaux}, VA note ${d.vaNote} collèges`);

  step('Contrôles (normalisation des voies, secteurs parisiens)');
  const verifVoies = await verifierVoies(a.controles.voiesCarteScolaire, 25);
  console.log(`  ${verifVoies.filter((v) => v.ok).length}/${verifVoies.length} libellés identiques après normalisation`);
  const verifSecteurs = await verifierSecteursParis(a.controles.secteursParis);
  console.log(`  secteurs parisiens : ${verifSecteurs.filter((v) => v.contenant.length).length}/${verifSecteurs.length} adresses test dans un polygone`);

  // ---------------------------------------------------------------- écriture
  mkdirSync(OUT, { recursive: true });
  const tailles: Record<string, number> = {};
  for (const f of a.fichiers) {
    const chemin = `${OUT}/${f.chemin}`;
    writeFileSync(chemin, f.contenu);
    tailles[chemin] = Buffer.byteLength(f.contenu);
  }
  writeFileSync(
    'data/report.md',
    renderReport({ ...a.rapport, offline: OFFLINE, fetchWarnings, verifVoies, verifSecteurs, tailles, dureeSecondes: (Date.now() - t0) / 1000 }),
  );

  console.log('\nFichiers écrits :');
  for (const [p, n] of Object.entries(tailles)) console.log(`  ${p.padEnd(36)} ${(n / 1024).toFixed(0).padStart(6)} ko`);
  console.log(`  data/report.md`);
  console.log(`\n${a.publication.dataset.colleges.length} collèges en ${((Date.now() - t0) / 1000).toFixed(1)} s`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
