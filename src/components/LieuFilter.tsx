import { useId, useMemo, useRef, useState } from 'react';
import { useData } from '../data';
import { useStore } from '../store';
import { avecLieu, libellePastille, lieuxChoisis, rechercherLieux, sansLieu, type Lieu } from '../lib/lieux';
import { DEPARTEMENTS } from '../lib/territoires';
import { cx } from './ui';

const cle = (l: Lieu) => `${l.type}-${l.code}`;

/** Filtre « commune ou département » : autocomplétion, choix multiples en pastilles retirables. */
export function LieuFilter() {
  const { dataset } = useData();
  const communes = useStore((s) => s.filters.communes);
  const departements = useStore((s) => s.filters.departements);
  const setFilters = useStore((s) => s.setFilters);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);

  const effectifs = useMemo(() => {
    const n = new Map<string, number>();
    const compter = (k: string) => n.set(k, (n.get(k) ?? 0) + 1);
    for (const c of dataset.colleges) {
      compter(`commune-${c.commune}`);
      compter(`departement-${c.departement}`);
    }
    return n;
  }, [dataset.colleges]);

  const choix = { communes, departements };
  const choisis = lieuxChoisis(choix, dataset.communes);
  const suggestions = useMemo(() => rechercherLieux(q, dataset.communes, { communes, departements }), [q, dataset.communes, communes, departements]);

  const choisir = (l: Lieu) => {
    setFilters(avecLieu(choix, l));
    setQ('');
    setActive(0);
    input.current?.focus();
  };

  return (
    <div className="space-y-1.5">
      {choisis.length > 0 && (
        <ul className="flex flex-wrap gap-1" aria-label="Communes et départements choisis">
          {choisis.map((l) => (
            <li key={cle(l)}>
              <button
                type="button"
                onClick={() => setFilters(sansLieu(choix, l))}
                className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-800 hover:bg-blue-100"
                aria-label={`Retirer ${libellePastille(l)}`}
              >
                {libellePastille(l)} <span aria-hidden>×</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        ref={input}
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setActive(0);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(suggestions.length - 1, a + 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          } else if (e.key === 'Enter' && suggestions.length) {
            e.preventDefault();
            choisir(suggestions[Math.min(active, suggestions.length - 1)]);
          } else if (e.key === 'Escape') setQ('');
          else if (e.key === 'Backspace' && !q && choisis.length) setFilters(sansLieu(choix, choisis[choisis.length - 1]));
        }}
        placeholder={choisis.length ? 'Ajouter une commune ou un département…' : 'Toute l’Île-de-France ; ex. Paris 13e, Val-de-Marne'}
        aria-label="Commune ou département"
        role="combobox"
        aria-expanded={suggestions.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={suggestions.length ? `${listId}-${active}` : undefined}
        className="w-full rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      {q.trim() && suggestions.length === 0 && <p className="px-1 text-xs text-zinc-500">Aucune commune ni département du périmètre ne correspond.</p>}
      {suggestions.length > 0 && (
        <ul id={listId} role="listbox" className="overflow-hidden rounded-md border border-zinc-200 bg-white text-sm">
          {suggestions.map((l, i) => (
            <li
              key={cle(l)}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choisir(l);
              }}
              onMouseEnter={() => setActive(i)}
              className={cx('flex cursor-pointer items-baseline gap-2 px-2.5 py-1.5', i === active && 'bg-blue-50')}
            >
              <span className="min-w-0 flex-1 truncate">{l.libelle}</span>
              <span className="shrink-0 text-xs text-zinc-500">
                {l.type === 'departement' ? `département ${l.code}` : DEPARTEMENTS[l.departement]}
              </span>
              <span className="w-8 shrink-0 text-right text-xs tabular-nums text-zinc-400">{effectifs.get(cle(l)) ?? 0}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
