// Jeux complémentaires : évaluations 6e, encadrement, personnel, demi-pension, labels, Pix.
import { odsExport, odsList } from '../lib/fetch';
import { annee, num } from '../lib/util';

export const EVAL6_ID = 'fr-en-evaluations_nationales_6eme_par_etablissement';
export const MOYENS_PUBLIC_ID = 'fr-en-moyens_enseignants_2d_public';
export const MOYENS_PRIVE_ID = 'fr-en-moyens_enseignants_2d_prive';
export const PERSONNEL_ID = 'fr-en-indicateurs_personnels_etablissements2d';
export const HEBERGEMENT_ID = 'fr-en-mode-hebergement-eleves-etablissements-2d';
export const LABEL_G2030_ID = 'fr-en-etablissements-labellises-generation-2030';
export const LABEL_EUROSCOL_ID = 'fr-en-etablissements-labellises-euroscol';
export const LABEL_EGALITE_ID = 'fr-en-label-egalite-fille-garcon';
export const CITES_EDUCATIVES_ID = 'fr-en-cites_educatives';
export const PIX_ID = 'fr-en-pix_resultats_des_campagnes_de_rentree_par_eple';

// --- Évaluations nationales de 6e ---

export interface Eval6Row {
  annee: number;
  uai: string;
  academie: string | null;
  discipline: 'francais' | 'maths' | null;
  effectif: number | null;
  score: number | null;
}

function parseEval6(r: Record<string, unknown>): Eval6Row {
  const d = String(r.discipline ?? '').toLowerCase();
  return {
    annee: annee(r.annee) ?? 0,
    uai: String(r.uai ?? ''),
    academie: (r.libelle_academie as string | null) ?? null,
    discipline: d.startsWith('fran') ? 'francais' : d.startsWith('math') ? 'maths' : null,
    effectif: num(r.effectif),
    score: num(r.score_moyen),
  };
}

export interface Eval6 {
  perimetre: Eval6Row[];
  /** Toutes les lignes « Ensemble » de France pour la dernière année du périmètre (moyennes de référence). */
  national: Eval6Row[];
  derniereAnnee: number | null;
}

export async function loadEval6(uais: string[]): Promise<Eval6> {
  const select = 'annee,uai,libelle_academie,discipline,effectif,score_moyen,caracteristique';
  const perimetre = (
    await odsExport<Record<string, unknown>>(EVAL6_ID, { select, where: `uai in ${odsList(uais)} and caracteristique="Ensemble"` })
  ).map(parseEval6);
  const derniereAnnee = perimetre.length ? Math.max(...perimetre.map((r) => r.annee)) : null;
  const national = derniereAnnee
    ? (
        await odsExport<Record<string, unknown>>(EVAL6_ID, {
          select,
          where: `caracteristique="Ensemble" and year(annee)=${derniereAnnee}`,
        })
      ).map(parseEval6)
    : [];
  return { perimetre, national, derniereAnnee };
}

// --- Taux d'encadrement (H/E, E/S) ---

export interface MoyensRow {
  annee: number;
  uai: string;
  academie: string | null;
  heuresParEleve: number | null;
  elevesParClasse: number | null;
  numHE: number | null;
  denHE: number | null;
  numES: number | null;
  denES: number | null;
}

function parseMoyens(r: Record<string, unknown>): MoyensRow {
  return {
    annee: annee(r.annee) ?? 0,
    uai: String(r.uai ?? ''),
    academie: (r.academie as string | null) ?? null,
    heuresParEleve: num(r.h_e),
    elevesParClasse: num(r.e_s),
    numHE: num(r.numerateur_h_e_nb_heures_enseignement_hebdo_devant_eleves),
    denHE: num(r.denominateur_h_e_somme_eleves_en_division),
    numES: num(r.numerateur_e_s_nb_eleves_structure_pondere_nb_heures_enseignement_structure),
    denES: num(r.denominateur_e_s_nb_heures_enseignement_hebdo_devant_eleves),
  };
}

export interface Moyens {
  perimetre: MoyensRow[];
  national: MoyensRow[];
  derniereAnnee: number | null;
}

