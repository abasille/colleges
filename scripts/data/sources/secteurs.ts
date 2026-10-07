// Sectorisation : polygones des secteurs parisiens (opendata.paris.fr, ODbL, sans UAI -> jointure par nom)
// et plages d'adresses d'Ivry / Vitry (fr-en-carte-scolaire-colleges-publics).
import type { CarteScolaireRow, SecteurParisProps } from '../../../src/types';
import { normalizeNom, normalizeVoie } from '../../../src/lib/normalize';
import { fetchJson, odsExport, odsExportUrl, odsList, ODS_PARIS } from '../lib/fetch';
import { num } from '../lib/util';
import { ANNEE_SECTEURS_PARIS } from '../lib/config';
import { countPositions, simplifyGeometry, type Feature, type FeatureCollection, type SurfaceGeometry } from '../lib/geo';
import { normAdresse } from './continuite';

export const SECTEURS_PARIS_ID = 'secteurs-scolaires-colleges';
export const CARTE_SCOLAIRE_ID = 'fr-en-carte-scolaire-colleges-publics';

export function secteursParisUrl(): string {
  return odsExportUrl(SECTEURS_PARIS_ID, { base: ODS_PARIS, where: `annee_scol="${ANNEE_SECTEURS_PARIS}"` }, 'geojson');
}

interface RawSecteurProps {
  libelle: string;
  annee_scol: string;
  lib_etab_1?: string | null;
  lib_etab_2?: string | null;
  lib_etab_3?: string | null;
  lib_etab_4?: string | null;
  adr_etab_1?: string | null;
  adr_etab_2?: string | null;
  adr_etab_3?: string | null;
  adr_etab_4?: string | null;
}

export interface CollegeNom {
  uai: string;
  nom: string;
  adresse: string | null;
}

export interface MatchNom {
  uai: string | null;
  methode: 'exact' | 'inclusion' | 'adresse' | null;
  candidats: string[];
  adresseConcordante: boolean | null;
}

const MOTS_NEUTRES = new Set(['DE', 'DU', 'DES', 'LA', 'LE', 'LES', 'L', 'D', 'ET']);

function significatifs(n: string): string[] {
  return n.split(' ').filter((w) => w && !MOTS_NEUTRES.has(w));
}

/**
 * Associe un nom publié (ex. « AUGUSTE RODIN », « ST EXUPERY ») à un collège :
 * égalité des noms normalisés, sinon inclusion des mots significatifs ; l'adresse départage.
 */
export function matchNomCollege(nom: string, adresse: string | null, colleges: CollegeNom[]): MatchNom {
  const n = normalizeNom(nom);
  const adr = adresse ? normAdresse(adresse) : null;
  const concord = (c: CollegeNom) => (adr && c.adresse ? normAdresse(c.adresse) === adr : null);
  const exact = colleges.filter((c) => normalizeNom(c.nom) === n);
  if (exact.length === 1) return { uai: exact[0].uai, methode: 'exact', candidats: [exact[0].uai], adresseConcordante: concord(exact[0]) };
  const ns = significatifs(n);
  const incl =
    exact.length > 1
      ? exact
      : colleges.filter((c) => {
          const cs = significatifs(normalizeNom(c.nom));
          if (cs.length === 0 || ns.length === 0) return false;
          const [petit, grand] = cs.length <= ns.length ? [cs, ns] : [ns, cs];
          return petit.every((w) => grand.includes(w));
        });
  if (incl.length === 1) return { uai: incl[0].uai, methode: 'inclusion', candidats: [incl[0].uai], adresseConcordante: concord(incl[0]) };
  if (incl.length > 1 && adr) {
    const parAdresse = incl.filter((c) => concord(c) === true);
    if (parAdresse.length === 1) return { uai: parAdresse[0].uai, methode: 'adresse', candidats: incl.map((c) => c.uai), adresseConcordante: true };
  }
  return { uai: null, methode: null, candidats: incl.map((c) => c.uai), adresseConcordante: null };
}

export interface SecteursParisResult {
  geojson: FeatureCollection<SecteurParisProps>;
  /** Pour le rapport. */
  correspondances: { libelle: string; nom: string; match: MatchNom }[];
  positionsAvant: number;
  positionsApres: number;
  polygonesAvant: number;
  polygonesApres: number;
}

