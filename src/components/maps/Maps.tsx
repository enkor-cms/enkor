'use client';

import { Database } from '@/lib/db_types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Card, Icon } from '../common';
import { LazyMarker } from './Marker';

export interface IMapProps {
  locations?: Database['public']['Tables']['location']['Row'][];
}

const DEFAULT_ZOOM = 13;
const DEFAULT_BOUNDS = new L.LatLngBounds(
  new L.LatLng(0, 0),
  new L.LatLng(0, 0)
);

export const getBounds = (locations: IMapProps['locations']) => {
  if (!locations || locations.length === 0) {
    return DEFAULT_BOUNDS;
  }
  const bounds = locations.reduce((bounds, { latitude, longitude }) => {
    return bounds.extend([latitude, longitude]);
  }, new L.LatLngBounds(new L.LatLng(locations[0].latitude, locations[0].longitude), new L.LatLng(locations[0].latitude, locations[0].longitude)));
  return bounds;
};

export const getMarkerIcon = () => {
  return L.divIcon({
    html: renderToStaticMarkup(<Icon name="photo" />),
    popupAnchor: [2, -12],
  });
};

export const getMarker = (
  location: Database['public']['Tables']['location']['Row']
) => {
  return (
    <LazyMarker
      icon={getMarkerIcon()}
      key={location.id}
      position={[location.latitude, location.longitude]}
    />
  );
};

const Map = ({ locations }: IMapProps) => {
  return (
    <Card className="absolute top-0 bottom-0 left-0 right-0 z-0">
      <MapContainer
        bounds={getBounds(locations)}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {locations?.map(getMarker)}
      </MapContainer>
    </Card>
  );
};

export default Map;
