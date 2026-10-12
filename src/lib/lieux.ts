import type { CommunePresente, Departement } from '../types';
import type { Filters } from './filters';
import { fold } from './filters';
import { DEPARTEMENTS } from './territoires';

/** Ce que propose le filtre « commune ou département » (à Paris, la commune est l'arrondissement). */
export type Lieu = { type: 'commune'; code: string; libelle: string; departement: string } | { type: 'departement'; code: Departement; libelle: string };

type Choix = Pick<Filters, 'communes' | 'departements'>;

/** Mots sans accents ni casse ; tirets et apostrophes (droites ou typographiques) séparent les mots. */
const mots = (s: string) => fold(s).split(/[^a-z0-9]+/).filter(Boolean);

const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

/**
 * Communes du périmètre et départements dont les mots commencent par ceux de la saisie,
 * hors ce qui est déjà choisi. En tête, ce qui commence par la saisie, les départements avant les communes.
 */
export function rechercherLieux(q: string, communes: readonly CommunePresente[], choix: Choix = { communes: [], departements: [] }, limite = 8): Lieu[] {
  const saisie = mots(q);
  if (!saisie.length) return [];
  const candidats: { lieu: Lieu; rang: number }[] = [];
  const essayer = (lieu: Lieu, cles: string[]) => {
    if (!saisie.every((m) => cles.some((c) => c.startsWith(m)))) return;
    const debut = cles[0].startsWith(saisie[0]) ? 0 : 2;
    candidats.push({ lieu, rang: debut + (lieu.type === 'departement' ? 0 : 1) });
  };
  for (const [code, libelle] of Object.entries(DEPARTEMENTS) as [Departement, string][]) {
    if (!choix.departements.includes(code)) essayer({ type: 'departement', code, libelle }, [...mots(libelle), code]);
  }
  for (const c of communes) {
    if (!choix.communes.includes(c.code)) essayer({ type: 'commune', code: c.code, libelle: c.libelle, departement: c.departement }, mots(c.libelle));
  }
  candidats.sort((a, b) => a.rang - b.rang || collator.compare(a.lieu.libelle, b.lieu.libelle));
  return candidats.slice(0, limite).map((c) => c.lieu);
}

/**
 * La sélection géographique telle qu'affichée en pastilles : départements puis communes, dans l'ordre du choix.
 * Un code absent des données (lien ancien ou erroné) est ignoré au filtrage et n'a pas de pastille.
 */
export function lieuxChoisis(choix: Choix, communes: readonly CommunePresente[]): Lieu[] {
  const parCode = new Map(communes.map((c) => [c.code, c]));
  const out: Lieu[] = choix.departements.map((code) => ({ type: 'departement', code, libelle: DEPARTEMENTS[code] }));
  for (const code of choix.communes) {
    const c = parCode.get(code);
    if (c) out.push({ type: 'commune', code: c.code, libelle: c.libelle, departement: c.departement });
  }
  return out;
}

/** Retire un lieu de la sélection. */
export function sansLieu(choix: Choix, lieu: Lieu): Choix {
  return lieu.type === 'departement'
    ? { communes: choix.communes, departements: choix.departements.filter((d) => d !== lieu.code) }
    : { communes: choix.communes.filter((c) => c !== lieu.code), departements: choix.departements };
}

/** « Ivry-sur-Seine », « Val-de-Marne (94) » : le numéro distingue le département (Paris) de ses arrondissements. */
export function libellePastille(lieu: Lieu): string {
  return lieu.type === 'departement' ? `${lieu.libelle} (${lieu.code})` : lieu.libelle;
}

/** Ajoute un lieu à la sélection. */
export function avecLieu(choix: Choix, lieu: Lieu): Choix {
  const s = sansLieu(choix, lieu);
  return lieu.type === 'departement' ? { ...s, departements: [...s.departements, lieu.code] } : { ...s, communes: [...s.communes, lieu.code] };
}
