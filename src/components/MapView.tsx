import { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import { GeoJSON, MapContainer, Marker, TileLayer, Tooltip, useMap } from 'react-leaflet';
import type { College, IndicateurKey } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { MISSING_COLOR, scaleColor, sequential, STATUT_COLORS } from '../lib/colors';
import { domainOf } from '../lib/filters';
import { INDICATEURS, STATUT_LABELS } from '../lib/indicateurs';
import { formatIndicateur, nomCourt } from '../lib/format';
import type { ColorBy } from '../lib/url';

const COLOR_OPTIONS: { key: ColorBy; label: string }[] = [
  { key: 'statut', label: 'Statut' },
  ...(['note', 'brevet', 'noteEcrit', 'vaTaux', 'ips', 'effectif', 'elevesParClasse'] as IndicateurKey[]).map((k) => ({
    key: k,
    label: INDICATEURS[k].label,
  })),
];

function markerIcon(color: string, opts: { selected: boolean; favori: boolean; secteur: boolean; dim: boolean }): L.DivIcon {
  const size = opts.selected ? 24 : 16;
  const cls = ['college-marker', opts.selected && 'selected', opts.secteur && 'secteur'].filter(Boolean).join(' ');
  return L.divIcon({
    className: cls,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div class="dot" style="background:${color};opacity:${opts.dim ? 0.35 : 1}"></div>${opts.favori ? '<span class="star">★</span>' : ''}`,
  });
}

const homeIcon = L.divIcon({ className: 'home-marker', iconSize: [24, 24], iconAnchor: [12, 20], html: '🏠' });

function FlyToSelected({ college }: { college: College | null }) {
  const map = useMap();
  useEffect(() => {
    if (!college) return;
    const target = L.latLng(college.lat, college.lon);
    if (!map.getBounds().pad(-0.15).contains(target)) map.flyTo(target, Math.max(map.getZoom(), 14), { duration: 0.6 });
  }, [college, map]);
  return null;
}

function FitOnLoad({ colleges }: { colleges: College[] }) {
  const map = useMap();
  const done = useRef(false);
  useEffect(() => {
    if (done.current || colleges.length === 0) return;
    done.current = true;
    map.fitBounds(L.latLngBounds(colleges.map((c) => [c.lat, c.lon])), { padding: [24, 24] });
  }, [colleges, map]);
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
  const { dataset, contours, visiblesSet, byUai, secteur } = useData();
  const selected = useStore((s) => s.selected);
  const select = useStore((s) => s.select);
  const favoris = useStore((s) => s.favoris);
  const adresse = useStore((s) => s.adresse);
  const colorBy = useStore((s) => s.colorBy);
  const setColorBy = useStore((s) => s.setColorBy);
  const colleges = dataset.colleges;

  const domain = useMemo(() => (colorBy === 'statut' ? null : domainOf(colleges, colorBy, { distances: null })), [colleges, colorBy]);
  const colorOf = (c: College) => {
    if (colorBy === 'statut') return STATUT_COLORS[c.statut];
    return scaleColor(c.indicateurs[colorBy], domain, INDICATEURS[colorBy].plusHautMieux === false);
  };

  // Les collèges filtrés sont dessinés au-dessus, les autres estompés.
  const ordered = useMemo(
    () => [...colleges].sort((a, b) => Number(visiblesSet.has(a.uai)) - Number(visiblesSet.has(b.uai)) || Number(a.uai === selected) - Number(b.uai === selected)),
    [colleges, visiblesSet, selected],
  );
  const selectedCollege = selected ? byUai.get(selected) ?? null : null;

  return (
    <div className="relative h-full w-full">
      <MapContainer center={[48.82, 2.37]} zoom={13} className="h-full w-full" zoomControl={false} attributionControl>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        <ZoomControl />
        <InvalidateOnResize />
        <FitOnLoad colleges={colleges} />
        <FlyToSelected college={selectedCollege} />
        {contours.features.length > 0 && (
          <GeoJSON
            key="contours"
            data={contours as GeoJSON.FeatureCollection}
            style={{ color: '#52525b', weight: 1.5, dashArray: '4 4', fill: false, interactive: false } as L.PathOptions}
          />
        )}
        {secteur?.feature && (
          <GeoJSON
            key={secteur.feature.properties.libelle}
            data={secteur.feature as unknown as GeoJSON.Feature}
            style={{ color: '#16a34a', weight: 2, fillColor: '#22c55e', fillOpacity: 0.12, interactive: false } as L.PathOptions}
          />
        )}
        {adresse && (
          <Marker position={[adresse.lat, adresse.lon]} icon={homeIcon} zIndexOffset={1000}>
            <Tooltip direction="top" offset={[0, -16]}>
              {adresse.label}
            </Tooltip>
          </Marker>
        )}
        {ordered.map((c) => {
          const isSel = c.uai === selected;
          const visible = visiblesSet.has(c.uai);
          return (
            <Marker
              key={c.uai}
              position={[c.lat, c.lon]}
              icon={markerIcon(colorOf(c), { selected: isSel, favori: favoris.includes(c.uai), secteur: !!secteur?.uais.includes(c.uai), dim: !visible })}
              zIndexOffset={isSel ? 900 : visible ? 100 : 0}
              keyboard
              title={c.nom}
              eventHandlers={{
                click: () => {
                  select(c.uai);
                  onOpen?.();
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -8]}>
                <strong>{nomCourt(c.nom)}</strong>
                {colorBy !== 'statut' && <> · {formatIndicateur(colorBy, c.indicateurs[colorBy])}</>}
              </Tooltip>
            </Marker>
          );
        })}
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
