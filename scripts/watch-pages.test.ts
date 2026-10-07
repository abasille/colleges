import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ALLOW_ALL, DISALLOW_ALL, crawlDelay, isAllowed, parseRobots, patternMatches, productToken } from './watch/robots';
import {
  buildExcerpt,
  decodeEntities,
  detectCharset,
  feedToText,
  foldForSearch,
  hasKeyword,
  htmlToText,
  isFeed,
  isOpaqueToken,
  keywordSnippets,
  normalizeText,
} from './watch/extract';
import { changeHighlights, classify, newLines, newSnippets, nextEntry, pruneState, sha256 } from './watch/diff';
import { countResults, escapeMarkdown, renderSummary, type PageResult } from './watch/summary';
import { buildTargets, USER_AGENT, type WatchFile } from './watch-pages';
import { validateEventsFile } from './watch/validate-events';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UA = USER_AGENT;

describe('robots.txt', () => {
  const PIA = `
User-agent: *
Disallow: /portail/js/
Disallow: /serail/upload/
Disallow: /vantail/upload/

User-agent: Yandex
Disallow: /

User-agent: ClaudeBot
Disallow: /
`;

  it('applique le groupe * à notre agent et le groupe spécifique à ClaudeBot', () => {
    const r = parseRobots(PIA);
    expect(isAllowed(r, UA, '/serail/jcms/s2_111988/fr/accueil')).toBe(true);
    expect(isAllowed(r, UA, '/serail/upload/docs/application/pdf/affiche.pdf')).toBe(false);
    expect(isAllowed(r, 'ClaudeBot/1.0', '/serail/jcms/s2_111988/fr/accueil')).toBe(false);
    expect(isAllowed(r, 'claudebot', '/')).toBe(false);
  });

  it('extrait le jeton produit du User-Agent', () => {
    expect(productToken(UA)).toBe('colleges-watch');
    expect(productToken('Googlebot/2.1 (+http://www.google.com/bot.html)')).toBe('googlebot');
  });

  it('préfère un groupe nommant notre agent au groupe *', () => {
    const r = parseRobots('User-agent: *\nDisallow: /\n\nUser-agent: colleges-watch\nDisallow: /prive/\n');
    expect(isAllowed(r, UA, '/actualites')).toBe(true);
    expect(isAllowed(r, UA, '/prive/x')).toBe(false);
    expect(isAllowed(r, 'autre-robot', '/actualites')).toBe(false);
  });

  it('fusionne plusieurs lignes User-agent dans un groupe et plusieurs groupes du même agent', () => {
    const r = parseRobots('User-agent: a\nUser-agent: colleges-watch\nDisallow: /x\n\nUser-agent: colleges-watch\nDisallow: /y\n');
    expect(isAllowed(r, UA, '/x/1')).toBe(false);
    expect(isAllowed(r, UA, '/y/1')).toBe(false);
    expect(isAllowed(r, UA, '/z')).toBe(true);
    expect(isAllowed(r, 'a', '/x')).toBe(false);
  });

  it('retient la règle la plus longue ; Allow gagne à égalité', () => {
    const r = parseRobots('User-agent: *\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /page\nAllow: /page\n');
    expect(isAllowed(r, UA, '/wp-admin/options.php')).toBe(false);
    expect(isAllowed(r, UA, '/wp-admin/admin-ajax.php')).toBe(true);
    expect(isAllowed(r, UA, '/page')).toBe(true);
  });

  it('gère les jokers * et $', () => {
    expect(patternMatches('/*?add-to-cart=', '/boutique?add-to-cart=12')).toBe(true);
    expect(patternMatches('/*?add-to-cart=', '/boutique')).toBe(false);
    expect(patternMatches('/*.pdf$', '/docs/a.pdf')).toBe(true);
    expect(patternMatches('/*.pdf$', '/docs/a.pdf?x=1')).toBe(false);
    expect(patternMatches('*?lightbox=', '/galerie?lightbox=3')).toBe(true);
    expect(patternMatches('/fish', '/fish.html')).toBe(true);
    expect(patternMatches('/fish/', '/fish')).toBe(false);
    const r = parseRobots('User-agent: *\nDisallow: /*?*\nAllow: /*?page=$\n');
    expect(isAllowed(r, UA, '/actualites?tri=date')).toBe(false);
    expect(isAllowed(r, UA, '/actualites')).toBe(true);
  });

  it('compare chemins et motifs après normalisation du pourcentage-encodage', () => {
    const r = parseRobots('User-agent: *\nDisallow: /inscription-sixième\n');
    expect(isAllowed(r, UA, '/inscription-sixi%C3%A8me')).toBe(false);
    expect(patternMatches('/%7Ejoe', '/~joe/index')).toBe(true);
  });

  it('ignore Disallow vide, commentaires, BOM, règles hors groupe et lit Crawl-delay', () => {
    const r = parseRobots('﻿Disallow: /orphelin\n# commentaire\nUser-Agent: * # tous\nDisallow:\nCrawl-delay: 5\n');
    expect(isAllowed(r, UA, '/orphelin')).toBe(true);
    expect(isAllowed(r, UA, '/n-importe-quoi')).toBe(true);
    expect(crawlDelay(r, UA)).toBe(5);
    expect(crawlDelay(ALLOW_ALL, UA)).toBeNull();
  });

  it('autorise toujours /robots.txt ; robots vide = tout permis ; DISALLOW_ALL = tout interdit', () => {
    expect(isAllowed(DISALLOW_ALL, UA, '/robots.txt')).toBe(true);
    expect(isAllowed(DISALLOW_ALL, UA, '/')).toBe(false);
    expect(isAllowed(parseRobots(''), UA, '/x')).toBe(true);
    expect(isAllowed(parseRobots('User-agent: autre\nDisallow: /\n'), UA, '/x')).toBe(true);
  });
});

