import { describe, expect, it } from 'vitest';
import { cleSport, construireOptions, languesStructure, optionTags, type OptionsInput } from './options';
import { parseLanguesOnisep } from './sources/onisep';

const base: OptionsInput = {
  structure: undefined,
  languesOnisep: undefined,
  offreLangues: undefined,
  dispositifs: [],
  sectionsInternationales: [],
  sectionsSportives: [],
  sportEtudes: [],
  ulis: false,
  segpa: false,
};

describe('parseLanguesOnisep', () => {
  it('sépare LV1 et LV2', () => {
    expect(parseLanguesOnisep('LV1 : anglais, polonais / LV2 : allemand, espagnol')).toEqual({
      lv1: ['anglais', 'polonais'],
      lv2: ['allemand', 'espagnol'],
    });
    expect(parseLanguesOnisep('LV1 : anglais')).toEqual({ lv1: ['anglais'], lv2: [] });
  });
});

describe('languesStructure', () => {
  it('extrait latin, grec et LCE', () => {
    const s = languesStructure({
      uai: 'x',
      nom: 'x',
      type: 'collège',
      lat: null,
      lon: null,
      langues: [
        'Allemand',
        "Langues et cultures de l'Antiquité : grec",
        "Langues et cultures de l'Antiquité : latin",
        'Langues et cultures européennes : anglais',
        'Langues et cultures européennes',
      ],
    });
    expect(s.anciennes).toEqual(['latin', 'grec']);
    expect(s.lce).toEqual(['anglais', 'langue non précisée']);
    expect(s.vivantes).toEqual(['allemand']);
  });
});

describe('construireOptions', () => {
  it('classe les dispositifs ONISEP', () => {
    const r = construireOptions({
      ...base,
      dispositifs: [
        { intitule: 'section bilangue de collège', enseignements: ['anglais', 'allemand'], denomination: null },
        { intitule: 'classe à horaires aménagés musique', enseignements: [], denomination: null },
        { intitule: 'classe à horaires aménagés arts et métiers du spectacle', enseignements: [], denomination: null },
        { intitule: "unité localisée pour l'inclusion scolaire en collège", enseignements: [], denomination: null },
        { intitule: 'unité pédagogique pour élèves allophones arrivants en collège (Classe pour non francophones)', enseignements: [], denomination: null },
        { intitule: "section d'enseignement général et professionnel adapté habitat", enseignements: [], denomination: null },
        { intitule: 'dispositif relais', enseignements: [], denomination: null },
        { intitule: 'classe de 3e prépa-métiers', enseignements: [], denomination: null },
      ],
    });
    expect(r.options.bilangue).toEqual(['allemand', 'anglais']);
    expect(r.options.cha).toEqual(['arts du spectacle', 'musique']);
    expect(r.options.dispositifs).toEqual(['ULIS', 'SEGPA', 'UPE2A (élèves allophones)', 'Dispositif relais', '3e prépa-métiers']);
    expect(r.inconnus).toEqual([]);
  });

  it('sections internationales : ministère prioritaire', () => {
    const r = construireOptions({
      ...base,
      sectionsInternationales: [{ section: 'BRITANNIQUE' }],
      dispositifs: [{ intitule: 'section internationale de collège', enseignements: ['anglais'], denomination: null }],
    });
    expect(r.options.sectionsInternationales).toEqual(['britannique']);
  });

  it('sports dédoublonnés entre ministère et ONISEP', () => {
    expect(cleSport('BASKET-BALL')).toBe(cleSport('basket'));
    const r = construireOptions({
      ...base,
      sectionsSportives: ['BASKET-BALL'],
      dispositifs: [{ intitule: 'section sportive de collège', enseignements: ['basket', 'escalade'], denomination: null }],
      sportEtudes: ['MULTI-ACTIVITÉS'],
    });
    expect(r.options.sectionsSportives).toEqual(['basket-ball', 'escalade']);
    expect(r.options.sportEtudes).toEqual(['multi-activités']);
  });

  it('langues : ONISEP puis offre-langues-2d', () => {
    expect(construireOptions({ ...base, languesOnisep: { lv1: ['anglais'], lv2: ['espagnol'] } }).sourceLangues).toBe('onisep');
    const r = construireOptions({ ...base, offreLangues: { lv1: ['anglais'], lv2: ['allemand'] } });
    expect(r.sourceLangues).toBe('offre-langues-2d');
    expect(r.langues.lv2).toEqual(['allemand']);
  });

  it('ULIS / SEGPA signalés par l’annuaire ou les effectifs', () => {
    expect(construireOptions({ ...base, ulis: true, segpa: true }).options.dispositifs).toEqual(['ULIS', 'SEGPA']);
  });
});

describe('optionTags', () => {
  it('étiquettes et groupes', () => {
    const r = construireOptions({
      ...base,
      languesOnisep: { lv1: ['anglais'], lv2: ['allemand', 'hébreu moderne'] },
      sectionsInternationales: [{ section: 'chinoise' }],
      dispositifs: [{ intitule: 'classe à horaires aménagés théâtre', enseignements: [], denomination: null }],
      ulis: true,
    });
    const tags = optionTags({ ...r.langues, anciennes: ['latin'] }, r.options);
    expect([...tags.keys()].sort()).toEqual(['cha:theatre', 'latin', 'lv:allemand', 'lv:anglais', 'lv:hebreu-moderne', 'si:chinoise', 'ulis']);
    expect(tags.get('si:chinoise')).toEqual({ label: 'Section internationale chinoise', groupe: 'Sections internationales' });
    expect(tags.get('lv:hebreu-moderne')?.label).toBe('Hébreu moderne');
  });
});
