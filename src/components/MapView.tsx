import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { GeoJSON, MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import type { CollegeResume, IndicateurKey } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { MISSING_COLOR, sequential, STATUT_COLORS } from '../lib/colors';
import { CADRAGE_ILE_DE_FRANCE, cadrageInitial, domaineDeCouleur, emprise, pointsDeLaCarte, type PointCarte } from '../lib/carte';
import { INDICATEURS, STATUT_LABELS } from '../lib/indicateurs';
import { formatIndicateur, nomCourt } from '../lib/format';
import type { ColorBy } from '../lib/url';
import { CLASSES_BADGE, COULEUR_SUIVI, couleursBadge, cx, TEXTE_SUIVI } from './ui';
import { ContoursCommunes } from './ContoursCommunes';
import { CouchePoints, type RappelsPoints } from './pointsColleges';

const COLOR_OPTIONS: { key: ColorBy; label: string }[] = [
  { key: 'statut', label: 'Statut' },
  ...(['note', 'brevet', 'noteEcrit', 'vaTaux', 'ips', 'effectif', 'elevesParClasse'] as IndicateurKey[]).map((k) => ({
    key: k,
    label: INDICATEURS[k].label,
  })),
];

const homeIcon = L.divIcon({ className: 'home-marker', iconSize: [24, 24], iconAnchor: [12, 20], html: '🏠' });

/** En deçà, la carte montre la région ou un département : on s'approche du collège sélectionné. */
const ZOOM_MIN_SELECTION = 11;

function FlyToSelected({ college }: { college: CollegeResume | null }) {
  const map = useMap();
  useEffect(() => {
    if (!college) return;
    const target = L.latLng(college.lat, college.lon);
    if (map.getZoom() < ZOOM_MIN_SELECTION || !map.getBounds().pad(-0.15).contains(target)) map.flyTo(target, Math.max(map.getZoom(), 14), { duration: 0.6 });
  }, [college, map]);
  return null;
}

/** Délai sans changement de filtre avant de recadrer : la carte ne saute pas à chaque frappe. */
const DELAI_CADRAGE_MS = 600;

const OPTIONS_CADRAGE: L.FitBoundsOptions = { padding: [32, 32], maxZoom: 15 };

/**
 * Cadre la carte sur les collèges retenus quand les filtres changent. À l'ouverture, la carte montre
 * l'Île-de-France, ou directement les collèges retenus si le lien porte des filtres (cadrageInitial).
 * Ensuite, un changement qui ne déplace pas l'emprise ne la fait pas bouger.
 */
function CadrageSurRetenus({ retenus }: { retenus: CollegeResume[] }) {
  const map = useMap();
  const filtres = useStore((s) => s.filters);
  const cible = useMemo(() => emprise(retenus), [retenus]);
  // Calculé une seule fois, avec les filtres lus dans l'URL.
  const [ouverture] = useState(() => cadrageInitial(filtres, retenus));
  const derniere = useRef<string | undefined>(undefined);
  useEffect(() => {
    const cle = JSON.stringify(cible);
    if (derniere.current === undefined) {
      derniere.current = cle;
      if (ouverture !== CADRAGE_ILE_DE_FRANCE) map.fitBounds(ouverture, { ...OPTIONS_CADRAGE, animate: false });
      return;
    }
    if (!cible || cle === derniere.current) return;
    const t = window.setTimeout(() => {
      derniere.current = cle;
      map.fitBounds(cible, OPTIONS_CADRAGE);
    }, DELAI_CADRAGE_MS);
    return () => window.clearTimeout(t);
  }, [cible, map, ouverture]);
  return null;
}

/** Points des collèges en canvas, créés une fois puis mis à jour (voir pointsColleges.ts). */
function PointsColleges({ colleges, points, rappels }: { colleges: CollegeResume[]; points: PointCarte[]; rappels: RappelsPoints }) {
  const map = useMap();
  const couche = useRef<CouchePoints | null>(null);
  const derniersRappels = useRef(rappels);
  useEffect(() => {
    derniersRappels.current = rappels;
  });
  useEffect(() => {
    const c = new CouchePoints(map, colleges, {
      ouvrir: (uai) => derniersRappels.current.ouvrir(uai),
      bulle: (uai) => derniersRappels.current.bulle(uai),
    });
    couche.current = c;
    return () => {
      c.retirer();
      couche.current = null;
    };
  }, [map, colleges]);
  useEffect(() => {
    couche.current?.mettreAJour(points);
  }, [points, colleges]);
  return null;
}

/** Leaflet doit recalculer sa taille quand son conteneur change (ouverture de la fiche, onglets mobiles). */
function InvalidateOnResize() {
  const map = useMap();
  useEffect(() => {
    const el = map.getContainer();
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => ro.disconnect();
  }, [map]);
  return null;
}

export function MapView({ onOpen }: { onOpen?: () => void }) {
  const { dataset, visibles, visiblesSet, byUai, secteur } = useData();
  const selected = useStore((s) => s.selected);
  const select = useStore((s) => s.select);
  const favoris = useStore((s) => s.favoris);
  const adresse = useStore((s) => s.adresse);
  const colorBy = useStore((s) => s.colorBy);
  const setColorBy = useStore((s) => s.setColorBy);
  const colleges = dataset.colleges;

  const domain = useMemo(() => domaineDeCouleur(colleges, colorBy), [colleges, colorBy]);
  const secteurUais = secteur?.uais;
  const points = useMemo(
    () => pointsDeLaCarte(colleges, { colorBy, retenus: visiblesSet, selectionne: selected, favoris, secteur: secteurUais ?? [] }),
    [colleges, colorBy, visiblesSet, selected, favoris, secteurUais],
  );
  const rappels: RappelsPoints = {
    ouvrir: (uai) => {
      select(uai);
      onOpen?.();
    },
    bulle: (uai) => {
      const c = byUai.get(uai);
      const el = document.createElement('div');
      if (!c) return el;
      const nom = el.appendChild(document.createElement('strong'));
      nom.textContent = nomCourt(c.nom);
      if (c.suivi) {
        // Même rendu que SuiviBadge (ui.tsx) : la bulle est construite hors de React.
        const badge = el.appendChild(document.createElement('span'));
        badge.className = cx('ml-1', CLASSES_BADGE);
        Object.assign(badge.style, couleursBadge(COULEUR_SUIVI));
        badge.title = TEXTE_SUIVI;
        badge.textContent = 'Suivi';
      }
      if (colorBy !== 'statut') el.append(` · ${formatIndicateur(colorBy, c.indicateurs[colorBy])}`);
      return el;
    },
  };
  const selectedCollege = selected ? byUai.get(selected) ?? null : null;

  return (
    <div className="relative h-full w-full">
      <MapContainer bounds={CADRAGE_ILE_DE_FRANCE} className="h-full w-full" zoomControl={false} attributionControl>
        <TileLayer
          url="https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM&FORMAT=image/png&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
          attribution='&copy; <a href="https://www.ign.fr/">IGN</a> – Plan IGN (Géoplateforme)'
          maxZoom={18}
          className="map-tiles"
        />
        <ZoomControl />
        <InvalidateOnResize />
        <CadrageSurRetenus retenus={visibles} />
        <FlyToSelected college={selectedCollege} />
        <ContoursCommunes />
        {secteur?.feature && (
          <GeoJSON
            key={secteur.feature.properties.libelle}
            data={secteur.feature as unknown as GeoJSON.Feature}
            style={{ stroke: false, fillColor: '#16a34a', fillOpacity: 0.28, interactive: false } as L.PathOptions}
          />
        )}
        {adresse && (
          <Marker position={[adresse.lat, adresse.lon]} icon={homeIcon} zIndexOffset={1000}>
            <Tooltip direction="top" offset={[0, -16]}>
              {adresse.label}
            </Tooltip>
          </Marker>
        )}
        <PointsColleges colleges={colleges} points={points} rappels={rappels} />
      </MapContainer>

      <div className="absolute right-3 top-3 z-[1000] rounded-lg bg-white/95 p-2 shadow-md">
        <label className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">Colorer par</span>
          <select value={colorBy} onChange={(e) => setColorBy(e.target.value as ColorBy)} className="rounded border border-zinc-300 bg-white px-1 py-0.5 text-xs">
            {COLOR_OPTIONS.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Legend colorBy={colorBy} domain={domain} />
    </div>
  );
}

function ZoomControl() {
  const map = useMap();
  useEffect(() => {
    const z = L.control.zoom({ position: 'bottomright', zoomInTitle: 'Zoomer', zoomOutTitle: 'Dézoomer' });
    z.addTo(map);
    return () => {
      z.remove();
    };
  }, [map]);
  return null;
}

function Legend({ colorBy, domain }: { colorBy: ColorBy; domain: [number, number] | null }) {
  return (
    <div className="absolute bottom-3 left-3 z-[1000] rounded-lg bg-white/95 px-3 py-2 text-xs shadow-md">
      {colorBy === 'statut' ? (
        <ul className="space-y-1">
          {(Object.keys(STATUT_COLORS) as (keyof typeof STATUT_COLORS)[]).map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-white shadow" style={{ background: STATUT_COLORS[s] }} />
              {STATUT_LABELS[s]}
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-44">
          <div className="mb-1 font-medium">{INDICATEURS[colorBy].label}</div>
          <div
            className="h-2.5 rounded"
            style={{
              background: `linear-gradient(to right, ${[0, 0.25, 0.5, 0.75, 1]
                .map((t) => sequential(INDICATEURS[colorBy].plusHautMieux === false ? 1 - t : t))
                .join(',')})`,
            }}
          />
          {domain && (
            <div className="mt-0.5 flex justify-between tabular-nums text-zinc-500">
              <span>{formatIndicateur(colorBy, domain[0])}</span>
              <span>{formatIndicateur(colorBy, domain[1])}</span>
            </div>
          )}
          <div className="mt-1 flex items-center gap-1.5 text-zinc-500">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: MISSING_COLOR }} /> sans donnée
          </div>
        </div>
      )}
      <div className="mt-1.5 border-t border-zinc-200 pt-1.5 text-zinc-500">★ favori · <span className="text-green-700">⬚ secteur</span> · 🏠 adresse</div>
    </div>
  );
}
