import { Database } from '@/lib/db_types';
import { createClient } from '@/lib/supabase/browser';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Button, Card, Flex, Icon, InputText, Text } from '../common';

export type ISpotSearch =
  Database['public']['Views']['spot_search_view']['Row'];

export type TSearchBarProps = {
  // eslint-disable-next-line no-unused-vars
  onClickItem?: (spot: ISpotSearch) => void;
};

export const SearchBar = ({ onClickItem }: TSearchBarProps) => {
  const supabase = createClient();

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
      console.log('error', error);
    }

    if (spots) {
      setResults(spots);
    }
  };

  useEffect(() => {
    if (search.length > 2) {
      handleSearch(search);
    } else {
      setResults(null);
    }
  }, [search]);

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
                  onClick={() => {
                    setFocus(false);
                    onClickItem && onClickItem(spot);
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
  onClick,
}: {
  spot: ISpotSearch;
  setFocus: (focus: boolean) => void;
  onClick: () => void;
}) => {
  const router = useRouter();

  return (
    <Flex
      fullSize
      verticalAlign="top"
      className="p-2 cursor-pointer"
      onClick={onClick}
    >
      <Flex
        direction="row"
        verticalAlign="center"
        horizontalAlign="stretch"
        className="w-full"
      >
        <Flex direction="row" className="w-full" horizontalAlign="left">
          <Text variant="body">{spot.name}</Text>
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
          <Button
            variant="none"
            text="See on map"
            icon="map"
            className="text-brand-400"
            iconOnly={true}
            onClick={(e) => {
              e.stopPropagation();
              setFocus(false);
              router.push(`/dashboard/maps?spotId=${spot.id}`);
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
