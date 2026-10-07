// Langues, options et dispositifs d'un collège (ONISEP + ministère), et étiquettes du filtre « propose… ».
import type { College } from '../../src/types';
import { stripAccents } from '../../src/lib/normalize';
import type { OnisepDispositif, OnisepStructure } from './sources/onisep';
import { capitalize } from './lib/util';

export type Langues = College['langues'];
export type Options = College['options'];

/** Clé de comparaison (sans accents ni ponctuation). */
function cle(s: string): string {
  return stripAccents(s).replace(/[^A-Z0-9]+/g, ' ').trim();
}

export function slug(s: string): string {
  return cle(s).toLowerCase().replace(/ /g, '-');
}

/** Ajoute des libellés en dédoublonnant sans tenir compte de la casse, des accents ni des tirets. */
function ajouter(list: string[], ...items: string[]): string[] {
  for (const it of items) {
    const v = it.trim();
    if (v && !list.some((x) => cle(x) === cle(v))) list.push(v);
  }
  return list;
}

/** Clé d'un sport : « BASKET-BALL », « basket », « Basketball » -> « BASKET ». */
export function cleSport(s: string): string {
  return cle(s).replace(/ /g, '').replace(/BALL$/, '');
}

function ajouterSports(list: string[], ...items: string[]): string[] {
  for (const it of items) {
    const v = it.trim().toLowerCase();
    if (v && !list.some((x) => cleSport(x) === cleSport(v))) list.push(v);
  }
  return list;
}

