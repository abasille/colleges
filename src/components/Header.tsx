import { useEffect, useState } from 'react';
import { useData } from '../data';
import { useStore } from '../store';
import { decodeShare, encodeShare, mergeShare, type SharePayload } from '../lib/share';
import { isUrgent, upcomingForFavoris } from '../lib/events';
import { EVENT_COLORS } from '../lib/colors';
import { EVENT_LABELS } from '../lib/indicateurs';
import { formatHeures, formatPeriode, nomCourt, todayISO } from '../lib/format';
import { AddressSearch } from './AddressSearch';
import { About } from './About';
import { Modal, cx } from './ui';

export function Header() {
  const [about, setAbout] = useState(false);
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-3 py-2">
        <h1 className="text-sm font-semibold tracking-tight md:text-base">
          Collèges <span className="font-normal text-zinc-500">Paris 5·6·13·14 · Ivry · Vitry</span>
        </h1>
        <div className="order-3 flex w-full min-w-0 md:order-none md:w-auto md:flex-1">
          <AddressSearch />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ShareButton />
          <button type="button" onClick={() => setAbout(true)} className="rounded-md border border-zinc-300 px-2.5 py-1 text-sm hover:bg-zinc-50">
            À propos
          </button>
        </div>
      </div>
      <UpcomingBanner />
      <ImportBanner />
      <Modal open={about} onClose={() => setAbout(false)} title="À propos, méthode et sources">
        <About />
      </Modal>
    </header>
  );
}

function UpcomingBanner() {
  const { events, byUai } = useData();
  const favoris = useStore((s) => s.favoris);
  const select = useStore((s) => s.select);
  const today = todayISO();
  const next = upcomingForFavoris(events.events, events.saisonCourante, new Set(favoris), today);
  if (favoris.length === 0) {
    return (
      <div className="hidden border-t border-zinc-100 bg-zinc-50 px-3 py-1 text-xs text-zinc-500 md:block">
        Ajoutez des collèges en favoris ☆ pour suivre ici leurs prochaines portes ouvertes et dates d’inscription.
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-zinc-100 bg-amber-50/60 px-3 py-1 text-xs">
      <span className="font-semibold text-amber-900">À venir pour vos favoris</span>
      {next.length === 0 && <span className="text-zinc-600">aucune date annoncée pour l’instant.</span>}
      {next.map((e) => {
        const urgent = isUrgent(e, today);
        return (
          <button
            key={e.id}
            type="button"
            onClick={() => e.uai && select(e.uai)}
            className={cx('flex items-center gap-1.5 rounded px-1 hover:bg-white', urgent && 'font-semibold text-red-700')}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: urgent ? '#dc2626' : EVENT_COLORS[e.type] }} />
            {formatPeriode(e.date, e.dateFin)}
            {e.heureDebut && ` ${formatHeures(e.heureDebut, e.heureFin)}`} · {EVENT_LABELS[e.type]} · {e.uai ? nomCourt(byUai.get(e.uai)?.nom ?? e.uai) : ''}
          </button>
        );
      })}
    </div>
  );
}

function ShareButton() {
  const favoris = useStore((s) => s.favoris);
  const notes = useStore((s) => s.notes);
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#partage=${encodeShare({ favoris, notes })}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Copiez ce lien :', url);
    }
  };
  return (
    <button
      type="button"
      onClick={share}
      disabled={favoris.length === 0}
      title="Copier un lien qui importe vos favoris et vos notes sur un autre appareil"
      className="rounded-md border border-zinc-300 px-2.5 py-1 text-sm hover:bg-zinc-50 disabled:opacity-40"
    >
      {copied ? (
        'Lien copié ✓'
      ) : (
        <>
          Partager<span className="hidden sm:inline"> mes favoris</span> ({favoris.length})
        </>
      )}
    </button>
  );
}

/** Proposé à l'ouverture d'un lien de partage (#partage=…). */
function ImportBanner() {
  const favoris = useStore((s) => s.favoris);
  const notes = useStore((s) => s.notes);
  const importer = useStore((s) => s.importer);
  const [incoming, setIncoming] = useState<SharePayload | null>(null);
  useEffect(() => {
    const m = window.location.hash.match(/^#partage=([\w-]+)/);
    if (m) setIncoming(decodeShare(m[1]));
  }, []);
  const clearHash = () => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setIncoming(null);
  };
  if (!incoming) return null;
  const nNotes = Object.keys(incoming.notes).length;
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900">
      <span>
        Ce lien contient {incoming.favoris.length} favori{incoming.favoris.length > 1 ? 's' : ''} et {nNotes} note{nNotes > 1 ? 's' : ''}.
      </span>
      <button
        type="button"
        className="rounded bg-blue-600 px-2 py-0.5 text-white hover:bg-blue-700"
        onClick={() => {
          const m = mergeShare({ favoris, notes }, incoming);
          importer(m.favoris, m.notes);
          clearHash();
        }}
      >
        Importer (fusionner)
      </button>
      <button type="button" className="text-blue-800 hover:underline" onClick={clearHash}>
        Ignorer
      </button>
    </div>
  );
}
