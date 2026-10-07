// Agrégats IVAC sur plusieurs sessions (fonctions pures, partagées par le calcul
// des centiles nationaux, des moyennes de référence et des indicateurs du périmètre).
import type { College, IndicateurKey, Indicateurs, Statut } from '../../src/types';
import type { IvacRow } from './sources/ivac';
import { mean, ratioOfSums, weightedMean } from './lib/util';

export interface AgregatIvac {
  /** Taux de réussite, moyenne pondérée par les candidats (%). */
  brevet: number | null;
  /** Note moyenne à l'écrit, moyenne pondérée par les candidats (/20). */
  noteEcrit: number | null;
  /** Moyenne simple des VA disponibles (points). */
  vaTaux: number | null;
  vaNote: number | null;
  /** Mentions / candidats (%). */
  mentionsTB: number | null;
  mentions: number | null;
}

/** Agrège les lignes IVAC d'un collège (ou d'un ensemble de collèges) sur les sessions données. */
export function agregerIvac(rows: IvacRow[], sessions: number[]): AgregatIvac {
  const rs = rows.filter((r) => sessions.includes(r.session));
  return {
    brevet: weightedMean(rs.map((r) => [r.taux, r.candidats])),
    noteEcrit: weightedMean(rs.map((r) => [r.noteEcrit, r.candidats])),
    vaTaux: mean(rs.map((r) => r.vaTaux)),
    vaNote: mean(rs.map((r) => r.vaNote)),
    mentionsTB: ratioOfSums(rs.filter((r) => r.taux !== null).map((r) => [r.mentionsTB, r.candidats])),
    mentions: ratioOfSums(rs.filter((r) => r.taux !== null).map((r) => [r.mentionsGlobal, r.candidats])),
  };
}

/** Moyennes de référence (France ou académie) pondérées par les candidats. */
export function referencesIvac(rows: IvacRow[], sessions: number[], derniere: number) {
  const rs = rows.filter((r) => sessions.includes(r.session));
  const last = rows.filter((r) => r.session === derniere);
  return {
    brevet: weightedMean(rs.map((r) => [r.taux, r.candidats])),
    brevetDernier: weightedMean(last.map((r) => [r.taux, r.candidats])),
    noteEcrit: weightedMean(rs.map((r) => [r.noteEcrit, r.candidats])),
    mentionsTB: ratioOfSums(rs.filter((r) => r.taux !== null).map((r) => [r.mentionsTB, r.candidats])),
    mentions: ratioOfSums(rs.filter((r) => r.taux !== null).map((r) => [r.mentionsGlobal, r.candidats])),
    accesSixiemeTroisieme: weightedMean(last.map((r) => [r.accesSixiemeTroisieme, r.candidats])),
  };
}

export const INDICATEURS: IndicateurKey[] = [
  'note',
  'brevet',
  'brevetDernier',
  'noteEcrit',
  'vaTaux',
  'vaNote',
  'mentionsTB',
  'mentions',
  'accesSixiemeTroisieme',
  'ips',
  'effectif',
  'elevesParClasse',
  'heuresParEleve',
  'eval6Francais',
  'eval6Maths',
];

export const RAISONS = {
  horsContrat: 'Hors contrat : non publié',
  contratSimple: 'Non publié (collège sous contrat simple)',
  petitEffectif: 'Effectif trop faible (moins de 20 présents)',
  va: 'Valeur ajoutée non calculée (moins de 40 présents ou appariement insuffisant)',
  nonPublie: 'Non publié',
  note: 'Note non calculée : moins de deux composantes disponibles',
};

export interface ContexteManquants {
  statut: Statut;
  contrat: College['contrat'];
  /** Lignes IVAC du collège sur les sessions de référence. */
  ivacRef: IvacRow[];
  /** Ligne IVAC de la dernière session, si le collège y figure. */
  derniere: IvacRow | undefined;
}

/** Raison affichée pour chaque indicateur manquant (SPEC §5 « Données manquantes »). */
export function raisonsManquantes(ind: Indicateurs, ctx: ContexteManquants): College['manquants'] {
  const out: College['manquants'] = {};
  const base = ctx.statut === 'hors_contrat' ? RAISONS.horsContrat : ctx.contrat === 'simple' ? RAISONS.contratSimple : null;
  const tauxRef = ctx.ivacRef.some((x) => x.taux !== null);
  for (const k of INDICATEURS) {
    if (ind[k] !== null) continue;
    if (base) {
      out[k] = base;
      continue;
    }
    let raison = RAISONS.nonPublie;
    switch (k) {
      case 'note':
        if (ctx.ivacRef.length) raison = tauxRef ? RAISONS.note : RAISONS.petitEffectif;
        break;
      case 'brevet':
      case 'noteEcrit':
      case 'mentionsTB':
      case 'mentions':
        if (ctx.ivacRef.length && !tauxRef) raison = RAISONS.petitEffectif;
        break;
      case 'brevetDernier':
      case 'accesSixiemeTroisieme':
        if (ctx.derniere && ctx.derniere.taux === null) raison = RAISONS.petitEffectif;
        break;
      case 'vaTaux':
      case 'vaNote':
        if (ctx.ivacRef.length) raison = tauxRef ? RAISONS.va : RAISONS.petitEffectif;
        break;
    }
    out[k] = raison;
  }
  return out;
}
