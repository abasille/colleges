import { describe, expect, it } from 'vitest';
import { etab } from '../fabriques';
import {
  choisirLien,
  construireContinuite,
  continuiteParDefaut,
  detecterCandidats,
  indexerLycees,
  normAdresse,
  TEXTES,
  type CiteRow,
  type VoiesLycee,
} from './continuite';

describe('normAdresse', () => {
  it('ignore CS, plages de numéros, accents et ponctuation', () => {
    expect(normAdresse('10 à 16 avenue Marc Sangnier - CS 10622')).toBe('10 AVENUE MARC SANGNIER');
    expect(normAdresse('17-19 avenue Eugène Pelletan')).toBe('17 AVENUE EUGENE PELLETAN');
    expect(normAdresse('21 rue du Val de Grace')).toBe(normAdresse('21 rue du Val-de-Grâce'));
    expect(normAdresse('27 bis rue Edouard Pailleron')).toBe('27 RUE EDOUARD PAILLERON');
  });
});

describe('détection du lycée rattaché', () => {
  const lycees = [
    etab({ identifiant_de_l_etablissement: '0750654D', code_nature: 300, adresse_1: '23 rue Clovis', siren_siret: '19750654600010' }),
    etab({ identifiant_de_l_etablissement: '0753840S', code_nature: 300, statut_public_prive: 'Privé', adresse_1: '22 rue Notre-Dame des Champs', siren_siret: '77568540300011', code_commune: '75106' }),
    etab({ identifiant_de_l_etablissement: '0755367B', code_nature: 302, statut_public_prive: 'Privé', adresse_1: '21 rue du Val de Grace', siren_siret: '37959796600058' }),
    etab({ identifiant_de_l_etablissement: '0750999Z', code_nature: 300, adresse_1: '66 boulevard Saint-Marcel' }),
  ];
  const cites: CiteRow[] = [
    { code_cite_scolaire: '07504', uai: '0752526N', code_nature: '340', appellation_officielle: 'Collège Henri IV' },
    { code_cite_scolaire: '07504', uai: '0750654D', code_nature: '300', appellation_officielle: 'Lycée Henri-IV' },
  ];

  const index = indexerLycees(lycees, cites);

  it('R1 cité scolaire publique', () => {
    const c = etab({ identifiant_de_l_etablissement: '0752526N', adresse_1: '23 rue Clovis', siren_siret: '19752526400010' });
    const cands = detecterCandidats(c, index);
    expect(cands[0]).toEqual({ uai: '0750654D', regles: ['R1_cite_scolaire:07504', 'R3_adresse'] });
    expect(choisirLien(c, cands)).toMatchObject({ lien: 'cite_scolaire', lyceeUai: '0750654D' });
  });

  it('R2 même SIREN (privé)', () => {
    const c = etab({
      identifiant_de_l_etablissement: '0752900V',
      statut_public_prive: 'Privé',
      type_contrat_prive: "CONTRAT D'ASSOCIATION TOUTES CLASSES",
      adresse_1: '22 rue Notre-Dame des Champs',
      code_commune: '75106',
      siren_siret: '77568540300029',
    });
    expect(choisirLien(c, detecterCandidats(c, index))).toMatchObject({ lien: 'meme_etablissement_prive', lyceeUai: '0753840S', regles: ['R2_siren', 'R3_adresse'] });
  });

  it('R3 même adresse seulement (hors contrat)', () => {
    const c = etab({ identifiant_de_l_etablissement: '0756203K', statut_public_prive: 'Privé', type_contrat_prive: 'HORS CONTRAT', adresse_1: '21 rue du Val-de-Grâce', siren_siret: '99999999900011' });
    expect(choisirLien(c, detecterCandidats(c, index))).toMatchObject({ lien: 'meme_etablissement_prive', lyceeUai: '0755367B', regles: ['R3_adresse'] });
  });

  it('même adresse dans une autre commune : pas de candidat', () => {
    const c = etab({ identifiant_de_l_etablissement: '0940001A', statut_public_prive: 'Privé', type_contrat_prive: 'HORS CONTRAT', adresse_1: '21 rue du Val de Grace', code_commune: '94041' });
    expect(detecterCandidats(c, index)).toEqual([]);
  });

  it('collège public à la même adresse qu’un lycée sans cité scolaire : aucun lien', () => {
    const c = etab({ identifiant_de_l_etablissement: '0752186U', adresse_1: '66 boulevard Saint-Marcel' });
    const d = choisirLien(c, detecterCandidats(c, index));
    expect(d.lien).toBe('aucun');
    expect(d.ignores.map((x) => x.uai)).toEqual(['0750999Z']);
  });
});

describe('construireContinuite', () => {
  const annuaire = new Map([
    ['0750654D', etab({ identifiant_de_l_etablissement: '0750654D', nom_etablissement: 'Lycée Henri-IV', adresse_1: '23 rue Clovis' })],
  ]);
  const voies = new Map<string, VoiesLycee>([['0750654D', { annee: 2025, secondeGt: 250, generale: true, techno: ['STMG'], pro: false }]]);
  const college = etab({ identifiant_de_l_etablissement: '0752526N' });

  it('textes par défaut et 2nde GT d’après les effectifs', () => {
    const c = construireContinuite({
      college,
      statut: 'public',
      detection: { lien: 'cite_scolaire', lyceeUai: '0750654D', regles: ['R1_cite_scolaire:07504'], ignores: [] },
      override: undefined,
      annuaire,
      voies,
    });
    expect(c).toMatchObject({
      lien: 'cite_scolaire',
      lycee: { uai: '0750654D', nom: 'Lycée Henri-IV', adresse: '23 rue Clovis, 75005 Paris', voies: ['générale', 'technologique (STMG)'] },
      secondeGtSurPlace: true,
      passage: 'non_garanti',
      passageTexte: TEXTES.citePublique,
    });
    expect(c.sources.length).toBeGreaterThan(0);
  });

  it('les corrections manuelles priment', () => {
    const c = construireContinuite({
      college,
      statut: 'public',
      detection: { lien: 'cite_scolaire', lyceeUai: '0750654D', regles: [], ignores: [] },
      override: { secondeGtSurPlace: false, passage: 'garanti', passageTexte: 'citation', sources: ['https://exemple.fr'], lycee: { voies: ['professionnelle'] } },
      annuaire,
      voies,
    });
    expect(c).toMatchObject({ secondeGtSurPlace: false, passage: 'garanti', passageTexte: 'citation', lycee: { voies: ['professionnelle'] } });
    expect(c.sources[0]).toBe('https://exemple.fr');
  });

  it('pas de 2nde GT sur place sans lycée lié, même si une correction l’affirme', () => {
    const c = construireContinuite({
      college,
      statut: 'public',
      detection: { lien: 'cite_scolaire', lyceeUai: '0750654D', regles: [], ignores: [] },
      override: { lien: 'aucun', secondeGtSurPlace: true },
      annuaire,
      voies,
    });
    expect(c).toMatchObject({ lien: 'aucun', lycee: null, secondeGtSurPlace: false });
  });

  it('défauts selon le statut', () => {
    expect(continuiteParDefaut('meme_etablissement_prive', 'hors_contrat')).toEqual({ passage: 'inconnu', passageTexte: TEXTES.horsContrat });
    expect(continuiteParDefaut('meme_etablissement_prive', 'prive_sous_contrat').passageTexte).toBe(TEXTES.privePoursuite);
    expect(continuiteParDefaut('aucun', 'public').passage).toBe('non_garanti');
  });
});
