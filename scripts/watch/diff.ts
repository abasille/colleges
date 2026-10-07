// Empreintes, état de surveillance et détection des changements.
import { createHash } from 'node:crypto';
import { SNIPPET_SEPARATOR, hasKeyword, keywordSnippets } from './extract';

export interface StateEntry {
  hash: string; // sha256 du texte visible normalisé
  checkedAt: string; // YYYY-MM-DD, dernière vérification réussie
  changedAt: string; // YYYY-MM-DD, dernier changement d'empreinte constaté (ou première vérification)
  excerpt: string; // passages autour des mots-clés, séparés par « … »
}

/** Contenu de data/watch-state.json, indexé par URL. */
export type WatchState = Record<string, StateEntry>;

export type PageStatus = 'nouvelle' | 'modifiee' | 'inchangee';

export function sha256(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

export function classify(prev: StateEntry | undefined, hash: string): PageStatus {
  if (!prev) return 'nouvelle';
  return prev.hash === hash ? 'inchangee' : 'modifiee';
}

export function nextEntry(prev: StateEntry | undefined, hash: string, excerpt: string, today: string): StateEntry {
  const status = classify(prev, hash);
  return {
    hash,
    checkedAt: today,
    changedAt: status === 'inchangee' && prev ? prev.changedAt : today,
    excerpt,
  };
}

/** Lignes présentes dans le nouveau texte et absentes de l'ancien (ordre du nouveau texte, sans doublon). */
export function newLines(oldText: string, newText: string): string[] {
  const old = new Set(oldText.split('\n'));
  const seen = new Set<string>();
  return newText.split('\n').filter((l) => {
    if (old.has(l) || seen.has(l)) return false;
    seen.add(l);
    return true;
  });
}

/** Passages de l'extrait nouveau absents de l'ancien. */
export function newSnippets(oldExcerpt: string, newExcerpt: string): string[] {
  const old = new Set(oldExcerpt.split(SNIPPET_SEPARATOR).map((s) => s.trim()));
  return newExcerpt
    .split(SNIPPET_SEPARATOR)
    .map((s) => s.trim())
    .filter((s) => s && !old.has(s));
}

export interface Highlights {
  /** Passages nouveaux contenant un mot-clé (portes ouvertes, inscription, CM2, 6e…). */
  snippets: string[];
  /** Nombre de lignes ajoutées (si l'ancien texte est connu). */
  addedLines: number | null;
}

/**
 * Ce qui a changé, limité aux passages contenant un mot-clé. Si le texte précédent est disponible
 * (cache local), on compare les lignes ; sinon on compare les extraits enregistrés dans l'état.
 * Les lignes sans mot-clé ne sont jamais recopiées (elles peuvent contenir des noms d'élèves).
 */
export function changeHighlights(args: {
  oldText: string | null;
  newText: string;
  oldExcerpt: string;
  newExcerpt: string;
  rentree: number;
  max?: number;
}): Highlights {
  const max = args.max ?? 4;
  if (args.oldText !== null) {
    const added = newLines(args.oldText, args.newText);
    const withKeyword = added.filter((l) => hasKeyword(l, args.rentree));
    const snippets = keywordSnippets(withKeyword.join('\n'), { rentree: args.rentree, maxSnippets: max });
    return { snippets, addedLines: added.length };
  }
  return { snippets: newSnippets(args.oldExcerpt, args.newExcerpt).slice(0, max), addedLines: null };
}

/** Garde uniquement les URL encore surveillées, triées pour des diffs stables. */
export function pruneState(state: WatchState, watched: Iterable<string>): WatchState {
  const keep = new Set(watched);
  const out: WatchState = {};
  for (const url of Object.keys(state).sort()) if (keep.has(url)) out[url] = state[url];
  return out;
}
