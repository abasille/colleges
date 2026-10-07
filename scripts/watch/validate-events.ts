/**
 * Validation de data/overrides/events.json contre le contrat `EventsFile` (src/types.ts).
 *   npx tsx scripts/watch/validate-events.ts [fichier]   -> liste les erreurs, code 1 s'il y en a.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CollegeEvent, EventType, StatutInscriptions } from '../../src/types';

const EVENT_TYPES: readonly EventType[] = [
  'portes_ouvertes',
  'reunion_information',
  'immersion',
  'inscription',
  'date_limite',
  'officiel',
];
const STATUTS: readonly StatutInscriptions[] = ['ouvertes', 'closes', 'a_venir', 'inconnu'];
const CONFIANCES: readonly CollegeEvent['confiance'][] = ['haute', 'moyenne', 'basse'];
const EVENT_KEYS: readonly (keyof CollegeEvent)[] = [
  'id', 'uai', 'academie', 'type', 'date', 'dateFin', 'heureDebut', 'heureFin', 'titre',
  'inscriptionRequise', 'saison', 'source', 'verifieLe', 'confiance',
];

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);

export function isIsoDate(v: unknown): v is string {
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return false;
  const d = new Date(v + 'T00:00:00Z');
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === v;
}
const isTime = (v: unknown) => typeof v === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(v);
const isUai = (v: unknown) => typeof v === 'string' && /^\d{7}[A-Z]$/.test(v);
const isSeason = (v: unknown) => {
  if (typeof v !== 'string') return false;
  const m = v.match(/^(\d{4})-(\d{2})$/);
  return !!m && (Number(m[1]) + 1) % 100 === Number(m[2]);
};
const isUrl = (v: unknown) => {
  if (typeof v !== 'string') return false;
  try {
    return /^https?:$/.test(new URL(v).protocol);
  } catch {
    return false;
  }
};

/** Liste des écarts au contrat ; vide si le fichier est valide. `exclude` : UAI interdits. */
export function validateEventsFile(data: unknown, exclude: readonly string[] = []): string[] {
  const errors: string[] = [];
  if (!isObj(data)) return ['la racine doit être un objet'];
  if (!isSeason(data.saisonCourante)) errors.push(`saisonCourante invalide : ${JSON.stringify(data.saisonCourante)}`);
  for (const k of Object.keys(data)) {
    if (!['saisonCourante', 'events', 'inscriptions'].includes(k)) errors.push(`clé inattendue à la racine : ${k}`);
  }

  if (!Array.isArray(data.events)) errors.push('events doit être un tableau');
  const ids = new Set<string>();
  for (const [i, e] of (Array.isArray(data.events) ? data.events : []).entries()) {
    const at = `events[${i}]${isObj(e) && typeof e.id === 'string' ? ` (${e.id})` : ''}`;
    if (!isObj(e)) {
      errors.push(`${at} : objet attendu`);
      continue;
    }
    for (const k of EVENT_KEYS) if (!(k in e)) errors.push(`${at} : champ manquant ${k}`);
    for (const k of Object.keys(e)) {
      if (!(EVENT_KEYS as readonly string[]).includes(k)) errors.push(`${at} : champ inattendu ${k}`);
    }
    if (typeof e.id !== 'string' || !e.id) errors.push(`${at} : id vide`);
    else if (ids.has(e.id)) errors.push(`${at} : id en double`);
    else ids.add(e.id);

    if (!EVENT_TYPES.includes(e.type as EventType)) errors.push(`${at} : type inconnu ${String(e.type)}`);
    if (e.type === 'officiel') {
      if (e.uai !== null) errors.push(`${at} : un événement officiel n'a pas d'UAI`);
      if (e.academie !== 'Paris' && e.academie !== 'Créteil') errors.push(`${at} : académie attendue (Paris ou Créteil)`);
    } else {
      if (!isUai(e.uai)) errors.push(`${at} : UAI invalide ${String(e.uai)}`);
      if (e.academie !== null) errors.push(`${at} : academie doit être null pour un événement de collège`);
    }
    if (typeof e.uai === 'string' && exclude.includes(e.uai)) errors.push(`${at} : UAI exclu du périmètre`);

    if (!isIsoDate(e.date)) errors.push(`${at} : date invalide ${String(e.date)}`);
    if (e.dateFin !== null) {
      if (!isIsoDate(e.dateFin)) errors.push(`${at} : dateFin invalide ${String(e.dateFin)}`);
      else if (isIsoDate(e.date) && e.dateFin <= e.date) errors.push(`${at} : dateFin doit suivre date`);
    }
    for (const k of ['heureDebut', 'heureFin'] as const) {
      if (e[k] !== null && !isTime(e[k])) errors.push(`${at} : ${k} invalide ${String(e[k])}`);
    }
    if (e.heureFin !== null && e.heureDebut === null) errors.push(`${at} : heureFin sans heureDebut`);
    if (isTime(e.heureDebut) && isTime(e.heureFin) && (e.heureFin as string) <= (e.heureDebut as string) && e.dateFin === null) {
      errors.push(`${at} : heureFin doit suivre heureDebut`);
    }
    if (typeof e.titre !== 'string' || !e.titre.trim()) errors.push(`${at} : titre vide`);
    if (e.inscriptionRequise !== null && typeof e.inscriptionRequise !== 'boolean') {
      errors.push(`${at} : inscriptionRequise doit être booléen ou null`);
    }
    if (!isSeason(e.saison)) errors.push(`${at} : saison invalide ${String(e.saison)}`);
    if (!isUrl(e.source)) errors.push(`${at} : source doit être une URL`);
    if (!isIsoDate(e.verifieLe)) errors.push(`${at} : verifieLe invalide ${String(e.verifieLe)}`);
    if (!CONFIANCES.includes(e.confiance as CollegeEvent['confiance'])) errors.push(`${at} : confiance invalide`);
  }

  if (!isObj(data.inscriptions)) errors.push('inscriptions doit être un objet');
  for (const [uai, v] of Object.entries(isObj(data.inscriptions) ? data.inscriptions : {})) {
    const at = `inscriptions.${uai}`;
    if (!isUai(uai)) errors.push(`${at} : UAI invalide`);
    if (exclude.includes(uai)) errors.push(`${at} : UAI exclu du périmètre`);
    if (!isObj(v)) {
      errors.push(`${at} : objet attendu`);
      continue;
    }
    for (const k of Object.keys(v)) {
      if (!['statut', 'constateLe', 'detail', 'source'].includes(k)) errors.push(`${at} : champ inattendu ${k}`);
    }
    if (!STATUTS.includes(v.statut as StatutInscriptions)) errors.push(`${at} : statut inconnu ${String(v.statut)}`);
    if (!isIsoDate(v.constateLe)) errors.push(`${at} : constateLe invalide`);
    if (typeof v.detail !== 'string' || !v.detail.trim()) errors.push(`${at} : detail vide`);
    if (!isUrl(v.source)) errors.push(`${at} : source doit être une URL`);
  }
  return errors;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
  const file = process.argv[2] ?? path.join(root, 'data/overrides/events.json');
  const config = JSON.parse(fs.readFileSync(path.join(root, 'data/config.json'), 'utf8')) as { exclure?: string[] };
  const errors = validateEventsFile(JSON.parse(fs.readFileSync(file, 'utf8')), config.exclure ?? []);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`${file} : conforme à EventsFile.`);
}
