import type { ReactNode } from 'react';
import type { College, IndicateurKey } from '../../types';
import { useData } from '../../data';
import { INDICATEURS } from '../../lib/indicateurs';
import { formatIndicateur } from '../../lib/format';
import { InfoTip } from '../ui';

export function Section({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="border-t border-zinc-200 px-4 py-3">
      <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{title}</h3>
      {children}
    </section>
  );
}

/** Ligne « libellé : valeur » avec raison si absente et comparaison académie / France. */
export function IndicRow({ c, k, label, children }: { c: College; k: IndicateurKey; label?: string; children?: ReactNode }) {
  const { dataset } = useData();
  const v = c.indicateurs[k];
  const refAc = dataset.references.academies[c.academie]?.[k];
  const refFr = dataset.references.france[k];
  const refs = [
    refAc !== undefined ? `Académie ${formatIndicateur(k, refAc)}` : null,
    refFr !== undefined ? `France ${formatIndicateur(k, refFr)}` : null,
  ].filter(Boolean);
  return (
    <div className="py-1">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-zinc-700">
          {label ?? INDICATEURS[k].label}
          <InfoTip text={INDICATEURS[k].description} />
        </span>
        <span className="text-sm font-semibold tabular-nums">{formatIndicateur(k, v)}</span>
      </div>
      {v === null && c.manquants[k] && <div className="text-right text-[11px] text-zinc-500">{c.manquants[k]}</div>}
      {v !== null && refs.length > 0 && <div className="text-right text-[11px] tabular-nums text-zinc-500">{refs.join(' · ')}</div>}
      {children}
    </div>
  );
}

export function KV({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-0.5 text-sm">
      <span className="text-zinc-600">{label}</span>
      <span className="text-right font-medium">{children}</span>
    </div>
  );
}

export function TagList({ items, empty = '—' }: { items: string[]; empty?: string }) {
  if (!items.length) return <span className="text-zinc-400">{empty}</span>;
  return (
    <span className="flex flex-wrap justify-end gap-1">
      {items.map((i) => (
        <span key={i} className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-normal text-zinc-800">
          {i}
        </span>
      ))}
    </span>
  );
}
