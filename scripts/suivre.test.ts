import { describe, expect, it } from 'vitest';
import type { CollegeEvent } from '../src/types';
import { parseRobots } from './watch/robots';
import { chercherColleges, datesOfficielles, verdictRobots, type CollegeCherche } from './suivre';

const college = (c: Partial<CollegeCherche> & Pick<CollegeCherche, 'uai' | 'nom'>): CollegeCherche => ({
  statut: 'public',
  communeLibelle: 'Ivry-sur-Seine',
  departement: '94',
  academie: 'Créteil',
  suivi: false,
  ...c,
});

describe('chercherColleges', () => {
  const colleges = [
    college({ uai: '0920001A', nom: 'Collège privé Saint-Joseph', communeLibelle: 'Asnières-sur-Seine', departement: '92', academie: 'Versailles', statut: 'prive_sous_contrat' }),
    college({ uai: '0780002B', nom: 'Collège Saint-Joseph', communeLibelle: 'Le Chesnay-Rocquencourt', departement: '78', academie: 'Versailles' }),
    college({ uai: '0940003C', nom: 'Collège Molière', suivi: true }),
    college({ uai: '0750004D', nom: 'Collège Évariste Galois', communeLibelle: 'Paris 13e', departement: '75', academie: 'Paris' }),
  ];

  it('trouve un collège par son UAI, sans tenir compte de la casse', () => {
    expect(chercherColleges(colleges, '0940003c').map((c) => c.uai)).toEqual(['0940003C']);
  });

  it('trouve par le nom sans accents ni tirets, et par la commune', () => {
    expect(chercherColleges(colleges, 'evariste galois').map((c) => c.uai)).toEqual(['0750004D']);
    expect(chercherColleges(colleges, 'saint joseph asnieres').map((c) => c.uai)).toEqual(['0920001A']);
  });

  it('accepte des débuts de mots', () => {
    expect(chercherColleges(colleges, 'gal paris').map((c) => c.uai)).toEqual(['0750004D']);
  });

  it('renvoie tous les collèges qui correspondent quand la requête est ambiguë', () => {
    expect(chercherColleges(colleges, 'Saint-Joseph').map((c) => c.uai)).toEqual(['0920001A', '0780002B']);
  });

  it('préfère les mots entiers aux débuts de mots', () => {
    const avecBaker = [...colleges, college({ uai: '0770005E', nom: 'Collège Joséphine Baker', communeLibelle: 'Bussy-Saint-Georges' })];
    expect(chercherColleges(avecBaker, 'saint joseph').map((c) => c.uai)).toEqual(['0920001A', '0780002B']);
    expect(chercherColleges(avecBaker, 'josephine').map((c) => c.uai)).toEqual(['0770005E']);
  });

  it('ne renvoie rien pour une requête vide ou sans correspondance', () => {
    expect(chercherColleges(colleges, '  ')).toEqual([]);
    expect(chercherColleges(colleges, 'Montaigne')).toEqual([]);
  });
});

describe('datesOfficielles', () => {
  const officiel = (id: string, territoire: CollegeEvent['territoire'], saison: string): CollegeEvent => ({
    id, uai: null, territoire, type: 'officiel', date: '2026-03-27', dateFin: null, heureDebut: null, heureFin: null,
    titre: 'Dérogations', inscriptionRequise: null, saison, source: 'https://exemple.fr', verifieLe: '2026-10-12', confiance: 'haute',
  });
  const portesOuvertes: CollegeEvent = { ...officiel('po', null, '2026-27'), uai: '0940003C', type: 'portes_ouvertes' };
  const events = [
    officiel('creteil-1', 'Créteil', '2026-27'),
    officiel('94-1', '94', '2025-26'),
    officiel('paris-1', 'Paris', '2025-26'),
    officiel('paris-2', 'Paris', '2026-27'),
    officiel('paris-3', 'Paris', '2026-27'),
    portesOuvertes,
  ];

  it("compte, pour l'académie puis le département du collège, les dates de la saison courante et la dernière saison renseignée", () => {
    expect(datesOfficielles({ academie: 'Créteil', departement: '94' }, events, '2026-27')).toEqual([
      { territoire: 'Créteil', saisonCourante: 1, derniereSaison: '2026-27' },
      { territoire: '94', saisonCourante: 0, derniereSaison: '2025-26' },
    ]);
  });

  it("à Paris, rectorat et direction départementale ne font qu'un : un seul territoire", () => {
    expect(datesOfficielles({ academie: 'Paris', departement: '75' }, events, '2026-27')).toEqual([
      { territoire: 'Paris', saisonCourante: 2, derniereSaison: '2026-27' },
    ]);
  });

  it("un territoire sans aucune date n'a pas de dernière saison", () => {
    expect(datesOfficielles({ academie: 'Versailles', departement: '92' }, events, '2026-27')).toEqual([
      { territoire: 'Versailles', saisonCourante: 0, derniereSaison: null },
      { territoire: '92', saisonCourante: 0, derniereSaison: null },
    ]);
  });
});

describe('verdictRobots', () => {
  it('autorise un chemin permis à tous, refuse un chemin interdit par le groupe *', () => {
    const pia = parseRobots('User-agent: *\nDisallow: /serail/upload/\n\nUser-agent: ClaudeBot\nDisallow: /\n');
    expect(verdictRobots(pia, '/serail/jcms/s2_1/fr/accueil')).toEqual({ autorise: true, motif: null });
    expect(verdictRobots(pia, '/serail/upload/docs/affiche.pdf')).toEqual({ autorise: false, motif: 'interdit par le groupe *' });
  });

  it("refuse un chemin que le groupe * interdit même si le groupe de l'agent le permet", () => {
    const r = parseRobots('User-agent: *\nDisallow: /agenda/\n\nUser-agent: Claude-User\nAllow: /\n');
    expect(verdictRobots(r, '/agenda/2026')).toEqual({ autorise: false, motif: 'interdit par le groupe *' });
  });

  it('refuse un chemin interdit à Claude-User (WebFetch) ou à colleges-watch (surveillance)', () => {
    expect(verdictRobots(parseRobots('User-agent: Claude-User\nDisallow: /prive/\n'), '/prive/x')).toEqual({
      autorise: false,
      motif: 'interdit pour Claude-User',
    });
    expect(verdictRobots(parseRobots('User-agent: colleges-watch\nDisallow: /\n'), '/actualites')).toEqual({
      autorise: false,
      motif: 'interdit pour colleges-watch',
    });
  });

  it("écarte tout le site quand il exclut les agents d'Anthropic au-delà de ClaudeBot", () => {
    const sion = parseRobots('User-agent: *\nAllow: /\n\nUser-agent: anthropic-ai\nUser-agent: ClaudeBot\nDisallow: /\n');
    expect(verdictRobots(sion, '/college/inscriptions')).toEqual({
      autorise: false,
      motif: "site fermé aux agents d'Anthropic (anthropic-ai)",
    });
  });
});
