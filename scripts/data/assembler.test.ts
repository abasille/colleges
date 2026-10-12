import { describe, expect, it } from 'vitest';
import { assemblerDataset, etablissementsAGeocoder, uaisDuPerimetre } from './assembler';
import { entree, etab, ligneIvac } from './fabriques';

describe('assemblerDataset : coordonnées', () => {
  it('sans coordonnées dans l’annuaire, publie celles du géocodage de l’adresse', () => {
    const e = entree({
      colleges: [
        etab({ identifiant_de_l_etablissement: '0750001A' }),
        etab({
          identifiant_de_l_etablissement: '0756898R',
          statut_public_prive: 'Privé',
          type_contrat_prive: 'HORS CONTRAT',
          adresse_1: '12 rue Charles Pouillet',
          code_postal: '75017',
          latitude: null,
          longitude: null,
        }),
      ],
      sources: { geocodage: new Map([['0756898R', { lat: 48.8851234, lon: 2.3123456, label: '12 Rue Charles Pouillet 75017 Paris', score: 0.97 }]]) },
    });
    expect(etablissementsAGeocoder(e.config, e.sources.annuaire).map((r) => r.identifiant_de_l_etablissement)).toEqual(['0756898R']);
    const c = assemblerDataset(e).publication.dataset.colleges.find((x) => x.uai === '0756898R')!;
    expect([c.lat, c.lon]).toEqual([48.885123, 2.312346]);
  });
});

describe('assemblerDataset : sélection des collèges', () => {
  it('garde les collèges ouverts des départements configurés, de nature 340 ou 352', () => {
    const e = entree({
      colleges: [
        etab({ identifiant_de_l_etablissement: '0750001A' }),
        etab({ identifiant_de_l_etablissement: '0920002B', code_commune: '92012', code_departement: '092', libelle_academie: 'Versailles', code_nature: 352 }),
        etab({ identifiant_de_l_etablissement: '0600003C', code_commune: '60057', code_departement: '060', libelle_academie: 'Amiens' }),
        etab({ identifiant_de_l_etablissement: '0750004D', code_nature: 300 }),
        etab({ identifiant_de_l_etablissement: '0750005E', etat: 'A FERMER' }),
      ],
      config: { departements: ['75', '92'] },
    });
    expect(assemblerDataset(e).publication.dataset.colleges.map((c) => c.uai)).toEqual(['0750001A', '0920002B']);
    expect(uaisDuPerimetre(e.config, e.sources.annuaire)).toEqual(['0750001A', '0920002B']);
  });

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
    expect(a.publication.dataset.colleges.map((c) => [c.uai, c.nom, c.commune])).toEqual([
      ['0750001A', 'Collège Rodin', '75105'],
      ['0940002B', 'Collège Politzer', '94041'],
    ]);
    expect(a.rapport.exclus.map((r) => r.identifiant_de_l_etablissement)).toEqual(['0750003C']);
    // Même sélection pour le plan de chargement des sources interrogées par UAI.
    expect(uaisDuPerimetre(e.config, e.sources.annuaire)).toEqual(['0750001A', '0940002B']);
  });
});

describe('assemblerDataset : doublons d’UAI', () => {
  it('fusionne les lignes d’un même UAI en gardant le site principal, pas l’annexe', () => {
    const site = { identifiant_de_l_etablissement: '0951509Z', code_commune: '95585', code_departement: '095', libelle_academie: 'Versailles' };
    const e = entree({
      colleges: [
        etab({ ...site, nom_etablissement: 'Annexe Oscar Romero du collège La Salle - Saint-Rosaire de Sarcelles', nom_commune: 'Garges-lès-Gonesse', adresse_1: '5 rue Gambetta' }),
        etab({ ...site, nom_etablissement: 'Collège La Salle - Saint-Rosaire', nom_commune: 'Sarcelles', adresse_1: '53 rue Pierre Brossolette' }),
      ],
    });
    const a = assemblerDataset(e);
    expect(a.publication.dataset.colleges.map((c) => [c.uai, c.nom, c.communeLibelle])).toEqual([['0951509Z', 'Collège La Salle - Saint-Rosaire', 'Sarcelles']]);
    expect(a.publication.details.flatMap((d) => d.colleges.map((c) => c.adresse))).toEqual(['53 rue Pierre Brossolette']);
    expect(uaisDuPerimetre(e.config, e.sources.annuaire)).toEqual(['0951509Z']);
  });
});

