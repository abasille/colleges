import { describe, expect, it } from 'vitest';
import type { College, CollegeEvent, EventsFile } from '../types';
import { applyFilters, DEFAULT_FILTERS, sortColleges, type Filters } from './filters';
import { parseUrlState, serializeUrlState } from './url';
import { haversineKm, pointInGeometry } from './geo';
import { findSecteur94, findSecteurParis, parseNumero } from './secteur';
import { buildIcs, foldLine } from './ics';
import { decodeShare, encodeShare, mergeShare } from './share';
import { calendarEvents, isUrgent, statutInscriptions, upcomingForFavoris } from './events';
import { formatIndicateur, nomCourt } from './format';

function college(uai: string, over: Partial<College> = {}, ind: Partial<College['indicateurs']> = {}): College {
  return {
    uai,
    nom: `Collège ${uai}`,
    statut: 'public',
    contrat: null,
    zone: '75113',
    zoneLibelle: 'Paris 13e',
    academie: 'Paris',
    adresse: '',
    codePostal: '75013',
    lat: 48.83,
    lon: 2.36,
    web: null,
    telephone: null,
    mail: null,
    ficheOnisep: null,
    rep: null,
    recrutementParticulier: null,
    niveaux: ['6e', '5e', '4e', '3e'],
    accueilSixieme: true,
    remarques: [],
    demiPension: true,
    indicateurs: {
      note: null, brevet: null, brevetDernier: null, noteEcrit: null, vaTaux: null, vaNote: null, mentionsTB: null,
      mentions: null, accesSixiemeTroisieme: null, ips: null, effectif: null, elevesParClasse: null,
      heuresParEleve: null, eval6Francais: null, eval6Maths: null, ...ind,
    },
    manquants: {},
    score: null,
    brevet: [],
    ips: null,
    effectifs: null,
    evaluations6e: null,
    encadrement: null,
    langues: { lv1: [], lv2: [], anciennes: [], lce: [] },
    options: { bilangue: [], sectionsInternationales: [], cha: [], sectionsSportives: [], sportEtudes: [], dispositifs: [] },
    optionTags: [],
    continuite: { lien: 'aucun', lycee: null, secondeGtSurPlace: false, passage: 'non_garanti', passageTexte: '', sources: [] },
    affelnetSecteur1: null,
    personnel: [],
    labels: [],
    pix: [],
    ...over,
  };
}

const ctx = { favoris: new Set<string>(), distances: null };
const f = (over: Partial<Filters>): Filters => ({ ...DEFAULT_FILTERS, ...over });

describe('filtres', () => {
  const cs = [
    college('0000001A', { nom: 'Collège Claude Monet', statut: 'public', optionTags: ['latin', 'lv:allemand'] }, { brevet: 95, ips: 120 }),
    college('0000002B', { nom: 'Collège privé Sévigné', statut: 'prive_sous_contrat', zone: '75105', optionTags: ['latin'] }, { brevet: 99 }),
    college('0000003C', { nom: 'Collège Diagonale', statut: 'hors_contrat', accueilSixieme: false }),
    college('0000004D', { nom: 'Collège Molière', zone: '94041', rep: 'REP' }, { brevet: 80, ips: 85 }),
  ];

  it('masque par défaut les collèges sans entrée en 6e', () => {
    expect(applyFilters(cs, DEFAULT_FILTERS, ctx).map((c) => c.uai)).not.toContain('0000003C');
  });

  it('cherche sans tenir compte des accents ni de la casse', () => {
    expect(applyFilters(cs, f({ q: 'sevigne' }), ctx).map((c) => c.uai)).toEqual(['0000002B']);
    expect(applyFilters(cs, f({ q: 'claude MONET' }), ctx)).toHaveLength(1);
  });

  it('exige toutes les options cochées', () => {
    expect(applyFilters(cs, f({ options: ['latin'] }), ctx)).toHaveLength(2);
    expect(applyFilters(cs, f({ options: ['latin', 'lv:allemand'] }), ctx).map((c) => c.uai)).toEqual(['0000001A']);
  });

  it('filtre par plage en excluant les valeurs manquantes sauf demande', () => {
    expect(applyFilters(cs, f({ ranges: { brevet: [90, 100] } }), ctx).map((c) => c.uai)).toEqual(['0000001A', '0000002B']);
    const avec = applyFilters(cs, f({ ranges: { ips: [100, 130] }, inclureSansDonnee: true }), ctx).map((c) => c.uai);
    expect(avec).toEqual(['0000001A', '0000002B']);
  });

  it('filtre REP, statut et zone', () => {
    expect(applyFilters(cs, f({ rep: 'rep' }), ctx).map((c) => c.uai)).toEqual(['0000004D']);
    expect(applyFilters(cs, f({ statuts: ['prive_sous_contrat'] }), ctx)).toHaveLength(1);
    expect(applyFilters(cs, f({ zones: ['94041', '75105'] }), ctx)).toHaveLength(2);
  });

  it('trie en laissant les valeurs manquantes en dernier dans les deux sens', () => {
    const desc = sortColleges(cs, { key: 'ips', dir: 'desc' }, ctx).map((c) => c.uai);
    const asc = sortColleges(cs, { key: 'ips', dir: 'asc' }, ctx).map((c) => c.uai);
    expect(desc.slice(0, 2)).toEqual(['0000001A', '0000004D']);
    expect(asc.slice(0, 2)).toEqual(['0000004D', '0000001A']);
  });

  it('trie par distance', () => {
    const distances = new Map([['0000001A', 2], ['0000004D', 0.5]]);
    const out = sortColleges(cs, { key: 'distance', dir: 'asc' }, { distances }).map((c) => c.uai);
    expect(out.slice(0, 2)).toEqual(['0000004D', '0000001A']);
  });
});

