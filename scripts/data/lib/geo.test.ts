import { describe, expect, it } from 'vitest';
import { countPositions, simplifyGeometry, simplifyLine, simplifyRing, type Position } from './geo';

describe('simplifyLine', () => {
  it('supprime les points quasi alignés et garde les extrémités', () => {
    const line: Position[] = [
      [2.3, 48.8],
      [2.30001, 48.800001],
      [2.30002, 48.8],
      [2.30003, 48.80001],
      [2.31, 48.8],
    ];
    expect(simplifyLine(line, 0.00005)).toEqual([
      [2.3, 48.8],
      [2.31, 48.8],
    ]);
  });

  it('garde un sommet éloigné', () => {
    const line: Position[] = [
      [0, 0],
      [0.5, 0.01],
      [1, 0],
    ];
    expect(simplifyLine(line, 0.001)).toHaveLength(3);
  });
});

describe('simplifyRing / simplifyGeometry', () => {
  const carre: Position[] = [
    [2.3, 48.8],
    [2.305, 48.8],
    [2.31, 48.8],
    [2.31, 48.81],
    [2.3, 48.81],
    [2.3, 48.8],
  ];

  it('anneau fermé, arrondi', () => {
    const r = simplifyRing(carre, 0.0001, 4)!;
    expect(r[0]).toEqual(r[r.length - 1]);
    expect(r).toHaveLength(5);
  });

  it('écarte un anneau dégénéré', () => {
    expect(simplifyRing([[0, 0], [1, 1], [0, 0]], 0.1, 5)).toBeNull();
  });

  it('MultiPolygon d’un seul polygone -> Polygon', () => {
    const g = simplifyGeometry({ type: 'MultiPolygon', coordinates: [[carre]] }, 0.0001, 5)!;
    expect(g.type).toBe('Polygon');
    expect(countPositions(g)).toBe(5);
  });
});
