import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CarteScolaireRow, College, Dataset, EventsFile } from './types';
import type { SecteurFeature, SecteurResult } from './lib/secteur';
import { findSecteur } from './lib/secteur';
import { haversineKm } from './lib/geo';
import { applyFilters, sortColleges } from './lib/filters';
import { useStore } from './store';

export interface ContourFeature {
  type: 'Feature';
  geometry: GeoJSON.Geometry;
  properties: { code: string; libelle: string };
}

interface RawData {
  dataset: Dataset;
  events: EventsFile;
  contours: { type: 'FeatureCollection'; features: ContourFeature[] };
  secteursParis: SecteurFeature[];
  carte94: CarteScolaireRow[];
}

export interface AppData extends RawData {
  byUai: Map<string, College>;
  distances: Map<string, number> | null;
  secteur: SecteurResult | null;
  /** Collèges filtrés puis triés. */
  visibles: College[];
  visiblesSet: Set<string>;
}

const Ctx = createContext<AppData | null>(null);

export function useData(): AppData {
  const v = useContext(Ctx);
  if (!v) throw new Error('useData hors de DataProvider');
  return v;
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${path}`);
  if (!res.ok) throw new Error(`${path} : HTTP ${res.status}`);
  return (await res.json()) as T;
}

async function loadAll(): Promise<RawData> {
  const [dataset, events, contours, secteurs, carte94] = await Promise.all([
    getJson<Dataset>('colleges.json'),
    getJson<EventsFile>('events.json').catch(() => ({ saisonCourante: '2026-27', events: [], inscriptions: {} }) as EventsFile),
    getJson<RawData['contours']>('contours.geojson').catch(() => ({ type: 'FeatureCollection' as const, features: [] })),
    getJson<{ features: SecteurFeature[] }>('secteurs-paris.geojson').catch(() => ({ features: [] })),
    getJson<CarteScolaireRow[]>('carte-scolaire-94.json').catch(() => []),
  ]);
  return { dataset, events, contours, secteursParis: secteurs.features, carte94 };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<RawData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const filters = useStore((s) => s.filters);
  const sort = useStore((s) => s.sort);
  const favorisList = useStore((s) => s.favoris);
  const adresse = useStore((s) => s.adresse);

  useEffect(() => {
    loadAll().then(setRaw, (e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const value = useMemo<AppData | null>(() => {
    if (!raw) return null;
    const colleges = raw.dataset.colleges;
    const byUai = new Map(colleges.map((c) => [c.uai, c]));
    const distances = adresse ? new Map(colleges.map((c) => [c.uai, haversineKm(adresse.lat, adresse.lon, c.lat, c.lon)])) : null;
    const secteur = adresse ? findSecteur(adresse, raw.secteursParis, raw.carte94) : null;
    const ctx = { favoris: new Set(favorisList), distances };
    const visibles = sortColleges(applyFilters(colleges, filters, ctx), sort, ctx);
    return { ...raw, byUai, distances, secteur, visibles, visiblesSet: new Set(visibles.map((c) => c.uai)) };
  }, [raw, filters, sort, favorisList, adresse]);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-red-700">
        Impossible de charger les données ({error}).
      </div>
    );
  }
  if (!value) {
    return <div className="flex h-full items-center justify-center text-sm text-zinc-500">Chargement des collèges…</div>;
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
