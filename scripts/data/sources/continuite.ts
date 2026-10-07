// Continuité jusqu'au bac (SPEC §5) :
//  1. lycée dans le même établissement, détecté automatiquement :
//     R1 cité scolaire (fr-en-cites_scolaires), R2 même SIREN que le collège (privé),
//     R3 même adresse normalisée (privé ; seul signal pour certains hors contrat) ;
//  2. passage garanti : saisi à la main dans data/overrides/continuite.json.
import type { College, Continuite, LienLycee, Lycee, Passage, Statut } from '../../../src/types';
import { normalizeVoie } from '../../../src/lib/normalize';
import { odsExport, odsList } from '../lib/fetch';
import { annee, num, uniq } from '../lib/util';
import { NATURES_LYCEE } from '../lib/config';
import type { AnnuaireRow } from './annuaire';

export const CITES_ID = 'fr-en-cites_scolaires';
export const LYCEE_GT_ID = 'fr-en-lycee_gt-effectifs-niveau-sexe-lv';
export const LYCEE_PRO_ID = 'fr-en-lycee_pro-effectifs-niveau-sexe-lv';

export const SRC_CITES = 'https://data.education.gouv.fr/explore/dataset/fr-en-cites_scolaires/';
export const SRC_ANNUAIRE = 'https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/';

export interface ContinuiteOverride {
  lien?: LienLycee;
  lyceeUai?: string | null;
  lycee?: Partial<Omit<Lycee, 'uai'>>;
  secondeGtSurPlace?: boolean;
  passage?: Passage;
  passageTexte?: string;
  sources?: string[];
  /** Note de recherche pour les mainteneurs (non exportée). */
  note?: string;
}

export interface ContinuiteOverrides {
  colleges: Record<string, ContinuiteOverride>;
}

export interface CiteRow {
  code_cite_scolaire: string;
  uai: string;
  code_nature: string | number;
  appellation_officielle: string | null;
}

export async function loadCites(): Promise<CiteRow[]> {
  return odsExport<CiteRow>(CITES_ID, {
    select: 'code_cite_scolaire,uai,code_nature,appellation_officielle',
    where: 'code_departement in ("075","094")',
  });
}

/** Adresse normalisée pour comparer deux établissements (« 10 à 16 avenue X - CS 1234 » -> « 10 AVENUE X »). */
export function normAdresse(adresse: string | null | undefined): string {
  if (!adresse) return '';
  let a = adresse.replace(/\s*[-,]?\s*\b(CS|BP)\s*\d+.*$/i, '');
  a = a.replace(/^(\d+)\s*(?:bis|ter)?\s*(?:à|a|-|–)\s*\d+(?:\s*(?:bis|ter))?\b/i, '$1');
  const m = /^\s*(\d+)\s*(bis|ter|b|t)?\b\s*(.*)$/i.exec(a);
  if (!m) return normalizeVoie(a);
  return `${m[1]} ${normalizeVoie(m[3])}`.trim();
}

export interface Candidat {
  uai: string;
  regles: string[];
}

/** Lycées candidats pour un collège, du plus probable au moins probable. */
export function detecterCandidats(college: AnnuaireRow, lycees: AnnuaireRow[], cites: CiteRow[]): Candidat[] {
  const uai = college.identifiant_de_l_etablissement;
  const prive = college.statut_public_prive !== 'Public';
  const cands = new Map<string, Set<string>>();
  const add = (u: string, r: string) => {
    if (u === uai) return;
    const s = cands.get(u) ?? new Set<string>();
    s.add(r);
    cands.set(u, s);
  };
  const cite = cites.find((c) => c.uai === uai);
  if (cite) {
    for (const m of cites) {
      if (m.code_cite_scolaire === cite.code_cite_scolaire && NATURES_LYCEE.includes(Number(m.code_nature))) {
        add(m.uai, `R1_cite_scolaire:${cite.code_cite_scolaire}`);
      }
    }
  }
  const siren = (college.siren_siret ?? '').slice(0, 9);
  const adr = normAdresse(college.adresse_1);
  for (const l of lycees) {
    const lu = l.identifiant_de_l_etablissement;
    if (prive && siren.length === 9 && (l.siren_siret ?? '').slice(0, 9) === siren) add(lu, 'R2_siren');
    if (adr && normAdresse(l.adresse_1) === adr && l.code_commune === college.code_commune) add(lu, 'R3_adresse');
  }
  const naturePref = (u: string) => {
    const n = lycees.find((l) => l.identifiant_de_l_etablissement === u)?.code_nature;
    return n === 300 || n === 302 || n === 306 ? 0 : 1;
  };
  return [...cands.entries()]
    .map(([u, r]) => ({ uai: u, regles: [...r].sort() }))
    .sort(
      (a, b) =>
        Number(b.regles.some((r) => r.startsWith('R1'))) - Number(a.regles.some((r) => r.startsWith('R1'))) ||
        b.regles.length - a.regles.length ||
        naturePref(a.uai) - naturePref(b.uai) ||
        a.uai.localeCompare(b.uai),
    );
}