describe('état dans l’URL', () => {
  it('fait un aller-retour sans perte', () => {
    const state = {
      filters: f({ q: 'monet', statuts: ['public'], options: ['latin'], ranges: { brevet: [90, 100] }, accueilSixieme: false, favoris: true }),
      sort: { key: 'brevet' as const, dir: 'desc' as const },
      selected: '0752539C',
      vue: 'calendrier' as const,
      colorBy: 'ips' as const,
    };
    expect(parseUrlState(serializeUrlState(state))).toEqual(state);
  });

  it('produit une URL vide pour l’état par défaut', () => {
    expect(serializeUrlState(parseUrlState(''))).toBe('');
  });

  it('ignore les valeurs inconnues', () => {
    const s = parseUrlState('?st=public,bidon&r.inconnu=1~2&tri=xxx.desc&col=zzz');
    expect(s.filters.statuts).toEqual(['public']);
    expect(s.filters.ranges).toEqual({});
    expect(s.sort.key).toBe('nom');
    expect(s.colorBy).toBe('statut');
  });
});

describe('géographie', () => {
  it('calcule une distance plausible', () => {
    // Place d'Italie -> Ivry mairie ≈ 2,9 km
    expect(haversineKm(48.8311, 2.3557, 48.8131, 2.3849)).toBeGreaterThan(2.5);
    expect(haversineKm(48.8311, 2.3557, 48.8131, 2.3849)).toBeLessThan(3.2);
  });

  it('teste l’appartenance à un polygone avec trou', () => {
    const g = {
      type: 'Polygon' as const,
      coordinates: [
        [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]] as [number, number][],
        [[4, 4], [6, 4], [6, 6], [4, 6], [4, 4]] as [number, number][],
      ],
    };
    expect(pointInGeometry(1, 1, g)).toBe(true);
    expect(pointInGeometry(5, 5, g)).toBe(false);
    expect(pointInGeometry(11, 5, g)).toBe(false);
  });
});

describe('carte scolaire 94', () => {
  const rows = [
    { insee: '94041', voie: 'RUE DE LA REPUBLIQUE', debut: 1, fin: 99, parite: 'I' as const, uai: 'A' },
    { insee: '94041', voie: 'RUE DE LA REPUBLIQUE', debut: 2, fin: 100, parite: 'P' as const, uai: 'B' },
    { insee: '94041', voie: 'RUE DE LA REPUBLIQUE', debut: 101, fin: null, parite: 'PI' as const, uai: 'C' },
  ];
  it('respecte la parité et les bornes', () => {
    expect(findSecteur94({ citycode: '94041', street: 'Rue de la République', housenumber: '13' }, rows)).toEqual(['A']);
    expect(findSecteur94({ citycode: '94041', street: 'Rue de la République', housenumber: '14bis' }, rows)).toEqual(['B']);
    expect(findSecteur94({ citycode: '94041', street: 'Rue de la République', housenumber: '250' }, rows)).toEqual(['C']);
    expect(findSecteur94({ citycode: '94081', street: 'Rue de la République', housenumber: '13' }, rows)).toEqual([]);
  });
  it('lit les numéros avec suffixe', () => {
    expect(parseNumero('12bis')).toBe(12);
    expect(parseNumero(null)).toBeNull();
  });
});

function ev(over: Partial<CollegeEvent>): CollegeEvent {
  return {
    id: over.id ?? Math.random().toString(36),
    uai: '0000001A',
    academie: null,
    type: 'portes_ouvertes',
    date: '2026-11-21',
    dateFin: null,
    heureDebut: null,
    heureFin: null,
    titre: 'Portes ouvertes',
    inscriptionRequise: null,
    saison: '2026-27',
    source: 'https://exemple.fr',
    verifieLe: '2026-10-07',
    confiance: 'haute',
    ...over,
  };
}

