import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/useMap.tsx';
import { City } from '../../types.ts';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../constant.ts';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: City[];
  selectedPoint: City | null;
  height: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map(props: MapProps): JSX.Element {
  const { points, selectedPoint, height } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, points);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const isSelected = selectedPoint !== null && point.id === selectedPoint.id;

        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker.setIcon(isSelected ? currentCustomIcon : defaultCustomIcon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <div
      style={{
        height,
        width: '100%',
      }}
      ref={mapRef}
    />
  );
}
