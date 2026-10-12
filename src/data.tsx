import { createContext, useContext, useDeferredValue, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { College, CollegeDetail, CollegeResume, Dataset, DetailDepartement, EventsFile } from './types';
import type { Adresse, DonneesSecteur, SecteurResult, SourceSecteur } from './lib/secteur';
import { findSecteur, lireDonneesSecteur, sourceSecteur } from './lib/secteur';
import { haversineKm } from './lib/geo';
import { applyFilters, sortColleges } from './lib/filters';
import { fusionner } from './lib/fiche';
import { useStore } from './store';

interface RawData {
  dataset: Dataset;
  events: EventsFile;
}

export interface AppData extends RawData {
  byUai: Map<string, CollegeResume>;
  distances: Map<string, number> | null;
  /** null sans adresse ; message « Recherche… » pendant le téléchargement des secteurs. */
  secteur: SecteurResult | null;
  /** Collèges filtrés puis triés. */
  visibles: CollegeResume[];
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
  const [dataset, events] = await Promise.all([
    getJson<Dataset>('colleges.json'),
    getJson<EventsFile>('events.json').catch(() => ({ saisonCourante: '2026-27', events: [], inscriptions: {} }) as EventsFile),
  ]);
  return { dataset, events };
}

// ---------------------------------------------------------------- détail par département

/** Détails déjà reçus, par département puis par UAI. */
const detailsRecus = new Map<string, Map<string, CollegeDetail>>();
/** Téléchargements en cours ou terminés, un seul par département. */
const detailsDemandes = new Map<string, Promise<void>>();

function chargerDetail(departement: string, version: string): Promise<void> {
  let p = detailsDemandes.get(departement);
  if (!p) {
    // La version (date de génération) évite de mélanger un fichier léger et un détail de deux générations.
    p = getJson<DetailDepartement>(`colleges-${departement}.json?v=${encodeURIComponent(version)}`).then((d) => {
      detailsRecus.set(departement, new Map(d.colleges.map((c) => [c.uai, c])));
    });
    p.catch(() => detailsDemandes.delete(departement));
    detailsDemandes.set(departement, p);
  }
  return p;
}

export type EtatFiche =
  | { etat: 'chargement' }
  | { etat: 'erreur'; message: string; reessayer: () => void }
  | { etat: 'prete'; college: College };

/**
 * Fiche complète d'un collège : la première fiche ouverte dans un département télécharge le détail
 * de ce département (colleges-<dép>.json) ; les suivantes s'ouvrent sans nouveau téléchargement.
 */
export function useFiche(resume: CollegeResume): EtatFiche {
  const { dataset } = useData();
  const departement = resume.departement;
  const [essai, setEssai] = useState(0);
  const [echec, setEchec] = useState<{ departement: string; message: string } | null>(null);
  const [, setRecu] = useState(0);

  useEffect(() => {
    if (detailsRecus.has(departement)) return;
    let actif = true;
    chargerDetail(departement, dataset.generatedAt).then(
      () => actif && setRecu((n) => n + 1),
      (e: unknown) => actif && setEchec({ departement, message: e instanceof Error ? e.message : String(e) }),
    );
    return () => {
      actif = false;
    };
  }, [departement, dataset.generatedAt, essai]);

  const reessayer = () => {
    detailsRecus.delete(departement);
    detailsDemandes.delete(departement);
    setEchec(null);
    setEssai((n) => n + 1);
  };
  const details = detailsRecus.get(departement);
  if (details) {
    const detail = details.get(resume.uai);
    if (detail) return { etat: 'prete', college: fusionner(resume, detail) };
    return { etat: 'erreur', message: `${resume.uai} absent de colleges-${departement}.json`, reessayer };
  }
  if (echec?.departement === departement) return { etat: 'erreur', message: echec.message, reessayer };
  return { etat: 'chargement' };
}

// ---------------------------------------------------------------- sectorisation

/** Fichiers de sectorisation (polygones parisiens, carte scolaire) : un seul téléchargement par fichier. */
const secteursDemandes = new Map<string, Promise<DonneesSecteur>>();

function chargerSecteur(source: SourceSecteur, version: string): Promise<DonneesSecteur> {
  let p = secteursDemandes.get(source.fichier);
  if (!p) {
    p = getJson<unknown>(`${source.fichier}?v=${encodeURIComponent(version)}`).then((json) => lireDonneesSecteur(source, json));
    p.catch(() => secteursDemandes.delete(source.fichier));
    secteursDemandes.set(source.fichier, p);
  }
  return p;
}

type SecteursRecus = { fichier: string; donnees: DonneesSecteur } | { fichier: string; erreur: string };

/**
 * Collège de secteur de l'adresse. Le fichier de sectorisation du département de l'adresse
 * (sourceSecteur) n'est téléchargé qu'une fois l'adresse saisie : rien à l'ouverture du site.
 */
function useSecteur(adresse: Adresse | null, version: string | undefined): SecteurResult | null {
  const source = adresse ? sourceSecteur(adresse) : null;
  const fichier = source?.fichier ?? null;
  const [recus, setRecus] = useState<SecteursRecus | null>(null);

  useEffect(() => {
    if (!adresse || !version) return;
    const s = sourceSecteur(adresse);
    if (!s) return;
    let actif = true;
    chargerSecteur(s, version).then(
      (donnees) => actif && setRecus({ fichier: s.fichier, donnees }),
      (e: unknown) => actif && setRecus({ fichier: s.fichier, erreur: e instanceof Error ? e.message : String(e) }),
    );
    return () => {
      actif = false;
    };
    // Une autre adresse du même département réutilise le fichier déjà reçu ; après un échec, elle relance le téléchargement.
  }, [adresse, version]);

  return useMemo(() => {
    if (!adresse) return null;
    if (!fichier) return findSecteur(adresse, null);
    if (recus?.fichier !== fichier) return { uais: [], methode: null, feature: null, message: 'Recherche du collège de secteur…' };
    if ('erreur' in recus) return { uais: [], methode: null, feature: null, message: `Secteurs indisponibles (${recus.erreur}).` };
    return findSecteur(adresse, recus.donnees);
  }, [adresse, fichier, recus]);
}

// ---------------------------------------------------------------- fournisseur

export function DataProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<RawData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const filters = useStore((s) => s.filters);
  const sort = useStore((s) => s.sort);
  const favorisList = useStore((s) => s.favoris);
  const adresse = useStore((s) => s.adresse);
  const secteur = useSecteur(adresse, raw?.dataset.generatedAt);

  useEffect(() => {
    loadAll().then(setRaw, (e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  // Distances et collège de secteur (useSecteur) ne dépendent que de l'adresse : ils ne sont pas
  // recalculés quand un filtre ou le tri change.
  const distances = useMemo(
    () => (raw && adresse ? new Map(raw.dataset.colleges.map((c) => [c.uai, haversineKm(adresse.lat, adresse.lon, c.lat, c.lon)])) : null),
    [raw, adresse],
  );
  const byUai = useMemo(() => new Map(raw?.dataset.colleges.map((c) => [c.uai, c])), [raw]);
  // La recherche est mise à jour tout de suite ; la liste, la carte et le calendrier suivent sans bloquer la frappe.
  const filtresDiffere = useDeferredValue(filters);
  const triDiffere = useDeferredValue(sort);
  const visibles = useMemo(() => {
    if (!raw) return [];
    const ctx = { favoris: new Set(favorisList), distances };
    return sortColleges(applyFilters(raw.dataset.colleges, filtresDiffere, ctx), triDiffere, ctx);
  }, [raw, filtresDiffere, triDiffere, favorisList, distances]);

  const value = useMemo<AppData | null>(() => {
    if (!raw) return null;
    return { ...raw, byUai, distances, secteur, visibles, visiblesSet: new Set(visibles.map((c) => c.uai)) };
  }, [raw, byUai, distances, secteur, visibles]);

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