describe('événements', () => {
  const events = [
    ev({ id: 'a', date: '2026-11-21' }),
    ev({ id: 'b', date: '2026-10-20', type: 'inscription', dateFin: '2026-10-25' }),
    ev({ id: 'c', date: '2026-01-17', saison: '2025-26' }),
    ev({ id: 'd', uai: null, academie: 'Paris', type: 'officiel', date: '2027-03-10' }),
    ev({ id: 'e', uai: '0000009Z', date: '2026-12-01' }),
  ];

  it('ne garde que la saison courante, les collèges filtrés et les académies cochées', () => {
    const out = calendarEvents(events, {
      saison: '2026-27',
      types: new Set(['portes_ouvertes', 'inscription', 'officiel']),
      academies: new Set(['Paris']),
      colleges: new Set(['0000001A']),
    });
    expect(out.map((e) => e.id)).toEqual(['b', 'a', 'd']);
  });

  it('met en tête les échéances urgentes des favoris', () => {
    const out = upcomingForFavoris(events, '2026-27', new Set(['0000001A']), '2026-10-15');
    expect(out.map((e) => e.id)).toEqual(['b', 'a']);
    expect(isUrgent(events[1], '2026-10-15')).toBe(true);
    expect(isUrgent(events[1], '2026-09-01')).toBe(false);
  });

  it('déduit le statut des inscriptions', () => {
    const file: EventsFile = {
      saisonCourante: '2026-27',
      events,
      inscriptions: { '0000001A': { statut: 'a_venir', constateLe: '2026-10-07', detail: 'Ouverture le 20 octobre', source: '' } },
    };
    expect(statutInscriptions(file, '0000001A', '2026-10-08')?.statut).toBe('a_venir');
    expect(statutInscriptions(file, '0000001A', '2026-10-22')?.statut).toBe('ouvertes');
    expect(statutInscriptions(file, '0000001A', '2026-11-02')?.statut).toBe('closes');
    expect(statutInscriptions(file, '0000009Z', '2026-11-02')).toBeNull();
  });

  it('produit un .ics valide', () => {
    const ics = buildIcs([events[0], events[1]], () => 'Collège Test', new Date('2026-10-08T10:00:00Z'));
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('DTSTART;VALUE=DATE:20261121');
    expect(ics).toContain('DTEND;VALUE=DATE:20261026');
    expect(ics).toContain('TRIGGER:-P3D');
    expect(ics.split('\r\n').every((l) => new TextEncoder().encode(l).length <= 75)).toBe(true);
  });

  it('replie les longues lignes', () => {
    const long = 'DESCRIPTION:' + 'é'.repeat(100);
    expect(foldLine(long).split('\r\n ').join('')).toBe(long);
  });
});

describe('partage des favoris', () => {
  it('encode et décode', () => {
    const p = { favoris: ['0752539C', '0941025D'], notes: { '0752539C': 'JPO le 12/01 – très bien', '0941025D': ' ' } };
    expect(decodeShare(encodeShare(p))).toEqual({ favoris: p.favoris, notes: { '0752539C': p.notes['0752539C'] } });
  });
  it('rejette un contenu invalide', () => {
    expect(decodeShare('%%%')).toBeNull();
    expect(decodeShare(encodeShare({ favoris: ['pas-un-uai'], notes: {} }))?.favoris).toEqual([]);
  });
  it('fusionne sans perdre de note', () => {
    const m = mergeShare(
      { favoris: ['0752539C'], notes: { '0752539C': 'à moi' } },
      { favoris: ['0941025D'], notes: { '0752539C': 'de toi', '0941025D': 'nouveau' } },
    );
    expect(m.favoris).toEqual(['0752539C', '0941025D']);
    expect(m.notes['0752539C']).toContain('à moi');
    expect(m.notes['0752539C']).toContain('de toi');
    expect(m.notes['0941025D']).toBe('nouveau');
  });
});

describe('formats', () => {
  it('formate les indicateurs', () => {
    expect(formatIndicateur('brevet', 95.25)).toBe('95,3 %');
    expect(formatIndicateur('vaTaux', 2)).toBe('+2,0 pts');
    expect(formatIndicateur('ips', null)).toBe('—');
  });
  it('raccourcit les noms', () => {
    expect(nomCourt('Collège privé Sévigné')).toBe('Sévigné');
    expect(nomCourt('Collège Claude Monet')).toBe('Claude Monet');
  });
});

describe('secteur parisien le plus proche', () => {
  const carre = (x: number, uai: string) => ({
    type: 'Feature' as const,
    geometry: { type: 'Polygon' as const, coordinates: [[[x, 48.8], [x + 0.001, 48.8], [x + 0.001, 48.801], [x, 48.801], [x, 48.8]]] as [number, number][][] },
    properties: { libelle: uai, uais: [uai], noms: [uai] },
  });
  const features = [carre(2.35, 'A'), carre(2.36, 'B')];
  it('retient le polygone qui contient l’adresse', () => {
    expect(findSecteurParis({ lon: 2.3605, lat: 48.8005 }, features)?.properties.libelle).toBe('B');
  });
  it('se rabat sur le polygone le plus proche dans la rue', () => {
    // 0,0002° de longitude ≈ 15 m à l'est du carré A
    expect(findSecteurParis({ lon: 2.3512, lat: 48.8005 }, features)?.properties.libelle).toBe('A');
  });
  it('ne rattache pas une adresse trop éloignée', () => {
    expect(findSecteurParis({ lon: 2.3555, lat: 48.8005 }, features)).toBeNull();
  });
});
