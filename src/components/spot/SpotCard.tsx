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
            <div className="grid grid-cols-1 divide-y divide-white-300 dark:divide-dark-300">
              <Flex
                direction="row"
                verticalAlign="center"
                horizontalAlign="stretch"
                className="w-full py-1 px-3"
              >
                {spot.type && (
                  <>
                    <Text variant="caption">{'Type'}</Text>
                    <Tag
                      text={spot.type}
                      color={spot.type === 'Outdoor' ? 'green' : 'blue'}
                    />
                  </>
                )}
              </Flex>

              <Flex
                direction="row"
                verticalAlign="center"
                horizontalAlign="stretch"
                className="w-full py-1 px-3"
              >
                {spot.difficulty && (
                  <>
                    <Text variant="caption">{'Difficulty'}</Text>
                    <Tag
                      text={spot.difficulty}
                      color={difficultyColors[spot.difficulty]}
                    />
                  </>
                )}
              </Flex>
            </div>
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
