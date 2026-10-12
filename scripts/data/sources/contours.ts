// Contours des communes (arrondissements municipaux de Paris compris) : jeu « Contours administratifs »
// d'Etalab, généralisé à 100 m, dérivé d'Admin Express (IGN). Licence ODbL 1.0 (data.gouv.fr).
// Un seul fichier France entière (8 Mo compressé), gardé en cache ; seules les communes des départements
// du périmètre sont rendues.
import { gunzipSync } from 'node:zlib';
import type { Departement } from '../../../src/types';
import { ANNEE_CONTOURS } from '../lib/config';
import { fetchCached } from '../lib/fetch';
import type { Feature } from '../lib/geo';

export const CONTOURS_URL = `https://etalab-datasets.geo.data.gouv.fr/contours-administratifs/${ANNEE_CONTOURS}/geojson/communes-100m.geojson.gz`;

/** Propriétés d'une commune dans le fichier Etalab (Paris y figure aussi en entier, code 75056). */
export interface ContourEtalabProps {
  code: string;
  nom: string;
  departement: string;
}

export type ContourCommuneBrut = Feature<ContourEtalabProps>;

/** Contours des communes des départements donnés, propriétés réduites au code, au nom et au département. */
export async function loadContoursCommunes(departements: readonly Departement[]): Promise<ContourCommuneBrut[]> {
  const fc = JSON.parse(gunzipSync(await fetchCached(CONTOURS_URL, '.geojson.gz')).toString('utf-8')) as { features: ContourCommuneBrut[] };
  const garder = new Set<string>(departements);
  return fc.features
    .filter((f) => garder.has(f.properties.departement))
    .map(({ properties: { code, nom, departement }, geometry }) => ({ type: 'Feature', properties: { code, nom, departement }, geometry }));
}
