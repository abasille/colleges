import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';
import type { Academie, EventType } from './types';
import { DEFAULT_FILTERS, DEFAULT_SORT, type Filters, type Sort } from './lib/filters';
import { parseUrlState, serializeUrlState, type ColorBy, type Vue } from './lib/url';
import type { Adresse } from './lib/secteur';

export type MobileTab = 'liste' | 'carte' | 'calendrier';
export type CalendarMode = 'liste' | 'mois';

export const ALL_EVENT_TYPES: EventType[] = [
  'portes_ouvertes',
  'reunion_information',
  'immersion',
  'inscription',
  'date_limite',
  'officiel',
];

interface State {
  filters: Filters;
  sort: Sort;
  selected: string | null;
  vue: Vue;
  colorBy: ColorBy;
  mobileTab: MobileTab;
  filtersOpen: boolean;
  calendarMode: CalendarMode;
  calendarMonth: string | null; // YYYY-MM
  eventTypes: EventType[];
  academies: Academie[];
  // conservés dans le navigateur
  favoris: string[];
  notes: Record<string, string>;
  adresse: Adresse | null;

  setFilters: (patch: Partial<Filters>) => void;
  resetFilters: () => void;
  setSort: (s: Sort) => void;
  select: (uai: string | null) => void;
  setVue: (v: Vue) => void;
  setColorBy: (c: ColorBy) => void;
  setMobileTab: (t: MobileTab) => void;
  setFiltersOpen: (o: boolean) => void;
  setCalendarMode: (m: CalendarMode) => void;
  setCalendarMonth: (m: string | null) => void;
  toggleEventType: (t: EventType) => void;
  toggleAcademie: (a: Academie) => void;
  toggleFavori: (uai: string) => void;
  setNote: (uai: string, text: string) => void;
  importer: (favoris: string[], notes: Record<string, string>) => void;
  setAdresse: (a: Adresse | null) => void;
}

/** localStorage peut être absent ou lever une exception (navigation privée, stockage bloqué). */
const safeStorage: StateStorage = {
  getItem: (k) => {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  setItem: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch {
      /* stockage indisponible : l'application reste utilisable */
    }
  },
  removeItem: (k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      /* idem */
    }
  },
};

const initial = parseUrlState(typeof window === 'undefined' ? '' : window.location.search);

export const useStore = create<State>()(
  persist(
    (set) => ({
      filters: initial.filters,
      sort: initial.sort,
      selected: initial.selected,
      vue: initial.vue,
      colorBy: initial.colorBy,
      mobileTab: initial.vue === 'calendrier' ? 'calendrier' : 'liste',
      filtersOpen: false,
      calendarMode: 'liste',
      calendarMonth: null,
      eventTypes: ALL_EVENT_TYPES,
      academies: ['Paris', 'Créteil'],
      favoris: [],
      notes: {},
      adresse: null,

      setFilters: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),
      resetFilters: () => set({ filters: DEFAULT_FILTERS }),
      setSort: (sort) => set({ sort }),
      select: (selected) => set({ selected }),
      setVue: (vue) => set({ vue }),
      setColorBy: (colorBy) => set({ colorBy }),
      setMobileTab: (mobileTab) =>
        set(mobileTab === 'calendrier' ? { mobileTab, vue: 'calendrier' } : mobileTab === 'carte' ? { mobileTab, vue: 'carte' } : { mobileTab }),
      setFiltersOpen: (filtersOpen) => set({ filtersOpen }),
      setCalendarMode: (calendarMode) => set({ calendarMode }),
      setCalendarMonth: (calendarMonth) => set({ calendarMonth }),
      toggleEventType: (t) =>
        set((s) => ({ eventTypes: s.eventTypes.includes(t) ? s.eventTypes.filter((x) => x !== t) : [...s.eventTypes, t] })),
      toggleAcademie: (a) =>
        set((s) => ({ academies: s.academies.includes(a) ? s.academies.filter((x) => x !== a) : [...s.academies, a] })),
      toggleFavori: (uai) =>
        set((s) => ({ favoris: s.favoris.includes(uai) ? s.favoris.filter((x) => x !== uai) : [...s.favoris, uai] })),
      setNote: (uai, text) => set((s) => ({ notes: { ...s.notes, [uai]: text } })),
      importer: (favoris, notes) => set({ favoris, notes }),
      setAdresse: (adresse) => set({ adresse }),
    }),
    {
      name: 'colleges:v1',
      storage: createJSONStorage(() => safeStorage),
      partialize: (s) => ({ favoris: s.favoris, notes: s.notes, adresse: s.adresse }),
    },
  ),
);

/** Reflète filtres, tri, sélection et vue dans l'URL (partageable), sans créer d'entrée d'historique. */
export function syncUrl(): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return useStore.subscribe((s) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const search = serializeUrlState({ filters: s.filters, sort: s.sort, selected: s.selected, vue: s.vue, colorBy: s.colorBy });
      if (search !== window.location.search) {
        window.history.replaceState(null, '', `${window.location.pathname}${search}${window.location.hash}`);
      }
    }, 200);
  });
}

export { DEFAULT_SORT };
