'use client';

import { Button, FloatingPanel } from '@/components/common';
import { ISpotExtanded } from '@/features/spots';
import { useToggle } from '@/hooks';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useState } from 'react';
import { Flex, Text } from '../common';
import { SpotModal } from '../spot';
import Cluster from './Cluster';
import { LazyMapContainer, LazyTileLayer } from './Lazy';
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

const GenericMap = ({ spots }: IMapProps) => {
  let [actualSpot, setActualSpot] = useState<ISpotExtanded | undefined>(
    undefined,
  );

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
            url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png"
          />
          {spots && (
            <Cluster
              spots={spots}
              setActualSpot={(spot) => {
                setActualSpot(spot);
                setOpen();
              }}
            />
          )}
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
              <Text variant="body" className="w-full ml-2">
                <strong>Spots</strong> / {actualSpot?.name}
              </Text>
            </Flex>
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="right"
              className="h-16"
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

export default GenericMap;