export async function loadSecteursParis(
  collegesParis: CollegeNom[],
  opts: { tolerance: number; decimals: number; minHoleArea: number; minPolygonArea: number },
): Promise<SecteursParisResult> {
  const raw = await fetchJson<{ features: { properties: RawSecteurProps; geometry: SurfaceGeometry }[] }>(secteursParisUrl());
  const correspondances: SecteursParisResult['correspondances'] = [];
  const features: Feature<SecteurParisProps>[] = [];
  let positionsAvant = 0;
  let positionsApres = 0;
  let polygonesAvant = 0;
  let polygonesApres = 0;
  const nbPolygones = (g: SurfaceGeometry) => (g.type === 'Polygon' ? 1 : g.coordinates.length);
  for (const f of raw.features) {
    const p = f.properties;
    const noms: string[] = [];
    const uais: string[] = [];
    for (let i = 1; i <= 4; i++) {
      const nom = (p[`lib_etab_${i}` as keyof RawSecteurProps] as string | null | undefined)?.trim();
      if (!nom) continue;
      noms.push(nom);
      const adr = (p[`adr_etab_${i}` as keyof RawSecteurProps] as string | null | undefined) ?? null;
      const match = matchNomCollege(nom, adr, collegesParis);
      correspondances.push({ libelle: p.libelle, nom, match });
      if (match.uai && !uais.includes(match.uai)) uais.push(match.uai);
    }
    if (!f.geometry) continue;
    positionsAvant += countPositions(f.geometry);
    polygonesAvant += nbPolygones(f.geometry);
    const geometry = simplifyGeometry(f.geometry, opts.tolerance, opts.decimals, opts);
    if (!geometry) continue;
    positionsApres += countPositions(geometry);
    polygonesApres += nbPolygones(geometry);
    features.push({ type: 'Feature', properties: { libelle: p.libelle, uais: uais.sort(), noms }, geometry });
  }
  features.sort((a, b) => a.properties.libelle.localeCompare(b.properties.libelle));
  return { geojson: { type: 'FeatureCollection', features }, correspondances, positionsAvant, positionsApres, polygonesAvant, polygonesApres };
}

// --- Ivry / Vitry : plages d'adresses ---

export interface CarteScolaireResult {
  rows: CarteScolaireRow[];
  /** Lignes brutes (pour le test de normalisation des voies). */
  brut: { insee: string; libelle: string; uai: string }[];
  doublons: number;
}

export async function loadCarteScolaire(communes: string[]): Promise<CarteScolaireResult> {
  const raw = await odsExport<Record<string, unknown>>(CARTE_SCOLAIRE_ID, { where: `code_insee in ${odsList(communes)}` });
  const seen = new Set<string>();
  const rows: CarteScolaireRow[] = [];
  const brut: CarteScolaireResult['brut'] = [];
  let doublons = 0;
  for (const r of raw) {
    const parite = String(r.parite ?? 'PI').toUpperCase();
    const row: CarteScolaireRow = {
      insee: String(r.code_insee),
      voie: normalizeVoie(String(r.type_et_libelle ?? '')),
      debut: num(r.n_de_voie_debut),
      fin: num(r.n_de_voie_fin),
      parite: parite === 'P' || parite === 'I' ? parite : 'PI',
      uai: String(r.code_rne ?? ''),
    };
    if (!row.voie || !row.uai) continue;
    const key = JSON.stringify(row);
    if (seen.has(key)) {
      doublons++;
      continue;
    }
    seen.add(key);
    rows.push(row);
    brut.push({ insee: row.insee, libelle: String(r.type_et_libelle), uai: row.uai });
  }
  rows.sort(
    (a, b) =>
      a.insee.localeCompare(b.insee) ||
      a.voie.localeCompare(b.voie) ||
      (a.debut ?? 0) - (b.debut ?? 0) ||
      (a.fin ?? 0) - (b.fin ?? 0) ||
      a.parite.localeCompare(b.parite) ||
      a.uai.localeCompare(b.uai),
  );
  return { rows, brut, doublons };
}
