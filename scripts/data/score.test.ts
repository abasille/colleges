import { describe, expect, it } from 'vitest';
import { classer, composantes, distribution, lettre, noteMaison, percentileRank } from './score';

describe('percentileRank', () => {
  const d = distribution([10, 20, 30, 40, null, 50, undefined, NaN]);

  it('ignore les valeurs absentes et trie', () => {
    expect(d).toEqual([10, 20, 30, 40, 50]);
  });

  it('compte la moitié des ex æquo', () => {
    expect(percentileRank(d, 30)).toBeCloseTo(0.5);
    expect(percentileRank(d, 10)).toBeCloseTo(0.1);
    expect(percentileRank(d, 50)).toBeCloseTo(0.9);
    expect(percentileRank([5, 5, 5, 5], 5)).toBeCloseTo(0.5);
  });

  it('gère les valeurs hors distribution', () => {
    expect(percentileRank(d, 0)).toBe(0);
    expect(percentileRank(d, 100)).toBe(1);
    expect(percentileRank(d, 35)).toBeCloseTo(0.6);
  });
});

describe('composantes', () => {
  const dists = {
    brevet: [70, 80, 90, 100],
    noteEcrit: [8, 10, 12, 14],
    vaTaux: [-5, 0, 5, 10],
    vaNote: [-1, 0, 1, 2],
  };

  it('centile × 20, VA = moyenne des deux centiles', () => {
    const c = composantes({ brevet: 90, noteEcrit: 14, vaTaux: 10, vaNote: -1 }, dists);
    expect(c.brevet).toBe(12.5); // (2 + 0.5) / 4 × 20
    expect(c.noteEcrit).toBe(17.5);
    expect(c.va).toBe(10); // (17.5 + 2.5) / 2
  });

  it('VA = seul centile disponible', () => {
    const c = composantes({ brevet: null, noteEcrit: null, vaTaux: null, vaNote: 2 }, dists);
    expect(c).toEqual({ brevet: null, noteEcrit: null, va: 17.5 });
  });
});

describe('noteMaison', () => {
  it('moyenne des 3 composantes', () => {
    const n = noteMaison({ brevet: 16, noteEcrit: 14, va: 12.5 });
    expect(n).toMatchObject({ note: 14.2, lettre: 'B', partielle: false });
  });

  it('partielle avec 2 composantes', () => {
    expect(noteMaison({ brevet: 18, noteEcrit: null, va: 15 })).toMatchObject({ note: 16.5, lettre: 'A', partielle: true });
  });

  it('absente avec moins de 2 composantes', () => {
    expect(noteMaison({ brevet: 18, noteEcrit: null, va: null })).toBeNull();
    expect(noteMaison({ brevet: null, noteEcrit: null, va: null })).toBeNull();
  });
});

describe('lettre', () => {
  it('seuils A ≥ 16, B ≥ 12, C ≥ 8, D ≥ 4', () => {
    expect([20, 16, 15.9, 12, 11.9, 8, 7.9, 4, 3.9, 0].map(lettre)).toEqual(['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E']);
  });
});

describe('classer', () => {
  it('rang décroissant, ex æquo au même rang', () => {
    const r = classer([
      { uai: 'A', note: 12 },
      { uai: 'B', note: 15 },
      { uai: 'C', note: 12 },
      { uai: 'D', note: 9 },
    ]);
    expect(r.get('B')).toEqual({ rang: 1, sur: 4 });
    expect(r.get('A')).toEqual({ rang: 2, sur: 4 });
    expect(r.get('C')).toEqual({ rang: 2, sur: 4 });
    expect(r.get('D')).toEqual({ rang: 4, sur: 4 });
  });
});
