import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { chargerEvenements, problemesEvenement } from './events';

const ok = {
  id: 'jpo-0752526N-2027-01',
  uai: '0752526N',
  academie: null,
  type: 'portes_ouvertes',
  date: '2027-01-16',
  dateFin: null,
  heureDebut: '09:00',
  heureFin: '12:00',
  titre: 'Portes ouvertes',
  inscriptionRequise: false,
  saison: '2026-27',
  source: 'https://exemple.fr',
  verifieLe: '2026-10-07',
  confiance: 'haute',
};

describe('problemesEvenement', () => {
  it('accepte un événement valide', () => {
    expect(problemesEvenement(ok)).toEqual([]);
  });
  it('signale les champs invalides', () => {
    const p = problemesEvenement({ ...ok, date: '2027-02-30', type: 'fete', heureDebut: '9h', confiance: 'forte' });
    expect(p).toHaveLength(4);
    expect(problemesEvenement({ ...ok, uai: null, type: 'officiel', academie: null })).toContain('événement officiel sans académie');
  });
});

describe('chargerEvenements', () => {
  it('fichier absent : fichier vide avec la saison de la configuration', () => {
    const r = chargerEvenements('/nonexistent/events.json', new Set(), '2026-27');
    expect(r.file).toEqual({ saisonCourante: '2026-27', events: [], inscriptions: {} });
    expect(r.present).toBe(false);
  });

  it('filtre le périmètre, rejette les invalides, trie par date', () => {
    const dir = mkdtempSync(join(tmpdir(), 'events-'));
    const path = join(dir, 'events.json');
    writeFileSync(
      path,
      JSON.stringify({
        saisonCourante: '2026-27',
        events: [
          { ...ok, id: 'b', date: '2027-02-01' },
          { ...ok, id: 'a', date: '2027-01-10' },
          { ...ok, id: 'hors', uai: '0759999Z' },
          { ...ok, id: 'off', uai: null, academie: 'Paris', type: 'officiel' },
          { ...ok, id: 'bad', date: 'demain' },
        ],
        inscriptions: {
          '0752526N': { statut: 'ouvertes', constateLe: '2026-10-07', detail: '', source: 'https://exemple.fr' },
          '0759999Z': { statut: 'closes', constateLe: '2026-10-07', detail: '', source: 'https://exemple.fr' },
        },
      }),
    );
    const r = chargerEvenements(path, new Set(['0752526N']), '2026-27');
    expect(r.file.events.map((e) => e.id)).toEqual(['a', 'off', 'b']);
    expect(r.rejetes.map((x) => x.id)).toEqual(['bad']);
    expect(r.horsPerimetre).toEqual(['hors (0759999Z)']);
    expect(Object.keys(r.file.inscriptions)).toEqual(['0752526N']);
  });
});
