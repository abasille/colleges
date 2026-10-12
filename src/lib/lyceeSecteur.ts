// Lycée de secteur hors de Paris (ADR 0003) : aucune donnée ouverte, la fiche renvoie
// vers l'outil officiel. Les PDF de Versailles et les tableaux des DSDEN n'ont pas de
// licence : on ne les extrait pas, on donne seulement le lien.
import type { Academie, Departement } from '../types';
import { DEPARTEMENTS } from './territoires';

export interface OutilLyceeSecteur {
  texte: string;
  libelle: string;
  url: string;
}

const PRINCIPE = 'Hors de Paris, le lycée de secteur dépend de l’adresse du domicile, pas du collège.';

/** Pages de sectorisation des lycées des directions départementales de l'académie de Créteil (vérifiées le 12/10/2026). */
const SECTORISATION_CRETEIL: Partial<Record<string, string>> = {
  '77': 'https://www.dsden77.ac-creteil.fr/spip.php?article1162',
  '93': 'https://www.dsden93.ac-creteil.fr/spip/spip.php?article2376',
  '94': 'https://www.dsden94.ac-creteil.fr/spip.php?article5005',
};

/** Outil officiel qui donne le lycée de secteur selon l'adresse ; null à Paris (Affelnet sur la fiche). */
export function outilLyceeSecteur(c: { academie: Academie; departement: string }): OutilLyceeSecteur | null {
  if (c.academie === 'Versailles') {
    return {
      texte: `${PRINCIPE} L’académie de Versailles le donne à partir de la commune de domicile.`,
      libelle: 'Lycées de secteur (académie de Versailles)',
      url: 'https://bv.ac-versailles.fr/rechetab/lycees-de-secteur-proximite.html',
    };
  }
  const url = c.academie === 'Créteil' ? SECTORISATION_CRETEIL[c.departement] : undefined;
  if (!url) return null;
  return {
    texte: `${PRINCIPE} Dans l’académie de Créteil, la direction départementale publie les zones de recrutement des lycées pour l’entrée en 2nde générale et technologique.`,
    libelle: `Sectorisation des lycées (${DEPARTEMENTS[c.departement as Departement]})`,
    url,
  };
}
