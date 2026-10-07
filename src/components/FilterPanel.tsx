import { useMemo, type ReactNode } from 'react';
import type { Statut, ZoneCode } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { domainOf, type Filters, type ValueKey } from '../lib/filters';
import { INDICATEURS, INDICATEURS_FILTRABLES, STATUT_LABELS } from '../lib/indicateurs';
import { formatDistance, formatIndicateur } from '../lib/format';
import { DualRange } from './DualRange';

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-zinc-200 pt-3">
      <legend className="mb-1.5 pr-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function Check({ checked, onChange, children, count }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode; count?: number }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-blue-600" />
      <span className="flex-1">{children}</span>
      {count !== undefined && <span className="text-xs tabular-nums text-zinc-400">{count}</span>}
    </label>
  );
}

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function stepFor(key: ValueKey, domain: [number, number]): number {
  if (key === 'distance') return 0.1;
  const span = domain[1] - domain[0];
  const d = INDICATEURS[key].decimales;
  if (d === 0 || span > 50) return 1;
  return span > 10 ? 0.5 : 0.1;
}

export function FilterPanel() {
  const { dataset, distances } = useData();
  const filters = useStore((s) => s.filters);
  const setFilters = useStore((s) => s.setFilters);
  const resetFilters = useStore((s) => s.resetFilters);
  const colleges = dataset.colleges;

  const optionGroups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const c of colleges) for (const t of c.optionTags) counts.set(t, (counts.get(t) ?? 0) + 1);
    const groups = new Map<string, { tag: string; label: string; count: number }[]>();
    for (const [tag, count] of counts) {
      const meta = dataset.optionLabels[tag] ?? { label: tag, groupe: 'Autres' };
      const g = groups.get(meta.groupe) ?? [];
      g.push({ tag, label: meta.label, count });
      groups.set(meta.groupe, g);
    }
    for (const g of groups.values()) g.sort((a, b) => a.label.localeCompare(b.label, 'fr'));
    return [...groups.entries()];
  }, [colleges, dataset.optionLabels]);

  const rangeKeys: ValueKey[] = distances ? ['distance', ...INDICATEURS_FILTRABLES] : INDICATEURS_FILTRABLES;

  const setRange = (key: ValueKey, v: [number, number] | null) => {
    const ranges: Filters['ranges'] = { ...filters.ranges };
    if (v) ranges[key] = v;
    else delete ranges[key];
    setFilters({ ranges });
  };

  return (
    <div className="space-y-3 px-3 pb-3 pt-1">
      <Group title="Établissement">
        {(Object.keys(STATUT_LABELS) as Statut[]).map((s) => (
          <Check
            key={s}
            checked={filters.statuts.includes(s)}
            onChange={() => setFilters({ statuts: toggle(filters.statuts, s) })}
            count={colleges.filter((c) => c.statut === s).length}
          >
            {STATUT_LABELS[s]}
          </Check>
        ))}
        <div className="flex gap-3 pt-1 text-sm">
          {(['tous', 'rep', 'hors_rep'] as const).map((v) => (
            <label key={v} className="flex cursor-pointer items-center gap-1.5">
              <input type="radio" name="rep" checked={filters.rep === v} onChange={() => setFilters({ rep: v })} className="accent-blue-600" />
              {v === 'tous' ? 'Tous' : v === 'rep' ? 'REP' : 'Hors REP'}
            </label>
          ))}
        </div>
        <Check checked={filters.accueilSixieme} onChange={(v) => setFilters({ accueilSixieme: v })}>
          Accueille en 6e
        </Check>
        <Check checked={filters.masquerRecrutementParticulier} onChange={(v) => setFilters({ masquerRecrutementParticulier: v })}>
          Masquer les recrutements particuliers
        </Check>
        <Check checked={filters.favoris} onChange={(v) => setFilters({ favoris: v })}>
          Favoris seulement ★
        </Check>
      </Group>

      <Group title="Zone">
        <div className="grid grid-cols-2 gap-x-2">
          {dataset.zones.map((z) => (
            <Check
              key={z.code}
              checked={filters.zones.includes(z.code)}
              onChange={() => setFilters({ zones: toggle<ZoneCode>(filters.zones, z.code) })}
              count={colleges.filter((c) => c.zone === z.code).length}
            >
              {z.libelle}
            </Check>
          ))}
        </div>
      </Group>

      <Group title="Continuité jusqu’au bac">
        <Check checked={filters.lyceeGeneral} onChange={(v) => setFilters({ lyceeGeneral: v })}>
          Lycée général dans le même établissement
        </Check>
        <Check checked={filters.passageGaranti} onChange={(v) => setFilters({ passageGaranti: v })}>
          Passage au lycée garanti par écrit
        </Check>
      </Group>

      {optionGroups.map(([groupe, items]) => (
        <Group key={groupe} title={groupe}>
          {items.map((o) => (
            <Check
              key={o.tag}
              checked={filters.options.includes(o.tag)}
              onChange={() => setFilters({ options: toggle(filters.options, o.tag) })}
              count={o.count}
            >
              {o.label}
            </Check>
          ))}
        </Group>
      ))}

      <Group title="Indicateurs">
        <Check checked={filters.inclureSansDonnee} onChange={(v) => setFilters({ inclureSansDonnee: v })}>
          Inclure les collèges sans donnée
        </Check>
        <div className="space-y-3 pt-2">
          {rangeKeys.map((key) => {
            const domain = domainOf(colleges, key, { distances });
            if (!domain || domain[0] === domain[1]) return null;
            const lo = Math.floor(domain[0]);
            const hi = Math.ceil(domain[1]);
            const current = filters.ranges[key] ?? [lo, hi];
            const label = key === 'distance' ? 'Distance de votre adresse' : INDICATEURS[key].label;
            const fmt = (v: number) => (key === 'distance' ? formatDistance(v) : formatIndicateur(key, v));
            return (
              <div key={key}>
                <div className="mb-1 flex items-baseline justify-between gap-2 text-xs">
                  <span className="font-medium text-zinc-700">{label}</span>
                  {filters.ranges[key] && (
                    <button type="button" className="text-blue-700 hover:underline" onClick={() => setRange(key, null)}>
                      effacer
                    </button>
                  )}
                </div>
                <DualRange
                  label={label}
                  min={lo}
                  max={hi}
                  step={stepFor(key, domain)}
                  value={current}
                  format={fmt}
                  onChange={(v) => setRange(key, v[0] <= lo && v[1] >= hi ? null : v)}
                />
              </div>
            );
          })}
        </div>
      </Group>

      <button type="button" onClick={resetFilters} className="w-full rounded-md border border-zinc-300 py-1.5 text-sm hover:bg-zinc-50">
        Réinitialiser les filtres
      </button>
    </div>
  );
}
