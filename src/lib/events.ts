import type { Academie, CollegeEvent, EventType, EventsFile, StatutInscriptions } from '../types';
import { parseISODate } from './format';

export const URGENCE_JOURS = 14;

export function byDate(a: CollegeEvent, b: CollegeEvent): number {
  return a.date.localeCompare(b.date) || (a.heureDebut ?? '').localeCompare(b.heureDebut ?? '') || a.id.localeCompare(b.id);
}

/** Dernier jour utile de l'événement (fin de période, sinon le jour même). */
export function finEvent(e: CollegeEvent): string {
  return e.dateFin ?? e.date;
}

export function isPast(e: CollegeEvent, today: string): boolean {
  return finEvent(e) < today;
}

function daysBetween(a: string, b: string): number {
  return Math.round((parseISODate(b).getTime() - parseISODate(a).getTime()) / 86_400_000);
}

/** Échéance (inscription, date limite) qui tombe dans moins de 14 jours. */
export function isUrgent(e: CollegeEvent, today: string): boolean {
  if (e.type !== 'inscription' && e.type !== 'date_limite') return false;
  const fin = finEvent(e);
  if (fin < today) return false;
  return daysBetween(today, fin) <= URGENCE_JOURS;
}

export interface CalendarOptions {
  saison: string;
  types: ReadonlySet<EventType>;
  academies: ReadonlySet<Academie>;
  /** UAI des collèges retenus par les filtres de la liste. */
  colleges: ReadonlySet<string>;
}

/** Événements de la saison courante affichés dans le calendrier. */
export function calendarEvents(events: CollegeEvent[], o: CalendarOptions): CollegeEvent[] {
  return events
    .filter((e) => {
      if (e.saison !== o.saison || !o.types.has(e.type)) return false;
      if (e.uai === null) return e.academie !== null && o.academies.has(e.academie);
      return o.colleges.has(e.uai);
    })
    .sort(byDate);
}

/** Prochains événements des favoris (à venir ou en cours), échéances urgentes en tête. */
export function upcomingForFavoris(
  events: CollegeEvent[],
  saison: string,
  favoris: ReadonlySet<string>,
  today: string,
  n = 3,
): CollegeEvent[] {
  return events
    .filter((e) => e.saison === saison && e.uai !== null && favoris.has(e.uai) && !isPast(e, today))
    .sort((a, b) => Number(isUrgent(b, today)) - Number(isUrgent(a, today)) || byDate(a, b))
    .slice(0, n);
}

export function eventsForCollege(events: CollegeEvent[], uai: string, saison: string) {
  const own = events.filter((e) => e.uai === uai).sort(byDate);
  return {
    courant: own.filter((e) => e.saison === saison),
    precedent: own.filter((e) => e.saison < saison),
  };
}

export interface InscriptionsInfo {
  statut: StatutInscriptions;
  detail: string;
  source: string | null;
}

/**
 * Statut des inscriptions d'un collège privé : déduit des événements « inscription » de la saison
 * quand ils encadrent la date du jour, sinon le statut constaté dans events.json.
 */
export function statutInscriptions(file: EventsFile, uai: string, today: string): InscriptionsInfo | null {
  const ins = file.events
    .filter((e) => e.uai === uai && e.saison === file.saisonCourante && e.type === 'inscription')
    .sort(byDate);
  const enCours = ins.find((e) => e.dateFin && e.date <= today && today <= e.dateFin);
  if (enCours) return { statut: 'ouvertes', detail: `${enCours.titre} (jusqu’au ${enCours.dateFin})`, source: enCours.source };
  const constate = file.inscriptions[uai];
  // Un événement passé plus récent que le constat rend ce dernier obsolète.
  const dernier = ins.filter((e) => e.date <= today).at(-1);
  if (dernier && (!constate || dernier.date > constate.constateLe)) {
    if (dernier.dateFin && dernier.dateFin < today) return { statut: 'closes', detail: `${dernier.titre} (terminé le ${dernier.dateFin})`, source: dernier.source };
    return { statut: 'inconnu', detail: `${dernier.titre} (${dernier.date}) – statut à vérifier`, source: dernier.source };
  }
  if (constate) return { statut: constate.statut, detail: constate.detail, source: constate.source || null };
  const aVenir = ins.find((e) => e.date > today);
  if (aVenir) return { statut: 'a_venir', detail: aVenir.titre, source: aVenir.source };
  return null;
}
