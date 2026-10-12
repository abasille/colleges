// Rapport data/report.md : totaux, anomalies, détail des collèges suivis (via assemblerDataset puis renderReport).
import { describe, expect, it } from 'vitest';
import { assemblerDataset, type Assemblage } from './assembler';
import { entree, etab, ligneCarte } from './fabriques';
import { renderReport } from './report';

/** Secteur publié par la Ville : un petit carré, collèges désignés par leur nom. */
const secteur = (libelle: string, ...noms: string[]) => ({
  properties: { libelle, annee_scol: '2026-2027', ...Object.fromEntries(noms.map((n, i) => [`lib_etab_${i + 1}`, n])) },
  geometry: { type: 'Polygon' as const, coordinates: [[[2.39, 48.86], [2.3913, 48.86], [2.3913, 48.8609], [2.39, 48.8609], [2.39, 48.86]]] as [number, number][][] },
});

/** Rapport rendu, avec les données que le point d'entrée ajoute (contrôles réseau, tailles, durée). */
function rendu(a: Assemblage): string {
  return renderReport({ ...a.rapport, offline: true, fetchWarnings: [], verifVoies: [], verifSecteurs: [], tailles: {}, dureeSecondes: 0 });
}

/** Partie du rapport sous le titre `## <n>.`, jusqu'au titre suivant de même niveau. */
function partie(md: string, n: number): string {
  const debut = md.indexOf(`\n## ${n}. `);
  if (debut < 0) return '';
  const fin = md.indexOf('\n## ', debut + 1);
  return md.slice(debut, fin < 0 ? undefined : fin);
}

describe('rapport : détail des collèges suivis', () => {
  it('le détail complet ne porte que sur les collèges suivis', () => {
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'Collège Rodin' }),
          etab({ identifiant_de_l_etablissement: '0750002B', nom_etablissement: 'Collège Lavoisier' }),
        ],
        corrections: { suivis: ['0750002B'] },
      }),
    );
    const detail = partie(rendu(a), 3);
    expect(detail).toContain('Collège Lavoisier (0750002B)');
    expect(detail).not.toContain('0750001A');
  });
});

describe('rapport : totaux', () => {
  it('commence par les totaux par département et par statut', () => {
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A' }),
          etab({ identifiant_de_l_etablissement: '0750002B', statut_public_prive: 'Privé', type_contrat_prive: 'CONTRAT D ASSOCIATION' }),
          etab({ identifiant_de_l_etablissement: '0940003C', code_commune: '94041', code_departement: '094', libelle_academie: 'Créteil' }),
        ],
      }),
    );
    const md = rendu(a);
    expect(md.match(/^## .*/m)?.[0]).toBe('## 1. Totaux');
    const totaux = partie(md, 1);
    expect(totaux).toContain('| Département | Académie | Communes | Public | Privé sous contrat | Hors contrat | Total |');
    expect(totaux).toContain('| 75 | Paris | 1 | 1 | 1 | 0 | 2 |');
    expect(totaux).toContain('| 94 | Créteil | 1 | 1 | 0 | 0 | 1 |');
    expect(totaux).toContain('| **Total** |  | 2 | 2 | 1 | 0 | 3 |');
  });
});

/** UAI (ou libellés, pour les éléments sans UAI) d'une anomalie du rapport. */
function concernes(a: Assemblage, id: string): (string | null)[] {
  const anomalie = a.rapport.anomalies.find((x) => x.id === id);
  if (!anomalie) throw new Error(`anomalie ${id} absente`);
  return anomalie.elements.map((e) => e.uai ?? e.libelle);
}

