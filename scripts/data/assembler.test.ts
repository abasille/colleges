import { describe, expect, it } from 'vitest';
import { assemblerDataset, uaisDuPerimetre } from './assembler';
import { entree, etab, ligneIvac } from './fabriques';

describe('assemblerDataset : sélection des collèges', () => {
  it('garde les collèges de l’annuaire, triés par UAI, sauf les exclusions manuelles', () => {
    const e = entree({
      colleges: [
        etab({ identifiant_de_l_etablissement: '0940002B', code_commune: '94041', nom_etablissement: 'Collège Politzer' }),
        etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'Collège Rodin' }),
        etab({ identifiant_de_l_etablissement: '0750003C', nom_etablissement: 'Annexe fermée' }),
      ],
      config: { exclure: ['0750003C'] },
    });
    const a = assemblerDataset(e);
    expect(a.publication.dataset.colleges.map((c) => [c.uai, c.nom, c.zone])).toEqual([
      ['0750001A', 'Collège Rodin', '75105'],
      ['0940002B', 'Collège Politzer', '94041'],
    ]);
    expect(a.rapport.exclus.map((r) => r.identifiant_de_l_etablissement)).toEqual(['0750003C']);
    // Même sélection pour le plan de chargement des sources interrogées par UAI.
    expect(uaisDuPerimetre(e.config, e.sources.annuaire)).toEqual(['0750001A', '0940002B']);
  });
});

describe('assemblerDataset : rang', () => {
  it('classe les collèges notés du périmètre entre eux ; un collège hors périmètre ne compte pas', () => {
    const resultats = (uai: string, taux: number, noteEcrit: number) => ligneIvac({ uai, candidats: 100, taux, noteEcrit });
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A' }),
          etab({ identifiant_de_l_etablissement: '0750002B' }),
          etab({ identifiant_de_l_etablissement: '0750003C' }),
        ],
        sources: {
          ivac: [
            resultats('0750001A', 95, 14),
            resultats('0750002B', 70, 9),
            resultats('0920009Z', 99, 16), // hors périmètre : distribution nationale seulement
          ],
        },
      }),
    );
    const scores = Object.fromEntries(a.publication.dataset.colleges.map((c) => [c.uai, c.score && { rang: c.score.rang, sur: c.score.sur }]));
    expect(scores).toEqual({
      '0750001A': { rang: 1, sur: 2 },
      '0750002B': { rang: 2, sur: 2 },
      '0750003C': null, // aucun résultat : pas de note
    });
  });
});

describe('assemblerDataset : références', () => {
  it('moyennes France et par académie, pondérées par les candidats, sur toutes les lignes nationales', () => {
    const ips = (uai: string, academie: string, academique: number) => ({
      annee: 2025,
      uai,
      nom: null,
      academie,
      ips: 100,
      ecartType: null,
      national: 103.2,
      academique,
      departemental: null,
      source: 'test',
    });
    const a = assemblerDataset(
      entree({
        colleges: [etab({ identifiant_de_l_etablissement: '0750001A' })],
        sources: {
          ivac: [
            ligneIvac({ uai: '0750001A', academie: 'PARIS', candidats: 100, taux: 90 }),
            ligneIvac({ uai: '0940002B', academie: 'CRÉTEIL', candidats: 100, taux: 70 }),
            ligneIvac({ uai: '0780003C', academie: 'VERSAILLES', candidats: 200, taux: 80 }),
          ],
          ips: [ips('0750001A', 'PARIS', 110.4), ips('0940002B', 'CRETEIL', 95.1)],
        },
      }),
    );
    const { france, academies } = a.publication.dataset.references;
    expect(france.brevet).toBe(80); // (90×100 + 70×100 + 80×200) / 400
    expect(academies.Paris.brevet).toBe(90);
    expect(academies['Créteil'].brevet).toBe(70);
    expect(france.ips).toBe(103.2);
    expect(academies.Paris.ips).toBe(110.4);
    expect(academies['Créteil'].ips).toBe(95.1);
  });
});

describe('assemblerDataset : corrections manuelles', () => {
  it('une correction l’emporte sur la valeur calculée', () => {
    const a = assemblerDataset(
      entree({
        colleges: [etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'COLLEGE RODIN', restauration: 1 })],
        sources: { hebergement: [{ annee: 2025, uai: '0750001A', eleves: 500, demiPensionnaires: 0, internes: 0 }] },
        corrections: {
          colleges: { '0750001A': { nom: 'Collège Auguste-Rodin', demiPension: true, niveaux: ['5e', '4e', '3e'] } },
        },
      }),
    );
    const c = a.publication.dataset.colleges[0];
    expect(c.nom).toBe('Collège Auguste-Rodin');
    expect(c.demiPension).toBe(true); // 0 demi-pensionnaire selon la source
    expect(c.niveaux).toEqual(['5e', '4e', '3e']);
    expect(c.accueilSixieme).toBe(false);
  });

  it('sans correction, la valeur calculée est publiée', () => {
    const a = assemblerDataset(
      entree({
        colleges: [etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'COLLEGE RODIN' })],
        sources: { hebergement: [{ annee: 2025, uai: '0750001A', eleves: 500, demiPensionnaires: 0, internes: 0 }] },
      }),
    );
    const c = a.publication.dataset.colleges[0];
    expect([c.nom, c.demiPension, c.niveaux, c.accueilSixieme]).toEqual(['COLLEGE RODIN', false, ['6e', '5e', '4e', '3e'], true]);
  });
});

describe('assemblerDataset : fichiers publiés', () => {
  it('sérialise la publication dans public/data, horodatée par l’horloge injectée', () => {
    const a = assemblerDataset(entree({ colleges: [etab({ identifiant_de_l_etablissement: '0750001A' })] }));
    expect(a.fichiers.map((f) => f.chemin)).toEqual(['colleges.json', 'contours.geojson', 'secteurs-paris.geojson', 'carte-scolaire-94.json', 'events.json']);
    const colleges = JSON.parse(a.fichiers[0].contenu) as { generatedAt: string; colleges: { uai: string }[] };
    expect(colleges.generatedAt).toBe('2026-10-12T08:00:00.000Z');
    expect(colleges.colleges.map((c) => c.uai)).toEqual(['0750001A']);
    expect(a.publication.dataset.sources.find((s) => s.id === 'annuaire')?.millesime).toBe('extraction du 2026-10-12');
  });
});
