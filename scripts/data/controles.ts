// Contrôles sur des données réelles, géocodées avec la Géoplateforme comme le fera le navigateur :
//  - normalisation des voies : un échantillon de lignes de la carte scolaire d'Ivry / Vitry est géocodé
//    et l'on vérifie que normalizeVoie(rue du géocodeur) === normalizeVoie(libellé de la carte scolaire) ;
//  - secteurs parisiens : des adresses test tombent-elles dans un polygone (sinon, secteur le plus proche) ?
import type { SecteurParisProps } from '../../src/types';
import { normalizeVoie } from '../../src/lib/normalize';
import { fetchJson } from './lib/fetch';
import type { FeatureCollection, Ring, SurfaceGeometry } from './lib/geo';

export const GEOCODEUR = 'https://data.geopf.fr/geocodage/search';

const COMMUNES: Record<string, string> = { '94041': 'Ivry-sur-Seine', '94081': 'Vitry-sur-Seine' };

export interface VerifVoie {
  insee: string;
  libelle: string;
  attendu: string;
  rueGeocodeur: string | null;
  obtenu: string | null;
  citycode: string | null;
  ok: boolean;
}

/** Échantillon déterministe : `n` lignes réparties régulièrement dans la liste triée. */
export function echantillon<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items.slice();
  const step = items.length / n;
  return Array.from({ length: n }, (_, i) => items[Math.floor(i * step + step / 2)]);
}

interface GeoResponse {
  features?: { properties: { street?: string; name?: string; citycode?: string; type?: string } }[];
}

export async function verifierVoies(rows: { insee: string; libelle: string }[], n = 25): Promise<VerifVoie[]> {
  const uniques = [...new Map(rows.map((r) => [`${r.insee}|${r.libelle}`, r])).values()].sort(
    (a, b) => a.insee.localeCompare(b.insee) || a.libelle.localeCompare(b.libelle),
  );
  const out: VerifVoie[] = [];
  for (const r of echantillon(uniques, n)) {
    const q = `${r.libelle} ${COMMUNES[r.insee] ?? r.insee}`;
    const url = `${GEOCODEUR}?q=${encodeURIComponent(q)}&limit=1`;
    let rue: string | null = null;
    let citycode: string | null = null;
    try {
      const res = await fetchJson<GeoResponse>(url);
      const p = res.features?.[0]?.properties;
      rue = p?.street ?? p?.name ?? null;
      citycode = p?.citycode ?? null;
    } catch {
      rue = null;
    }
    const attendu = normalizeVoie(r.libelle);
    const obtenu = rue ? normalizeVoie(rue) : null;
    out.push({ insee: r.insee, libelle: r.libelle, attendu, rueGeocodeur: rue, obtenu, citycode, ok: obtenu === attendu && citycode === r.insee });
  }
  return out;
}

// --- Secteurs parisiens : une adresse géocodée tombe-t-elle dans un polygone ? ---

/** Adresses de contrôle (Paris 5e, 6e, 13e, 14e). */
export const ADRESSES_TEST_PARIS = [
  '12 rue Clovis 75005 Paris',
  '5 rue Mouffetard 75005 Paris',
  '120 boulevard de l’Hôpital 75013 Paris',
  '80 boulevard Arago 75013 Paris',
  '30 rue de Tolbiac 75013 Paris',
  '100 avenue d’Italie 75013 Paris',
  '3 place d’Italie 75013 Paris',
  '60 rue de la Glacière 75013 Paris',
  '15 rue Daguerre 75014 Paris',
  '20 rue Didot 75014 Paris',
  '50 rue Notre-Dame des Champs 75006 Paris',
  '10 rue de Vaugirard 75006 Paris',
];

function dansAnneau(pt: [number, number], r: Ring): boolean {
  let c = false;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const [xi, yi] = r[i];
    const [xj, yj] = r[j];
    if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function polygones(g: SurfaceGeometry): Ring[][] {
  return g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
}

/** Distance (m) d'un point au bord le plus proche d'une géométrie. */
function distanceBord(pt: [number, number], g: SurfaceGeometry): number {
  const kx = Math.cos((pt[1] * Math.PI) / 180) * 111_320;
  const ky = 110_540;
  let best = Infinity;
  for (const p of polygones(g)) {
    for (const r of p) {
      for (let i = 0; i < r.length - 1; i++) {
        const ax = (r[i][0] - pt[0]) * kx;
        const ay = (r[i][1] - pt[1]) * ky;
        const bx = (r[i + 1][0] - pt[0]) * kx;
        const by = (r[i + 1][1] - pt[1]) * ky;
        const dx = bx - ax;
        const dy = by - ay;
        const t = dx || dy ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / (dx * dx + dy * dy))) : 0;
        best = Math.min(best, Math.hypot(ax + t * dx, ay + t * dy));
      }
    }
  }
  return best;
}

export interface VerifSecteur {
  adresse: string;
  label: string | null;
  contenant: string[];
  plusProche: string | null;
  distance: number | null;
}

export async function verifierSecteursParis(fc: FeatureCollection<SecteurParisProps>, adresses = ADRESSES_TEST_PARIS): Promise<VerifSecteur[]> {
  const out: VerifSecteur[] = [];
  for (const adresse of adresses) {
    let pt: [number, number] | null = null;
    let label: string | null = null;
    try {
      const res = await fetchJson<{ features?: { geometry: { coordinates: [number, number] }; properties: { label?: string } }[] }>(
        `${GEOCODEUR}?q=${encodeURIComponent(adresse)}&limit=1`,
      );
      const f = res.features?.[0];
      if (f) {
        pt = f.geometry.coordinates;
        label = f.properties.label ?? null;
      }
    } catch {
      pt = null;
    }
    if (!pt) {
      out.push({ adresse, label: null, contenant: [], plusProche: null, distance: null });
      continue;
    }
    const p = pt;
    const contenant = fc.features
      .filter((f) => polygones(f.geometry).some((poly) => dansAnneau(p, poly[0]) && !poly.slice(1).some((h) => dansAnneau(p, h))))
      .map((f) => f.properties.libelle);
    let plusProche: string | null = null;
    let distance = Infinity;
    for (const f of fc.features) {
      const d = distanceBord(p, f.geometry);
      if (d < distance) {
        distance = d;
        plusProche = f.properties.libelle;
      }
    }
    out.push({ adresse, label, contenant, plusProche, distance: contenant.length ? 0 : Math.round(distance) });
  }
  return out;
}
