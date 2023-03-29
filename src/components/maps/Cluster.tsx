import { ISpotExtanded } from '@/features/spots';
import L, { MarkerCluster } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Flex, Icon, Text } from '../common';
import { LazyClusterGroup, LazyMarker } from './Lazy';
import { Tooltip } from './Tooltip';

export type TClusterProps = {
  spots: ISpotExtanded[];
  setActualSpot: (spot: ISpotExtanded) => void;
};

export const getMarkerIcon = () => {
  const marker = renderToStaticMarkup(
    <Icon
      name="pin"
      color="text-brand-500"
      fill
      className="z-10"
      scale={1.5}
    />,
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
      )} border border-white-200 dark:border-dark-200 w-8 h-8 rounded-full opacity-90`}
    >
      <Text
        variant="caption"
        color="text-white-100 dark:text-dark-100"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        {count}
      </Text>
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
    >
      <Tooltip spot={spot} />
    </LazyMarker>
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

  return (
    <LazyClusterGroup
      maxClusterRadius={50}
      polygonOptions={{
        color: 'green',
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
