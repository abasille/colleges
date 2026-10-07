import { useEffect, useId, useRef, useState } from 'react';
import { useStore } from '../store';
import type { Adresse } from '../lib/secteur';
import { useData } from '../data';
import { nomCourt } from '../lib/format';
import { cx } from './ui';

interface GeoFeature {
  geometry: { coordinates: [number, number] };
  properties: { label: string; citycode: string; street?: string; name?: string; housenumber?: string; type: string };
}

const ENDPOINT = 'https://data.geopf.fr/geocodage/search';

async function search(q: string, signal: AbortSignal): Promise<Adresse[]> {
  const url = `${ENDPOINT}?q=${encodeURIComponent(q)}&limit=6&autocomplete=1&lat=48.82&lon=2.37`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Géocodage : HTTP ${res.status}`);
  const data = (await res.json()) as { features: GeoFeature[] };
  return data.features.map((f) => ({
    label: f.properties.label,
    lon: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    citycode: f.properties.citycode,
    street: f.properties.street ?? (f.properties.type === 'street' ? f.properties.name ?? null : null),
    housenumber: f.properties.housenumber ?? null,
  }));
}

export function AddressSearch() {
  const adresse = useStore((s) => s.adresse);
  const setAdresse = useStore((s) => s.setAdresse);
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Adresse[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const listId = useId();
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (q.trim().length < 3) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      search(q, ctrl.signal)
        .then((r) => {
          setResults(r);
          setActive(-1);
          setError(null);
        })
        .catch((e: unknown) => {
          if (!ctrl.signal.aborted) setError(e instanceof Error ? e.message : 'Erreur de recherche');
        });
    }, 250);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const choose = (a: Adresse) => {
    setAdresse(a);
    setQ('');
    setResults([]);
    setOpen(false);
  };

  if (adresse) return <AdresseChoisie onClear={() => setAdresse(null)} label={adresse.label} />;

  return (
    <div ref={box} className="relative w-full max-w-md">
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActive((a) => Math.min(results.length - 1, a + 1));
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          } else if (e.key === 'Enter' && results.length) {
            e.preventDefault();
            choose(results[Math.max(0, active)]);
          } else if (e.key === 'Escape') setOpen(false);
        }}
        placeholder="🏠 Votre adresse (distance, collège de secteur)"
        aria-label="Votre adresse"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        className="w-full rounded-md border border-zinc-300 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
      {open && (results.length > 0 || error) && (
        <ul id={listId} role="listbox" className="absolute left-0 right-0 top-full z-[2000] mt-1 overflow-hidden rounded-md border border-zinc-200 bg-white text-sm shadow-lg">
          {error && <li className="px-3 py-2 text-red-700">{error}</li>}
          {results.map((r, i) => (
            <li
              key={`${r.label}-${i}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(r);
              }}
              onMouseEnter={() => setActive(i)}
              className={cx('cursor-pointer px-3 py-1.5', i === active && 'bg-blue-50')}
            >
              {r.label}
            </li>
          ))}
        </ul>
      )}
      <p className="sr-only">Adresse conservée uniquement dans ce navigateur.</p>
    </div>
  );
}

function AdresseChoisie({ label, onClear }: { label: string; onClear: () => void }) {
  const { secteur, byUai } = useData();
  const select = useStore((s) => s.select);
  const secteurs = secteur?.uais.map((u) => byUai.get(u)).filter((c) => c !== undefined) ?? [];
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
      <span className="min-w-0 truncate" title={label}>
        🏠 {label}
      </span>
      <button type="button" onClick={onClear} className="text-xs text-blue-700 hover:underline">
        changer
      </button>
      <span className="w-full truncate text-xs text-zinc-600 sm:w-auto">
        {secteurs.length > 0 ? (
          <>
            Collège de secteur :{' '}
            {secteurs.map((c, i) => (
              <span key={c.uai}>
                {i > 0 && ' ou '}
                <button type="button" className="font-medium text-green-700 hover:underline" onClick={() => select(c.uai)}>
                  {nomCourt(c.nom)}
                </button>
              </span>
            ))}
          </>
        ) : secteur?.noms.length ? (
          <>Collège de secteur : {secteur.noms.join(' ou ')} (hors zone)</>
        ) : (
          secteur?.message
        )}
      </span>
    </div>
  );
}
