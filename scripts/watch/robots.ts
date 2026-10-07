// Analyse de robots.txt (RFC 9309) : groupes, repli sur `User-agent: *`,
// règles Allow/Disallow à correspondance la plus longue, jokers `*` et `$`.

export interface RobotsRule {
  allow: boolean;
  pattern: string;
}

export interface RobotsGroup {
  agents: string[]; // en minuscules
  rules: RobotsRule[];
  crawlDelay: number | null; // secondes
}

export interface Robots {
  groups: RobotsGroup[];
}

/** Robots « tout autorisé » (robots.txt absent ou en 4xx). */
export const ALLOW_ALL: Robots = { groups: [] };
/** Robots « tout interdit » (robots.txt injoignable ou en 5xx). */
export const DISALLOW_ALL: Robots = {
  groups: [{ agents: ['*'], rules: [{ allow: false, pattern: '/' }], crawlDelay: null }],
};

export function parseRobots(text: string): Robots {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;
  let lastWasAgent = false;

  for (const rawLine of text.replace(/^﻿/, '').split(/\r\n|\r|\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) continue;
    const idx = line.indexOf(':');
    if (idx < 0) continue;
    const field = line.slice(0, idx).trim().toLowerCase();
    const value = line.slice(idx + 1).trim();

    if (field === 'user-agent') {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [], crawlDelay: null };
        groups.push(current);
      }
      current.agents.push(value.toLowerCase());
      lastWasAgent = true;
      continue;
    }
    lastWasAgent = false;
    if (!current) continue; // règle hors groupe : ignorée
    if (field === 'allow' || field === 'disallow') {
      // « Disallow: » vide = aucune restriction : on n'ajoute pas de règle.
      if (value) current.rules.push({ allow: field === 'allow', pattern: value });
    } else if (field === 'crawl-delay') {
      const n = Number(value.replace(',', '.'));
      if (Number.isFinite(n) && n >= 0) current.crawlDelay = n;
    }
  }
  return { groups };
}

/**
 * Groupes applicables à un robot : ceux qui nomment son jeton produit (comparaison
 * insensible à la casse), sinon ceux de `*`. Plusieurs groupes pour le même robot sont fusionnés.
 */
export function selectGroup(robots: Robots, userAgent: string): RobotsGroup | null {
  const token = productToken(userAgent);
  const specific = robots.groups.filter((g) => g.agents.some((a) => a !== '*' && productToken(a) === token));
  const chosen = specific.length ? specific : robots.groups.filter((g) => g.agents.includes('*'));
  if (!chosen.length) return null;
  const delays = chosen.map((g) => g.crawlDelay).filter((d): d is number => d !== null);
  return {
    agents: chosen.flatMap((g) => g.agents),
    rules: chosen.flatMap((g) => g.rules),
    crawlDelay: delays.length ? Math.max(...delays) : null,
  };
}

/** « colleges-watch (+https://…) » -> « colleges-watch » ; « Googlebot/2.1 » -> « googlebot ». */
export function productToken(userAgent: string): string {
  return userAgent.trim().split(/[\s/]/)[0].toLowerCase();
}

/** Normalise un chemin pour la comparaison : encodage pourcent homogène (majuscules), sans décoder « / ». */
function normalizePath(path: string): string {
  const chars = Array.from(path); // points de code
  let out = '';
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const hex = chars.slice(i + 1, i + 3).join('');
    if (c === '%' && /^[0-9a-fA-F]{2}$/.test(hex)) {
      const ch = String.fromCharCode(parseInt(hex, 16));
      // Décode les caractères non réservés, garde les autres encodés (en majuscules).
      out += /[A-Za-z0-9\-._~]/.test(ch) ? ch : '%' + hex.toUpperCase();
      i += 2;
    } else {
      out += /[\x21-\x7e]/.test(c) ? c : encodeURIComponent(c);
    }
  }
  return out;
}

/** Vrai si `pattern` (avec `*` et `$` final) correspond au début de `path`. */
export function patternMatches(pattern: string, path: string): boolean {
  const p = normalizePath(pattern);
  const target = normalizePath(path);
  const anchored = p.endsWith('$');
  const body = anchored ? p.slice(0, -1) : p;
  const re = new RegExp(
    '^' + body.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') + (anchored ? '$' : ''),
  );
  return re.test(target);
}

/**
 * Décision pour un chemin (« /a/b?x=1 ») : la règle la plus longue (en octets du motif) gagne ;
 * à égalité, Allow l'emporte. Sans règle applicable : autorisé. /robots.txt est toujours autorisé.
 */
export function isAllowed(robots: Robots, userAgent: string, pathWithQuery: string): boolean {
  if (pathWithQuery === '/robots.txt') return true;
  const group = selectGroup(robots, userAgent);
  if (!group) return true;
  let best: RobotsRule | null = null;
  for (const rule of group.rules) {
    if (!patternMatches(rule.pattern, pathWithQuery)) continue;
    if (
      !best ||
      rule.pattern.length > best.pattern.length ||
      (rule.pattern.length === best.pattern.length && rule.allow && !best.allow)
    ) {
      best = rule;
    }
  }
  return best ? best.allow : true;
}

export function crawlDelay(robots: Robots, userAgent: string): number | null {
  return selectGroup(robots, userAgent)?.crawlDelay ?? null;
}
