import { formatNombre } from '../lib/format';

interface Point {
  annee: number;
  valeur: number | null;
}

interface Props {
  points: Point[];
  label: string;
  decimales?: number;
  unite?: string;
  reference?: { valeur: number; label: string } | null;
  /** Année à partir de laquelle la méthode change (trait vertical pointillé). */
  rupture?: { annee: number; label: string } | null;
  color?: string;
}

/** Petit graphique d'évolution en SVG, sans dépendance. */
export function LineChart({ points, label, decimales = 0, unite = '', reference = null, rupture = null, color = '#2563eb' }: Props) {
  const pts = points.filter((p): p is { annee: number; valeur: number } => p.valeur !== null);
  if (pts.length < 2) return null;
  const W = 320;
  const H = 110;
  const m = { l: 34, r: 10, t: 10, b: 20 };
  const xs = points.map((p) => p.annee);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  const vals = [...pts.map((p) => p.valeur), ...(reference ? [reference.valeur] : [])];
  let y0 = Math.min(...vals);
  let y1 = Math.max(...vals);
  const pad = (y1 - y0) * 0.15 || Math.abs(y1) * 0.05 || 1;
  y0 -= pad;
  y1 += pad;
  const X = (a: number) => m.l + ((a - x0) / Math.max(1, x1 - x0)) * (W - m.l - m.r);
  const Y = (v: number) => m.t + (1 - (v - y0) / (y1 - y0)) * (H - m.t - m.b);
  // Segments interrompus en cas d'année manquante.
  const segments: string[] = [];
  let cur = '';
  for (const p of points) {
    if (p.valeur === null) {
      if (cur) segments.push(cur);
      cur = '';
      continue;
    }
    cur += `${cur ? 'L' : 'M'}${X(p.annee).toFixed(1)},${Y(p.valeur).toFixed(1)}`;
  }
  if (cur) segments.push(cur);
  const fmt = (v: number) => `${formatNombre(v, decimales)}${unite}`;
  const ticks = [y0 + pad, (y0 + y1) / 2, y1 - pad];
  const xLabels = [...new Set([x0, x1, ...(rupture ? [rupture.annee] : [])])];
  return (
    <figure className="mt-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${label} : de ${fmt(pts[0].valeur)} en ${pts[0].annee} à ${fmt(pts[pts.length - 1].valeur)} en ${pts[pts.length - 1].annee}`}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={m.l} x2={W - m.r} y1={Y(t)} y2={Y(t)} stroke="#e4e4e7" strokeWidth={1} />
            <text x={m.l - 4} y={Y(t) + 3} textAnchor="end" fontSize={9} fill="#71717a">
              {formatNombre(t, decimales)}
            </text>
          </g>
        ))}
        {rupture && rupture.annee > x0 && (
          <g>
            <line x1={X(rupture.annee - 0.5)} x2={X(rupture.annee - 0.5)} y1={m.t} y2={H - m.b} stroke="#a1a1aa" strokeDasharray="3 3" />
            <title>{rupture.label}</title>
          </g>
        )}
        {reference && (
          <g>
            <line x1={m.l} x2={W - m.r} y1={Y(reference.valeur)} y2={Y(reference.valeur)} stroke="#a1a1aa" strokeDasharray="5 3" />
            <text x={W - m.r} y={Y(reference.valeur) - 3} textAnchor="end" fontSize={9} fill="#71717a">
              {reference.label}
            </text>
          </g>
        )}
        {segments.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        ))}
        {pts.map((p) => (
          <circle key={p.annee} cx={X(p.annee)} cy={Y(p.valeur)} r={2.5} fill={color}>
            <title>{`${p.annee} : ${fmt(p.valeur)}`}</title>
          </circle>
        ))}
        {xLabels.map((a) => (
          <text key={a} x={X(a)} y={H - 6} textAnchor="middle" fontSize={9} fill="#71717a">
            {a}
          </text>
        ))}
      </svg>
      <figcaption className="text-[11px] text-zinc-500">
        {label}
        {rupture && <> · pointillé : {rupture.label}</>}
      </figcaption>
    </figure>
  );
}
