import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { CollegeResume, IndicateurKey } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { countActive, DEFAULT_FILTERS, type Filters, type SortKey, type ValueKey } from '../lib/filters';
import { INDICATEURS, STATUT_COURT } from '../lib/indicateurs';
import { formatDistance, formatIndicateur, nomCourt } from '../lib/format';
import { libellePastille, lieuxChoisis, sansLieu, type Lieu } from '../lib/lieux';
import { FilterPanel } from './FilterPanel';
import { defilementPour, fenetre, positions } from '../lib/virtuel';
import { CollegeTags, StarButton, StatutBadge, cx } from './ui';
import { ScoreBadge } from './ScoreBadge';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'nom', label: 'Nom' },
  { key: 'distance', label: 'Distance' },
  ...(['note', 'brevet', 'brevetDernier', 'noteEcrit', 'vaTaux', 'vaNote', 'mentionsTB', 'accesSixiemeTroisieme', 'ips', 'effectif', 'elevesParClasse', 'eval6Francais', 'eval6Maths'] as IndicateurKey[]).map(
    (k) => ({ key: k, label: INDICATEURS[k].label }),
  ),
];

function defaultDir(key: SortKey): 'asc' | 'desc' {
  if (key === 'nom' || key === 'distance' || key === 'elevesParClasse') return 'asc';
  return 'desc';
}

interface Chip {
  id: string;
  label: string;
  patch: Partial<Filters>;
}

/** `lieux` : la sélection géographique connue des données (un code inconnu, ignoré au filtrage, n'a pas de pastille). */
function chips(f: Filters, labelOption: (t: string) => string, lieux: Lieu[]): Chip[] {
  const out: Chip[] = [];
  for (const s of f.statuts) out.push({ id: `st-${s}`, label: STATUT_COURT[s], patch: { statuts: f.statuts.filter((x) => x !== s) } });
  for (const l of lieux) out.push({ id: `${l.type === 'commune' ? 'com' : 'dep'}-${l.code}`, label: libellePastille(l), patch: sansLieu(f, l) });
  if (f.rep !== 'tous') out.push({ id: 'rep', label: f.rep === 'rep' ? 'REP' : 'Hors REP', patch: { rep: 'tous' } });
  if (!f.accueilSixieme) out.push({ id: 's6', label: 'Y compris sans entrée en 6e', patch: { accueilSixieme: true } });
  if (f.masquerRecrutementParticulier) out.push({ id: 'rp', label: 'Sans recrutement particulier', patch: { masquerRecrutementParticulier: false } });
  if (f.lyceeGeneral) out.push({ id: 'ly', label: 'Lycée sur place', patch: { lyceeGeneral: false } });
  if (f.passageGaranti) out.push({ id: 'pg', label: 'Passage garanti', patch: { passageGaranti: false } });
  if (f.favoris) out.push({ id: 'fav', label: '★ Favoris', patch: { favoris: false } });
  if (f.suivis) out.push({ id: 'sv', label: 'Collèges suivis', patch: { suivis: false } });
  for (const o of f.options) out.push({ id: `o-${o}`, label: labelOption(o), patch: { options: f.options.filter((x) => x !== o) } });
  for (const [k, r] of Object.entries(f.ranges) as [ValueKey, [number, number]][]) {
    const fmt = (v: number) => (k === 'distance' ? formatDistance(v) : formatIndicateur(k, v));
    const name = k === 'distance' ? 'Distance' : INDICATEURS[k].court;
    const ranges = { ...f.ranges };
    delete ranges[k];
    out.push({ id: `r-${k}`, label: `${name} ${fmt(r[0])} – ${fmt(r[1])}`, patch: { ranges } });
  }
  return out;
}

