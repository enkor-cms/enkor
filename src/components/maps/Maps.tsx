'use client';

import { ISpotExtanded } from '@/features/spots';
import { useToggle } from '@/hooks';
import { actualSpotAtom } from '@/hooks/jotai/maps/atom';
import { useAtom } from 'jotai';
import L from 'leaflet';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useColorScheme } from '../ColorSchemeProvider';
import { Button, Flex, FloatingPanel, Text } from '../common';
import { SpotModal } from '../spot';
import Cluster from './Cluster';
import { LazyMapContainer, LazyTileLayer } from './Lazy';
import './maps.css';
import { IMapProps } from './types';

const DEFAULT_ZOOM = 13;
const DEFAULT_BOUNDS = new L.LatLngBounds(
  new L.LatLng(0, 0),
  new L.LatLng(0, 0),
);

const GenericMap = ({ spots }: IMapProps) => {
  const { colorScheme } = useColorScheme();
  const [spot, setSpot] = useAtom(actualSpotAtom);
  const [floatingPanelIsOpen, openFloatingPanel, closeFloatingPanel] =
    useToggle(false);

  const tileLayerUrl = useMemo(() => {
    switch (colorScheme) {
      case 'light':
        return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      case 'dark':
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      default:
        break;
    }
  }, [colorScheme]);

  const getBounds = (spots?: ISpotExtanded[]) => {
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

  useEffect(() => {
    if (spot) {
      openFloatingPanel();
    } else {
      closeFloatingPanel();
    }
  }, [spot]);

  return (
    <>
      <div className="absolute bg-white-200 dark:bg-dark-100 top-0 bottom-0 left-0 right-0 z-0">
        <LazyMapContainer
          bounds={getBounds(spots)}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          className="w-full h-full bg-black z-0"
          zoomControl={false}
        >
          <LazyTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={tileLayerUrl}
          />
          {spots && <Cluster spots={spots} />}
        </LazyMapContainer>
      </div>
      <FloatingPanel
        isOpen={floatingPanelIsOpen}
        title={spot?.id || 'Map'}
        onClose={() => {
          setSpot(undefined);
          closeFloatingPanel();
        }}
        onConfirm={() => {
          setSpot(undefined);
          closeFloatingPanel();
        }}
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
                onClick={() => {
                  setSpot(undefined);
                  closeFloatingPanel();
                }}
                variant="primary"
              />
              <Text variant="body" className="w-full ml-2">
                <strong>Spots</strong> / {spot?.name}
              </Text>
            </Flex>
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="right"
              className="h-16"
            >
              <Link href={`/spot/${spot?.id}`} target={'_blank'}>
                <Button
                  icon="eye"
                  text="View"
                  onClick={closeFloatingPanel}
                  variant="primary"
                />
              </Link>
            </Flex>
          </Flex>
        }
      >
        {spot && <SpotModal spot={spot} />}
      </FloatingPanel>
    </>
  );
};

export default GenericMap;