describe('rapport : anomalies', () => {
  it('jointures ratées : un collège public ou sous contrat absent d’une source, pas un hors contrat', () => {
    const ips = (uai: string) => ({ annee: 2025, uai, nom: null, academie: 'PARIS', ips: 100, ecartType: null, national: null, academique: null, departemental: null, source: 'test' });
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A' }),
          etab({ identifiant_de_l_etablissement: '0750002B' }),
          etab({ identifiant_de_l_etablissement: '0750003C', statut_public_prive: 'Privé', type_contrat_prive: 'HORS CONTRAT' }),
        ],
        sources: { ips: [ips('0750001A')] },
      }),
    );
    expect(concernes(a, 'absent-ips')).toEqual(['0750002B']);
  });

  it('secteurs parisiens non reliés et collèges publics parisiens sans secteur', () => {
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'Collège Rodin' }),
          etab({ identifiant_de_l_etablissement: '0750002B', nom_etablissement: 'Collège Lavoisier' }),
        ],
        sources: { secteursParis: [secteur('RODIN', 'RODIN'), secteur('INCONNU', 'NOM INCONNU')] },
      }),
    );
    expect(concernes(a, 'secteurs-sans-college')).toEqual(['secteur INCONNU']);
    expect(concernes(a, 'noms-secteur-sans-college')).toEqual(['NOM INCONNU']);
    expect(concernes(a, 'paris-sans-secteur')).toEqual(['0750002B']);
  });

  it('écarts entre les polygones parisiens et la carte nationale', () => {
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A', nom_etablissement: 'Collège Rodin' }),
          etab({ identifiant_de_l_etablissement: '0750002B', nom_etablissement: 'Collège Lavoisier' }),
        ],
        sources: {
          secteursParis: [secteur('RODIN', 'RODIN'), secteur('LAVOISIER', 'LAVOISIER')],
          carteScolaire: [ligneCarte({ code_insee: '75105', code_rne: '0750001A' }), ligneCarte({ code_insee: '75113', code_rne: '0750003C' })],
        },
      }),
    );
    expect(concernes(a, 'polygones-hors-carte')).toEqual(['0750002B']);
    expect(concernes(a, 'carte-sans-polygone')).toEqual(['0750003C']);
  });

  it('collèges publics sans secteur hors de Paris : absents de la carte, ou commune absente qui en compte plusieurs', () => {
    const ivry = { code_commune: '94041', nom_commune: 'Ivry-sur-Seine', code_departement: '094', libelle_academie: 'Créteil' };
    const lilas = { code_commune: '93045', nom_commune: 'Les Lilas', code_departement: '093', libelle_academie: 'Créteil' };
    const bourget = { code_commune: '93013', nom_commune: 'Le Bourget', code_departement: '093', libelle_academie: 'Créteil' };
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0940001A', ...ivry }),
          etab({ identifiant_de_l_etablissement: '0940024R', ...ivry, nom_etablissement: 'Collège Ovide Decroly' }),
          etab({ identifiant_de_l_etablissement: '0930001A', ...lilas }),
          etab({ identifiant_de_l_etablissement: '0930002B', ...lilas }),
          etab({ identifiant_de_l_etablissement: '0930003C', ...bourget }),
        ],
        sources: { carteScolaire: [ligneCarte({ code_insee: '94041', code_rne: '0940001A' })] },
      }),
    );
    expect(concernes(a, 'absents-carte')).toEqual(['0940024R']);
    // Le Bourget n'a qu'un collège public : rattaché par déduction, ce n'est pas une anomalie.
    expect(concernes(a, 'commune-hors-carte')).toEqual(['0930001A', '0930002B']);
  });

  it('doublons d’UAI dans l’annuaire', () => {
    const site = { identifiant_de_l_etablissement: '0951509Z', code_commune: '95585', code_departement: '095', libelle_academie: 'Versailles' };
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ ...site, nom_etablissement: 'Annexe Oscar Romero', adresse_1: '5 rue Gambetta' }),
          etab({ ...site, nom_etablissement: 'Collège La Salle - Saint-Rosaire', adresse_1: '53 rue Pierre Brossolette' }),
        ],
      }),
    );
    expect(concernes(a, 'doublons-annuaire')).toEqual(['0951509Z']);
  });

  it('données manquantes inattendues : géocodage incertain d’un collège sans coordonnées', () => {
    const sansCoordonnees = { latitude: null, longitude: null, adresse_1: '12 rue Charles Pouillet', code_postal: '75017' };
    const a = assemblerDataset(
      entree({
        colleges: [etab({ identifiant_de_l_etablissement: '0756898R', ...sansCoordonnees }), etab({ identifiant_de_l_etablissement: '0756899S', ...sansCoordonnees })],
        sources: {
          geocodage: new Map([
            ['0756898R', { lat: 48.88, lon: 2.31, label: '12 Rue Claude Pouillet 75017 Paris', score: 0.5 }],
            ['0756899S', { lat: 48.88, lon: 2.31, label: '12 Rue Charles Pouillet 75017 Paris', score: 0.97 }],
          ]),
        },
      }),
    );
    expect(concernes(a, 'geocodes')).toEqual(['0756898R', '0756899S']);
    expect(concernes(a, 'geocodage-incertain')).toEqual(['0756898R']);
  });

  it('un collège suivi hors du périmètre est signalé, pas ignoré en silence', () => {
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ identifiant_de_l_etablissement: '0750001A' }),
          etab({ identifiant_de_l_etablissement: '0750002B', etat: 'FERME', nom_etablissement: 'Collège fermé' }),
          etab({ identifiant_de_l_etablissement: '0750003C' }),
        ],
        config: { exclure: ['0750003C'] },
        corrections: { suivis: ['0750001A', '0750002B', '0750003C', '0759999Z'] },
      }),
    );
    const anomalie = a.rapport.anomalies.find((x) => x.id === 'suivis-hors-perimetre')!;
    expect(anomalie.elements.map((e) => [e.uai, e.libelle, e.detail])).toEqual([
      ['0750002B', 'Collège fermé', "hors sélection de l'annuaire (département 75, nature 340, état FERME)"],
      ['0750003C', 'x', 'écarté par data/config.json'],
      ['0759999Z', null, "absent de l'annuaire des collèges"],
    ]);
  });

  it('le rapport regroupe les anomalies par famille, chacune avec son décompte et les collèges concernés', () => {
    const site = { identifiant_de_l_etablissement: '0951509Z', code_commune: '95585', code_departement: '095', libelle_academie: 'Versailles' };
    const a = assemblerDataset(
      entree({
        colleges: [
          etab({ ...site, nom_etablissement: 'Annexe Oscar Romero', adresse_1: '5 rue Gambetta' }),
          etab({ ...site, nom_etablissement: 'Collège La Salle - Saint-Rosaire', adresse_1: '53 rue Pierre Brossolette' }),
        ],
      }),
    );
    const anomalies = partie(rendu(a), 2);
    for (const famille of [
      'Jointures ratées, par source',
      'Secteurs parisiens non reliés',
      'Écarts entre les polygones parisiens et la carte nationale',
      'Collèges publics sans secteur',
      'Doublons',
      'Données manquantes inattendues',
    ]) {
      expect(anomalies).toContain(`### ${famille}`);
    }
    expect(anomalies).toContain("**UAI présents sur plusieurs lignes de l'annuaire : 1.**");
    expect(anomalies).toContain('- Collège La Salle - Saint-Rosaire (0951509Z) — gardé « Collège La Salle - Saint-Rosaire »');
    expect(anomalies).toContain('**Secteurs reliés à aucun collège : aucun.**');
  });
});
