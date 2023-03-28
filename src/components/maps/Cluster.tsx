import { ISpotExtanded } from '@/features/spots';
import L, { MarkerCluster } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Flex, Icon } from '../common';
import { LazyClusterGroup, LazyMarker } from './Lazy';

export type TClusterProps = {
  spots: ISpotExtanded[];
  setActualSpot: (spot: ISpotExtanded) => void;
};

export const getMarkerIcon = () => {
  const marker = renderToStaticMarkup(
    <Flex className="relative bg-brand-200 border border-white-200 w-6 h-6 p-2 rounded-full">
      <div className="absolute -bottom-1 -z-1 w-3 h-3 bg-brand-200 border-r border-b border-white-200 transform rotate-45" />
      <Icon name="eye" color="text-white-100" className="z-10" scale={1} />
    </Flex>,
  );

  return L.divIcon({
    html: marker,
    className: 'hidden',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, 0],
  });
};

export const getClusterIcon = (cluster: MarkerCluster) => {
  const count = cluster.getChildCount();

  const getColor = (count: number) => {
    if (count < 10) {
      return 'bg-brand-200';
    } else if (count < 100) {
      return 'bg-brand-300';
    } else if (count < 1000) {
      return 'bg-brand-400';
    } else {
      return 'bg-brand-100';
    }
  };

  const marker = renderToStaticMarkup(
    <Flex
      className={`relative ${getColor(
        count,
      )} border border-white-200 dark:border-dark-200 w-8 h-8 rounded-full`}
    >
      <span className="absolute text-xs text-white-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {count}
      </span>
    </Flex>,
  );

  return L.divIcon({
    html: marker,
    className: 'hidden',
    iconSize: L.point(33, 33, true),
  });
};

export const getMarker = (
  spot: ISpotExtanded,
  // eslint-disable-next-line no-unused-vars
  setActualSpot: (spot: ISpotExtanded) => void,
) => {
  return (
    <LazyMarker
      icon={getMarkerIcon()}
      key={spot.id}
      position={[spot.location.latitude, spot.location.longitude]}
      eventHandlers={{
        click: () => {
          setActualSpot(spot);
        },
      }}
    />
  );
};

export default function Cluster({ spots, setActualSpot }: TClusterProps) {
  const markers = useMemo(() => {
    return spots?.map((spot) => {
      return {
        ...spot,
        latitude: spot.location.latitude,
        longitude: spot.location.longitude,
      };
    });
  }, [spots]);

  //   return markers?.map((spot) => {
  //     return getMarker(spot, setActualSpot);
  //   });

  return (
    <LazyClusterGroup
      maxClusterRadius={50}
      polygonOptions={{
        color: 'red',
        weight: 1,
        opacity: 0.5,
        fillOpacity: 0.2,
      }}
      showCoverageOnHover={true}
      iconCreateFunction={getClusterIcon}
    >
      {markers?.map((spot) => {
        return getMarker(spot, setActualSpot);
      })}
    </LazyClusterGroup>
  );
}
