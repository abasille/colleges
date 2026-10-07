// Outils géométriques minimaux : arrondi des coordonnées et simplification Douglas–Peucker.

export type Position = [number, number];
export type Ring = Position[];

export interface PolygonGeometry {
  type: 'Polygon';
  coordinates: Ring[];
}
export interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: Ring[][];
}
export type SurfaceGeometry = PolygonGeometry | MultiPolygonGeometry;

export interface Feature<P> {
  type: 'Feature';
  properties: P;
  geometry: SurfaceGeometry;
}
export interface FeatureCollection<P> {
  type: 'FeatureCollection';
  features: Feature<P>[];
}

function sqSegDist(p: Position, a: Position, b: Position, kx: number): number {
  let x = a[0] * kx;
  let y = a[1];
  let dx = b[0] * kx - x;
  let dy = b[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] * kx - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = b[0] * kx;
      y = b[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p[0] * kx - x;
  dy = p[1] - y;
  return dx * dx + dy * dy;
}

/**
 * Douglas–Peucker sur une polyligne (lon, lat). `tolerance` en degrés de latitude ;
 * les longitudes sont mises à l'échelle par cos(latitude) pour une tolérance isotrope.
 */
export function simplifyLine(points: Position[], tolerance: number): Position[] {
  if (points.length <= 2) return points.slice();
  const lat0 = points[0][1];
  const kx = Math.cos((lat0 * Math.PI) / 180);
  const sqTol = tolerance * tolerance;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack: [number, number][] = [[0, points.length - 1]];
  while (stack.length) {
    const [first, last] = stack.pop()!;
    let maxSq = 0;
    let index = -1;
    for (let i = first + 1; i < last; i++) {
      const d = sqSegDist(points[i], points[first], points[last], kx);
      if (d > maxSq) {
        maxSq = d;
        index = i;
      }
    }
    if (index !== -1 && maxSq > sqTol) {
      keep[index] = 1;
      stack.push([first, index], [index, last]);
    }
  }
  return points.filter((_, i) => keep[i] === 1);
}

export function roundPosition(p: Position, decimals: number): Position {
  const f = 10 ** decimals;
  return [Math.round(p[0] * f) / f, Math.round(p[1] * f) / f];
}

function dedupe(ring: Ring): Ring {
  const out: Ring = [];
  for (const p of ring) {
    const prev = out[out.length - 1];
    if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) out.push(p);
  }
  return out;
}

/** Simplifie puis arrondit un anneau fermé ; renvoie null s'il dégénère (< 4 points). */
export function simplifyRing(ring: Ring, tolerance: number, decimals: number): Ring | null {
  if (ring.length < 4) return null;
  // Un anneau fermé a premier = dernier point : on simplifie en deux moitiés pour garder sa forme.
  const mid = Math.floor(ring.length / 2);
  const a = simplifyLine(ring.slice(0, mid + 1), tolerance);
  const b = simplifyLine(ring.slice(mid), tolerance);
  let out = dedupe([...a, ...b.slice(1)].map((p) => roundPosition(p, decimals)));
  const first = out[0];
  const last = out[out.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) out.push([first[0], first[1]]);
  if (out.length < 4) {
    // Trop simplifié : on garde l'anneau seulement arrondi.
    out = dedupe(ring.map((p) => roundPosition(p, decimals)));
    if (out.length < 4) return null;
  }
  return out;
}

/** Aire approximative d'un anneau (lon, lat) en m² (projection équirectangulaire locale). */
export function ringArea(ring: Ring): number {
  if (ring.length < 3) return 0;
  const lat0 = ring[0][1];
  const kx = Math.cos((lat0 * Math.PI) / 180) * 111_320;
  const ky = 110_540;
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i][0] * kx * (ring[i + 1][1] * ky) - ring[i + 1][0] * kx * (ring[i][1] * ky);
  }
  return Math.abs(a / 2);
}

export interface SimplifyOptions {
  /** Trous plus petits que cette aire (m²) supprimés. */
  minHoleArea?: number;
  /** Polygones plus petits que cette aire (m²) supprimés. */
  minPolygonArea?: number;
}

export function simplifyGeometry(g: SurfaceGeometry, tolerance: number, decimals: number, opts: SimplifyOptions = {}): SurfaceGeometry | null {
  const simplifyPolygon = (rings: Ring[]): Ring[] | null => {
    if (opts.minPolygonArea && ringArea(rings[0]) < opts.minPolygonArea) return null;
    const outer = simplifyRing(rings[0], tolerance, decimals);
    if (!outer) return null;
    const holes = rings
      .slice(1)
      .filter((r) => !opts.minHoleArea || ringArea(r) >= opts.minHoleArea)
      .map((r) => simplifyRing(r, tolerance, decimals))
      .filter((r): r is Ring => r !== null);
    return [outer, ...holes];
  };
  if (g.type === 'Polygon') {
    const c = simplifyPolygon(g.coordinates);
    return c ? { type: 'Polygon', coordinates: c } : null;
  }
  const polys = g.coordinates.map(simplifyPolygon).filter((p): p is Ring[] => p !== null);
  if (polys.length === 0) return null;
  if (polys.length === 1) return { type: 'Polygon', coordinates: polys[0] };
  return { type: 'MultiPolygon', coordinates: polys };
}

export function countPositions(g: SurfaceGeometry): number {
  if (g.type === 'Polygon') return g.coordinates.reduce((n, r) => n + r.length, 0);
  return g.coordinates.reduce((n, p) => n + p.reduce((m, r) => m + r.length, 0), 0);
}
