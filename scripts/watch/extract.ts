// Extraction du texte visible d'une page HTML (ou d'un flux RSS/Atom) et des passages
// autour des mots-clés utiles (portes ouvertes, inscription, CM2, 6e…).

const RAW_TEXT_ELEMENTS = /<(script|style|noscript|template|svg|math|iframe|object|canvas|head)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
// Ni le pied de page ni les fenêtres surgissantes (dialog, aria-hidden) ne sont écartés : des sites y
// placent l'annonce des portes ouvertes ou le bloc « Rentrée 2027 ».
const NOISE_ELEMENTS = new Set(['nav', 'select', 'button', 'datalist']);
const NOISE_ROLES = new Set(['navigation', 'search', 'menu', 'menubar']);
// Classes ou id de blocs de navigation : jetons exacts (pas de préfixe : « footer-on-bottom » sur <body>…).
const NOISE_CLASS =
  /^(menu|main-menu|menu-principal|nav|navbar|navigation|main-navigation|site-navigation|breadcrumbs?|fil-ariane|ariane|skip-links?|sr-only|visually-hidden|screen-reader-text|share|sharing|social|social-links|fo-aside|cookies?|(cookie|tarteaucitron|rgpd)[\w-]*)$/i;
// Blocs masqués portant un jeton qui change à chaque requête (Jalios : CSRFTokenElm, AjaxCtxtDeflate).
const NOISE_ID = /csrf|token|ajaxctxt|nonce/i;
// Éléments jamais écartés, quelles que soient leurs classes.
const NEVER_NOISE = new Set(['html', 'body', 'main', 'article']);
const VOID_ELEMENTS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
]);
const BLOCK_ELEMENTS = new Set([
  'address', 'article', 'aside', 'blockquote', 'br', 'caption', 'dd', 'div', 'dl', 'dt', 'figcaption', 'figure',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'ol', 'option', 'p', 'pre', 'section', 'table',
  'tbody', 'td', 'tfoot', 'th', 'thead', 'title', 'tr', 'ul',
]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '', ensp: ' ', emsp: ' ', thinsp: ' ',
  zwnj: '', zwj: '', lrm: '', rlm: '', laquo: '«', raquo: '»', lsquo: '‘', rsquo: '’', sbquo: '‚', ldquo: '“',
  rdquo: '”', bdquo: '„', hellip: '…', ndash: '–', mdash: '—', euro: '€', copy: '©', reg: '®', trade: '™',
  deg: '°', middot: '·', bull: '•', times: '×', divide: '÷', sup1: '¹', sup2: '²', sup3: '³', ordf: 'ª',
  ordm: 'º', frac12: '½', frac14: '¼', frac34: '¾', sect: '§', para: '¶', iexcl: '¡', iquest: '¿', larr: '←',
  rarr: '→', uarr: '↑', darr: '↓', rArr: '⇒', lArr: '⇐', check: '✓',
  agrave: 'à', aacute: 'á', acirc: 'â', atilde: 'ã', auml: 'ä', aring: 'å', aelig: 'æ', ccedil: 'ç',
  egrave: 'è', eacute: 'é', ecirc: 'ê', euml: 'ë', igrave: 'ì', iacute: 'í', icirc: 'î', iuml: 'ï',
  ntilde: 'ñ', ograve: 'ò', oacute: 'ó', ocirc: 'ô', otilde: 'õ', ouml: 'ö', oslash: 'ø', oelig: 'œ',
  ugrave: 'ù', uacute: 'ú', ucirc: 'û', uuml: 'ü', yacute: 'ý', yuml: 'ÿ', szlig: 'ß',
  Agrave: 'À', Aacute: 'Á', Acirc: 'Â', Auml: 'Ä', AElig: 'Æ', Ccedil: 'Ç', Egrave: 'È', Eacute: 'É',
  Ecirc: 'Ê', Euml: 'Ë', Icirc: 'Î', Iuml: 'Ï', Ocirc: 'Ô', Ouml: 'Ö', OElig: 'Œ', Ugrave: 'Ù', Ucirc: 'Û',
  Uuml: 'Ü', Yuml: 'Ÿ',
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);?/gi, (m, body: string) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return m;
      return String.fromCodePoint(code);
    }
    const v = NAMED_ENTITIES[body] ?? NAMED_ENTITIES[body.toLowerCase()];
    return v ?? m;
  });
}

