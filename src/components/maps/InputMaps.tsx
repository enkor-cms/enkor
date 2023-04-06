import {
  findCountryIdFromName,
  getAddressFromOpenStreetMap,
} from '@/features/locations';
import { Database } from '@/lib/db_types';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useColorScheme } from '../ColorSchemeProvider';
import { Card, Flex, Text } from '../common';
import { getMarkerIcon } from './Cluster';
import { LazyMapContainer, LazyMarker, LazyTileLayer } from './Lazy';

const DEFAULT_ZOOM = 5;
const DEFAULT_LATITUDE = 47.398349;
const DEFAULT_LONGITUDE = 2.307129;

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
  onChangeLocation: (
    location: Pick<
      Database['public']['Tables']['locations']['Insert'],
      'latitude' | 'longitude' | 'city' | 'department' | 'country'
    >,
  ) => void;
};

export const InputMaps = ({ onChangeLocation }: InputMapsProps) => {
  const { colorScheme } = useColorScheme();

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

  return (
    <Flex className="w-full" direction="column" gap={2}>
      <Flex
        className="w-full px-3"
        direction="row"
        verticalAlign="center"
        horizontalAlign="stretch"
        gap={2}
      >
        <Flex
          className="w-full"
          verticalAlign="bottom"
          horizontalAlign="left"
          direction="row"
          gap={2}
        >
          {location.city !== '' ? (
            <>
              <Text variant="body" className="">
                {location.city}
              </Text>
              <Text variant="body" className="opacity-80">
                {location.department}
              </Text>
            </>
          ) : (
            <Text variant="body" className="opacity-60" color="text-red-400">
              No location found
            </Text>
          )}
        </Flex>
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
            className="w-full h-full rounded-xs bg-black z-0"
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
          </LazyMapContainer>
        </Card>
      </div>
    </Flex>
  );
};