export function ListPanel({ onOpen }: { onOpen?: () => void }) {
  const { dataset, visibles, distances, secteur } = useData();
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const sort = useStore((s) => s.sort);
  const setSort = useStore((s) => s.setSort);
  const filtersOpen = useStore((s) => s.filtersOpen);
  const setFiltersOpen = useStore((s) => s.setFiltersOpen);
  const nActive = countActive(filters);
  const activeChips = chips(filters, (t) => dataset.optionLabels[t]?.label ?? t, lieuxChoisis(filters, dataset.communes));

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="space-y-2 border-b border-zinc-200 p-3">
        <div className="flex gap-2">
          <input
            type="search"
            value={filters.q}
            onChange={(e) => setFilters({ q: e.target.value })}
            placeholder="Rechercher un collège…"
            aria-label="Rechercher un collège"
            className="min-w-0 flex-1 rounded-md border border-zinc-300 px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
            className={cx(
              'flex items-center gap-1.5 rounded-md border px-2.5 text-sm font-medium',
              filtersOpen ? 'border-blue-600 bg-blue-600 text-white' : 'border-zinc-300 hover:bg-zinc-50',
            )}
          >
            Filtres
            {nActive > 0 && (
              <span className={cx('rounded-full px-1.5 text-[11px]', filtersOpen ? 'bg-white text-blue-700' : 'bg-blue-600 text-white')}>{nActive}</span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="tri" className="text-zinc-500">
            Trier
          </label>
          <select
            id="tri"
            value={sort.key}
            onChange={(e) => {
              const key = e.target.value as SortKey;
              setSort({ key, dir: defaultDir(key) });
            }}
            className="min-w-0 flex-1 rounded-md border border-zinc-300 bg-white px-1.5 py-1 text-sm"
          >
            {SORT_OPTIONS.filter((o) => o.key !== 'distance' || distances).map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSort({ ...sort, dir: sort.dir === 'asc' ? 'desc' : 'asc' })}
            className="rounded-md border border-zinc-300 px-2 py-1 hover:bg-zinc-50"
            title={sort.dir === 'asc' ? 'Croissant' : 'Décroissant'}
            aria-label={sort.dir === 'asc' ? 'Ordre croissant, inverser' : 'Ordre décroissant, inverser'}
          >
            {sort.dir === 'asc' ? '↑' : '↓'}
          </button>
        </div>
        {(activeChips.length > 0 || filters !== DEFAULT_FILTERS) && (
          <div className="flex flex-wrap items-center gap-1">
            {activeChips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilters(c.patch)}
                className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-800 hover:bg-blue-100"
                aria-label={`Retirer le filtre ${c.label}`}
              >
                {c.label} <span aria-hidden>×</span>
              </button>
            ))}
          </div>
        )}
        <div className="text-xs text-zinc-500">
          <strong className="text-zinc-800">{visibles.length}</strong> / {dataset.colleges.length} collèges
        </div>
      </div>
      {filtersOpen ? (
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          <FilterPanel />
        </div>
      ) : visibles.length === 0 ? (
        <p className="p-6 text-center text-sm text-zinc-500">Aucun collège ne correspond à ces filtres.</p>
      ) : (
        <ListeColleges visibles={visibles} sortKey={sort.key} distances={distances} secteur={secteur?.uais ?? null} onOpen={onOpen} />
      )}
    </div>
  );
}

const SHOWN: IndicateurKey[] = ['brevet', 'ips', 'vaTaux'];

/** Hauteur d'une ligne avant sa première mesure (ligne sans retour à la ligne). */
const HAUTEUR_ESTIMEE = 85.5;
/** Lignes rendues en plus au-dessus et au-dessous de la vue. */
const MARGE = 10;

/**
 * Liste virtualisée : seules les lignes visibles (plus une marge) sont dans le DOM. Chaque ligne est
 * mesurée à son premier affichage ; les lignes jamais affichées comptent pour HAUTEUR_ESTIMEE.
 */
