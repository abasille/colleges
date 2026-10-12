import { describe, expect, it } from 'vitest';
import { matchNomCollege, type CollegeNom } from './secteurs';

const colleges: CollegeNom[] = [
  { uai: '0752538B', nom: 'Collège Rodin', adresse: '19 rue Corvisart' },
  { uai: '0754253R', nom: 'Collège Saint-Exupéry', adresse: '89 boulevard Arago' },
  { uai: '0752526N', nom: 'Collège Henri IV', adresse: '23 rue Clovis' },
  { uai: '0752539C', nom: 'Collège Claude Monet', adresse: '1 rue du Docteur Magnan' },
  { uai: '0750611G', nom: 'Collège Jean Moulin', adresse: "75 rue d'Alésia" },
  { uai: '0750525N', nom: 'Collège Moulin des Prés', adresse: '18 rue du Moulin des Prés' },
  { uai: '0755778Y', nom: 'Collège Françoise Seligmann', adresse: '21 rue de Sambre et Meuse' },
  { uai: '0752319N', nom: 'Collège Pierre Mendès France', adresse: '24 rue le Vau' },
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

  it('collèges de tous les arrondissements', () => {
    expect(matchNomCollege('PIERRE MENDES FRANCE', '24 RUE LE VAU', colleges)).toMatchObject({ uai: '0752319N', methode: 'exact', adresseConcordante: true });
  });

  it('nom publié avec une lettre doublée en moins', () => {
    expect(matchNomCollege('FRANCOISE SELIGMAN', null, colleges)).toMatchObject({ uai: '0755778Y', methode: 'approchant' });
  });

  it('pas de correspondance pour un nom absent de la liste', () => {
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
