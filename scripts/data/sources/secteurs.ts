// Sectorisation : polygones des secteurs parisiens (opendata.paris.fr, ODbL, sans UAI -> jointure par nom)
// et carte scolaire nationale des collèges publics (fr-en-carte-scolaire-colleges-publics, plages d'adresses).
import type { CarteScolaireDepartement, PariteCarteScolaire, PlageCarteScolaire, SecteurParisProps } from '../../../src/types';
import { normalizeNom, normalizeVoie } from '../../../src/lib/normalize';
import { fetchJson, odsExport, odsExportUrl, ODS_PARIS } from '../lib/fetch';
import { num } from '../lib/util';
import { ANNEE_SECTEURS_PARIS } from '../lib/config';
import { countPositions, simplifyGeometry, type Feature, type FeatureCollection, type SurfaceGeometry } from '../lib/geo';
import { normAdresse } from './continuite';

export const SECTEURS_PARIS_ID = 'secteurs-scolaires-colleges';
export const CARTE_SCOLAIRE_ID = 'fr-en-carte-scolaire-colleges-publics';

export function secteursParisUrl(): string {
  return odsExportUrl(SECTEURS_PARIS_ID, { base: ODS_PARIS, where: `annee_scol="${ANNEE_SECTEURS_PARIS}"` }, 'geojson');
}

export interface RawSecteurProps {
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
  methode: 'exact' | 'approchant' | 'inclusion' | 'adresse' | null;
  candidats: string[];
  adresseConcordante: boolean | null;
}

const MOTS_NEUTRES = new Set(['DE', 'DU', 'DES', 'LA', 'LE', 'LES', 'L', 'D', 'ET']);

function significatifs(n: string): string[] {
  return n.split(' ').filter((w) => w && !MOTS_NEUTRES.has(w));
}

/** « SELIGMAN » et « SELIGMANN » : la Ville et l'annuaire ne doublent pas toujours les mêmes lettres. */
function sansLettresDoublees(n: string): string {
  return n.replace(/([A-Z])\1+/g, '$1');
}

/**
 * Associe un nom publié (ex. « AUGUSTE RODIN », « ST EXUPERY ») à un collège :
 * égalité des noms normalisés, puis égalité aux lettres doublées près, sinon inclusion
 * des mots significatifs ; l'adresse départage.
 */
export function matchNomCollege(nom: string, adresse: string | null, colleges: CollegeNom[]): MatchNom {
  const n = normalizeNom(nom);
  const adr = adresse ? normAdresse(adresse) : null;
  const concord = (c: CollegeNom) => (adr && c.adresse ? normAdresse(c.adresse) === adr : null);
  const exact = colleges.filter((c) => normalizeNom(c.nom) === n);
  if (exact.length === 1) return { uai: exact[0].uai, methode: 'exact', candidats: [exact[0].uai], adresseConcordante: concord(exact[0]) };
  if (exact.length === 0) {
    const approchant = colleges.filter((c) => sansLettresDoublees(normalizeNom(c.nom)) === sansLettresDoublees(n));
    if (approchant.length === 1) return { uai: approchant[0].uai, methode: 'approchant', candidats: [approchant[0].uai], adresseConcordante: concord(approchant[0]) };
  }
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
  /** Secteurs dont aucun nom publié ne correspond à un collège public parisien (pour le rapport). */
  secteursSansCollege: { libelle: string; noms: string[] }[];
  positionsAvant: number;
  positionsApres: number;
  polygonesAvant: number;
  polygonesApres: number;
}

/** Secteur tel que publié par la Ville (géométrie non simplifiée, collèges désignés par leur nom). */
export interface SecteurParisBrut {
  properties: RawSecteurProps;
  geometry: SurfaceGeometry | null;
}

export async function loadSecteursParisBruts(): Promise<SecteurParisBrut[]> {
  return (await fetchJson<{ features: SecteurParisBrut[] }>(secteursParisUrl())).features;
}

