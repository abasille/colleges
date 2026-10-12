import L from 'leaflet';
import type { CollegeResume } from '../types';
import { rayonDuPoint, type PointCarte } from '../lib/carte';

/*
 * Points des collèges dessinés dans un seul canvas Leaflet : aucun élément DOM par collège.
 * Chaque point est créé une fois ; un changement de filtre, de coloration, de sélection ou de favori
 * ne fait que redessiner les points dont l'apparence change.
 */

type Apparence = Omit<PointCarte, 'uai'>;

/** Champs internes de Leaflet utilisés pour dessiner soi-même dans le canvas (Leaflet 1.9). */
interface Interne {
  _renderer: { _ctx: CanvasRenderingContext2D; _drawing: boolean };
  _point: L.Point;
  _radius: number;
  _pxBounds: L.Bounds;
  _empty(): boolean;
  _clickTolerance(): number;
}

const SECTEUR = '#16a34a';
const ETOILE = '#eab308';
const SELECTION = '#18181b';
const ATTENUATION = 0.35;
/** Débord du dessin au-delà du rayon (anneau du secteur, halo de sélection, étoile du favori). */
const DEBORD = 8;

function rayon(a: Apparence, zoom: number): number {
  const r = rayonDuPoint(zoom);
  return a.selectionne ? Math.round(Math.max(r * 1.5, 9)) : r;
}

class PointCollege extends L.CircleMarker {
  uai: string;
  apparence: Apparence;

  constructor(c: CollegeResume, apparence: Apparence, zoom: number, renderer: L.Canvas) {
    super([c.lat, c.lon], { renderer, radius: rayon(apparence, zoom), weight: 2 });
    this.uai = c.uai;
    this.apparence = apparence;
  }

  /** Appelé par le canvas pour dessiner le point. */
  _updatePath() {
    const self = this as unknown as Interne;
    if (!self._renderer._drawing || self._empty()) return;
    dessiner(self._renderer._ctx, self._point, self._radius, this.apparence);
  }

  /** Emprise en pixels, élargie pour que les redessins partiels n'oublient ni l'anneau ni l'étoile. */
  _updateBounds() {
    const self = this as unknown as Interne;
    const m = self._radius + DEBORD + self._clickTolerance();
    self._pxBounds = L.bounds(self._point.subtract([m, m]), self._point.add([m, m]));
  }
}

function cercle(ctx: CanvasRenderingContext2D, p: L.Point, r: number) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
}

function dessiner(ctx: CanvasRenderingContext2D, p: L.Point, r: number, a: Apparence) {
  const bord = r >= 6 ? 2 : 1;
  ctx.globalAlpha = a.attenue ? ATTENUATION : 1;
  if (a.secteur) {
    cercle(ctx, p, r + bord + 3);
    ctx.setLineDash([3, 2]);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = SECTEUR;
    ctx.stroke();
    ctx.setLineDash([]);
  }
  if (a.selectionne) {
    cercle(ctx, p, r + 4);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
  }
  // Liseré sombre discret : remplace l'ombre portée des anciens marqueurs.
  cercle(ctx, p, r + bord / 2 + 0.5);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.stroke();
  cercle(ctx, p, r);
  ctx.fillStyle = a.couleur;
  ctx.fill();
  ctx.lineWidth = a.selectionne ? 3 : bord;
  ctx.strokeStyle = a.selectionne ? SELECTION : '#fff';
  ctx.stroke();
  if (a.favori) etoile(ctx, p.x + r * 0.8, p.y - r * 0.8, Math.max(4, r * 0.75));
  ctx.globalAlpha = 1;
}

function etoile(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * 0.45 : r;
    const ang = -Math.PI / 2 + (i * Math.PI) / 5;
    ctx[i ? 'lineTo' : 'moveTo'](x + rr * Math.cos(ang), y + rr * Math.sin(ang));
  }
  ctx.closePath();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.fillStyle = ETOILE;
  ctx.fill();
}

function memeApparence(a: Apparence, b: Apparence): boolean {
  return a.couleur === b.couleur && a.attenue === b.attenue && a.selectionne === b.selectionne && a.favori === b.favori && a.secteur === b.secteur;
}

export interface RappelsPoints {
  /** Clic sur un point. */
  ouvrir: (uai: string) => void;
  /** Contenu de la bulle affichée au survol. */
  bulle: (uai: string) => HTMLElement;
}

/** Couche des points des collèges, pilotée par MapView. */
export class CouchePoints {
  private readonly map: L.Map;
  private readonly renderer: L.Canvas;
  private readonly groupe = L.featureGroup(); // FeatureGroup : relaie les événements de ses points
  private readonly bulle = L.tooltip({ direction: 'top', opacity: 1 });
  private readonly parUai: Map<string, CollegeResume>;
  private readonly points = new Map<string, PointCollege>();
  private ordre: string[] = [];
  private zoom: number;

  constructor(map: L.Map, colleges: CollegeResume[], rappels: RappelsPoints) {
    this.map = map;
    this.parUai = new Map(colleges.map((c) => [c.uai, c]));
    this.zoom = map.getZoom();
    const pane = map.getPane('colleges') ?? map.createPane('colleges');
    pane.style.zIndex = '450'; // au-dessus des polygones (400), sous le domicile (600) et les bulles (650)
    this.renderer = L.canvas({ pane: 'colleges', padding: 0.5, tolerance: L.Browser.mobile ? 6 : 2 });
    this.groupe.addTo(map);
    this.groupe.on('click', (e) => rappels.ouvrir((e.propagatedFrom as PointCollege).uai));
    this.groupe.on('mouseover', (e) => {
      const p = e.propagatedFrom as PointCollege;
      this.bulle.options.offset = L.point(0, -p.getRadius() - 2);
      this.bulle.setLatLng(p.getLatLng()).setContent(rappels.bulle(p.uai));
      map.openTooltip(this.bulle);
    });
    this.groupe.on('mouseout', this.fermerBulle);
    map.on('movestart', this.fermerBulle);
    map.on('zoomend', this.surZoom);
  }

  private fermerBulle = () => {
    this.map.closeTooltip(this.bulle);
  };

  private surZoom = () => {
    const zoom = this.map.getZoom();
    if (rayonDuPoint(zoom) === rayonDuPoint(this.zoom)) {
      this.zoom = zoom;
      return;
    }
    this.zoom = zoom;
    for (const p of this.points.values()) p.setRadius(rayon(p.apparence, zoom));
  };

  /** Applique l'apparence et l'ordre de dessin ; seuls les points modifiés sont redessinés. */
  mettreAJour(points: PointCarte[]) {
    for (const { uai, ...apparence } of points) {
      const existant = this.points.get(uai);
      if (!existant) {
        const c = this.parUai.get(uai);
        if (!c) continue;
        const p = new PointCollege(c, apparence, this.zoom, this.renderer);
        this.points.set(uai, p);
        this.groupe.addLayer(p);
      } else if (!memeApparence(existant.apparence, apparence)) {
        existant.apparence = apparence;
        existant.setRadius(rayon(apparence, this.zoom)); // redessine
      }
    }
    const ordre = points.map((p) => p.uai);
    if (ordre.length !== this.ordre.length || ordre.some((uai, i) => uai !== this.ordre[i])) {
      for (const uai of ordre) this.points.get(uai)?.bringToFront();
      this.ordre = ordre;
    }
  }

  retirer() {
    this.fermerBulle();
    this.map.off('movestart', this.fermerBulle);
    this.map.off('zoomend', this.surZoom);
    this.groupe.remove();
    this.renderer.remove();
  }
}
