import { useEffect, useMemo, useState } from 'react';
import type L from 'leaflet';
import { GeoJSON } from 'react-leaflet';
import type { ContourCommuneProps } from '../types';
import { useData } from '../data';
import { useStore } from '../store';
import { contoursAAfficher } from '../lib/contours';
import { getJson, telechargementsParCle } from '../lib/telechargements';

type ContourFeature = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, ContourCommuneProps>;

/** Contours par département, puis par code de commune : un seul téléchargement par département. */
const contours = telechargementsParCle<Map<string, ContourFeature>>();

function chargerContours(departement: string, version: string): Promise<unknown> {
  // Un échec n'est pas mémorisé : la prochaine sélection retente. Sans contour, la carte reste utilisable.
  return contours.demander(departement, () =>
    getJson<GeoJSON.FeatureCollection<ContourFeature['geometry'], ContourCommuneProps>>(
      `contours-${departement}.geojson?v=${encodeURIComponent(version)}`,
    ).then((fc) => new Map(fc.features.map((f) => [f.properties.code, f]))),
  );
}

const STYLE: L.PathOptions = { color: '#3f3f46', weight: 2, dashArray: '5 5', fill: false, interactive: false };

/**
 * Contours des communes (à Paris, des arrondissements) choisies dans le filtre « commune ou département ».
 * Le fichier contours-<dép>.geojson n'est téléchargé qu'au premier choix d'une commune du département.
 */
export function ContoursCommunes() {
  const { dataset } = useData();
  const communes = useStore((s) => s.filters.communes);
  const departements = useStore((s) => s.filters.departements);
  const aAfficher = useMemo(() => contoursAAfficher({ communes, departements }, dataset.communes), [communes, departements, dataset.communes]);
  const [, setRecus] = useState(0);

  useEffect(() => {
    let actif = true;
    for (const d of aAfficher.departements) {
      if (contours.recu(d)) continue;
      chargerContours(d, dataset.generatedAt).then(
        () => actif && setRecus((n) => n + 1),
        () => undefined,
      );
    }
    return () => {
      actif = false;
    };
  }, [aAfficher, dataset.generatedAt]);

  const features = aAfficher.codes.flatMap((code) => {
    const departement = dataset.communes.find((c) => c.code === code)?.departement;
    const f = departement ? contours.recu(departement)?.get(code) : undefined;
    return f ? [f] : [];
  });
  if (!features.length) return null;
  // GeoJSON de react-leaflet ne relit pas `data` : la clé le recrée quand les contours affichés changent.
  return (
    <GeoJSON
      key={features.map((f) => f.properties.code).join(',')}
      data={{ type: 'FeatureCollection', features } as GeoJSON.FeatureCollection}
      style={STYLE}
    />
  );
}
