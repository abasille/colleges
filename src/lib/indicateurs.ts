import type { IndicateurKey, Statut, EventType, LienLycee, Passage, StatutInscriptions } from '../types';

export interface IndicateurMeta {
  label: string;
  court: string;
  unite: string;
  decimales: number;
  /** true : plus haut = meilleur résultat scolaire ; null : pas de jugement (IPS, effectif…). */
  plusHautMieux: boolean | null;
  description: string;
}

export const INDICATEURS: Record<IndicateurKey, IndicateurMeta> = {
  note: {
    label: 'Note maison',
    court: 'Note',
    unite: '/20',
    decimales: 1,
    plusHautMieux: true,
    description: 'Moyenne des centiles nationaux du brevet, de la note à l’écrit et de la valeur ajoutée (3 sessions).',
  },
  brevet: {
    label: 'Réussite au brevet (moy. 3 ans)',
    court: 'Brevet',
    unite: '%',
    decimales: 1,
    plusHautMieux: true,
    description: 'Taux de réussite au brevet, série générale, moyenne des 3 dernières sessions pondérée par le nombre de candidats.',
  },
  brevetDernier: {
    label: 'Réussite au brevet (dernière session)',
    court: 'Brevet (dern.)',
    unite: '%',
    decimales: 1,
    plusHautMieux: true,
    description: 'Taux de réussite au brevet lors de la dernière session publiée.',
  },
  noteEcrit: {
    label: 'Note à l’écrit (moy. 3 ans)',
    court: 'Écrit',
    unite: '/20',
    decimales: 1,
    plusHautMieux: true,
    description: 'Note moyenne aux épreuves écrites du brevet.',
  },
  vaTaux: {
    label: 'Valeur ajoutée du taux de réussite',
    court: 'VA taux',
    unite: 'pts',
    decimales: 1,
    plusHautMieux: true,
    description: 'Écart entre le taux de réussite constaté et celui attendu compte tenu du profil des élèves (âge, origine sociale, niveau en 6e).',
  },
  vaNote: {
    label: 'Valeur ajoutée de la note à l’écrit',
    court: 'VA note',
    unite: 'pts',
    decimales: 1,
    plusHautMieux: true,
    description: 'Écart entre la note à l’écrit constatée et celle attendue compte tenu du profil des élèves.',
  },
  mentionsTB: {
    label: 'Mentions Très bien',
    court: 'TB',
    unite: '%',
    decimales: 1,
    plusHautMieux: true,
    description: 'Part des candidats obtenant la mention Très bien (3 sessions).',
  },
  mentions: {
    label: 'Mentions (toutes)',
    court: 'Mentions',
    unite: '%',
    decimales: 1,
    plusHautMieux: true,
    description: 'Part des candidats obtenant une mention (3 sessions).',
  },
  accesSixiemeTroisieme: {
    label: 'Taux d’accès de la 6e à la 3e',
    court: 'Accès 6e→3e',
    unite: '%',
    decimales: 0,
    plusHautMieux: true,
    description: 'Probabilité pour un élève de 6e d’atteindre la 3e dans le même collège.',
  },
  ips: {
    label: 'Indice de position sociale (IPS)',
    court: 'IPS',
    unite: '',
    decimales: 0,
    plusHautMieux: null,
    description: 'Indicateur du milieu social des élèves (moyenne nationale ≈ 100). Plus il est élevé, plus le milieu est favorisé.',
  },
  effectif: {
    label: 'Nombre d’élèves',
    court: 'Élèves',
    unite: '',
    decimales: 0,
    plusHautMieux: null,
    description: 'Nombre total d’élèves à la dernière rentrée.',
  },
  elevesParClasse: {
    label: 'Élèves par classe (E/S)',
    court: 'Él./classe',
    unite: '',
    decimales: 1,
    plusHautMieux: false,
    description: 'Nombre moyen d’élèves par structure d’enseignement, proche de la taille des classes.',
  },
  heuresParEleve: {
    label: 'Heures d’enseignement par élève (H/E)',
    court: 'H/E',
    unite: 'h',
    decimales: 2,
    plusHautMieux: true,
    description: 'Nombre d’heures d’enseignement hebdomadaires rapporté au nombre d’élèves.',
  },
  eval6Francais: {
    label: 'Évaluations 6e – français',
    court: 'Éval. 6e fr.',
    unite: '',
    decimales: 0,
    plusHautMieux: true,
    description: 'Score moyen des élèves de 6e aux évaluations nationales de français (niveau d’entrée, moyenne nationale ≈ 250).',
  },
  eval6Maths: {
    label: 'Évaluations 6e – maths',
    court: 'Éval. 6e maths',
    unite: '',
    decimales: 0,
    plusHautMieux: true,
    description: 'Score moyen des élèves de 6e aux évaluations nationales de mathématiques (niveau d’entrée, moyenne nationale ≈ 250).',
  },
};

/** Indicateurs proposés en filtre de plage, dans l'ordre d'affichage. */
export const INDICATEURS_FILTRABLES: IndicateurKey[] = [
  'note',
  'brevet',
  'noteEcrit',
  'vaTaux',
  'vaNote',
  'mentionsTB',
  'accesSixiemeTroisieme',
  'ips',
  'effectif',
  'elevesParClasse',
  'eval6Francais',
  'eval6Maths',
];

export const STATUT_LABELS: Record<Statut, string> = {
  public: 'Public',
  prive_sous_contrat: 'Privé sous contrat',
  hors_contrat: 'Privé hors contrat',
};

export const STATUT_COURT: Record<Statut, string> = {
  public: 'Public',
  prive_sous_contrat: 'Privé',
  hors_contrat: 'Hors contrat',
};

export const EVENT_LABELS: Record<EventType, string> = {
  portes_ouvertes: 'Portes ouvertes',
  reunion_information: 'Réunion d’information',
  immersion: 'Immersion',
  inscription: 'Inscriptions',
  date_limite: 'Date limite',
  officiel: 'Date officielle',
};

export const LIEN_LABELS: Record<LienLycee, string> = {
  cite_scolaire: 'Cité scolaire publique (collège et lycée sur le même site)',
  meme_etablissement_prive: 'Lycée dans le même établissement privé',
  groupe_scolaire_autre_site: 'Lycée du même groupe, sur un autre site',
  aucun: 'Pas de lycée rattaché',
};

export const PASSAGE_LABELS: Record<Passage, string> = {
  garanti: 'Passage au lycée garanti par l’établissement',
  sous_reserve: 'Passage sous réserve de l’avis du conseil de classe',
  non_garanti: 'Passage au lycée non garanti',
  inconnu: 'Passage au lycée : non précisé',
};

export const INSCRIPTIONS_LABELS: Record<StatutInscriptions, string> = {
  ouvertes: 'Inscriptions ouvertes',
  closes: 'Inscriptions closes',
  a_venir: 'Inscriptions pas encore ouvertes',
  inconnu: 'Inscriptions : pas d’information',
};
