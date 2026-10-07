import { useMemo } from 'react';
import type { Academie, CollegeEvent, EventType } from '../types';
import { useData } from '../data';
import { ALL_EVENT_TYPES, useStore } from '../store';
import { calendarEvents, isPast, isUrgent } from '../lib/events';
import { EVENT_COLORS } from '../lib/colors';
import { EVENT_LABELS } from '../lib/indicateurs';
import { formatDate, formatHeures, formatMois, formatPeriode, parseISODate, toISODate, todayISO } from '../lib/format';
import { buildIcs, downloadIcs } from '../lib/ics';
import { nomCourt } from '../lib/format';
import { cx, ExternalLink } from './ui';

const ACADEMIES: Academie[] = ['Paris', 'Créteil'];

export function CalendarView({ onOpen }: { onOpen?: () => void }) {
  const { events, visiblesSet, byUai } = useData();
  const mode = useStore((s) => s.calendarMode);
  const setMode = useStore((s) => s.setCalendarMode);
  const types = useStore((s) => s.eventTypes);
  const toggleType = useStore((s) => s.toggleEventType);
  const academies = useStore((s) => s.academies);
  const toggleAcademie = useStore((s) => s.toggleAcademie);
  const select = useStore((s) => s.select);
  const today = todayISO();

  const shown = useMemo(
    () =>
      calendarEvents(events.events, {
        saison: events.saisonCourante,
        types: new Set(types),
        academies: new Set(academies),
        colleges: visiblesSet,
      }),
    [events, types, academies, visiblesSet],
  );

  const nomDe = (uai: string) => byUai.get(uai)?.nom ?? uai;
  const open = (e: CollegeEvent) => {
    if (!e.uai) return;
    select(e.uai);
    onOpen?.();
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="space-y-2 border-b border-zinc-200 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="mr-auto text-sm font-semibold">
            Calendrier {events.saisonCourante} <span className="font-normal text-zinc-500">· entrée en 6e en septembre 20{events.saisonCourante.slice(-2)}</span>
          </h2>
          <div className="flex overflow-hidden rounded-md border border-zinc-300 text-sm" role="group" aria-label="Affichage">
            {(['liste', 'mois'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={cx('px-2.5 py-1', mode === m ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-50')}
              >
                {m === 'liste' ? 'Liste' : 'Mois'}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={shown.length === 0}
            onClick={() => downloadIcs(buildIcs(shown, nomDe), `colleges-${events.saisonCourante}.ics`)}
            className="rounded-md border border-zinc-300 px-2.5 py-1 text-sm hover:bg-zinc-50 disabled:opacity-40"
            title="Exporter les événements affichés vers votre agenda"
          >
            Exporter .ics
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_EVENT_TYPES.filter((t) => t !== 'officiel').map((t) => (
            <TypeToggle key={t} type={t} on={types.includes(t)} onClick={() => toggleType(t)} />
          ))}
          {ACADEMIES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => toggleAcademie(a)}
              aria-pressed={academies.includes(a) && types.includes('officiel')}
              className={cx(
                'rounded-full border px-2 py-0.5 text-xs',
                academies.includes(a) && types.includes('officiel') ? 'border-slate-600 bg-slate-600 text-white' : 'border-zinc-300 text-zinc-500',
              )}
              title={`Dates officielles de l’académie de ${a}`}
            >
              Académie de {a}
            </button>
          ))}
        </div>
        <p className="text-xs text-zinc-500">
          {shown.length} événement{shown.length > 1 ? 's' : ''} pour les collèges filtrés · les filtres de la liste s’appliquent (ex. ★ favoris seulement).
        </p>
      </div>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        {shown.length === 0 ? (
          <p className="p-6 text-center text-sm text-zinc-500">
            Aucune date annoncée pour l’instant avec ces filtres. Les dates des années précédentes sont indiquées dans la fiche de chaque collège.
          </p>
        ) : mode === 'liste' ? (
          <AgendaList events={shown} today={today} nomDe={nomDe} onClick={open} />
        ) : (
          <MonthGrid events={shown} today={today} nomDe={nomDe} onClick={open} />
        )}
      </div>
    </div>
  );
}

function TypeToggle({ type, on, onClick }: { type: EventType; on: boolean; onClick: () => void }) {
  const color = EVENT_COLORS[type];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs"
      style={on ? { borderColor: color, background: `${color}14`, color } : { borderColor: '#d4d4d8', color: '#a1a1aa' }}
    >
      <span className="h-2 w-2 rounded-full" style={{ background: on ? color : '#d4d4d8' }} />
      {EVENT_LABELS[type]}
    </button>
  );
}

interface ListProps {
  events: CollegeEvent[];
  today: string;
  nomDe: (uai: string) => string;
  onClick: (e: CollegeEvent) => void;
}

