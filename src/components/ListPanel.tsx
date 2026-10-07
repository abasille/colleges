import { useEffect, useRef } from 'react';
import type { College, IndicateurKey } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { countActive, DEFAULT_FILTERS, type Filters, type SortKey, type ValueKey } from '../lib/filters';
import { INDICATEURS, STATUT_COURT } from '../lib/indicateurs';
import { formatDistance, formatIndicateur, nomCourt } from '../lib/format';
import { FilterPanel } from './FilterPanel';
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

function chips(f: Filters, labelOption: (t: string) => string, zoneLabel: (z: string) => string): Chip[] {
  const out: Chip[] = [];
  for (const s of f.statuts) out.push({ id: `st-${s}`, label: STATUT_COURT[s], patch: { statuts: f.statuts.filter((x) => x !== s) } });
  for (const z of f.zones) out.push({ id: `z-${z}`, label: zoneLabel(z), patch: { zones: f.zones.filter((x) => x !== z) } });
  if (f.rep !== 'tous') out.push({ id: 'rep', label: f.rep === 'rep' ? 'REP' : 'Hors REP', patch: { rep: 'tous' } });
  if (!f.accueilSixieme) out.push({ id: 's6', label: 'Y compris sans entrée en 6e', patch: { accueilSixieme: true } });
  if (f.masquerRecrutementParticulier) out.push({ id: 'rp', label: 'Sans recrutement particulier', patch: { masquerRecrutementParticulier: false } });
  if (f.lyceeGeneral) out.push({ id: 'ly', label: 'Lycée sur place', patch: { lyceeGeneral: false } });
  if (f.passageGaranti) out.push({ id: 'pg', label: 'Passage garanti', patch: { passageGaranti: false } });
  if (f.favoris) out.push({ id: 'fav', label: '★ Favoris', patch: { favoris: false } });
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
  const zoneLabel = (z: string) => dataset.zones.find((x) => x.code === z)?.libelle ?? z;
  const activeChips = chips(filters, (t) => dataset.optionLabels[t]?.label ?? t, zoneLabel);

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
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        {filtersOpen ? (
          <FilterPanel />
        ) : visibles.length === 0 ? (
          <p className="p-6 text-center text-sm text-zinc-500">Aucun collège ne correspond à ces filtres.</p>
        ) : (
          <ul>
            {visibles.map((c) => (
              <CollegeCard key={c.uai} c={c} sortKey={sort.key} distance={distances?.get(c.uai) ?? null} secteur={!!secteur?.uais.includes(c.uai)} onOpen={onOpen} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const SHOWN: IndicateurKey[] = ['brevet', 'ips', 'vaTaux'];

function CollegeCard({ c, sortKey, distance, secteur, onOpen }: { c: College; sortKey: SortKey; distance: number | null; secteur: boolean; onOpen?: () => void }) {
  const selected = useStore((s) => s.selected === c.uai);
  const select = useStore((s) => s.select);
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selected]);
  const extra = sortKey !== 'nom' && sortKey !== 'distance' && sortKey !== 'note' && !SHOWN.includes(sortKey) ? sortKey : null;
  return (
    <li ref={ref}>
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
            <span className="text-xs text-zinc-500">{c.zoneLibelle}</span>
            <CollegeTags c={c} secteur={secteur} />
          </div>
          <dl className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
            {[...SHOWN, ...(extra ? [extra] : [])].map((k) => (
              <div key={k} className={cx('flex gap-1', k === sortKey && 'font-semibold text-blue-800')}>
                <dt className="text-zinc-500">{INDICATEURS[k].court}</dt>
                <dd className="tabular-nums" title={c.indicateurs[k] === null ? c.manquants[k] : undefined}>
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
}
