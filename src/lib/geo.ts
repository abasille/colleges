export type Position = [number, number]; // [lon, lat]

export interface PolygonGeometry {
  type: 'Polygon';
  coordinates: Position[][];
}
export interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: Position[][][];
}
export type AreaGeometry = PolygonGeometry | MultiPolygonGeometry;

/** Distance à vol d'oiseau en kilomètres. */
export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function inRing(lon: number, lat: number, ring: Position[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function inPolygon(lon: number, lat: number, rings: Position[][]): boolean {
  if (!rings.length || !inRing(lon, lat, rings[0])) return false;
  for (let k = 1; k < rings.length; k++) if (inRing(lon, lat, rings[k])) return false;
  return true;
}

export function pointInGeometry(lon: number, lat: number, g: AreaGeometry): boolean {
  if (g.type === 'Polygon') return inPolygon(lon, lat, g.coordinates);
  return g.coordinates.some((p) => inPolygon(lon, lat, p));
}

/** Distance approximative (mètres) d'un point au contour le plus proche d'une géométrie (projection équirectangulaire locale). */
export function distanceToGeometryM(lon: number, lat: number, g: AreaGeometry): number {
  const kx = 111_320 * Math.cos((lat * Math.PI) / 180);
  const ky = 110_540;
  let best = Infinity;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  for (const rings of polys) {
    for (const ring of rings) {
      for (let i = 1; i < ring.length; i++) {
        const ax = (ring[i - 1][0] - lon) * kx;
        const ay = (ring[i - 1][1] - lat) * ky;
        const bx = (ring[i][0] - lon) * kx;
        const by = (ring[i][1] - lat) * ky;
        const dx = bx - ax;
        const dy = by - ay;
        const len2 = dx * dx + dy * dy;
        const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, -(ax * dx + ay * dy) / len2));
        const d = Math.hypot(ax + t * dx, ay + t * dy);
        if (d < best) best = d;
      }
    }
  }
  return best;
}
