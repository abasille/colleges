import { readFileSync } from 'node:fs';
import type { Academie, ZoneCode } from '../../../src/types';

export interface Config {
  zones: { code: ZoneCode; libelle: string; academie: Academie }[];
  codesNature: number[];
  exclure: string[];
  saisonCourante: string;
}

export function loadConfig(path = 'data/config.json'): Config {
  return JSON.parse(readFileSync(path, 'utf-8')) as Config;
}

/** Natures « lycée » de l'annuaire utilisées pour détecter un lycée rattaché. */
export const NATURES_LYCEE = [300, 301, 302, 306, 312, 315, 320, 335];

/** Année scolaire des secteurs parisiens (opendata.paris.fr). */
export const ANNEE_SECTEURS_PARIS = '2026-2027';

/** Millésime de la carte Affelnet (lycées de secteur). */
export const ANNEE_AFFELNET = 2026;

/** Première session du brevet conservée dans l'historique (DNB). */
export const PREMIERE_SESSION_DNB = 2015;
