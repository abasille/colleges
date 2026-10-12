import { describe, expect, it } from 'vitest';
import type { CollegeResume } from '../types';
import { CADRAGE_ILE_DE_FRANCE, emprise, pointsDeLaCarte, rayonDuPoint, type EtatCarte } from './carte';

function college(uai: string, over: Partial<CollegeResume> = {}, ind: Partial<CollegeResume['indicateurs']> = {}): CollegeResume {
  return {
    uai,
    nom: `Collège ${uai}`,
    statut: 'public',
    contrat: null,
    commune: '75113',
    communeLibelle: 'Paris 13e',
    departement: '75',
    academie: 'Paris',
    lat: 48.83,
    lon: 2.36,
    rep: null,
    recrutementParticulier: null,
    niveaux: ['6e', '5e', '4e', '3e'],
    accueilSixieme: true,
    indicateurs: {
      note: null, brevet: null, brevetDernier: null, noteEcrit: null, vaTaux: null, vaNote: null, mentionsTB: null,
      mentions: null, accesSixiemeTroisieme: null, ips: null, effectif: null, elevesParClasse: null,
      heuresParEleve: null, eval6Francais: null, eval6Maths: null, ...ind,
    },
    manquants: {},
    optionTags: [],
    score: null,
    continuite: { lien: 'aucun', secondeGtSurPlace: false, passage: 'non_garanti' },
    ...over,
  };
}

const etat = (over: Partial<EtatCarte> = {}): EtatCarte => ({
  colorBy: 'statut',
  retenus: new Set(),
  selectionne: null,
  favoris: [],
  secteur: [],
  ...over,
});

describe('points de la carte', () => {
  const cs = [college('A'), college('B'), college('C'), college('D')];

  it('dessine les collèges écartés en dessous, atténués, et le collège sélectionné tout au-dessus', () => {
    const points = pointsDeLaCarte(cs, etat({ retenus: new Set(['A', 'C', 'D']), selectionne: 'C' }));
    expect(points.map((p) => p.uai)).toEqual(['B', 'A', 'D', 'C']);
    expect(points.map((p) => p.attenue)).toEqual([true, false, false, false]);
    expect(points.map((p) => p.selectionne)).toEqual([false, false, false, true]);
  });

  it('distingue les favoris et le collège de secteur', () => {
    const points = pointsDeLaCarte(cs, etat({ retenus: new Set(['A', 'B', 'C', 'D']), favoris: ['B', 'C'], secteur: ['C'] }));
    expect(points.filter((p) => p.favori).map((p) => p.uai)).toEqual(['B', 'C']);
    expect(points.filter((p) => p.secteur).map((p) => p.uai)).toEqual(['C']);
  });

  it('colore par statut', () => {
    const points = pointsDeLaCarte([college('A'), college('B', { statut: 'prive_sous_contrat' })], etat());
    expect(points.map((p) => p.couleur)).toEqual(['#2563eb', '#d97706']);
  });

  it('colore par indicateur sur l’étendue de tous les collèges, en gris sans donnée', () => {
    const avec = [college('A', {}, { brevet: 80 }), college('B', {}, { brevet: 100 }), college('C')];
    const points = pointsDeLaCarte(avec, etat({ colorBy: 'brevet', retenus: new Set(['A']) }));
    const couleur = (uai: string) => points.find((p) => p.uai === uai)?.couleur;
    expect(couleur('A')).toBe('rgb(68, 1, 84)');
    expect(couleur('B')).toBe('rgb(253, 231, 37)');
    expect(couleur('C')).toBe('#a1a1aa');
  });

  it('inverse l’échelle quand une valeur basse est meilleure (élèves par classe)', () => {
    const avec = [college('A', {}, { elevesParClasse: 20 }), college('B', {}, { elevesParClasse: 30 })];
    const points = pointsDeLaCarte(avec, etat({ colorBy: 'elevesParClasse' }));
    expect(points.map((p) => p.couleur)).toEqual(['rgb(253, 231, 37)', 'rgb(68, 1, 84)']);
  });
});

describe('taille des points', () => {
  it('garde des points de 16 px à l’échelle d’un quartier et les réduit à l’échelle de la région', () => {
    expect(rayonDuPoint(13)).toBe(8);
    expect(rayonDuPoint(16)).toBe(8);
    expect(rayonDuPoint(9)).toBeLessThan(rayonDuPoint(11));
    expect(rayonDuPoint(11)).toBeLessThan(rayonDuPoint(13));
    expect(rayonDuPoint(5)).toBeGreaterThanOrEqual(3);
  });
});

describe('cadrage de la carte', () => {
  it('se cadre sur l’emprise des collèges retenus', () => {
    const retenus = [college('A', { lat: 48.9, lon: 2.3 }), college('B', { lat: 48.7, lon: 2.5 }), college('C', { lat: 48.8, lon: 2.1 })];
    expect(emprise(retenus)).toEqual([[48.7, 2.1], [48.9, 2.5]]);
  });

  it('ne propose aucun cadrage quand aucun collège n’est retenu', () => {
    expect(emprise([])).toBeNull();
  });

  it('couvre toute l’Île-de-France à l’ouverture', () => {
    const [[sud, ouest], [nord, est]] = CADRAGE_ILE_DE_FRANCE;
    // Extrémités de la région : Magny-en-Vexin (nord-ouest), Mantes-la-Jolie, Provins (est), Château-Landon (sud).
    for (const [lat, lon] of [[49.155, 1.787], [48.99, 1.717], [48.56, 3.299], [48.149, 2.699]]) {
      expect(lat).toBeGreaterThan(sud);
      expect(lat).toBeLessThan(nord);
      expect(lon).toBeGreaterThan(ouest);
      expect(lon).toBeLessThan(est);
    }
  });
});