function AgendaList({ events, today, nomDe, onClick }: ListProps) {
  const groups = new Map<string, CollegeEvent[]>();
  for (const e of events) {
    const k = e.date.slice(0, 7);
    groups.set(k, [...(groups.get(k) ?? []), e]);
  }
  return (
    <div>
      {[...groups.entries()].map(([ym, evs]) => {
        const [y, m] = ym.split('-').map(Number);
        return (
          <section key={ym}>
            <h3 className="sticky top-0 z-10 border-b border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {formatMois(y, m - 1)}
            </h3>
            <ul>
              {evs.map((e) => (
                <EventRow key={e.id} e={e} today={today} nomDe={nomDe} onClick={onClick} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function EventRow({ e, today, nomDe, onClick }: { e: CollegeEvent; today: string; nomDe: (uai: string) => string; onClick: (e: CollegeEvent) => void }) {
  const past = isPast(e, today);
  const urgent = isUrgent(e, today);
  const color = EVENT_COLORS[e.type];
  return (
    <li className={cx('flex gap-3 border-b border-zinc-100 px-3 py-2', past && 'opacity-50')}>
      <div className="w-24 shrink-0 text-xs tabular-nums">
        <div className="font-semibold">{formatPeriode(e.date, e.dateFin).replace(/^du /, '')}</div>
        {e.heureDebut && <div className="text-zinc-500">{formatHeures(e.heureDebut, e.heureFin)}</div>}
      </div>
      <div className="min-w-0 flex-1 text-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded px-1.5 py-0.5 text-[11px] font-medium" style={{ background: `${color}1a`, color }}>
            {EVENT_LABELS[e.type]}
          </span>
          {urgent && <span className="rounded bg-red-600 px-1.5 py-0.5 text-[11px] font-semibold text-white">Échéance proche</span>}
          {e.confiance !== 'haute' && <span className="text-[11px] text-zinc-500">à confirmer</span>}
        </div>
        <div className="mt-0.5">
          {e.titre}
          {e.inscriptionRequise && <span className="text-xs text-zinc-500"> · sur inscription</span>}
        </div>
        <div className="text-xs">
          {e.uai ? (
            <button type="button" className="font-medium text-blue-700 hover:underline" onClick={() => onClick(e)}>
              {nomCourt(nomDe(e.uai))}
            </button>
          ) : (
            <span className="font-medium text-slate-700">Académie de {e.academie}</span>
          )}{' '}
          · <ExternalLink href={e.source}>source</ExternalLink>
        </div>
      </div>
    </li>
  );
}

const JOURS = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'];

function MonthGrid({ events, today, nomDe, onClick }: ListProps) {
  const month = useStore((s) => s.calendarMonth);
  const setMonth = useStore((s) => s.setCalendarMonth);
  // Mois par défaut : celui du prochain événement, sinon le mois courant.
  const current = month ?? (events.find((e) => e.date >= today) ?? events[events.length - 1])?.date.slice(0, 7) ?? today.slice(0, 7);
  const [y, m] = current.split('-').map(Number);
  const first = new Date(y, m - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(y, m, 0).getDate();
  const cells: (string | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => toISODate(new Date(y, m - 1, i + 1)))];
  while (cells.length % 7) cells.push(null);
  const shift = (d: number) => setMonth(toISODate(new Date(y, m - 1 + d, 1)).slice(0, 7));
  const onDay = (iso: string) => events.filter((e) => e.date <= iso && iso <= (e.dateFin ?? e.date));

  return (
    <div className="p-3">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} className="rounded border border-zinc-300 px-2 py-0.5 hover:bg-zinc-50" aria-label="Mois précédent">
          ←
        </button>
        <h3 className="text-sm font-semibold">{formatMois(y, m - 1)}</h3>
        <button type="button" onClick={() => shift(1)} className="rounded border border-zinc-300 px-2 py-0.5 hover:bg-zinc-50" aria-label="Mois suivant">
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded border border-zinc-200 bg-zinc-200 text-xs">
        {JOURS.map((j) => (
          <div key={j} className="bg-zinc-50 py-1 text-center font-medium text-zinc-500">
            {j}
          </div>
        ))}
        {cells.map((iso, i) => {
          if (!iso) return <div key={i} className="min-h-20 bg-zinc-50" />;
          const evs = onDay(iso);
          return (
            <div key={iso} className={cx('min-h-20 bg-white p-1', iso === today && 'ring-2 ring-inset ring-blue-500')}>
              <div className={cx('text-right text-[11px] tabular-nums', iso < today ? 'text-zinc-300' : 'text-zinc-500')}>{parseISODate(iso).getDate()}</div>
              <div className="space-y-0.5">
                {evs.slice(0, 3).map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => onClick(e)}
                    title={`${EVENT_LABELS[e.type]} – ${e.titre} – ${e.uai ? nomDe(e.uai) : `Académie de ${e.academie}`} (${formatDate(e.date)})`}
                    className="block w-full truncate rounded px-1 text-left text-[10px] leading-4 text-white"
                    style={{ background: EVENT_COLORS[e.type], opacity: iso < today ? 0.45 : 1 }}
                  >
                    {e.uai ? nomCourt(nomDe(e.uai)) : e.titre}
                  </button>
                ))}
                {evs.length > 3 && <div className="text-[10px] text-zinc-500">+{evs.length - 3}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
