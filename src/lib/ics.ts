import type { CollegeEvent } from '../types';
import { EVENT_LABELS } from './indicateurs';
import { parseISODate, toISODate } from './format';

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Replie les lignes à 75 octets (RFC 5545). */
export function foldLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let current = '';
  let size = 0;
  for (const ch of line) {
    const n = new TextEncoder().encode(ch).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (size + n > limit) {
      parts.push(current);
      current = '';
      size = 0;
    }
    current += ch;
    size += n;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

const compact = (iso: string) => iso.replace(/-/g, '');
const compactTime = (hhmm: string) => hhmm.replace(':', '') + '00';

function nextDay(iso: string): string {
  const d = parseISODate(iso);
  d.setDate(d.getDate() + 1);
  return toISODate(d);
}

export function buildIcs(events: CollegeEvent[], nomDe: (uai: string) => string, now = new Date()): string {
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//abasille//colleges//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Collèges – portes ouvertes et inscriptions',
  ];
  for (const e of events) {
    const qui = e.uai ? nomDe(e.uai) : `Académie de ${e.academie ?? ''}`.trim();
    lines.push('BEGIN:VEVENT', `UID:${e.id}@abasille.github.io`, `DTSTAMP:${stamp}`);
    if (e.heureDebut && !e.dateFin) {
      lines.push(`DTSTART;TZID=Europe/Paris:${compact(e.date)}T${compactTime(e.heureDebut)}`);
      lines.push(`DTEND;TZID=Europe/Paris:${compact(e.date)}T${compactTime(e.heureFin ?? e.heureDebut)}`);
    } else {
      lines.push(`DTSTART;VALUE=DATE:${compact(e.date)}`);
      lines.push(`DTEND;VALUE=DATE:${compact(nextDay(e.dateFin ?? e.date))}`);
    }
    lines.push(`SUMMARY:${escapeText(`${e.titre} – ${qui}`)}`);
    const desc = [
      `${EVENT_LABELS[e.type]} – ${qui}`,
      e.inscriptionRequise ? 'Inscription requise.' : '',
      `Source : ${e.source}`,
      `Vérifié le ${e.verifieLe} (confiance ${e.confiance}).`,
    ].filter(Boolean);
    lines.push(`DESCRIPTION:${escapeText(desc.join('\n'))}`);
    if (e.source) lines.push(`URL:${e.source}`);
    if (e.type === 'inscription' || e.type === 'date_limite') {
      lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${escapeText(e.titre)}`, 'TRIGGER:-P3D', 'END:VALARM');
    }
    lines.push('END:VEVENT');
  }
  lines.push('END:VCALENDAR');
  return lines.map(foldLine).join('\r\n') + '\r\n';
}

export function downloadIcs(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
