import { useEffect, useSyncExternalStore } from 'react';
import { DataProvider } from './data';
import { syncUrl, useStore, type MobileTab } from './store';
import { Header } from './components/Header';
import { ListPanel } from './components/ListPanel';
import { MapView } from './components/MapView';
import { CalendarView } from './components/CalendarView';
import { CollegeDetail } from './components/CollegeDetail';
import { cx } from './components/ui';

const DESKTOP = '(min-width: 768px)';

function useIsDesktop(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(DESKTOP).matches,
  );
}

export default function App() {
  useEffect(() => syncUrl(), []);
  return (
    <DataProvider>
      <Layout />
    </DataProvider>
  );
}

function Layout() {
  const desktop = useIsDesktop();
  const selected = useStore((s) => s.selected);
  const select = useStore((s) => s.select);
  const close = () => select(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !document.querySelector('dialog[open]')) select(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [select]);

  return (
    <div className="flex h-full flex-col">
      <Header />
      {desktop ? (
        <div className="flex min-h-0 flex-1">
          <aside className="w-[360px] shrink-0 border-r border-zinc-200" aria-label="Liste des collèges">
            <ListPanel />
          </aside>
          <main className="flex min-w-0 flex-1 flex-col">
            <CenterToggle />
            <CenterContent />
          </main>
          {selected && (
            <aside className="w-[400px] shrink-0 border-l border-zinc-200" aria-label="Fiche du collège">
              <CollegeDetail onClose={close} />
            </aside>
          )}
        </div>
      ) : (
        <MobileLayout onClose={close} />
      )}
    </div>
  );
}

function CenterToggle() {
  const vue = useStore((s) => s.vue);
  const setVue = useStore((s) => s.setVue);
  return (
    <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-3 py-1.5">
      <div className="flex overflow-hidden rounded-md border border-zinc-300 text-sm" role="tablist" aria-label="Vue centrale">
        {(['carte', 'calendrier'] as const).map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={vue === v}
            onClick={() => setVue(v)}
            className={cx('px-3 py-1', vue === v ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-50')}
          >
            {v === 'carte' ? 'Carte' : 'Calendrier'}
          </button>
        ))}
      </div>
    </div>
  );
}

/** La carte reste montée quand on affiche le calendrier pour conserver le zoom et la position. */
function CenterContent() {
  const vue = useStore((s) => s.vue);
  return (
    <div className="relative min-h-0 flex-1">
      <div className={cx('absolute inset-0', vue !== 'carte' && 'invisible')}>
        <MapView />
      </div>
      {vue === 'calendrier' && (
        <div className="absolute inset-0">
          <CalendarView />
        </div>
      )}
    </div>
  );
}

const TABS: { key: MobileTab; label: string }[] = [
  { key: 'liste', label: 'Liste' },
  { key: 'carte', label: 'Carte' },
  { key: 'calendrier', label: 'Calendrier' },
];

function MobileLayout({ onClose }: { onClose: () => void }) {
  const tab = useStore((s) => s.mobileTab);
  const setTab = useStore((s) => s.setMobileTab);
  const selected = useStore((s) => s.selected);
  return (
    <>
      <div className="relative min-h-0 flex-1">
        <div className={cx('absolute inset-0', tab !== 'liste' && 'hidden')}>
          <ListPanel />
        </div>
        <div className={cx('absolute inset-0', tab !== 'carte' && 'invisible')}>
          <MapView />
        </div>
        {tab === 'calendrier' && (
          <div className="absolute inset-0">
            <CalendarView />
          </div>
        )}
        {selected && (
          <div className="absolute inset-x-0 bottom-0 z-[1500] h-[75%] overflow-hidden rounded-t-2xl border-t border-zinc-200 shadow-[0_-8px_24px_rgb(0_0_0/0.15)]">
            <div className="flex justify-center bg-white pt-1.5">
              <span className="h-1 w-10 rounded-full bg-zinc-300" aria-hidden />
            </div>
            <div className="h-[calc(100%-10px)]">
              <CollegeDetail onClose={onClose} />
            </div>
          </div>
        )}
      </div>
      <nav className="grid grid-cols-3 border-t border-zinc-200 bg-white" role="tablist" aria-label="Navigation">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cx('py-2.5 text-sm font-medium', tab === t.key ? 'text-blue-700 shadow-[inset_0_2px_0_#2563eb]' : 'text-zinc-500')}
          >
            {t.label}
          </button>
        ))}
      </nav>
    </>
  );
}