const LANGUES_ANCIENNES: [RegExp, string][] = [
  [/^langues et cultures de l'antiquit[ée] ?: ?latin$/i, 'latin'],
  [/^langues et cultures de l'antiquit[ée] ?: ?grec$/i, 'grec'],
  [/^latin$/i, 'latin'],
  [/^grec( ancien)?$/i, 'grec'],
];

/** Langues anciennes et LCE à partir du champ « langues enseignées » d'Idéo-Structures. */
export function languesStructure(s: OnisepStructure | undefined): { anciennes: string[]; lce: string[]; vivantes: string[] } {
  const anciennes: string[] = [];
  const lce: string[] = [];
  const vivantes: string[] = [];
  for (const l of s?.langues ?? []) {
    const anc = LANGUES_ANCIENNES.find(([re]) => re.test(l));
    if (anc) {
      ajouter(anciennes, anc[1]);
      continue;
    }
    const m = /^langues et cultures europ[ée]ennes(?: ?: ?(.+))?$/i.exec(l);
    if (m) {
      ajouter(lce, m[1] ? m[1].toLowerCase() : 'langue non précisée');
      continue;
    }
    if (/^langues et cultures r[ée]gionales|culture antique/i.test(l)) continue;
    ajouter(vivantes, l.toLowerCase());
  }
  const ordre = ['latin', 'grec'];
  anciennes.sort((a, b) => ordre.indexOf(a) - ordre.indexOf(b));
  return { anciennes, lce, vivantes };
}

const CHA: [RegExp, string][] = [
  [/horaires am[ée]nag[ée]s musique/i, 'musique'],
  [/horaires am[ée]nag[ée]s danse/i, 'danse'],
  [/horaires am[ée]nag[ée]s th[ée][âa]tre/i, 'théâtre'],
  [/horaires am[ée]nag[ée]s arts (et m[ée]tiers )?du spectacle/i, 'arts du spectacle'],
  [/horaires am[ée]nag[ée]s arts plastiques/i, 'arts plastiques'],
  [/horaires am[ée]nag[ée]s math[ée]matiques/i, 'mathématiques et sciences'],
];

export const DISPOSITIFS: { tag: string; label: string; re: RegExp }[] = [
  { tag: 'ulis', label: 'ULIS', re: /unit[ée] localis[ée]e pour l'inclusion scolaire en coll[èe]ge/i },
  { tag: 'segpa', label: 'SEGPA', re: /section d'enseignement g[ée]n[ée]ral et professionnel adapt[ée]/i },
  { tag: 'upe2a', label: 'UPE2A (élèves allophones)', re: /allophones arrivants en coll[èe]ge/i },
  { tag: 'relais', label: 'Dispositif relais', re: /dispositif relais/i },
  { tag: 'prepa-metiers', label: '3e prépa-métiers', re: /3e pr[ée]pa-m[ée]tiers/i },
  { tag: 'itinerants', label: 'Classe pour enfants de familles itinérantes', re: /familles itin[ée]rantes/i },
];

export interface OptionsInput {
  structure: OnisepStructure | undefined;
  languesOnisep: { lv1: string[]; lv2: string[] } | undefined;
  offreLangues: { lv1: string[]; lv2: string[] } | undefined;
  dispositifs: OnisepDispositif[];
  sectionsInternationales: { section: string }[];
  sectionsSportives: string[];
  sportEtudes: string[];
  /** Indicateurs ULIS / SEGPA de l'annuaire et des effectifs. */
  ulis: boolean;
  segpa: boolean;
}

export interface OptionsResult {
  langues: Langues;
  options: Options;
  /** Origine des langues vivantes (pour le rapport). */
  sourceLangues: 'onisep' | 'offre-langues-2d' | 'aucune';
  /** Dispositifs ONISEP non reconnus (pour le rapport). */
  inconnus: string[];
}

export function construireOptions(i: OptionsInput): OptionsResult {
  const st = languesStructure(i.structure);
  let lv1: string[] = [];
  let lv2: string[] = [];
  let sourceLangues: OptionsResult['sourceLangues'] = 'aucune';
  if (i.languesOnisep && (i.languesOnisep.lv1.length || i.languesOnisep.lv2.length)) {
    lv1 = ajouter([], ...i.languesOnisep.lv1);
    lv2 = ajouter([], ...i.languesOnisep.lv2);
    sourceLangues = 'onisep';
  } else if (i.offreLangues && (i.offreLangues.lv1.length || i.offreLangues.lv2.length)) {
    lv1 = ajouter([], ...i.offreLangues.lv1);
    lv2 = ajouter([], ...i.offreLangues.lv2);
    sourceLangues = 'offre-langues-2d';
  }
  lv1.sort((a, b) => a.localeCompare(b, 'fr'));
  lv2.sort((a, b) => a.localeCompare(b, 'fr'));

  const options: Options = {
    bilangue: [],
    sectionsInternationales: [],
    cha: [],
    sectionsSportives: [],
    sportEtudes: [],
    dispositifs: [],
  };
  const inconnus: string[] = [];
  const dispo = new Set<string>();
  let siOnisep: string[] = [];
  let sectionSportiveOnisep = false;
  let sportEtudesOnisep = false;
  const sportsOnisep: string[] = [];
  const sportEtudesOnisepListe: string[] = [];
  for (const d of i.dispositifs) {
    const t = d.intitule;
    if (/section bilangue/i.test(t)) {
      ajouter(options.bilangue, ...(d.enseignements.length ? d.enseignements.map((x) => x.toLowerCase()) : ['langues non précisées']));
      continue;
    }
    const cha = CHA.find(([re]) => re.test(t));
    if (cha) {
      ajouter(options.cha, cha[1]);
      continue;
    }
    if (/section internationale de coll/i.test(t)) {
      siOnisep = ajouter(siOnisep, ...d.enseignements.map((x) => x.toLowerCase()));
      if (!d.enseignements.length) siOnisep = ajouter(siOnisep, 'langue non précisée');
      continue;
    }
    if (/section sportive de coll/i.test(t)) {
      sectionSportiveOnisep = true;
      ajouterSports(sportsOnisep, ...d.enseignements);
      continue;
    }
    if (/sport-[ée]tudes en coll/i.test(t)) {
      sportEtudesOnisep = true;
      ajouterSports(sportEtudesOnisepListe, ...d.enseignements);
      continue;
    }
    const disp = DISPOSITIFS.find((x) => x.re.test(t));
    if (disp) {
      dispo.add(disp.tag);
      continue;
    }
    inconnus.push(t);
  }
  // Sections internationales : jeu du ministère en priorité (adjectif de la section), ONISEP sinon.
  ajouter(options.sectionsInternationales, ...i.sectionsInternationales.map((s) => s.section.toLowerCase()));
  if (options.sectionsInternationales.length === 0) ajouter(options.sectionsInternationales, ...siOnisep);
  // Sections sportives : liste du ministère complétée par l'ONISEP (sports dédoublonnés).
  ajouterSports(options.sectionsSportives, ...i.sectionsSportives, ...sportsOnisep);
  if (sectionSportiveOnisep && options.sectionsSportives.length === 0) options.sectionsSportives.push('sport non précisé');
  // Sport-études : jeu du ministère en priorité, ONISEP sinon (libellés différents pour la même classe).
  ajouterSports(options.sportEtudes, ...(i.sportEtudes.length ? i.sportEtudes : sportEtudesOnisepListe));
  if (sportEtudesOnisep && options.sportEtudes.length === 0) options.sportEtudes.push('sport non précisé');
  if (i.ulis) dispo.add('ulis');
  if (i.segpa) dispo.add('segpa');
  options.dispositifs = DISPOSITIFS.filter((d) => dispo.has(d.tag)).map((d) => d.label);
  for (const k of ['bilangue', 'cha', 'sectionsInternationales', 'sectionsSportives', 'sportEtudes'] as const) {
    options[k].sort((a, b) => a.localeCompare(b, 'fr'));
  }
  return {
    langues: { lv1, lv2, anciennes: st.anciennes, lce: st.lce },
    options,
    sourceLangues,
    inconnus,
  };
}

export interface OptionLabel {
  label: string;
  groupe: string;
}

export const GROUPES = ['Langues vivantes', 'Langues anciennes', 'Sections internationales', 'Horaires aménagés', 'Sport', 'Dispositifs'];

/** Étiquettes « propose… » d'un collège et leurs libellés. */
export function optionTags(langues: Langues, options: Options): Map<string, OptionLabel> {
  const tags = new Map<string, OptionLabel>();
  for (const l of [...langues.lv1, ...langues.lv2]) {
    tags.set(`lv:${slug(l)}`, { label: capitalize(l), groupe: 'Langues vivantes' });
  }
  if (options.bilangue.length) tags.set('bilangue', { label: 'Section bilangue', groupe: 'Langues vivantes' });
  if (langues.lce.length) tags.set('lce', { label: 'Langues et cultures européennes (LCE)', groupe: 'Langues vivantes' });
  for (const l of langues.anciennes) tags.set(l, { label: l === 'grec' ? 'Grec ancien' : capitalize(l), groupe: 'Langues anciennes' });
  for (const s of options.sectionsInternationales) {
    tags.set(`si:${slug(s)}`, { label: `Section internationale ${s}`, groupe: 'Sections internationales' });
  }
  for (const c of options.cha) tags.set(`cha:${slug(c)}`, { label: `Horaires aménagés ${c}`, groupe: 'Horaires aménagés' });
  if (options.sectionsSportives.length) tags.set('section-sportive', { label: 'Section sportive', groupe: 'Sport' });
  if (options.sportEtudes.length) tags.set('sport-etudes', { label: 'Sport-études', groupe: 'Sport' });
  for (const d of DISPOSITIFS) {
    if (options.dispositifs.includes(d.label)) tags.set(d.tag, { label: d.label, groupe: 'Dispositifs' });
  }
  return tags;
}
