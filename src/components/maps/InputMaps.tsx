import {
  findCountryIdFromName,
  getAddressFromOpenStreetMap,
  getDeltaLatLon,
} from '@/features/locations';
import {
  searchSpotsWithBounds,
  spotsSearchWithBoundsResponseSuccess,
} from '@/features/spots';
import { formatDateString, getFirstItem } from '@/lib';
import { createClient } from '@/lib/supabase/browser';
import { debounce } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useColorScheme } from '../ColorSchemeProvider';
import { Card, Flex, InfoCard, Text } from '../common';
import { getMarkerIcon } from './Cluster';
import {
  LazyCircle,
  LazyMapContainer,
  LazyMarker,
  LazyTileLayer,
} from './Lazy';
import { TLocationInsert } from './types';

const DEFAULT_ZOOM = 11;
const DEFAULT_LATITUDE = 45.508272;
const DEFAULT_LONGITUDE = 6.022464;

type MarkerContainerProps = {
  onMove: (lat: number, lng: number) => void;
};

export const MarkerContainer = ({ onMove }: MarkerContainerProps) => {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());

  const debouncedOnMove = useCallback(
    debounce((lat, lng) => {
      onMove(lat, lng);
    }, 250),
    [],
  );

  const handleMove = useCallback(() => {
    setPosition(map.getCenter());
    debouncedOnMove(map.getCenter().lat, map.getCenter().lng);
  }, [map, debouncedOnMove]);

  useEffect(() => {
    map.on('move', handleMove);

    return () => {
      map.off('move', handleMove);
    };
  }, [map, handleMove]);

  return (
    <LazyMarker
      icon={getMarkerIcon()}
      position={[position.lat, position.lng]}
    />
  );
};

export type InputMapsProps = {
  onChangeLocation: (location: TLocationInsert) => void;
};

export const InputMaps = ({ onChangeLocation }: InputMapsProps) => {
  const { colorScheme } = useColorScheme();
  const supabase = createClient();

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

  const [location, setLocation] = useState({
    latitude: DEFAULT_LATITUDE,
    longitude: DEFAULT_LONGITUDE,
    city: '',
    department: '',
    country: 1,
  });

  const [spotsCloseToLocation, setSpotsCloseToLocation] =
    useState<spotsSearchWithBoundsResponseSuccess>();

  const onChange = useCallback(
    async (lat: number, lng: number) => {
      const address = await getAddressFromOpenStreetMap(lat, lng);
      if (address) {
        const locationToSet = {
          latitude: lat,
          longitude: lng,
          city: address.city,
          department: address.department,
          country: findCountryIdFromName(address.country) as number,
        };
        setLocation(locationToSet);
        onChangeLocation(locationToSet);
      }
    },
    [location],
  );

  useEffect(() => {
    const fetchSpots = async () => {
      const { deltaLatitude, deltaLongitude } = getDeltaLatLon(
        location.latitude,
        5000,
      );
      const { spots: spotsFound } = await searchSpotsWithBounds({
        client: supabase,
        bounds: {
          latitude_gte: location.latitude - deltaLatitude,
          latitude_lte: location.latitude + deltaLatitude,
          longitude_gte: location.longitude - deltaLongitude,
          longitude_lte: location.longitude + deltaLongitude,
        },
      });
      if (spotsFound) {
        setSpotsCloseToLocation(spotsFound);
      }
    };

    fetchSpots();
  }, [location]);

  return (
    <Flex className="w-full" direction="column" gap={2}>
      <label className="w-full text-left" htmlFor="imagesInput">
        <Text variant="caption" className="py-0 px-3">
          {'Location'}
        </Text>
      </label>
      <Flex
        className="w-full px-3"
        direction="row"
        verticalAlign="center"
        horizontalAlign="stretch"
        gap={2}
      >
        <div className="w-full flex flex-col lg:flex-row lg:justify-start lg:items-center lg:gap-2">
          {location.city !== '' ? (
            <>
              <Text variant="caption" weight={500}>
                {location.city}
              </Text>
              <Text variant="caption" className="opacity-80">
                {location.department}
              </Text>
            </>
          ) : (
            <Text variant="caption" className="opacity-60">
              {'No location found'}
            </Text>
          )}
        </div>
        <Flex
          className="w-full"
          verticalAlign="bottom"
          horizontalAlign="right"
          direction="row"
          gap={2}
        >
          <Text variant="caption" className="opacity-60">
            {location.latitude.toFixed(6)}
          </Text>
          <Text variant="caption" className="opacity-60">
            {location.longitude.toFixed(6)}
          </Text>
        </Flex>
      </Flex>
      <div
        className="relative w-full h-64"
        style={{
          minHeight: '200px',
        }}
      >
        <Card className="absolute bg-white-200 dark:bg-dark-100 top-0 bottom-0 left-0 right-0 z-0">
          <LazyMapContainer
            center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]}
            zoom={DEFAULT_ZOOM}
            scrollWheelZoom={true}
            className="w-full h-full rounded-md bg-black z-0"
            zoomControl={false}
          >
            <LazyTileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url={tileLayerUrl}
            />

            <MarkerContainer
              onMove={(lat, lng) => {
                onChange(lat, lng);
              }}
            />
            {spotsCloseToLocation &&
              spotsCloseToLocation.map((spot) => {
                const l = getFirstItem(spot.location);
                return (
                  <LazyMarker
                    key={spot.name}
                    icon={getMarkerIcon('text-red-600')}
                    position={[l?.latitude, l?.longitude]}
                  />
                );
              })}
            <LazyCircle
              center={[location.latitude, location.longitude]}
              radius={5000}
              pathOptions={{
                color: '#7aab54',
                stroke: true,
              }}
            />
          </LazyMapContainer>
        </Card>
      </div>
      {spotsCloseToLocation && spotsCloseToLocation.length > 0 && (
        <InfoCard
          message="Be careful, there are already spots in this area, please check if your spot is not already in the list"
          color="warning"
          icon="warning"
        >
          {spotsCloseToLocation.map((spot) => (
            <Flex
              direction="row"
              gap={2}
              verticalAlign="center"
              horizontalAlign="left"
              key={spot.name}
            >
              <Text variant="caption" className="opacity-90">
                {spot.name}
              </Text>
              <Text variant="caption" className="opacity-60">
                {`created on ${formatDateString(spot.created_at)}`}
              </Text>
              <Link
                href={`/spot/${spot.id}`}
                className="opacity-60 hover:opacity-100"
                target="_blank"
              >
                <Text variant="caption" className="opacity-60">
                  {'View'}
                </Text>
              </Link>
            </Flex>
          ))}
        </InfoCard>
      )}
    </Flex>
  );
};