export interface DetectionLien {
  lien: LienLycee;
  lyceeUai: string | null;
  regles: string[];
  /** Candidats ignorés (ex. adresse commune pour un collège public sans cité scolaire). */
  ignores: Candidat[];
}

export function choisirLien(college: AnnuaireRow, candidats: Candidat[]): DetectionLien {
  const prive = college.statut_public_prive !== 'Public';
  const r1 = candidats.filter((c) => c.regles.some((r) => r.startsWith('R1')));
  if (r1.length) {
    return { lien: prive ? 'meme_etablissement_prive' : 'cite_scolaire', lyceeUai: r1[0].uai, regles: r1[0].regles, ignores: candidats.slice(1) };
  }
  if (prive && candidats.length) {
    return { lien: 'meme_etablissement_prive', lyceeUai: candidats[0].uai, regles: candidats[0].regles, ignores: candidats.slice(1) };
  }
  return { lien: 'aucun', lyceeUai: null, regles: [], ignores: candidats };
}

// --- Effectifs des lycées : voies et présence d'une 2nde GT ---

export interface VoiesLycee {
  annee: number;
  secondeGt: number | null;
  generale: boolean;
  techno: string[];
  pro: boolean;
}

const SERIES_TECHNO = ['sti2d', 'stl', 'stmg', 'st2s', 'std2a', 'sthr', 'tmd'];

export async function loadVoiesLycees(uais: string[]): Promise<Map<string, VoiesLycee>> {
  const out = new Map<string, VoiesLycee>();
  if (uais.length === 0) return out;
  const where = `numero_lycee in ${odsList(uais)}`;
  const gt = await odsExport<Record<string, unknown>>(LYCEE_GT_ID, { where });
  const pro = await odsExport<Record<string, unknown>>(LYCEE_PRO_ID, { where });
  const latest = (rows: Record<string, unknown>[], uai: string) =>
    rows
      .filter((r) => r.numero_lycee === uai)
      .sort((a, b) => (annee(b.rentree_scolaire) ?? 0) - (annee(a.rentree_scolaire) ?? 0))[0];
  for (const uai of uais) {
    const g = latest(gt, uai);
    const p = latest(pro, uai);
    if (!g && !p) continue;
    const pos = (r: Record<string, unknown> | undefined, k: string) => (num(r?.[k]) ?? 0) > 0;
    const techno = SERIES_TECHNO.filter((s) => pos(g, `1eres_${s}`) || pos(g, `terminales_${s}`)).map((s) => s.toUpperCase());
    out.set(uai, {
      annee: annee((g ?? p)!.rentree_scolaire) ?? 0,
      secondeGt: g ? num(g['2ndes_gt']) : null,
      generale: pos(g, '2ndes_gt') || pos(g, '1eres_g') || pos(g, 'terminales_g'),
      techno,
      pro:
        !!p &&
        ['2ndes_pro', '1eres_pro', 'terminales_pro', 'cap_1ere_annee', 'cap_2nde_annee', 'cap_en_1_an', 'cap_en_3_ans'].some((k) =>
          pos(p, k),
        ),
    });
  }
  return out;
}

