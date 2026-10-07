import { describe, expect, it } from 'vitest';
import { annee, niceCase, num, ratioOfSums, round, weightedMean } from './util';

describe('num', () => {
  it('convertit les formats publiés', () => {
    expect(num('86,3%')).toBe(86.3);
    expect(num('1.02')).toBe(1.02);
    expect(num('311')).toBe(311);
    expect(num(42)).toBe(42);
    expect(num('')).toBeNull();
    expect(num(null)).toBeNull();
    expect(num('nd')).toBeNull();
  });
});

describe('annee', () => {
  it('extrait la première année', () => {
    expect(annee('2023-2024')).toBe(2023);
    expect(annee('2025-01-01T00:00:00+00:00')).toBe(2025);
    expect(annee(2020.0)).toBe(2020);
    expect(annee(null)).toBeNull();
  });
});

describe('moyennes', () => {
  it('pondérée, en ignorant les couples incomplets', () => {
    expect(weightedMean([[10, 1], [20, 3], [null, 5], [30, null], [40, 0]])).toBe(17.5);
    expect(weightedMean([])).toBeNull();
  });
  it('ratio de sommes', () => {
    expect(ratioOfSums([[1, 4], [1, 4], [5, null]])).toBe(25);
  });
  it('arrondi', () => {
    expect(round(12.345, 1)).toBe(12.3);
    expect(round(null)).toBeNull();
  });
});

describe('niceCase', () => {
  it('casse titre avec articles en minuscules', () => {
    expect(niceCase('JEAN DE LA FONTAINE')).toBe('Jean de la Fontaine');
    expect(niceCase('S. GERMAIN')).toBe('S. Germain');
  });
});