describe('assemblerDataset : commune, département, académie', () => {
  it('lit la commune, le département et l’académie dans l’annuaire, Versailles comprise', () => {
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A', code_commune: '75113', nom_commune: 'Paris 13e  Arrondissement' }),
          etab({ identifiant_de_l_etablissement: '0750002B', code_commune: '75101', nom_commune: 'Paris' }),
          etab({
            identifiant_de_l_etablissement: '0920003C',
            code_commune: '92012',
            nom_commune: 'Boulogne-Billancourt',
            code_departement: '092',
            libelle_academie: 'Versailles',
          }),
          etab({
            identifiant_de_l_etablissement: '0940004D',
            code_commune: '94041',
            nom_commune: 'Ivry-sur-Seine',
            code_departement: '094',
            libelle_academie: 'Créteil',
          }),
        ],
      }),
    );
    const d = a.publication.dataset;
    expect(d.colleges.map((c) => [c.uai, c.commune, c.communeLibelle, c.departement, c.academie])).toEqual([
      ['0750001A', '75113', 'Paris 13e', '75', 'Paris'],
      ['0750002B', '75101', 'Paris 1er', '75', 'Paris'],
      ['0920003C', '92012', 'Boulogne-Billancourt', '92', 'Versailles'],
      ['0940004D', '94041', 'Ivry-sur-Seine', '94', 'Créteil'],
    ]);
    // Les données publiées listent les communes présentes, triées par code.
    expect(d.communes).toEqual([
      { code: '75101', libelle: 'Paris 1er', departement: '75' },
      { code: '75113', libelle: 'Paris 13e', departement: '75' },
      { code: '92012', libelle: 'Boulogne-Billancourt', departement: '92' },
      { code: '94041', libelle: 'Ivry-sur-Seine', departement: '94' },
    ]);
  });
});

describe('assemblerDataset : lycée sur place', () => {
  it('détecte le lycée sur place hors de Paris : cité scolaire publique et même établissement privé', () => {
    const versailles = { code_departement: '092', libelle_academie: 'Versailles' };
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ ...versailles, identifiant_de_l_etablissement: '0920001A', code_commune: '92012', adresse_1: '1 rue A' }),
          etab({
            ...versailles,
            identifiant_de_l_etablissement: '0920002B',
            code_commune: '92040',
            statut_public_prive: 'Privé',
            type_contrat_prive: "CONTRAT D'ASSOCIATION TOUTES CLASSES",
            adresse_1: '2 rue B',
            siren_siret: '77568540300029',
          }),
          etab({ ...versailles, identifiant_de_l_etablissement: '0920003C', code_commune: '92050', adresse_1: '3 rue C' }),
        ],
        sources: {
          annuaire: {
            colleges: [],
            complements: [],
            lycees: [
              etab({ ...versailles, identifiant_de_l_etablissement: '0920101A', code_nature: 300, code_commune: '92012', nom_etablissement: 'Lycée A' }),
              etab({
                ...versailles,
                identifiant_de_l_etablissement: '0920102B',
                code_nature: 300,
                code_commune: '92040',
                statut_public_prive: 'Privé',
                siren_siret: '77568540300011',
                nom_etablissement: 'Lycée B',
              }),
              etab({ ...versailles, identifiant_de_l_etablissement: '0920103C', code_nature: 300, code_commune: '92050', adresse_1: '3 rue C' }),
            ],
          },
          cites: [
            { code_cite_scolaire: '09201', uai: '0920001A', code_nature: '340', appellation_officielle: null },
            { code_cite_scolaire: '09201', uai: '0920101A', code_nature: '300', appellation_officielle: null },
          ],
        },
      }),
    );
    expect(a.publication.details.flatMap((d) => d.colleges.map((c) => [c.uai, c.continuite.lien, c.continuite.lycee?.nom ?? null]))).toEqual([
      ['0920001A', 'cite_scolaire', 'Lycée A'],
      ['0920002B', 'meme_etablissement_prive', 'Lycée B'],
      ['0920003C', 'aucun', null], // public à la même adresse qu'un lycée, sans cité scolaire
    ]);
  });
});