export function voiesLibelles(v: VoiesLycee | undefined, row: AnnuaireRow | undefined): string[] {
  const out: string[] = [];
  if (v) {
    if (v.generale) out.push('générale');
    if (v.techno.length) out.push(`technologique (${v.techno.join(', ')})`);
    if (v.pro) out.push('professionnelle');
    return out;
  }
  if (row?.voie_generale === '1') out.push('générale');
  if (row?.voie_technologique === '1') out.push('technologique');
  if (row?.voie_professionnelle === '1') out.push('professionnelle');
  return out;
}

export function adresseLycee(r: AnnuaireRow | undefined): string | null {
  if (!r?.adresse_1) return null;
  const commune = r.code_commune?.startsWith('751') ? 'Paris' : (r.nom_commune ?? '');
  return `${r.adresse_1}, ${r.code_postal ?? ''} ${commune}`.replace(/\s+/g, ' ').trim();
}

// --- Assemblage ---

export const TEXTES = {
  citePublique: 'Admission via Affelnet, sans priorité pour les élèves du collège',
  privePoursuite: 'Poursuite habituelle, non garantie par écrit',
  horsContrat: 'Lycée hors contrat (bac sans contrôle continu)',
  autreSite: "Lycée du même groupe sur un autre site ; poursuite non garantie par écrit",
  aucunPublic: "Pas de lycée dans l'établissement : affectation en 2nde via Affelnet, selon l'adresse",
  aucunPrive: "Pas de lycée dans l'établissement",
};

export function continuiteParDefaut(lien: LienLycee, statut: Statut): { passage: Passage; passageTexte: string } {
  switch (lien) {
    case 'cite_scolaire':
      return { passage: 'non_garanti', passageTexte: TEXTES.citePublique };
    case 'meme_etablissement_prive':
      return statut === 'hors_contrat'
        ? { passage: 'inconnu', passageTexte: TEXTES.horsContrat }
        : { passage: 'non_garanti', passageTexte: TEXTES.privePoursuite };
    case 'groupe_scolaire_autre_site':
      return { passage: 'inconnu', passageTexte: TEXTES.autreSite };
    case 'aucun':
      return statut === 'public'
        ? { passage: 'non_garanti', passageTexte: TEXTES.aucunPublic }
        : { passage: 'non_garanti', passageTexte: TEXTES.aucunPrive };
  }
}

export interface ContinuiteInput {
  college: AnnuaireRow;
  statut: Statut;
  detection: DetectionLien;
  override: ContinuiteOverride | undefined;
  annuaire: Map<string, AnnuaireRow>;
  voies: Map<string, VoiesLycee>;
}

export function construireContinuite(i: ContinuiteInput): College['continuite'] {
  const o = i.override ?? {};
  const lien = o.lien ?? i.detection.lien;
  const lyceeUai = lien === 'aucun' ? null : o.lyceeUai !== undefined ? o.lyceeUai : i.detection.lyceeUai;
  let lycee: Lycee | null = null;
  if (lyceeUai) {
    const row = i.annuaire.get(lyceeUai);
    lycee = {
      uai: lyceeUai,
      nom: o.lycee?.nom ?? row?.nom_etablissement ?? lyceeUai,
      adresse: o.lycee?.adresse !== undefined ? o.lycee.adresse : adresseLycee(row),
      voies: o.lycee?.voies ?? voiesLibelles(i.voies.get(lyceeUai), row),
    };
  }
  const v = lyceeUai ? i.voies.get(lyceeUai) : undefined;
  const secondeGtSurPlace = o.secondeGtSurPlace ?? (lien === 'cite_scolaire' || lien === 'meme_etablissement_prive' ? (v?.secondeGt ?? 0) > 0 : false);
  const def = continuiteParDefaut(lien, i.statut);
  const sources = uniq([
    ...(o.sources ?? []),
    ...(i.detection.regles.some((r) => r.startsWith('R1')) || (lien === 'aucun' && i.statut === 'public') ? [SRC_CITES] : []),
    ...(lien !== 'aucun' ? [SRC_ANNUAIRE] : []),
  ]);
  const c: Continuite = {
    lien,
    lycee,
    secondeGtSurPlace,
    passage: o.passage ?? def.passage,
    passageTexte: o.passageTexte ?? def.passageTexte,
    sources,
  };
  return c;
}
