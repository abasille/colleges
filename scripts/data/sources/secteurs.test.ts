import { describe, expect, it } from 'vitest';
import { matchNomCollege, type CollegeNom } from './secteurs';

const colleges: CollegeNom[] = [
  { uai: '0752538B', nom: 'Collège Rodin', adresse: '19 rue Corvisart' },
  { uai: '0754253R', nom: 'Collège Saint-Exupéry', adresse: '89 boulevard Arago' },
  { uai: '0752526N', nom: 'Collège Henri IV', adresse: '23 rue Clovis' },
  { uai: '0752539C', nom: 'Collège Claude Monet', adresse: '1 rue du Docteur Magnan' },
  { uai: '0750611G', nom: 'Collège Jean Moulin', adresse: "75 rue d'Alésia" },
  { uai: '0750525N', nom: 'Collège Moulin des Prés', adresse: '18 rue du Moulin des Prés' },
];

describe('matchNomCollege', () => {
  it('égalité après normalisation', () => {
    expect(matchNomCollege('ST EXUPERY', '89 BOULEVARD ARAGO', colleges)).toMatchObject({ uai: '0754253R', methode: 'exact', adresseConcordante: true });
    expect(matchNomCollege('HENRI IV', null, colleges)).toMatchObject({ uai: '0752526N', adresseConcordante: null });
    expect(matchNomCollege('JEAN MOULIN', "75 RUE D' ALESIA", colleges)).toMatchObject({ uai: '0750611G', adresseConcordante: true });
  });

  it('inclusion des mots significatifs', () => {
    expect(matchNomCollege('AUGUSTE RODIN', '19 RUE CORVISART', colleges)).toMatchObject({ uai: '0752538B', methode: 'inclusion' });
  });

  it('pas de correspondance hors périmètre', () => {
    expect(matchNomCollege('CLAUDE DEBUSSY', null, colleges).uai).toBeNull();
    expect(matchNomCollege('MOLIERE', null, colleges).uai).toBeNull();
  });

  it('ambiguïté départagée par l’adresse', () => {
    const r = matchNomCollege('MOULIN', '18 RUE DU MOULIN DES PRES', colleges);
    expect(r.uai).toBe('0750525N');
    expect(r.methode).toBe('adresse');
    expect(matchNomCollege('MOULIN', null, colleges).uai).toBeNull();
  });
});
