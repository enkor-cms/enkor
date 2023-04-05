import { Database } from '@/lib/db_types';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/browser';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { MouseEventHandler, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, Flex, Icon, InputText, Text } from '../common';

export type ISpotSearch =
  Database['public']['Views']['spot_search_view']['Row'];

export const SearchBar = () => {
  const supabase = createClient();
  const params = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<ISpotSearch[] | null>(null);
  const [focus, setFocus] = React.useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null); // represents the input element
  const resultsRef = React.useRef<HTMLDivElement>(null); // represents the results element

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current) {
        if (
          inputRef.current.contains(event.target as Node) ||
          resultsRef?.current?.contains(event.target as Node)
        ) {
          setFocus(true);
        } else {
          setFocus(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async (search: string) => {
    const { data: spots, error } = await supabase.rpc('search_spots', {
      keyword: search,
    });

    if (error) {
      toast.error(error.message);
      logger.error(error);
    }

    if (spots) {
      setResults(spots);
    }
  };

  const updateUrl = (search: string) => {
    const searchParams = new URLSearchParams(params.toString());
    searchParams.set('q', search);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.replace(newUrl);
  };

  useEffect(() => {
    updateUrl(search);
    if (search.length > 2) {
      handleSearch(search);
    } else {
      setResults(null);
    }
  }, [search]);

  const paramsLoaded = React.useRef(false);

  useEffect(() => {
    if (paramsLoaded.current) {
      return;
    }
    paramsLoaded.current = true;

    if (params.has('q')) {
      setSearch(params.get('q') as string);
      setFocus(false);
    }
  }, [params]);

  return (
    <Flex className="relative w-full">
      <InputText
        className="search-bar w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        icon="loop"
        ref={inputRef}
      />
      {results && focus && (
        <Card
          className="search-bar-results absolute top-12 w-full z-50"
          ref={resultsRef}
        >
          {results.length > 0 ? (
            <Flex
              direction="column"
              horizontalAlign="left"
              className="divide-y divide-white-300 dark:divide-dark-300 max-h-80 overflow-y-auto"
              gap={0}
            >
              {results.map((spot, index) => (
                <SpotListItems
                  key={index}
                  spot={spot}
                  setFocus={setFocus}
                  onClickText={() => {
                    setFocus(false);
                    router.push(`/spot/${spot.id}?${params.toString()}`);
                  }}
                  onClickMaps={(e) => {
                    e.stopPropagation();
                    setFocus(false);
                    router.push(`/maps?spotId=${spot.id}&${params.toString()}`);
                  }}
                />
              ))}
            </Flex>
          ) : (
            <Flex fullSize verticalAlign="center" horizontalAlign="center">
              <Text variant="body">No results</Text>
            </Flex>
          )}
        </Card>
      )}
    </Flex>
  );
};

const SpotListItems = ({
  spot,
  setFocus,
  onClickText,
  onClickMaps,
}: {
  spot: ISpotSearch;
  // eslint-disable-next-line no-unused-vars
  setFocus: (focus: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onClickText: MouseEventHandler<HTMLDivElement>;
  // eslint-disable-next-line no-unused-vars
  onClickMaps: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Flex
      fullSize
      direction="row"
      verticalAlign="center"
      horizontalAlign="stretch"
      className="p-2 cursor-pointer"
    >
      <Flex
        direction="row"
        verticalAlign="center"
        horizontalAlign="stretch"
        className="w-full"
        onClick={onClickText}
      >
        <Flex direction="row" className="w-full" horizontalAlign="left">
          <Text variant="body" className="">
            {spot.name}
          </Text>
          <Text
            variant="caption"
            className="opacity-30"
          >{`${spot.city}, ${spot.department}`}</Text>
        </Flex>
        <Flex
          direction="row"
          horizontalAlign="center"
          verticalAlign="center"
          gap={0}
        >
          {spot.note ? (
            <>
              <Text variant="body" className="opacity-80">
                {spot.note.toFixed(1)}
              </Text>
              <Icon name="star" color="text-yellow-400" fill />
            </>
          ) : null}
        </Flex>
      </Flex>
      <Button
        variant="none"
        text="See on map"
        icon="map"
        className="text-brand-400"
        iconOnly={true}
        onClick={onClickMaps}
      />
    </Flex>
  );
};