export async function loadMoyens(uais: string[]): Promise<Moyens> {
  const perimetre: MoyensRow[] = [];
  for (const id of [MOYENS_PUBLIC_ID, MOYENS_PRIVE_ID]) {
    const raw = await odsExport<Record<string, unknown>>(id, { where: `uai in ${odsList(uais)} and niveau="Collège"` });
    perimetre.push(...raw.map(parseMoyens));
  }
  const derniereAnnee = perimetre.length ? Math.max(...perimetre.map((r) => r.annee)) : null;
  const national: MoyensRow[] = [];
  if (derniereAnnee) {
    for (const id of [MOYENS_PUBLIC_ID, MOYENS_PRIVE_ID]) {
      const raw = await odsExport<Record<string, unknown>>(id, { where: `niveau="Collège" and year(annee)=${derniereAnnee}` });
      national.push(...raw.map(parseMoyens));
    }
  }
  return { perimetre, national, derniereAnnee };
}

// --- Personnel ---

export async function loadPersonnel(uais: string[]): Promise<Record<string, unknown>[]> {
  return odsExport(PERSONNEL_ID, { where: `identifiant_de_l_etablissement in ${odsList(uais)}` });
}

// --- Demi-pension ---

export interface HebergementRow {
  annee: number;
  uai: string;
  eleves: number | null;
  demiPensionnaires: number | null;
  internes: number | null;
}

export async function loadHebergement(uais: string[]): Promise<HebergementRow[]> {
  const raw = await odsExport<Record<string, unknown>>(HEBERGEMENT_ID, { where: `uai in ${odsList(uais)}` });
  return raw.map((r) => ({
    annee: annee(r.rentree) ?? 0,
    uai: String(r.uai ?? ''),
    eleves: num(r.nombre_d_eleves_dans_une_formation_du_second_degre),
    demiPensionnaires: num(r.nombre_d_eleves_2d_demi_pensionnaires),
    internes: num(r.nombre_d_eleves_2d_internes),
  }));
}

// --- Labels ---

export async function loadLabels(uais: string[]): Promise<Map<string, string[]>> {
  const out = new Map<string, string[]>();
  const add = (uai: string, label: string) => {
    const l = out.get(uai) ?? [];
    if (!l.includes(label)) l.push(label);
    out.set(uai, l);
  };
  const list = odsList(uais);
  for (const r of await odsExport<Record<string, unknown>>(LABEL_G2030_ID, { where: `uai in ${list}` })) {
    const niveau = r.niveau_labellisation ? ` (${String(r.niveau_labellisation).toLowerCase()})` : '';
    add(String(r.uai), `Génération 2030${niveau}`);
  }
  for (const r of await odsExport<Record<string, unknown>>(LABEL_EUROSCOL_ID, { where: `rne in ${list}` })) {
    add(String(r.rne), 'Euroscol');
  }
  for (const r of await odsExport<Record<string, unknown>>(LABEL_EGALITE_ID, { where: `identifiantuai in ${list}` })) {
    const niveau = r.niveaudelabellisation ? ` (niveau ${String(r.niveaudelabellisation)})` : '';
    add(String(r.identifiantuai), `Égalité filles-garçons${niveau}`);
  }
  for (const r of await odsExport<Record<string, unknown>>(CITES_EDUCATIVES_ID, { where: `uai in ${list}` })) {
    const lib = r.libelle_long_cite_educative ? ` (${String(r.libelle_long_cite_educative)})` : '';
    add(String(r.uai), `Cité éducative${lib}`);
  }
  return out;
}

// --- Pix ---

export interface PixRow {
  annee: number;
  uai: string;
  niveau: string;
  palier: number | null;
  auPalier: number | null;
  envoisNiveau: number | null;
  participants: number | null;
}

export async function loadPix(uais: string[]): Promise<PixRow[]> {
  const raw = await odsExport<Record<string, unknown>>(PIX_ID, { where: `uai in ${odsList(uais)}` });
  return raw.map((r) => ({
    annee: annee(r.annee) ?? 0,
    uai: String(r.uai ?? ''),
    niveau: String(r.niveau_scolaire ?? ''),
    palier: num(r.palier),
    auPalier: num(r.total_participation_par_palier),
    envoisNiveau: num(r.total_envoi_par_niveau),
    participants: num(r.total_participants),
  }));
}