describe('assemblerDataset : rang', () => {
  it('classe les collèges notés de tout le périmètre entre eux, toutes académies confondues ; un collège hors périmètre ne compte pas', () => {
    const resultats = (uai: string, taux: number, noteEcrit: number) => ligneIvac({ uai, candidats: 100, taux, noteEcrit });
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A' }),
          etab({ identifiant_de_l_etablissement: '0950002B', code_commune: '95585', code_departement: '095', libelle_academie: 'Versailles' }),
          etab({ identifiant_de_l_etablissement: '0750003C' }),
        ],
        sources: {
          ivac: [
            resultats('0750001A', 95, 14),
            resultats('0950002B', 70, 9),
            resultats('0920009Z', 99, 16), // hors périmètre : distribution nationale seulement
          ],
        },
      }),
    );
    const scores = Object.fromEntries(a.publication.dataset.colleges.map((c) => [c.uai, c.score && { rang: c.score.rang, sur: c.score.sur }]));
    expect(scores).toEqual({
      '0750001A': { rang: 1, sur: 2 },
      '0750003C': null, // aucun résultat : pas de note
      '0950002B': { rang: 2, sur: 2 },
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
          ips: [ips('0750001A', 'PARIS', 110.4), ips('0940002B', 'CRETEIL', 95.1), ips('0780003C', 'VERSAILLES', 104.7)],
        },
      }),
    );
    const { france, academies } = a.publication.dataset.references;
    expect(france.brevet).toBe(80); // (90×100 + 70×100 + 80×200) / 400
    expect(academies.Paris.brevet).toBe(90);
    expect(academies['Créteil'].brevet).toBe(70);
    expect(academies.Versailles.brevet).toBe(80);
    expect(france.ips).toBe(103.2);
    expect(academies.Paris.ips).toBe(110.4);
    expect(academies['Créteil'].ips).toBe(95.1);
    expect(academies.Versailles.ips).toBe(104.7);
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
    expect(a.publication.details[0].colleges[0].demiPension).toBe(true); // 0 demi-pensionnaire selon la source
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
    const demiPension = a.publication.details[0].colleges[0].demiPension;
    expect([c.nom, demiPension, c.niveaux, c.accueilSixieme]).toEqual(['COLLEGE RODIN', false, ['6e', '5e', '4e', '3e'], true]);
  });
});

describe('assemblerDataset : collèges suivis', () => {
  it('publie dans le fichier léger si chaque collège est suivi, d’après la liste des corrections manuelles', () => {
    const a = assemblerDataset(
      entree({
        colleges: [etab({ identifiant_de_l_etablissement: '0750001A' }), etab({ identifiant_de_l_etablissement: '0750002B' })],
        corrections: { suivis: ['0750002B', '0759999Z'] },
      }),
    );
    expect(a.publication.dataset.colleges.map((c) => [c.uai, c.suivi])).toEqual([
      ['0750001A', false],
      ['0750002B', true],
    ]);
    expect(a.publication.details[0].colleges[0]).not.toHaveProperty('suivi');
  });
});

describe('assemblerDataset : fichiers publiés', () => {
  it('sérialise la publication dans public/data, horodatée par l’horloge injectée', () => {
    const a = assemblerDataset(entree({ colleges: [etab({ identifiant_de_l_etablissement: '0750001A' })] }));
    expect(a.fichiers.map((f) => f.chemin)).toEqual(['colleges.json', 'colleges-75.json', 'secteurs-paris.geojson', 'carte-scolaire-94.json', 'events.json']);
    const colleges = JSON.parse(a.fichiers[0].contenu) as { generatedAt: string; colleges: { uai: string }[] };
    expect(colleges.generatedAt).toBe('2026-10-12T08:00:00.000Z');
    expect(colleges.colleges.map((c) => c.uai)).toEqual(['0750001A']);
    expect(a.publication.dataset.sources.find((s) => s.id === 'annuaire')?.millesime).toBe('extraction du 2026-10-12');
  });
});

