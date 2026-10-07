import { describe, expect, it } from 'vitest';
import { normalizeNom, normalizeVoie, stripAccents } from './normalize';

describe('stripAccents', () => {
  it('met en majuscules sans accents ni ligatures', () => {
    expect(stripAccents("Allée de l'Œuvre Sœur Thérèse")).toBe("ALLEE DE L'OEUVRE SOEUR THERESE");
  });
});

describe('normalizeVoie', () => {
  // Paires réelles : libellé du géocodeur (Géoplateforme) / libellé de la carte scolaire.
  const paires: [string, string][] = [
    ['Rue Moïse', 'RUE MOISE'],
    ['Allée Audre Lorde', 'ALLEE AUDRE LORDE'],
    ['Avenue Youri Gagarine', 'AVENUE YOURI GAGARINE'],
    ["Avenue de l'Observatoire", 'AVENUE DE L OBSERVATOIRE'],
    ['Place Saint-Just', 'PLACE SAINT JUST'],
    ['Rond-Point Jaroslaw Dombrovski', 'ROND POINT JAROSLAW DOMBROVSKI'],
    ['Promenée Voltaire', 'PROMENEE VOLTAIRE'],
    ["Jardin de l'Insurrection", 'JARDIN DE L INSURRECTION'],
    ['Pont des Fusillés', 'PONT DES FUSILLES'],
    ['Voie Michel-Ange', 'VOIE MICHEL ANGE'],
    ["Rue d'Alésia", "RUE D' ALESIA"],
    ['Rue du 8 Mai 1945', 'RUE DU 8 MAI 1945'],
  ];
  it.each(paires)('%s ≡ %s', (geocodeur, carte) => {
    expect(normalizeVoie(geocodeur)).toBe(normalizeVoie(carte));
  });

  it('développe les types de voie abrégés en tête', () => {
    expect(normalizeVoie('Av. de la République')).toBe('AVENUE DE LA REPUBLIQUE');
    expect(normalizeVoie('BD Saint-Marcel')).toBe('BOULEVARD SAINT MARCEL');
    expect(normalizeVoie('R. Clovis')).toBe('RUE CLOVIS');
    expect(normalizeVoie('pl. du Commerce')).toBe('PLACE DU COMMERCE');
    expect(normalizeVoie('All des Champs Fleuris')).toBe('ALLEE DES CHAMPS FLEURIS');
    expect(normalizeVoie('Imp. Verollot')).toBe('IMPASSE VEROLLOT');
    expect(normalizeVoie('Qu Jules Guesde')).toBe('QUAI JULES GUESDE');
    expect(normalizeVoie('Che du Théâtre')).toBe('CHEMIN DU THEATRE');
    expect(normalizeVoie('Sq. Robespierre')).toBe('SQUARE ROBESPIERRE');
    expect(normalizeVoie('Rte de Choisy')).toBe('ROUTE DE CHOISY');
  });

  it("ne développe l'abréviation de type qu'en tête", () => {
    expect(normalizeVoie('Rue R Lefèvre')).toBe('RUE R LEFEVRE');
  });

  it('développe SAINT / SAINTE et les titres', () => {
    expect(normalizeVoie('Rue St Germain')).toBe('RUE SAINT GERMAIN');
    expect(normalizeVoie('Rue Ste Geneviève')).toBe('RUE SAINTE GENEVIEVE');
    expect(normalizeVoie('Av du Gal de Gaulle')).toBe('AVENUE DU GENERAL DE GAULLE');
    expect(normalizeVoie('Rue du Dr Roux')).toBe('RUE DU DOCTEUR ROUX');
  });

  it('réduit les espaces et la ponctuation', () => {
    expect(normalizeVoie('  rue   des  Pénîches, ')).toBe('RUE DES PENICHES');
    expect(normalizeVoie('')).toBe('');
  });
});

describe('normalizeNom', () => {
  it('rapproche les noms publiés des noms de l’annuaire', () => {
    expect(normalizeNom('Collège Saint-Exupéry')).toBe(normalizeNom('ST EXUPERY'));
    expect(normalizeNom('Collège Évariste Galois')).toBe('EVARISTE GALOIS');
    expect(normalizeNom('Collège privé Notre-Dame de Sion')).toBe('NOTRE DAME DE SION');
    expect(normalizeNom('COLLEGE HENRI IV')).toBe('HENRI IV');
    expect(normalizeNom("Collège privé L'École alsacienne")).toBe('L ECOLE ALSACIENNE');
  });
});
