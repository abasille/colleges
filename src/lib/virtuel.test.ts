import { describe, expect, it } from 'vitest';
import { defilementPour, fenetre, positions } from './virtuel';

describe('liste virtualisée', () => {
  // Cinq lignes de 50 px, une de 80 px (étiquettes sur deux lignes), puis quatre de 50 px.
  const pos = positions([50, 50, 50, 50, 50, 80, 50, 50, 50, 50]);

  it('ne rend que les lignes visibles, plus une marge, et réserve la place des autres', () => {
    // Vue de 100 px défilée à 120 px : lignes 2 (100–150), 3 et 4 (200–250) ; une ligne de marge de chaque côté.
    expect(fenetre(pos, 120, 100, 1)).toEqual({ debut: 1, fin: 6, avant: 50, apres: 200 });
  });

  it('montre les dernières lignes quand la liste raccourcit sous un défilement lointain', () => {
    expect(fenetre(pos, 5000, 100, 1)).toEqual({ debut: 8, fin: 10, avant: 430, apres: 0 });
    expect(fenetre(positions([]), 120, 100, 1)).toEqual({ debut: 0, fin: 0, avant: 0, apres: 0 });
  });

  it('défile au plus court pour amener une ligne à l’écran, et pas du tout si elle y est déjà', () => {
    // Ligne 5 (250–330) sous une vue de 100 px défilée à 0 : son bas vient au bas de la vue.
    expect(defilementPour(pos, 5, 0, 100)).toBe(230);
    // Ligne 1 (50–100) au-dessus d'une vue défilée à 300 : son haut vient en haut de la vue.
    expect(defilementPour(pos, 1, 300, 100)).toBe(50);
    expect(defilementPour(pos, 3, 120, 100)).toBeNull();
  });
});
