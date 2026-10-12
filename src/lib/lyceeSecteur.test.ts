import { describe, expect, it } from 'vitest';
import { outilLyceeSecteur } from './lyceeSecteur';

describe('lycée de secteur hors de Paris', () => {
  it('renvoie vers la recherche du rectorat dans l’académie de Versailles', () => {
    for (const departement of ['78', '91', '92', '95'] as const) {
      const outil = outilLyceeSecteur({ academie: 'Versailles', departement });
      expect(outil?.url).toBe('https://bv.ac-versailles.fr/rechetab/lycees-de-secteur-proximite.html');
      expect(outil?.texte).toContain('académie de Versailles');
    }
  });

  it('renvoie vers la page de sectorisation de la direction départementale dans l’académie de Créteil', () => {
    const attendus = {
      '77': ['https://www.dsden77.ac-creteil.fr/spip.php?article1162', 'Seine-et-Marne'],
      '93': ['https://www.dsden93.ac-creteil.fr/spip/spip.php?article2376', 'Seine-Saint-Denis'],
      '94': ['https://www.dsden94.ac-creteil.fr/spip.php?article5005', 'Val-de-Marne'],
    } as const;
    for (const [departement, [url, nom]] of Object.entries(attendus)) {
      const outil = outilLyceeSecteur({ academie: 'Créteil', departement });
      expect(outil?.url).toBe(url);
      expect(outil?.libelle).toContain(nom);
    }
  });

  it('ne renvoie nulle part à Paris, où la fiche donne les lycées de secteur Affelnet', () => {
    expect(outilLyceeSecteur({ academie: 'Paris', departement: '75' })).toBeNull();
  });
});
