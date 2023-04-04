import { GetSpotResponseSuccess } from '@/features/spots';
import { getFirstItem } from '@/lib';
import { Card, Flex, Icon, Tag, Text } from '../common';
import Compass from './Compass';
import SeasonDiagram from './SeasonDiagram';
import { difficultyColors } from './types';

export type TSpotCardProps = {
  spot: NonNullable<GetSpotResponseSuccess>;
};

export const SpotCard = ({ spot }: TSpotCardProps) => {
  return (
    <Flex className="w-full" verticalAlign="top" gap={5}>
      <Flex className="w-full" direction="row" horizontalAlign="stretch">
        <Flex
          fullSize
          direction="column"
          horizontalAlign="left"
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
          </Flex>
        </Flex>
        <Flex
          className="w-full h-full"
          direction="row"
          horizontalAlign="right"
          gap={8}
        >
          {spot.orientation && spot.orientation.length > 0 && (
            <Compass orientation={getFirstItem(spot.orientation)} />
          )}
          <Card className="w-auto">
            <table className="w-full">
              <tbody className="divide-y divide-white-300 dark:divide-dark-300">
                {spot.type && (
                  <tr>
                    <th className="py-2 px-3 text-left">
                      <Text variant="caption">{'Type'}</Text>
                    </th>
                    <td className="py-2 px-3 text-right">
                      <Tag
                        text={spot.type}
                        color={spot.type === 'Outdoor' ? 'green' : 'blue'}
                      />
                    </td>
                  </tr>
                )}

                {spot.difficulty && (
                  <tr>
                    <th className="py-2 px-3 text-left">
                      <Text variant="caption">{'Difficulty'}</Text>
                    </th>
                    <td className="py-2 px-3 text-right">
                      <Tag
                        text={spot.difficulty}
                        color={difficultyColors[spot.difficulty]}
                      />
                    </td>
                  </tr>
                )}

                {spot.cliff_height && (
                  <tr>
                    <th className="py-2 px-3 text-left">
                      <Text variant="caption">{'Cliff height'}</Text>
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
      </Flex>
      {spot.period && spot.period.length > 0 && (
        <SeasonDiagram months={spot.period} />
      )}
      <Text variant="body" className="opacity-60">
        {spot.description}
      </Text>
      <Flex fullSize verticalAlign="top" className="mt-4">
        <Text variant="subtitle" className="opacity-60">
          {'Approach'}
        </Text>
        <Text variant="body" className="opacity-60">
          {spot.approach}
        </Text>
      </Flex>
    </Flex>
  );
};