function ListeColleges({
  visibles,
  sortKey,
  distances,
  secteur,
  onOpen,
}: {
  visibles: CollegeResume[];
  sortKey: SortKey;
  distances: Map<string, number> | null;
  secteur: string[] | null;
  onOpen?: () => void;
}) {
  const selected = useStore((s) => s.selected);
  const vueRef = useRef<HTMLDivElement>(null);
  const listeRef = useRef<HTMLUListElement>(null);
  const [defilement, setDefilement] = useState(0);
  const [hauteurVue, setHauteurVue] = useState(0);
  const hauteurs = useRef(new Map<string, number>());
  // Incrémenté quand `hauteurs` change, pour recalculer les positions.
  const [mesures, setMesures] = useState(0);
  /** Collège à amener à l'écran dès que la liste est affichée et mesurée. */
  const aMontrer = useRef<string | null>(null);
  const essais = useRef(0);

  const pos = useMemo(() => positions(visibles.map((c) => hauteurs.current.get(c.uai) ?? HAUTEUR_ESTIMEE)), [visibles, mesures]);
  const { debut, fin, avant, apres } = fenetre(pos, defilement, hauteurVue, MARGE);

  const montrer = (uai: string | null) => {
    aMontrer.current = uai;
    essais.current = 0;
  };

  // Avant l'effet de mesure ci-dessous, qui défile vers ce collège.
  useLayoutEffect(() => montrer(selected), [selected]);

  // Taille de la vue ; la liste masquée (onglet mobile) mesure 0 et revient au collège sélectionné en réapparaissant.
  useLayoutEffect(() => {
    const vue = vueRef.current;
    if (!vue) return;
    let largeur = vue.clientWidth;
    let hauteur = vue.clientHeight;
    setHauteurVue(hauteur);
    const ro = new ResizeObserver(() => {
      if (vue.clientWidth !== largeur) {
        largeur = vue.clientWidth;
        hauteurs.current.clear();
        setMesures((n) => n + 1);
      }
      if (hauteur === 0 && vue.clientHeight > 0) montrer(useStore.getState().selected);
      hauteur = vue.clientHeight;
      setHauteurVue(hauteur);
    });
    ro.observe(vue);
    return () => ro.disconnect();
  }, []);

  // Après chaque rendu : mesure des lignes affichées, puis défilement vers le collège sélectionné.
  useLayoutEffect(() => {
    const vue = vueRef.current;
    const liste = listeRef.current;
    if (!vue || !liste) return;
    let decalage = 0;
    let change = false;
    for (let i = 0; i < liste.children.length; i++) {
      const index = debut + i;
      const c = visibles[index];
      if (!c) continue;
      const h = liste.children[i].getBoundingClientRect().height;
      const prevue = pos[index + 1] - pos[index];
      if (Math.abs(h - prevue) < 0.5) continue;
      hauteurs.current.set(c.uai, h);
      change = true;
      // Ligne au-dessus de la vue qui change de taille : on compense pour que le contenu affiché ne saute pas.
      if (pos[index + 1] <= vue.scrollTop) decalage += h - prevue;
    }
    if (change) {
      if (decalage) vue.scrollTop += decalage;
      setMesures((n) => n + 1);
      return;
    }
    const uai = aMontrer.current;
    if (!uai || vue.clientHeight === 0) return;
    const index = visibles.findIndex((c) => c.uai === uai);
    if (index < 0 || essais.current++ > 20) {
      aMontrer.current = null;
      return;
    }
    const cible = defilementPour(pos, index, vue.scrollTop, vue.clientHeight);
    const affichee = index >= debut && index < fin;
    if (affichee) aMontrer.current = null;
    if (cible === null) return;
    if (affichee) {
      vue.scrollTo({ top: cible, behavior: 'smooth' });
    } else {
      // Ligne loin de la vue : saut direct, puis ajustement au rendu suivant, une fois les lignes voisines mesurées.
      vue.scrollTop = cible;
      setDefilement(vue.scrollTop);
    }
  });

  return (
    <div
      ref={vueRef}
      onScroll={(e) => {
        const haut = e.currentTarget.scrollTop;
        const f = fenetre(pos, haut, hauteurVue, MARGE);
        // Nouvelles lignes à afficher : rendu immédiat, avant que le navigateur ne peigne une zone vide.
        if (f.debut !== debut || f.fin !== fin) flushSync(() => setDefilement(haut));
        else setDefilement(haut);
      }}
      className="scroll-thin min-h-0 flex-1 overflow-y-auto [overflow-anchor:none]"
    >
      <ul ref={listeRef} style={{ paddingTop: avant, paddingBottom: apres }}>
        {visibles.slice(debut, fin).map((c, i) => (
          <CollegeCard
            key={c.uai}
            c={c}
            position={debut + i + 1}
            total={visibles.length}
            selected={c.uai === selected}
            sortKey={sortKey}
            distance={distances?.get(c.uai) ?? null}
            secteur={!!secteur?.includes(c.uai)}
            onOpen={onOpen}
          />
        ))}
      </ul>
    </div>
  );
}

const CollegeCard = memo(function CollegeCard({
  c,
  position,
  total,
  selected,
  sortKey,
  distance,
  secteur,
  onOpen,
}: {
  c: CollegeResume;
  position: number;
  total: number;
  selected: boolean;
  sortKey: SortKey;
  distance: number | null;
  secteur: boolean;
  onOpen?: () => void;
}) {
  const select = useStore((s) => s.select);
  const extra = sortKey !== 'nom' && sortKey !== 'distance' && sortKey !== 'note' && !SHOWN.includes(sortKey) ? sortKey : null;
  return (
    <li aria-posinset={position} aria-setsize={total}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          select(c.uai);
          onOpen?.();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            select(c.uai);
            onOpen?.();
          }
        }}
        aria-current={selected}
        className={cx(
          'flex cursor-pointer gap-2 border-b border-zinc-100 px-3 py-2.5 outline-none hover:bg-zinc-50 focus-visible:bg-blue-50',
          selected && 'bg-blue-50 shadow-[inset_3px_0_0_#2563eb] hover:bg-blue-50',
        )}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="min-w-0 flex-1 truncate text-sm font-semibold" title={c.nom}>
              {nomCourt(c.nom)}
            </h3>
            {distance !== null && <span className="shrink-0 text-xs tabular-nums text-zinc-500">{formatDistance(distance)}</span>}
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1">
            <StatutBadge statut={c.statut} />
            <span className="text-xs text-zinc-500">{c.communeLibelle}</span>
            <CollegeTags c={c} secteur={secteur} />
          </div>
          <dl className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
            {[...SHOWN, ...(extra ? [extra] : [])].map((k) => (
              <div key={k} className={cx('flex gap-1', k === sortKey && 'font-semibold text-blue-800')}>
                <dt className="text-zinc-500">{INDICATEURS[k].court}</dt>
                <dd className="tabular-nums" title={c.indicateurs[k] === null ? 'Non disponible : la raison figure dans la fiche' : undefined}>
                  {formatIndicateur(k, c.indicateurs[k])}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col items-center gap-1">
          <StarButton uai={c.uai} />
          <ScoreBadge score={c.score} small />
        </div>
      </div>
    </li>
  );
});
