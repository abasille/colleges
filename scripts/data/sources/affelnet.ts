// Carte Affelnet de l'académie de Paris (ArcGIS « Affectation Lycées ») : pour chaque collège
// public parisien (tête de réseau), lycées classés en secteur 1 / 2 / 3.
import { fetchJson } from '../lib/fetch';

export const AFFELNET_URL =
  'https://services9.arcgis.com/ekT8MJFiVh8nvlV5/arcgis/rest/services/Affectation_Lyc%C3%A9es/FeatureServer/0';

export interface AffelnetRow {
  uai: string;
  nomTete: string;
  nom: string;
  type: string;
  reseau: string;
  secteur: string;
}

interface ArcgisResponse {
  features?: { attributes: Record<string, unknown> }[];
  exceededTransferLimit?: boolean;
  error?: unknown;
}

export async function loadAffelnet(): Promise<AffelnetRow[]> {
  const out: AffelnetRow[] = [];
  const pageSize = 2000;
  for (let offset = 0; offset < 50_000; offset += pageSize) {
    const url = `${AFFELNET_URL}/query?where=1%3D1&outFields=*&orderByFields=ObjectId&f=json&resultOffset=${offset}&resultRecordCount=${pageSize}`;
    const res = await fetchJson<ArcgisResponse>(url);
    if (res.error) throw new Error(`Affelnet ArcGIS : ${JSON.stringify(res.error)}`);
    const feats = res.features ?? [];
    for (const f of feats) {
      const a = f.attributes;
      out.push({
        uai: String(a.UAI ?? ''),
        nomTete: String(a.Nom_tete ?? ''),
        nom: String(a.Nom ?? ''),
        type: String(a.type ?? ''),
        reseau: String(a['Réseau'] ?? a.Reseau ?? ''),
        secteur: String(a.secteur ?? ''),
      });
    }
    if (!res.exceededTransferLimit || feats.length === 0) break;
  }
  return out;
}
