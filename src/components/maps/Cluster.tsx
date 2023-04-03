import { ISpotExtanded } from '@/features/spots';
import L, { Marker, MarkerCluster } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSearchParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useMap } from 'react-leaflet';
import { Flex, Icon, Text } from '../common';
import { SpotCardSmall } from '../spot';
import { LazyClusterGroup, LazyMarker } from './Lazy';
import { Popup } from './Popup';
export type TClusterProps = {
  spots: ISpotExtanded[];
  onMarkerClick?: (spot: ISpotExtanded) => void;
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
        color="text-white-100 dark:text-white-100"
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

type TForkedLazyMarker = {
  spot: ISpotExtanded;
  map: L.Map;
  setActualSpot?: (spot: ISpotExtanded) => void;
};

const ForwardedLazyMarker = React.forwardRef<Marker, TForkedLazyMarker>(
  ({ spot, map, setActualSpot }, markerRef) => {
    return (
      <LazyMarker
        icon={getMarkerIcon()}
        ref={markerRef}
        key={spot.id}
        position={[spot.location.latitude, spot.location.longitude]}
        eventHandlers={{
          click: () => {
            map.flyTo([spot.location.latitude, spot.location.longitude], 16, {
              animate: true,
              duration: 1,
            });
            map.once('moveend', function () {
              setActualSpot && setActualSpot(spot);
            });
          },
        }}
      >
        <Popup spot={spot} />
      </LazyMarker>
    );
  },
);

ForwardedLazyMarker.displayName = 'ForwardedLazyMarker';

export default function Cluster({ spots, onMarkerClick }: TClusterProps) {
  const map = useMap();
  const searchParams = useSearchParams();
  const spotId = searchParams.get('spotId');

  const markers = useMemo(() => {
    return spots?.map((spot) => {
      return {
        ...spot,
        latitude: spot.location.latitude,
        longitude: spot.location.longitude,
      };
    });
  }, [spots]);

  const markersList = useMemo(() => {
    return markers?.map((spot, index) => (
      <ForwardedLazyMarker
        key={spot.id}
        spot={spot}
        map={map}
        setActualSpot={onMarkerClick}
      />
    ));
  }, [spots]);

  // if spotId is in url, fly to spot
  React.useEffect(() => {
    if (spotId) {
      const marker = markersList.find(
        (marker) => marker.props.spot.id === spotId,
      );

      console.log(marker);
      console.log(spotId);
      console.log(spots);

      if (marker) {
        map.flyTo(
          [
            marker.props.spot.location.latitude,
            marker.props.spot.location.longitude,
          ],
          10,
          {
            animate: true,
            duration: 1,
          },
        );

        map.once('moveend', function () {
          const popup = L.popup({
            offset: L.point(10, -3),
          })
            .setLatLng([
              marker.props.spot.location.latitude,
              marker.props.spot.location.longitude,
            ])
            .setContent(
              renderToStaticMarkup(
                <SpotCardSmall
                  spot={marker.props.spot}
                  orientation="vertical"
                />,
              ),
            );
          map.openPopup(popup);
        });
      }
    }
  }, [spotId]);

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
      {markersList}
    </LazyClusterGroup>
  );
}