describe('assemblerDataset : fichier léger et détails par département', () => {
  const deuxDepartements = () =>
    entree({
      colleges: [
        etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'Collège Rodin' }),
        etab({ identifiant_de_l_etablissement: '0750002B', nom_etablissement: 'Collège Lavoisier' }),
        etab({
          identifiant_de_l_etablissement: '0940003C',
          code_commune: '94041',
          nom_commune: 'Ivry-sur-Seine',
          code_departement: '094',
          libelle_academie: 'Créteil',
        }),
      ],
      sources: { ivac: [ligneIvac({ uai: '0750001A', candidats: 100, taux: 92, noteEcrit: 13 })] },
    });

  it('le fichier léger garde ce dont la liste, la carte et les filtres ont besoin, sans les historiques ni la continuité détaillée', () => {
    const a = assemblerDataset(deuxDepartements());
    const c = a.publication.dataset.colleges.find((x) => x.uai === '0750001A')!;
    expect(c.nom).toBe('Collège Rodin');
    expect(c.indicateurs.brevet).toBe(92);
    expect(c.score && Object.keys(c.score).sort()).toEqual(['lettre', 'note', 'partielle', 'rang', 'sur']);
    expect(Object.keys(c.continuite).sort()).toEqual(['lien', 'passage', 'secondeGtSurPlace']);
    for (const champ of ['brevet', 'ips', 'effectifs', 'affelnetSecteur1', 'personnel', 'pix', 'labels', 'adresse']) {
      expect(c, champ).not.toHaveProperty(champ);
    }
  });

  it('chaque collège figure dans le fichier de son département, avec le détail de sa fiche', () => {
    const a = assemblerDataset(deuxDepartements());
    const parDepartement = Object.fromEntries(a.publication.details.map((d) => [d.departement, d.colleges.map((c) => c.uai)]));
    expect(parDepartement).toEqual({ '75': ['0750001A', '0750002B'], '94': ['0940003C'] });
    const rodin = a.publication.details[0].colleges[0];
    expect(rodin.brevet.map((b) => [b.session, b.taux])).toEqual([[2025, 92]]);
    expect(rodin).toHaveProperty('continuite.passageTexte');
    expect(rodin.composantes?.brevet).not.toBeNull();
  });

  it('publie le fichier léger minifié et un fichier de détail par département', () => {
    const a = assemblerDataset(deuxDepartements());
    const fichier = (chemin: string) => a.fichiers.find((f) => f.chemin === chemin)!.contenu;
    expect(fichier('colleges.json').trim()).not.toContain('\n');
    expect(JSON.parse(fichier('colleges.json')).colleges).toEqual(a.publication.dataset.colleges);
    expect(JSON.parse(fichier('colleges-94.json'))).toEqual({ departement: '94', colleges: [expect.objectContaining({ uai: '0940003C' })] });
  });
});

describe('assemblerDataset : secteurs parisiens', () => {
  /** Secteur publié par la Ville : un carré d'environ 100 m, collèges désignés par leur nom. */
  const secteur = (libelle: string, ...noms: string[]) => ({
    properties: { libelle, annee_scol: '2026-2027', ...Object.fromEntries(noms.map((n, i) => [`lib_etab_${i + 1}`, n])) },
    geometry: { type: 'Polygon' as const, coordinates: [[[2.39, 48.86], [2.3913, 48.86], [2.3913, 48.8609], [2.39, 48.8609], [2.39, 48.86]]] as [number, number][][] },
  });
  const e = () =>
    entree({
      colleges: [
        etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'Collège Robert Doisneau', code_commune: '75120', code_postal: '75020' }),
        etab({ identifiant_de_l_etablissement: '0750002B', nom_etablissement: 'Collège Henri IV', code_commune: '75105' }),
      ],
      sources: { secteursParis: [secteur('ROBERT DOISNEAU', 'ROBERT DOISNEAU'), secteur('INCONNU', 'NOM INCONNU')] },
    });

  it('relie chaque secteur aux collèges publics parisiens, dans tous les arrondissements', () => {
    const fc = assemblerDataset(e()).publication.secteursParis;
    expect(fc.features.map((f) => [f.properties.libelle, f.properties.uais])).toEqual([
      ['INCONNU', []],
      ['ROBERT DOISNEAU', ['0750001A']],
    ]);
  });

  it('le rapport liste les secteurs qui ne trouvent pas de collège', () => {
    expect(assemblerDataset(e()).rapport.secteursParis.secteursSansCollege).toEqual([{ libelle: 'INCONNU', noms: ['NOM INCONNU'] }]);
  });
});