describe('extraction du texte', () => {
  it('écarte scripts, styles, menus, boutons, bandeaux cookies et lit les entités', () => {
    const html = `<!doctype html><html><head><title>Titre</title><style>p{color:red}</style></head>
      <body class="footer-on-bottom">
        <a class="skip-link screen-reader-text" href="#main">Aller au contenu</a>
        <nav><ul><li><a href="/">Accueil</a></li><li>Inscriptions</li></ul></nav>
        <div class="menu"><div>Plan du site</div></div>
        <main><h1>Portes ouvertes</h1><p>Samedi&nbsp;14&nbsp;mars de 9h&nbsp;&agrave;&nbsp;12h &ndash; coll&#232;ge &amp; lyc&#xE9;e</p>
        <script>var x = "<p>caché</p>";</script><!-- commentaire --><button>Fermer</button>
        <img src="a.jpg" alt="Affiche des portes ouvertes"><img src="b.jpg" alt="IMG_2026.jpg"></main>
        <div id="tarteaucitronRoot">Gestion des cookies</div>
        <footer><p>Rentrée 2027-2028 : inscriptions le 1er octobre</p></footer>
      </body></html>`;
    expect(htmlToText(html)).toBe(
      [
        'Portes ouvertes',
        'Samedi 14 mars de 9h à 12h – collège & lycée',
        'Affiche des portes ouvertes',
        'Rentrée 2027-2028 : inscriptions le 1er octobre',
      ].join('\n'),
    );
  });

  it('garde le contenu des fenêtres surgissantes (aria-hidden, dialog)', () => {
    const html = '<div aria-hidden="true"><div role="dialog"><p>JPO le 21 novembre</p></div></div>';
    expect(htmlToText(html)).toBe('JPO le 21 novembre');
  });

  it('gère les éléments imbriqués du même nom dans un bloc écarté', () => {
    const html = '<div class="nav"><div><div>a</div></div><div>b</div></div><p>texte</p>';
    expect(htmlToText(html)).toBe('texte');
  });

  it("résiste à une apostrophe isolée dans une balise", () => {
    expect(htmlToText("<p class=l'intro>Bonjour</p><p>Portes ouvertes le 3 octobre</p>")).toContain(
      'Portes ouvertes le 3 octobre',
    );
  });

  it('écarte les mentions relatives (« il y a 2 semaines ») et les lignes vides', () => {
    expect(normalizeText('AG FCPE\nil y a 2 semaines\n\n  Café   des parents \nPublié il y a 1 mois')).toBe(
      'AG FCPE\nCafé des parents',
    );
    expect(
      normalizeText("Menus du 05/10\nhier, à 12:56\nlundi, à 11:32\nil y a plus d'un an\n05/10/2026 à 9h30\nJPO lundi 12 octobre"),
    ).toBe('Menus du 05/10\nJPO lundi 12 octobre');
  });

  it('écarte les jetons opaques des blocs masqués (Jalios, CSRF) mais pas les noms de documents', () => {
    const html =
      '<p>Matinée portes ouvertes</p><div id="AjaxCtxtDeflate" style="display:none;">eNq1mN9v2jAQx9/5K6K8E5NqXWEKVBtrN6RWYxS0aS+VcY5i5tqpf==</div>' +
      '<div id="CSRFTokenElm" style="display:none;">7UGHPANVFVf24ZPq</div><p>Rodin-parcoursup-2025</p>';
    expect(htmlToText(html)).toBe('Matinée portes ouvertes\nRodin-parcoursup-2025');
    expect(isOpaqueToken('xgJtUBgVRDmW4tnh')).toBe(true);
    expect(isOpaqueToken('https://example.org/a')).toBe(false);
    expect(isOpaqueToken('INSCRIPTIONS2027')).toBe(false);
  });

  it('décode les entités nommées et numériques, laisse les inconnues', () => {
    expect(decodeEntities('&eacute;&#233;&#xE9;&rsquo;&foo;&amp;')).toBe('ééé’&foo;&');
  });

  it('lit un flux RSS Skolengo (titres, dates, résumés HTML échappés, liens)', () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Actualités</title>
      <lastBuildDate>Thu, 08 Oct 2026 06:00:00 GMT</lastBuildDate>
      <item><title>Les Portes Ouvertes du collège</title>
      <link>https://x.moncollege.valdemarne.fr/actu-1.htm</link>
      <description>Le jeudi 2 avril, le coll&#232;ge a ouvert ses portes aux futurs &#233;l&#232;ves de 6e.&lt;table&gt;&lt;td&gt;Fichiers&lt;/td&gt;&lt;/table&gt;</description>
      <pubDate>Sun, 05 Apr 2026 17:20:38 GMT</pubDate></item>
      <item><title><![CDATA[Café des parents]]></title><link>https://x/actu-2.htm</link></item>
      </channel></rss>`;
    expect(isFeed(xml)).toBe(true);
    expect(isFeed('<html><body>rss</body></html>')).toBe(false);
    const text = feedToText(xml);
    expect(text).toContain('Les Portes Ouvertes du collège (Sun, 05 Apr 2026 17:20:38 GMT)');
    expect(text).toContain('Le jeudi 2 avril, le collège a ouvert ses portes aux futurs élèves de 6e.');
    expect(text).toContain('https://x.moncollege.valdemarne.fr/actu-1.htm');
    expect(text).toContain('Café des parents');
    expect(text).not.toContain('lastBuildDate');
    expect(text).not.toContain('08 Oct 2026');
  });

  it("détecte l'encodage déclaré", () => {
    expect(detectCharset('text/html; charset=ISO-8859-1', '')).toBe('windows-1252');
    expect(detectCharset(null, '<meta charset="windows-1252">')).toBe('windows-1252');
    expect(detectCharset('text/html', '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">')).toBe('utf-8');
    expect(detectCharset(null, '')).toBe('utf-8');
  });
});

describe('mots-clés et extraits', () => {
  it('replie les accents sans décaler les positions', () => {
    const s = 'Réunion d’information – 6ème';
    expect(foldForSearch(s)).toHaveLength(s.length);
    expect(foldForSearch(s)).toBe('reunion d’information – 6eme');
  });

  it('reconnaît les mots-clés suivis', () => {
    for (const s of [
      'Journée Portes Ouvertes',
      'JPO samedi',
      'Pré-inscriptions ouvertes',
      'élèves de CM2',
      'entrée en 6ème',
      'en 6e',
      'futurs sixièmes',
      "Réunion d'information",
      'rentrée 2027',
      'année 2027-2028',
    ]) {
      expect(hasKeyword(s, 2027), s).toBe(true);
    }
    for (const s of ['classe de 6e5', 'Concours d’affiches', 'rentrée 2026', 'section 26e']) {
      expect(hasKeyword(s, 2027), s).toBe(false);
    }
  });

  it('extrait les lignes utiles et complète les titres courts par la ligne suivante', () => {
    const text = [
      'Accueil',
      'Inscriptions', // entrée de menu : écartée (pas de chiffre, trop court)
      'Contact',
      'Vidéo réalisée par des élèves.',
      'RENTRÉE 2027-2028',
      'Les inscriptions ouvriront le jeudi 1er octobre 2026.',
      'Portes ouvertes',
      'Samedi 21 mars, 9h-12h',
    ].join('\n');
    expect(keywordSnippets(text, { rentree: 2027 })).toEqual([
      'RENTRÉE 2027-2028 / Les inscriptions ouvriront le jeudi 1er octobre 2026.',
      'Portes ouvertes / Samedi 21 mars, 9h-12h',
    ]);
  });

  it('coupe les lignes longues autour du mot-clé et borne la longueur', () => {
    const long = 'a'.repeat(300) + ' Journée portes ouvertes le 14 novembre ' + 'b'.repeat(300);
    const [snippet] = keywordSnippets(long, { rentree: 2027, radius: 40 });
    expect(snippet.startsWith('…')).toBe(true);
    expect(snippet.endsWith('…')).toBe(true);
    expect(snippet).toContain('portes ouvertes le 14 novembre');
    const excerpt = buildExcerpt(Array.from({ length: 30 }, (_, i) => `Inscription en 6e numéro ${i}`).join('\n'), {
      rentree: 2027,
      maxLength: 120,
    });
    expect(excerpt.length).toBeLessThanOrEqual(120);
  });
});

describe('détection des changements', () => {
  it('classe une page nouvelle, inchangée ou modifiée', () => {
    const prev = { hash: sha256('a'), checkedAt: '2026-10-01', changedAt: '2026-09-01', excerpt: '' };
    expect(classify(undefined, sha256('a'))).toBe('nouvelle');
    expect(classify(prev, sha256('a'))).toBe('inchangee');
    expect(classify(prev, sha256('b'))).toBe('modifiee');
    expect(nextEntry(prev, sha256('a'), 'x', '2026-10-08')).toEqual({ ...prev, checkedAt: '2026-10-08', excerpt: 'x' });
    expect(nextEntry(prev, sha256('b'), 'x', '2026-10-08').changedAt).toBe('2026-10-08');
    expect(nextEntry(undefined, sha256('b'), '', '2026-10-08').changedAt).toBe('2026-10-08');
    expect(sha256('a')).toMatch(/^[0-9a-f]{64}$/);
  });

  it('liste les lignes ajoutées et les passages nouveaux', () => {
    expect(newLines('a\nb\nc', 'a\nx\nb\nx\ny')).toEqual(['x', 'y']);
    expect(newSnippets('JPO le 3 … Inscriptions en 6e', 'JPO le 3 … Inscriptions en 6e … JPO le 10')).toEqual(['JPO le 10']);
  });

  it('ne cite que les passages nouveaux contenant un mot-clé', () => {
    const h = changeHighlights({
      oldText: 'Accueil\nPortes ouvertes le 7 février 2026',
      newText: 'Accueil\nPortes ouvertes le 6 février 2027\nVidéo réalisée par Jeanne Martin',
      oldExcerpt: '',
      newExcerpt: '',
      rentree: 2027,
    });
    expect(h).toEqual({ snippets: ['Portes ouvertes le 6 février 2027'], addedLines: 2 });
    const sansCache = changeHighlights({
      oldText: null,
      newText: '',
      oldExcerpt: 'Portes ouvertes le 7 février 2026',
      newExcerpt: 'Portes ouvertes le 6 février 2027',
      rentree: 2027,
    });
    expect(sansCache).toEqual({ snippets: ['Portes ouvertes le 6 février 2027'], addedLines: null });
  });

  it("élague l'état des URL qui ne sont plus surveillées et le trie", () => {
    const e = { hash: 'h', checkedAt: 'd', changedAt: 'd', excerpt: '' };
    expect(Object.keys(pruneState({ 'https://b': e, 'https://a': e, 'https://old': e }, ['https://a', 'https://b']))).toEqual([
      'https://a',
      'https://b',
    ]);
  });
});

describe('cibles et résumé', () => {
  const watch: WatchFile = {
    discovery: [{ label: 'Recherche', url: 'https://pia/search', note: 'n' }],
    colleges: {
      '0752925X': [{ url: 'https://isg6/inscriptions', label: 'Sainte-Geneviève — inscriptions' }],
      '0752924W': [{ url: 'https://isg6/inscriptions', label: 'Saint-Sulpice — inscriptions' }],
      '0752799K': [{ url: 'https://exclu', label: 'Exclu' }],
    },
  };

  it('regroupe les URL partagées et écarte les UAI exclus', () => {
    const t = buildTargets(watch, new Set(['0752799K']));
    expect([...t.keys()]).toEqual(['https://pia/search', 'https://isg6/inscriptions']);
    expect(t.get('https://isg6/inscriptions')!.map((o) => o.uai)).toEqual(['0752924W', '0752925X']);
  });

  it('produit un résumé Markdown lisible et neutralise les mentions', () => {
    const owners = buildTargets(watch, new Set());
    const results: PageResult[] = [
      {
        url: 'https://isg6/inscriptions',
        owners: owners.get('https://isg6/inscriptions')!,
        kind: 'modifiee',
        highlights: { snippets: ['Portes ouvertes le 6 février 2027 @college #12'], addedLines: 3 },
      },
      { url: 'https://pia/search', owners: owners.get('https://pia/search')!, kind: 'modifiee', highlights: { snippets: [], addedLines: 1 } },
      { url: 'https://exclu', owners: owners.get('https://exclu')!, kind: 'robots', detail: 'chemin interdit' },
    ];
    expect(countResults(results)).toMatchObject({ total: 3, changed: 2, relevant: 1, robots: 1, errors: 0 });
    const md = renderSummary(results, { date: '2026-10-12', names: { '0752925X': 'Collège privé Sainte-Geneviève' } });
    expect(md).toContain('## Surveillance des pages de portes ouvertes (2026-10-12)');
    expect(md).toContain('**Collège privé Sainte-Geneviève** (0752925X) : [Sainte-Geneviève — inscriptions](https://isg6/inscriptions)');
    expect(md).toContain('> Portes ouvertes le 6 février 2027 @​college #​12');
    expect(md).toContain('### Sources de découverte modifiées');
    expect(md).toContain('sans passage nouveau sur les mots-clés suivis (1 ligne ajoutée)');
    expect(md).toContain('### À vérifier à la main (interdit par robots.txt)');
    expect(escapeMarkdown('a_b*c [d](e) <f>')).toBe('a\\_b\\*c \\[d\\](e) &lt;f&gt;');
    const search = renderSummary(
      [{ url: 'https://pia/s?text=(CM2+OR+6e)', owners: [{ url: 'https://pia/s?text=(CM2+OR+6e)', label: 'Recherche', uai: null }], kind: 'nouvelle' }],
      { date: '2026-10-12', names: {} },
    );
    expect(search).toContain('[Recherche](https://pia/s?text=%28CM2+OR+6e%29)');
  });
});

describe('data/overrides', () => {
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/config.json'), 'utf8')) as {
    exclure: string[];
    saisonCourante: string;
  };

  it('events.json respecte le contrat EventsFile', () => {
    const events = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/overrides/events.json'), 'utf8'));
    expect(validateEventsFile(events, config.exclure)).toEqual([]);
    expect(events.saisonCourante).toBe(config.saisonCourante);
  });

  it('le validateur signale les écarts', () => {
    const bad = {
      saisonCourante: '2026-28',
      events: [
        { id: 'x', uai: '123', academie: 'Paris', type: 'fete', date: '2026-02-30', dateFin: '2026-01-01', heureDebut: '25:00', heureFin: null, titre: '', inscriptionRequise: 'oui', saison: '2026-27', source: 'pas une url', verifieLe: '2026-10-07', confiance: 'forte' },
        { id: 'x', uai: null, academie: null, type: 'officiel', date: '2026-01-01', dateFin: null, heureDebut: null, heureFin: null, titre: 't', inscriptionRequise: null, saison: '2025-26', source: 'https://a', verifieLe: '2026-10-07', confiance: 'haute' },
      ],
      inscriptions: { '0752799K': { statut: 'peut-être', constateLe: 'hier', detail: '', source: 'x' } },
    };
    const errors = validateEventsFile(bad, ['0752799K']).join('\n');
    for (const fragment of [
      'saisonCourante invalide',
      'type inconnu fete',
      'UAI invalide 123',
      'date invalide 2026-02-30',
      'heureDebut invalide',
      'titre vide',
      'inscriptionRequise',
      'source doit être une URL',
      'confiance invalide',
      'id en double',
      'académie attendue',
      'inscriptions.0752799K : UAI exclu',
      'statut inconnu',
      'constateLe invalide',
    ]) {
      expect(errors).toContain(fragment);
    }
  });

  it('watch.json : 1 à 3 pages par collège, URL valides, aucun UAI exclu, pas de /serail/upload/', () => {
    const watchFile = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/overrides/watch.json'), 'utf8')) as WatchFile;
    expect(watchFile.discovery.length).toBeGreaterThan(0);
    for (const d of watchFile.discovery) {
      expect(() => new URL(d.url)).not.toThrow();
      expect(d.label && d.note).toBeTruthy();
    }
    for (const [uai, pages] of Object.entries(watchFile.colleges)) {
      expect(uai).toMatch(/^\d{7}[A-Z]$/);
      expect(config.exclure).not.toContain(uai);
      expect(pages.length).toBeGreaterThanOrEqual(1);
      expect(pages.length).toBeLessThanOrEqual(3);
      for (const p of pages) {
        expect(new URL(p.url).protocol).toMatch(/^https?:$/);
        expect(p.url).not.toContain('/serail/upload/');
        expect(p.label).toBeTruthy();
      }
    }
  });
});