function attr(attrs: string, name: string): string | null {
  const m = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, 'i'));
  if (m) return m[1] ?? m[2] ?? m[3] ?? '';
  return new RegExp(`(?:^|\\s)${name}(?=\\s|$|/)`, 'i').test(attrs) ? '' : null;
}

function isNoise(tag: string, attrs: string): boolean {
  if (NOISE_ELEMENTS.has(tag)) return true;
  if (NEVER_NOISE.has(tag)) return false;
  if (!attrs.trim()) return false;
  const role = attr(attrs, 'role');
  if (role && NOISE_ROLES.has(role.toLowerCase())) return true;
  const id = attr(attrs, 'id') ?? '';
  if (id && NOISE_ID.test(id)) return true;
  const tokens = [...(attr(attrs, 'class') ?? '').split(/\s+/), id].filter(Boolean);
  return tokens.some((t) => NOISE_CLASS.test(t));
}

/** Mentions qui changent sans que le contenu change (« il y a 2 semaines », « il y a plus d'un an »). */
const VOLATILE = [
  /\b(publi[ée]e?s?\s+)?il y a\s+((plus|moins)\s+d['’]\s*)?(environ\s+)?(un|une|quelques|\d+)\s+(secondes?|minutes?|heures?|jours?|semaines?|mois|ans?)\b/gi,
];
/** Ligne d'horodatage de publication : « hier, à 12:56 », « lundi, à 11:32 », « 05/10/2026 à 9h30 ». */
const TIMESTAMP_LINE =
  /^(publi[ée]e?\s+)?(le\s+)?(aujourd['’]hui|hier|avant-hier|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|\d{1,2}\/\d{1,2}\/\d{2,4})\s*,?\s*(à|a)\s*\d{1,2}\s*[:h]\s*\d{2}$/i;

/**
 * Jeton opaque (CSRF, contexte Ajax de Jalios sur pia.ac-paris.fr…) affiché comme texte d'un bloc masqué :
 * un seul « mot » d'au moins 16 caractères base64 où majuscules, minuscules et chiffres alternent souvent.
 */
export function isOpaqueToken(line: string): boolean {
  if (!/^[A-Za-z0-9+/=_-]{16,}$/.test(line)) return false;
  const count = (re: RegExp) => (line.match(re) ?? []).length;
  const kind = (c: string) => (/[A-Z]/.test(c) ? 'A' : /[a-z]/.test(c) ? 'a' : /[0-9]/.test(c) ? '0' : '.');
  let switches = 0;
  for (let i = 1; i < line.length; i++) if (kind(line[i]) !== kind(line[i - 1])) switches++;
  return count(/[A-Z]/g) >= 3 && count(/[a-z]/g) >= 3 && switches >= 6;
}

/** Normalise le texte : espaces insécables et invisibles, mentions volatiles, jetons, lignes vides, espaces multiples. */
export function normalizeText(text: string): string {
  return VOLATILE.reduce((t, re) => t.replace(re, ' '), text)
    .replace(/[\u00a0\u2000-\u200a\u202f\u205f\u3000]/g, ' ')
    .replace(/[\u200b-\u200d\u2060\ufeff\u00ad]/g, '')
    .split('\n')
    .map((l) => l.replace(/[ \t\f\v\r]+/g, ' ').trim())
    .filter((l) => l && !/^[\s|•·\-–—>»«,;:.]*$/.test(l) && !isOpaqueToken(l) && !TIMESTAMP_LINE.test(l))
    .join('\n');
}

/** Texte visible d'une page HTML, une ligne par bloc, sans scripts, styles, menus, boutons ni bandeaux de cookies. */
export function htmlToText(html: string): string {
  const cleaned = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, ' ')
    .replace(/<!doctype[^>]*>/gi, ' ')
    .replace(RAW_TEXT_ELEMENTS, ' ');

  const out: string[] = [];
  let skipTag: string | null = null;
  let skipDepth = 0;
  // Valeurs d'attributs entre guillemets sans « < » : une apostrophe isolée ne peut pas avaler la page.
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)((?:[^>"']|"[^"<]*"|'[^'<]*'|["'])*)>|([^<]+)|(<)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cleaned))) {
    const [, slash, rawTag, attrs = '', text, lt] = m;
    if (text !== undefined || lt !== undefined) {
      if (!skipTag) out.push(decodeEntities(text ?? lt ?? ''));
      continue;
    }
    const tag = rawTag.toLowerCase();
    const closing = slash === '/';
    const selfClosing = VOID_ELEMENTS.has(tag) || /\/\s*$/.test(attrs);
    if (skipTag) {
      if (tag === skipTag && !selfClosing) {
        skipDepth += closing ? -1 : 1;
        if (skipDepth === 0) skipTag = null;
      }
      continue;
    }
    if (!closing && !selfClosing && isNoise(tag, attrs)) {
      skipTag = tag;
      skipDepth = 1;
      continue;
    }
    if (BLOCK_ELEMENTS.has(tag)) out.push('\n');
    else if (tag === 'img' && !closing) {
      const alt = attr(attrs, 'alt');
      // Texte alternatif utile seulement s'il ne s'agit pas d'un nom de fichier.
      if (alt && alt.trim().length > 3 && !/\.(jpe?g|png|gif|webp|svg|bmp|tiff?)\s*$/i.test(alt)) {
        out.push(' ' + decodeEntities(alt) + ' ');
      }
    } else out.push(' ');
  }
  return normalizeText(out.join(''));
}

