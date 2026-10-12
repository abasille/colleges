import { describe, expect, it } from 'vitest';
import type { CommunePresente } from '../types';
import { contoursAAfficher } from './contours';

const communes: CommunePresente[] = [
  { code: '75113', libelle: 'Paris 13e', departement: '75' },
  { code: '75114', libelle: 'Paris 14e', departement: '75' },
  { code: '94041', libelle: 'Ivry-sur-Seine', departement: '94' },
];

describe('contours des communes choisies', () => {
  it('sans commune choisie, aucun contour à charger', () => {
    expect(contoursAAfficher({ communes: [], departements: [] }, communes)).toEqual({ codes: [], departements: [] });
  });

  it('un département choisi n’affiche pas les contours de ses communes', () => {
    expect(contoursAAfficher({ communes: [], departements: ['94'] }, communes)).toEqual({ codes: [], departements: [] });
  });

  it('un arrondissement ou une commune choisis : leur contour, chargé avec ceux de leur département', () => {
    expect(contoursAAfficher({ communes: ['94041', '75113', '75114'], departements: ['75'] }, communes)).toEqual({
      codes: ['75113', '75114', '94041'],
      departements: ['75', '94'],
    });
  });

  it('un code de commune inconnu (lien ancien) est ignoré', () => {
    expect(contoursAAfficher({ communes: ['75199'], departements: [] }, communes)).toEqual({ codes: [], departements: [] });
  });
});
