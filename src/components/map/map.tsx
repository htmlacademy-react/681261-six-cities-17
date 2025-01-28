import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map.tsx';
import { City } from '../../types.ts';
import { Pin } from '../../constant.ts';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  points: City[];
  selectedPoint: City | null;
  height: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: Pin.DefaultUrl,
  iconSize: Pin.Size,
  iconAnchor: Pin.Anchor,
});

const currentCustomIcon = new Icon({
  iconUrl: Pin.CurrentUrl,
  iconSize: Pin.Size,
  iconAnchor: Pin.Anchor,
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