function xmlField(block: string, names: string[]): string {
  for (const name of names) {
    const m = block.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
    if (m) {
      const inner = m[1].replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, '$1');
      return inner;
    }
  }
  return '';
}

/** Vrai si le document ressemble à un flux RSS ou Atom. */
export function isFeed(body: string, contentType = ''): boolean {
  if (/(rss|atom)\+xml/i.test(contentType)) return true;
  return /^\s*(<\?xml[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<(rss|feed|rdf:RDF)\b/i.test(body);
}

/** Texte d'un flux RSS/Atom : un bloc par article (titre, date, lien, résumé). */
export function feedToText(xml: string): string {
  const items = xml.match(/<(item|entry)\b[\s\S]*?<\/\1>/gi) ?? [];
  const blocks = items.map((item) => {
    const title = htmlToText(decodeEntities(xmlField(item, ['title'])));
    const date = decodeEntities(xmlField(item, ['pubDate', 'published', 'updated', 'dc:date'])).trim();
    const linkText = xmlField(item, ['link']).trim();
    const link = linkText || item.match(/<link\b[^>]*href=["']([^"']+)["']/i)?.[1] || '';
    const desc = htmlToText(decodeEntities(xmlField(item, ['description', 'summary', 'content:encoded', 'content'])));
    return [`${title}${date ? ` (${date})` : ''}`, desc.slice(0, 1500), decodeEntities(link)].filter(Boolean).join('\n');
  });
  return normalizeText(blocks.join('\n'));
}

// --- Mots-clés et extraits ---

/** Repli par caractère (minuscules, sans accents) qui conserve les positions. */
export function foldForSearch(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const f = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    out += f.length === 1 ? f : c.toLowerCase().length === 1 ? c.toLowerCase() : c;
  }
  return out;
}

/** Expressions recherchées (sur le texte replié : minuscules, sans accents). */
export function keywordPatterns(rentree: number): RegExp[] {
  return [
    /portes?[\s-]+ouvertes?/g,
    /\bjpo\b/g,
    /journees?\s+(de\s+)?(la\s+)?decouverte/g,
    /\b(pre-?\s?)?inscriptions?\b/g,
    /\badmissions?\b/g,
    /\bcandidatures?\b/g,
    /\bcm[12]\b/g,
    /\b6\s?(e|eme|ieme|\u1d49)(?![a-z0-9])/g,
    /\bsixiemes?\b/g,
    /\bfuturs?\s+(eleves|collegiens|sixiemes|6)/g,
    /\breunions?\s+(d.?\s?information|de\s+presentation)/g,
    /\bimmersion\b/g,
    /\bderogations?\b/g,
    new RegExp(`\\brentree\\s+(de\\s+septembre\\s+)?${rentree}\\b|\\b${rentree}\\s?[-/]\\s?${rentree + 1}\\b`, 'g'),
  ];
}

export interface ExcerptOptions {
  rentree: number; // année de rentrée de la saison suivie (2027 pour 2026-27)
  radius?: number; // caractères de contexte de part et d'autre du mot-clé
  maxSnippets?: number;
  maxLength?: number;
}

function firstKeyword(line: string, patterns: RegExp[]): { index: number; length: number } | null {
  const folded = foldForSearch(line);
  let best: { index: number; length: number } | null = null;
  for (const re of patterns) {
    re.lastIndex = 0;
    const m = re.exec(folded);
    if (m && (!best || m.index < best.index)) best = { index: m.index, length: m[0].length };
  }
  return best;
}

/** Coupe une ligne trop longue autour de la position donnée, aux limites de mots. */
export function windowAround(line: string, index: number, length: number, radius: number): string {
  if (line.length <= 2 * radius + length) return line;
  const a = Math.max(0, index - radius);
  const b = Math.min(line.length, index + length + radius);
  let s = line.slice(a, b);
  if (a > 0) s = '…' + s.replace(/^\S*\s/, '');
  if (b < line.length) s = s.replace(/\s\S*$/, '') + '…';
  return s;
}

/**
 * Passages contenant un mot-clé, ligne par ligne (un bloc HTML = une ligne), coupés autour du mot-clé.
 * Une ligne courte (titre, entrée de menu) est complétée par la suivante ; elle n'est gardée que si
 * l'ensemble contient un chiffre ou fait au moins 60 caractères (écarte « Inscriptions / Contact »).
 */
export function keywordSnippets(text: string, opts: ExcerptOptions): string[] {
  const radius = opts.radius ?? 110;
  const patterns = keywordPatterns(opts.rentree);
  const lines = text.split('\n');
  const seen = new Set<string>();
  const out: string[] = [];
  for (let i = 0; i < lines.length && out.length < (opts.maxSnippets ?? 6); i++) {
    let line = lines[i];
    if (!firstKeyword(line, patterns)) continue;
    if (line.length < 40 && i + 1 < lines.length) {
      line = `${line} / ${lines[i + 1]}`;
      if (!/\d/.test(line) && line.length < 60) continue;
      i++; // la ligne suivante est incluse
    }
    const hit = firstKeyword(line, patterns)!;
    const snippet = windowAround(line, hit.index, hit.length, radius);
    if (seen.has(snippet)) continue;
    seen.add(snippet);
    out.push(snippet);
  }
  return out;
}

export const SNIPPET_SEPARATOR = ' … ';

/** Extrait conservé dans l'état : passages autour des mots-clés, séparés par « … », tronqué. */
export function buildExcerpt(text: string, opts: ExcerptOptions): string {
  const max = opts.maxLength ?? 700;
  let out = '';
  for (const s of keywordSnippets(text, opts)) {
    const next = out ? out + SNIPPET_SEPARATOR + s : s;
    if (next.length > max) {
      if (!out) out = s.slice(0, max - 1) + '…';
      break;
    }
    out = next;
  }
  return out;
}

/** Vrai si la chaîne contient au moins un mot-clé. */
export function hasKeyword(s: string, rentree: number): boolean {
  const folded = foldForSearch(s);
  return keywordPatterns(rentree).some((re) => {
    re.lastIndex = 0;
    return re.test(folded);
  });
}

/** Détecte l'encodage déclaré (en-tête HTTP, puis balise meta) ; UTF-8 par défaut. */
export function detectCharset(contentType: string | null, head: string): string {
  const fromHeader = contentType?.match(/charset\s*=\s*["']?([\w-]+)/i)?.[1];
  const fromMeta =
    head.match(/<meta[^>]+charset\s*=\s*["']?([\w-]+)/i)?.[1] ?? head.match(/<\?xml[^>]+encoding=["']([\w-]+)/i)?.[1];
  const cs = (fromHeader ?? fromMeta ?? 'utf-8').toLowerCase();
  return cs === 'iso-8859-1' || cs === 'latin1' ? 'windows-1252' : cs;
}
