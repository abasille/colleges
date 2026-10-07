// Validation et copie de data/overrides/events.json -> public/data/events.json.
import { existsSync, readFileSync } from 'node:fs';
import type { CollegeEvent, EventsFile, EventType, StatutInscriptions } from '../../src/types';

const TYPES: EventType[] = ['portes_ouvertes', 'reunion_information', 'immersion', 'inscription', 'date_limite', 'officiel'];
const STATUTS: StatutInscriptions[] = ['ouvertes', 'closes', 'a_venir', 'inconnu'];
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const HEURE = /^\d{2}:\d{2}$/;

function validDate(s: unknown): s is string {
  if (typeof s !== 'string' || !DATE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** Liste des problèmes d'un événement (vide s'il est valide). */
export function problemesEvenement(e: Record<string, unknown>): string[] {
  const p: string[] = [];
  if (typeof e.id !== 'string' || !e.id) p.push('id manquant');
  if (!(e.uai === null || (typeof e.uai === 'string' && /^\d{7}[A-Z]$/.test(e.uai)))) p.push(`uai invalide (${String(e.uai)})`);
  if (!(e.academie === null || e.academie === 'Paris' || e.academie === 'Créteil')) p.push(`academie invalide (${String(e.academie)})`);
  if (!TYPES.includes(e.type as EventType)) p.push(`type invalide (${String(e.type)})`);
  if (!validDate(e.date)) p.push(`date invalide (${String(e.date)})`);
  if (!(e.dateFin === null || validDate(e.dateFin))) p.push(`dateFin invalide (${String(e.dateFin)})`);
  if (validDate(e.date) && validDate(e.dateFin) && (e.dateFin as string) < (e.date as string)) p.push('dateFin antérieure à date');
  for (const k of ['heureDebut', 'heureFin'] as const) {
    if (!(e[k] === null || (typeof e[k] === 'string' && HEURE.test(e[k] as string)))) p.push(`${k} invalide (${String(e[k])})`);
  }
  if (typeof e.titre !== 'string' || !e.titre) p.push('titre manquant');
  if (!(e.inscriptionRequise === null || typeof e.inscriptionRequise === 'boolean')) p.push('inscriptionRequise invalide');
  if (typeof e.saison !== 'string' || !/^\d{4}-\d{2}$/.test(e.saison)) p.push(`saison invalide (${String(e.saison)})`);
  if (typeof e.source !== 'string' || !e.source) p.push('source manquante');
  if (!validDate(e.verifieLe)) p.push(`verifieLe invalide (${String(e.verifieLe)})`);
  if (!['haute', 'moyenne', 'basse'].includes(e.confiance as string)) p.push(`confiance invalide (${String(e.confiance)})`);
  if (e.type === 'officiel' && e.academie === null) p.push('événement officiel sans académie');
  return p;
}

export interface EventsResult {
  file: EventsFile;
  present: boolean;
  total: number;
  rejetes: { id: string; raisons: string[] }[];
  horsPerimetre: string[];
  inscriptionsHorsPerimetre: string[];
}

export function chargerEvenements(path: string, perimetre: Set<string>, saisonParDefaut: string): EventsResult {
  if (!existsSync(path)) {
    return {
      file: { saisonCourante: saisonParDefaut, events: [], inscriptions: {} },
      present: false,
      total: 0,
      rejetes: [],
      horsPerimetre: [],
      inscriptionsHorsPerimetre: [],
    };
  }
  const raw = JSON.parse(readFileSync(path, 'utf-8')) as Partial<EventsFile> & { events?: Record<string, unknown>[] };
  const rejetes: EventsResult['rejetes'] = [];
  const horsPerimetre: string[] = [];
  const events: CollegeEvent[] = [];
  const ids = new Set<string>();
  for (const e of raw.events ?? []) {
    const raisons = problemesEvenement(e);
    if (typeof e.id === 'string' && ids.has(e.id)) raisons.push('id en double');
    if (raisons.length) {
      rejetes.push({ id: String(e.id ?? '?'), raisons });
      continue;
    }
    ids.add(e.id as string);
    if (e.uai !== null && !perimetre.has(e.uai as string)) {
      horsPerimetre.push(`${String(e.id)} (${String(e.uai)})`);
      continue;
    }
    const ev = e as unknown as CollegeEvent;
    events.push({
      id: ev.id,
      uai: ev.uai,
      academie: ev.academie,
      type: ev.type,
      date: ev.date,
      dateFin: ev.dateFin,
      heureDebut: ev.heureDebut,
      heureFin: ev.heureFin,
      titre: ev.titre,
      inscriptionRequise: ev.inscriptionRequise,
      saison: ev.saison,
      source: ev.source,
      verifieLe: ev.verifieLe,
      confiance: ev.confiance,
    });
  }
  events.sort((a, b) => a.date.localeCompare(b.date) || (a.heureDebut ?? '').localeCompare(b.heureDebut ?? '') || a.id.localeCompare(b.id));
  const inscriptions: EventsFile['inscriptions'] = {};
  const inscriptionsHorsPerimetre: string[] = [];
  for (const [uai, v] of Object.entries(raw.inscriptions ?? {}).sort(([a], [b]) => a.localeCompare(b))) {
    if (!perimetre.has(uai)) {
      inscriptionsHorsPerimetre.push(uai);
      continue;
    }
    if (!STATUTS.includes(v.statut)) {
      rejetes.push({ id: `inscriptions.${uai}`, raisons: [`statut invalide (${String(v.statut)})`] });
      continue;
    }
    inscriptions[uai] = { statut: v.statut, constateLe: v.constateLe, detail: v.detail, source: v.source };
  }
  return {
    file: { saisonCourante: typeof raw.saisonCourante === 'string' ? raw.saisonCourante : saisonParDefaut, events, inscriptions },
    present: true,
    total: (raw.events ?? []).length,
    rejetes,
    horsPerimetre,
    inscriptionsHorsPerimetre,
  };
}
