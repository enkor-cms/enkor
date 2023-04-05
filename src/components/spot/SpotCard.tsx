import { GetSpotResponseSuccess } from '@/features/spots';
import { getFirstItem } from '@/lib';
import Link from 'next/link';
import { Button, Card, Flex, Icon, Tag, Text } from '../common';
import { useDictionary } from '../DictionaryProvider';
import Compass from './Compass';
import SeasonDiagram from './SeasonDiagram';
import { difficultyColors } from './types';

export type TSpotCardProps = {
  spot: NonNullable<GetSpotResponseSuccess>;
};

export const SpotCard = ({ spot }: TSpotCardProps) => {
  const dictionary = useDictionary();

  return (
    <Flex className="w-full" verticalAlign="top" gap={5}>
      <div className="w-full h-full flex flex-col md:flex-row justify-stretch items-stretch">
        <Flex
          direction="row"
          verticalAlign="center"
          horizontalAlign="center"
          className="w-full md:w-3/4 py-4 px-2"
        >
          <Flex
            fullSize
            direction="column"
            horizontalAlign="stretch"
            verticalAlign="top"
          >
            <Flex
              direction="row"
              horizontalAlign="center"
              verticalAlign="center"
              gap={4}
            >
              <Text variant="title">{spot.name}</Text>
              {spot.note ? (
                <Flex
                  direction="row"
                  horizontalAlign="center"
                  verticalAlign="center"
                  gap={0}
                >
                  <Text variant="body" className="opacity-80">
                    {spot.note.toFixed(1)}
                  </Text>
                  <Icon name="star" color="text-yellow-400" fill />
                </Flex>
              ) : null}
            </Flex>
            <Flex direction="row" horizontalAlign="left">
              <Text variant="body" className="opacity-80">
                {spot.location.city}
              </Text>
              <Text variant="body" className="opacity-50">
                {spot.location.department}
              </Text>
              <Link href={`/maps?spotId=${spot.id}`}>
                <Button
                  variant="none"
                  text="See on map"
                  icon="map"
                  className="text-brand-400"
                  iconOnly={true}
                />
              </Link>
            </Flex>
          </Flex>
          <Flex horizontalAlign="right">
            {spot.orientation && spot.orientation.length > 0 && (
              <Compass orientation={getFirstItem(spot.orientation)} />
            )}
          </Flex>
        </Flex>
        <Flex
          className="w-full md:w-1/4 h-full"
          direction="row"
          horizontalAlign="right"
          gap={8}
        >
          <Card className="w-full md:w-auto">
            <table className="w-full">
              <tbody className="divide-y divide-white-300 dark:divide-dark-300">
                {spot.type && (
                  <tr>
                    <th className="py-2 px-3 text-left">
                      <Text variant="caption">{dictionary.common.type}</Text>
                    </th>
                    <td className="py-2 px-3 text-center">
                      <Tag
                        text={dictionary.spots.type[spot.type]}
                        color={spot.type === 'Outdoor' ? 'green' : 'blue'}
                      />
                    </td>
                  </tr>
                )}

                {spot.difficulty && (
                  <tr>
                    <th className="py-2 px-3 text-left">
                      <Text variant="caption">
                        {dictionary.common.difficulty}
                      </Text>
                    </th>
                    <td className="py-2 px-3 text-center">
                      <Tag
                        text={dictionary.spots.difficulty[spot.difficulty]}
                        color={difficultyColors[spot.difficulty]}
                      />
                    </td>
                  </tr>
                )}

                {spot.cliff_height && (
                  <tr>
                    <th className="py-2 px-3 text-left">
                      <Text variant="caption">
                        {dictionary.common.cliff_height}
                      </Text>
                    </th>
                    <td className="py-2 px-3 text-center">
                      <Text variant="body" className="opacity-80 font-bold">
                        {`${spot.cliff_height}m`}
                      </Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </Flex>
      </div>
      {spot.period && spot.period.length > 0 && (
        <SeasonDiagram months={spot.period} />
      )}
      <Text variant="body" className="opacity-60">
        {spot.description}
      </Text>
      <Flex fullSize verticalAlign="top" className="mt-4">
        <Text variant="subtitle" className="opacity-60">
          {dictionary.common.approach}
        </Text>
        <Text variant="body" className="opacity-60">
          {spot.approach}
        </Text>
      </Flex>
    </Flex>
  );
};