/** Relie chaque secteur aux collèges par leur nom et simplifie les géométries (sans accès réseau). */
export function relierSecteursParis(
  bruts: SecteurParisBrut[],
  collegesParis: CollegeNom[],
  opts: { tolerance: number; decimals: number; minHoleArea: number; minPolygonArea: number },
): SecteursParisResult {
  const correspondances: SecteursParisResult['correspondances'] = [];
  const secteursSansCollege: SecteursParisResult['secteursSansCollege'] = [];
  const features: Feature<SecteurParisProps>[] = [];
  let positionsAvant = 0;
  let positionsApres = 0;
  let polygonesAvant = 0;
  let polygonesApres = 0;
  const nbPolygones = (g: SurfaceGeometry) => (g.type === 'Polygon' ? 1 : g.coordinates.length);
  for (const f of bruts) {
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
    if (uais.length === 0) secteursSansCollege.push({ libelle: p.libelle, noms });
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
  secteursSansCollege.sort((a, b) => a.libelle.localeCompare(b.libelle));
  return { geojson: { type: 'FeatureCollection', features }, correspondances, secteursSansCollege, positionsAvant, positionsApres, polygonesAvant, polygonesApres };
}

// --- Carte scolaire nationale : plages d'adresses ---

/** Ligne de la carte scolaire, à plat (rapport, contrôle croisé parisien). */
export interface CarteScolaireRow {
  /** Commune de l'adresse (code INSEE ; à Paris, l'arrondissement). */
  insee: string;
  /** Libellé normalisé par normalizeVoie ; vide pour une ligne « secteur unique ». */
  voie: string;
  debut: number | null;
  fin: number | null;
  parite: PariteCarteScolaire;
  uai: string;
}

export interface CarteScolaireResult {
  /** Lignes normalisées, dédoublonnées et triées, Paris compris. */
  rows: CarteScolaireRow[];
  /** Carte compacte de chaque département demandé (sans commune si aucune ligne), dans l'ordre des codes. */
  departements: CarteScolaireDepartement[];
  /** Lignes avec une voie, libellé tel que publié (échantillon du contrôle de normalisation). */
  brut: { insee: string; commune: string; libelle: string; uai: string }[];
  /** Doublons après normalisation, retirés. */
  doublons: number;
  /** Lignes écartées : sans UAI, ou commune hors des départements demandés. */
  ecartees: number;
  /** UAI présents dans la carte. */
  uais: Set<string>;
  /** Communes présentes dans la carte (code INSEE ; à Paris, l'arrondissement). */
  communes: Set<string>;
}

const COLONNES_CARTE = ['code_insee', 'libelle_commune', 'type_et_libelle', 'n_de_voie_debut', 'n_de_voie_fin', 'parite', 'code_rne'].join(',');

/**
 * Lignes brutes de la carte scolaire, une requête par département (environ 10 000 lignes chacune).
 * Le filtre porte sur la commune de l'adresse (code INSEE) et non sur le département du collège :
 * quelques communes franciliennes relèvent d'un collège d'un département voisin.
 */
export async function loadCarteScolaireBrute(departements: readonly string[]): Promise<Record<string, unknown>[]> {
  const out: Record<string, unknown>[] = [];
  for (const d of [...departements].sort()) {
    out.push(...(await odsExport<Record<string, unknown>>(CARTE_SCOLAIRE_ID, { select: COLONNES_CARTE, where: `startswith(code_insee, "${d}")` })));
  }
  return out;
}

const comparerLignes = (a: CarteScolaireRow, b: CarteScolaireRow) =>
  a.insee.localeCompare(b.insee) ||
  a.voie.localeCompare(b.voie) ||
  (a.debut ?? 0) - (b.debut ?? 0) ||
  (a.fin ?? 0) - (b.fin ?? 0) ||
  a.parite.localeCompare(b.parite) ||
  a.uai.localeCompare(b.uai);

/**
 * Normalise les voies, garde les lignes « secteur unique » (voie vide), écarte les lignes sans UAI ou hors
 * des départements et les doublons, trie, puis regroupe par département et par commune (sans accès réseau).
 */
export function compacterCarteScolaire(raw: Record<string, unknown>[], departements: readonly string[]): CarteScolaireResult {
  const garder = new Set(departements);
  const seen = new Set<string>();
  const rows: CarteScolaireRow[] = [];
  const brut: CarteScolaireResult['brut'] = [];
  let doublons = 0;
  let ecartees = 0;
  for (const r of raw) {
    const parite = String(r.parite ?? 'PI').toUpperCase();
    const libelle = r.type_et_libelle ? String(r.type_et_libelle) : '';
    const row: CarteScolaireRow = {
      insee: String(r.code_insee ?? ''),
      voie: libelle ? normalizeVoie(libelle) : '',
      debut: num(r.n_de_voie_debut),
      fin: num(r.n_de_voie_fin),
      parite: parite === 'P' || parite === 'I' ? parite : 'PI',
      uai: String(r.code_rne ?? ''),
    };
    if (!row.uai || !garder.has(row.insee.slice(0, 2))) {
      ecartees++;
      continue;
    }
    const key = JSON.stringify(row);
    if (seen.has(key)) {
      doublons++;
      continue;
    }
    seen.add(key);
    rows.push(row);
    if (row.voie) brut.push({ insee: row.insee, commune: String(r.libelle_commune ?? row.insee), libelle, uai: row.uai });
  }
  rows.sort(comparerLignes);
  const parDepartement = new Map<string, CarteScolaireDepartement>([...departements].sort().map((d) => [d, { departement: d, communes: {} }]));
  for (const r of rows) {
    const communes = parDepartement.get(r.insee.slice(0, 2))!.communes;
    const plage: PlageCarteScolaire = [r.voie, r.debut, r.fin, r.parite, r.uai];
    (communes[r.insee] ??= []).push(plage);
  }
  return {
    rows,
    departements: [...parDepartement.values()],
    brut,
    doublons,
    ecartees,
    uais: new Set(rows.map((r) => r.uai)),
    communes: new Set(rows.map((r) => r.insee)),
  };
}
