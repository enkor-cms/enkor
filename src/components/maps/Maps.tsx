'use client';

import { Button, FloatingPanel } from '@/components/common';
import { ISpotExtanded } from '@/features/spots';
import { useToggle } from '@/hooks';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Flex, Icon, Text } from '../common';
import { SpotModal } from '../spot';
import { LazyMapContainer, LazyMarker, LazyTileLayer } from './Lazy';
import { IMapProps } from './types';

const DEFAULT_ZOOM = 13;
const DEFAULT_BOUNDS = new L.LatLngBounds(
  new L.LatLng(0, 0),
  new L.LatLng(0, 0),
);

export const getBounds = (spots?: ISpotExtanded[]) => {
  if (!spots || spots.length === 0) {
    return DEFAULT_BOUNDS;
  }
  const bounds = spots.reduce(
    (bounds, { location: { latitude, longitude } }) => {
      return bounds.extend([latitude, longitude]);
    },
    new L.LatLngBounds(
      new L.LatLng(spots[0].location.latitude, spots[0].location.longitude),
      new L.LatLng(spots[0].location.latitude, spots[0].location.longitude),
    ),
  );
  return bounds;
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

const Map = ({ spots }: IMapProps) => {
  const markers = useMemo(() => {
    return spots?.map((spot) => {
      return {
        ...spot,
        latitude: spot.location.latitude,
        longitude: spot.location.longitude,
      };
    });
  }, [spots]);

  let [actualSpot, setActualSpot] = useState<ISpotExtanded | undefined>(
    undefined,
  );

  useEffect(() => {
    console.log('actualSpot', actualSpot);
  }, [actualSpot]);

  const [open, setOpen, setClose] = useToggle(false);

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0">
        <LazyMapContainer
          bounds={getBounds(spots)}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          className="w-full h-full bg-black"
          zoomControl={false}
        >
          <LazyTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
          />
          {markers?.map((spot) => {
            return getMarker(spot, (spot) => {
              setActualSpot(spot);
              setOpen();
            });
          })}
        </LazyMapContainer>
      </div>
      <FloatingPanel
        isOpen={open}
        title={actualSpot?.id || 'Map'}
        onClose={setClose}
        onConfirm={setClose}
        size="large"
        customFooter={<></>}
        customHeader={
          <Flex
            direction="row"
            verticalAlign="stretch"
            horizontalAlign="center"
            className="w-full h-16 px-3"
          >
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="left"
              className="h-16 w-full"
            >
              <Button
                icon="chevron-left"
                text="Back"
                onClick={setClose}
                variant="primary"
              />
              <Text variant="body" className="ml-2">
                <strong>Spots</strong> / {actualSpot?.name}
              </Text>
            </Flex>
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="right"
              className="h-16 w-full"
            >
              <Link
                href={`/dashboard/spot/${actualSpot?.id}`}
                target={'_blank'}
              >
                <Button
                  icon="eye"
                  text="View"
                  onClick={setClose}
                  variant="primary"
                />
              </Link>
            </Flex>
          </Flex>
        }
      >
        {actualSpot && <SpotModal spot={actualSpot} />}
      </FloatingPanel>
    </>
  );
};

export default Map;
