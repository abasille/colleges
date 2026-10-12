import { describe, expect, it } from 'vitest';
import { LONGUEUR_URL_MAX, odsExportUrl, filtresParLots, TAILLE_LOT } from './fetch';

describe('filtresParLots', () => {
  it('découpe une liste de valeurs en lots triés et sans doublon', () => {
    expect(filtresParLots('uai', ['0750003C', '0750001A', '0750002B', '0750001A'], 2)).toEqual([
      'uai in ("0750001A","0750002B")',
      'uai in ("0750003C")',
    ]);
    expect(filtresParLots('uai', [], 2)).toEqual([]);
  });

  it('garde chaque URL sous la limite pour tout le périmètre (1 292 UAI)', () => {
    const uais = Array.from({ length: 1292 }, (_, i) => `07${String(i).padStart(5, '0')}A`);
    const filtres = filtresParLots('identifiant_de_l_etablissement', uais);
    expect(filtres).toHaveLength(Math.ceil(1292 / TAILLE_LOT));
    for (const where of filtres) {
      const url = odsExportUrl('fr-en-indicateurs_personnels_etablissements2d', { where: `${where} and niveau="Collège"` });
      expect(url.length).toBeLessThan(LONGUEUR_URL_MAX);
    }
  });
});
