import { describe, expect, it } from 'vitest';
import type { Indicateurs } from '../../src/types';
import { agregerIvac, INDICATEURS, RAISONS, raisonsManquantes, referencesIvac } from './indicateurs';
import type { IvacRow } from './sources/ivac';

function row(p: Partial<IvacRow>): IvacRow {
  return {
    session: 2025,
    uai: '0750001A',
    nom: null,
    academie: 'PARIS',
    secteur: 'PU',
    candidats: null,
    taux: null,
    vaTaux: null,
    noteEcrit: null,
    vaNote: null,
    accesSixiemeTroisieme: null,
    mentionsAB: null,
    mentionsB: null,
    mentionsTB: null,
    mentionsGlobal: null,
    ...p,
  };
}

describe('agregerIvac', () => {
  const rows = [
    row({ session: 2022, candidats: 1000, taux: 10, noteEcrit: 1, vaTaux: 100 }), // hors sessions de référence
    row({ session: 2023, candidats: 100, taux: 90, noteEcrit: 12, vaTaux: 2, vaNote: 0.5, mentionsTB: 30, mentionsGlobal: 70 }),
    row({ session: 2024, candidats: 50, taux: 96, noteEcrit: 15, vaTaux: -1, vaNote: null, mentionsTB: 20, mentionsGlobal: 40 }),
    row({ session: 2025, candidats: 50, taux: 100, noteEcrit: 12, vaTaux: null, vaNote: 1.5, mentionsTB: 10, mentionsGlobal: 50 }),
  ];
  const a = agregerIvac(rows, [2023, 2024, 2025]);

  it('brevet et note à l’écrit pondérés par les candidats', () => {
    expect(a.brevet).toBeCloseTo((90 * 100 + 96 * 50 + 100 * 50) / 200);
    expect(a.noteEcrit).toBeCloseTo((12 * 100 + 15 * 50 + 12 * 50) / 200);
  });

  it('VA = moyenne simple des sessions disponibles', () => {
    expect(a.vaTaux).toBeCloseTo(0.5);
    expect(a.vaNote).toBeCloseTo(1);
  });

  it('mentions = somme des mentions / somme des candidats', () => {
    expect(a.mentionsTB).toBeCloseTo((60 / 200) * 100);
    expect(a.mentions).toBeCloseTo((160 / 200) * 100);
  });

  it('sessions masquées (effectif trop faible) ignorées', () => {
    const b = agregerIvac([row({ session: 2024, candidats: 15, taux: null }), row({ session: 2025, candidats: 30, taux: 80 })], [2024, 2025]);
    expect(b.brevet).toBe(80);
    expect(agregerIvac([row({ candidats: 15 })], [2025]).brevet).toBeNull();
  });
});

describe('referencesIvac', () => {
  it('moyennes pondérées sur les sessions et la dernière session', () => {
    const rows = [
      row({ uai: 'A', session: 2024, candidats: 100, taux: 80, accesSixiemeTroisieme: 90 }),
      row({ uai: 'B', session: 2025, candidats: 300, taux: 90, accesSixiemeTroisieme: 80 }),
      row({ uai: 'C', session: 2025, candidats: 100, taux: 70, accesSixiemeTroisieme: 100 }),
    ];
    const r = referencesIvac(rows, [2024, 2025], 2025);
    expect(r.brevet).toBeCloseTo((8000 + 27000 + 7000) / 500);
    expect(r.brevetDernier).toBeCloseTo(85);
    expect(r.accesSixiemeTroisieme).toBeCloseTo(85);
  });
});

describe('raisonsManquantes', () => {
  const vide = Object.fromEntries(INDICATEURS.map((k) => [k, null])) as Indicateurs;

  it('hors contrat : toutes les valeurs « non publié »', () => {
    const m = raisonsManquantes(vide, { statut: 'hors_contrat', contrat: null, ivacRef: [], derniere: undefined });
    expect(Object.keys(m)).toHaveLength(INDICATEURS.length);
    expect(new Set(Object.values(m))).toEqual(new Set([RAISONS.horsContrat]));
  });

  it('contrat simple', () => {
    const ind = { ...vide, ips: 90, effectif: 120 };
    const m = raisonsManquantes(ind, { statut: 'prive_sous_contrat', contrat: 'simple', ivacRef: [], derniere: undefined });
    expect(m.brevet).toBe(RAISONS.contratSimple);
    expect(m.ips).toBeUndefined();
  });

  it('ligne IVAC présente mais taux masqué : effectif trop faible', () => {
    const r = row({ candidats: 12 });
    const m = raisonsManquantes(vide, { statut: 'public', contrat: null, ivacRef: [r], derniere: r });
    expect(m.brevet).toBe(RAISONS.petitEffectif);
    expect(m.brevetDernier).toBe(RAISONS.petitEffectif);
    expect(m.vaTaux).toBe(RAISONS.petitEffectif);
    expect(m.ips).toBe(RAISONS.nonPublie);
  });

  it('taux publié mais VA absente : valeur ajoutée non calculée', () => {
    const r = row({ candidats: 30, taux: 95 });
    const ind = { ...vide, brevet: 95, brevetDernier: 95, noteEcrit: 12, mentions: 60, mentionsTB: 20, accesSixiemeTroisieme: 90 };
    const m = raisonsManquantes(ind, { statut: 'prive_sous_contrat', contrat: 'association', ivacRef: [r], derniere: r });
    expect(m.vaTaux).toBe(RAISONS.va);
    expect(m.vaNote).toBe(RAISONS.va);
    expect(m.note).toBe(RAISONS.note);
    expect(m.brevet).toBeUndefined();
  });

  it('absent du jeu : non publié', () => {
    const m = raisonsManquantes(vide, { statut: 'public', contrat: null, ivacRef: [], derniere: undefined });
    expect(m.brevet).toBe(RAISONS.nonPublie);
    expect(m.note).toBe(RAISONS.nonPublie);
  });
});
