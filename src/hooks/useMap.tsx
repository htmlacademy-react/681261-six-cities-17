import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer, LatLngBounds } from 'leaflet';
import {City} from '../types.ts';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  points: City[]
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const bounds = points.reduce<LatLngBounds | null>((acc, point) => {
        const { latitude, longitude } = point.location;
        if (!acc) {
          return new LatLngBounds([latitude, longitude], [latitude, longitude]);
        }
        acc.extend([latitude, longitude]);
        return acc;
      }, null);

      const center = bounds ? bounds.getCenter() : { lat: 0, lng: 0 };
      const zoom = bounds ? Math.min(...points.map((point) => point.location.zoom)) : 13;

      const instance = new Map(mapRef.current, {
        center: center,
        zoom: zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, points]);

  useEffect(() => {
    if (map && points.length > 0) {
      const bounds = points.reduce<LatLngBounds | null>((acc, point) => {
        const { latitude, longitude } = point.location;
        if (!acc) {
          return new LatLngBounds([latitude, longitude], [latitude, longitude]);
        }
        acc.extend([latitude, longitude]);
        return acc;
      }, null);

      if (bounds) {
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: 15 });
      }
    }
  }, [map, points]);

  return map;
}

export default useMap;
