// Résumé Markdown d'un passage de surveillance (sortie standard, fichier --summary, ticket GitHub).
import type { Highlights } from './diff';

export interface WatchTarget {
  url: string;
  label: string;
  uai: string | null; // null pour une source de découverte
  note?: string;
}

export type ResultKind = 'nouvelle' | 'modifiee' | 'inchangee' | 'robots' | 'erreur';

export interface PageResult {
  url: string;
  owners: WatchTarget[];
  kind: ResultKind;
  detail?: string; // message d'erreur ou raison du refus robots.txt
  highlights?: Highlights;
}

export interface SummaryCounts {
  total: number;
  changed: number;
  relevant: number; // pages modifiées avec au moins un passage nouveau sur les mots-clés
  fresh: number;
  robots: number;
  errors: number;
}

export function countResults(results: PageResult[]): SummaryCounts {
  const by = (k: ResultKind) => results.filter((r) => r.kind === k).length;
  return {
    total: results.length,
    changed: by('modifiee'),
    relevant: results.filter((r) => r.kind === 'modifiee' && (r.highlights?.snippets.length ?? 0) > 0).length,
    fresh: by('nouvelle'),
    robots: by('robots'),
    errors: by('erreur'),
  };
}

/** Neutralise la mise en forme Markdown et les mentions (@, #123) d'un texte venu d'une page web. */
export function escapeMarkdown(s: string): string {
  return s
    .replace(/[\\`*_[\]<>|]/g, (c) => (c === '<' ? '&lt;' : c === '>' ? '&gt;' : '\\' + c))
    .replace(/@/g, '@​')
    .replace(/#(?=\d)/g, '#​');
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

function link(t: WatchTarget): string {
  // Parenthèses et espaces encodés : l'URL ne doit pas fermer le lien Markdown.
  const href = t.url.replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/ /g, '%20');
  return `[${escapeMarkdown(t.label)}](${href})`;
}

function ownerName(t: WatchTarget, names: Record<string, string>): string {
  if (!t.uai) return 'Source de découverte';
  return `**${escapeMarkdown(names[t.uai] ?? t.uai)}** (${t.uai})`;
}

function quote(snippets: string[]): string[] {
  return snippets.map((s) => `  > ${escapeMarkdown(truncate(s, 320))}`);
}

export function renderSummary(results: PageResult[], opts: { date: string; names: Record<string, string> }): string {
  const c = countResults(results);
  const lines: string[] = [];
  lines.push(`## Surveillance des pages de portes ouvertes (${opts.date})`, '');
  const parts = [
    `${c.total} pages surveillées`,
    `${c.changed} modifiée${c.changed > 1 ? 's' : ''} (dont ${c.relevant} avec des passages nouveaux sur les portes ouvertes, inscriptions, CM2 ou la 6e)`,
    `${c.errors} en erreur`,
    `${c.robots} interdite${c.robots > 1 ? 's' : ''} par robots.txt`,
  ];
  if (c.fresh) parts.push(`${c.fresh} vérifiée${c.fresh > 1 ? 's' : ''} pour la première fois`);
  lines.push(parts.join(' · ') + '.', '');

  const changed = results.filter((r) => r.kind === 'modifiee');
  const byRelevance = (a: PageResult, b: PageResult) =>
    (b.highlights?.snippets.length ? 1 : 0) - (a.highlights?.snippets.length ? 1 : 0);

  const colleges = changed.filter((r) => r.owners.some((o) => o.uai)).sort(byRelevance);
  if (colleges.length) {
    lines.push('### Pages de collèges modifiées', '');
    for (const r of colleges) {
      for (const o of r.owners.filter((x) => x.uai)) {
        lines.push(`- ${ownerName(o, opts.names)} : ${link(o)}`);
      }
      lines.push(...describeChange(r));
    }
    lines.push('');
  }

  const discovery = changed.filter((r) => r.owners.every((o) => !o.uai)).sort(byRelevance);
  if (discovery.length) {
    lines.push('### Sources de découverte modifiées', '');
    for (const r of discovery) {
      lines.push(`- ${link(r.owners[0])}`);
      lines.push(...describeChange(r));
    }
    lines.push('');
  }

  const robots = results.filter((r) => r.kind === 'robots');
  if (robots.length) {
    lines.push('### À vérifier à la main (interdit par robots.txt)', '');
    for (const r of robots) {
      const o = r.owners[0];
      lines.push(`- ${ownerName(o, opts.names)} : ${link(o)}${r.detail ? ` (${escapeMarkdown(r.detail)})` : ''}`);
    }
    lines.push('');
  }

  const errors = results.filter((r) => r.kind === 'erreur');
  if (errors.length) {
    lines.push('### Erreurs', '');
    for (const r of errors) {
      const o = r.owners[0];
      lines.push(`- ${ownerName(o, opts.names)} : ${link(o)} : ${escapeMarkdown(r.detail ?? 'erreur')}`);
    }
    lines.push('');
  }

  const fresh = results.filter((r) => r.kind === 'nouvelle');
  if (fresh.length) {
    lines.push(`<details><summary>Première vérification (${fresh.length} pages)</summary>`, '');
    for (const r of fresh) lines.push(`- ${ownerName(r.owners[0], opts.names)} : ${link(r.owners[0])}`);
    lines.push('', '</details>', '');
  }

  if (!changed.length && !robots.length && !errors.length && !fresh.length) {
    lines.push('Aucun changement.', '');
  }
  return lines.join('\n');
}

function describeChange(r: PageResult): string[] {
  const h = r.highlights;
  if (h?.snippets.length) return quote(h.snippets);
  const added = h?.addedLines;
  return [`  - modifiée, sans passage nouveau sur les mots-clés suivis${added ? ` (${added} ligne${added > 1 ? 's' : ''} ajoutée${added > 1 ? 's' : ''})` : ''}`];
}
