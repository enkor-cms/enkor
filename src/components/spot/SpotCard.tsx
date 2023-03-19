import { GetSpotResponseSuccess } from '@/features/spots';
import { Card, Flex, Icon, Tag, Text } from '../common';
import { difficultyColors } from './types';

export type TSpotCardProps = {
  spot: NonNullable<GetSpotResponseSuccess>;
};

export const SpotCard = ({ spot }: TSpotCardProps) => {
  return (
    <>
      <Flex className="w-full" direction="row" horizontalAlign="stretch">
        <Flex direction="column" horizontalAlign="left" verticalAlign="top">
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
        <Card className="w-auto">
          <div className="grid grid-cols-1 divide-y divide-white-300 dark:divide-dark-300">
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="stretch"
              className="w-full py-1 px-3"
              gap={0}
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
              className="w-full  py-1 px-3"
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
      <Text variant="body" className="opacity-60">
        {spot.description}
      </Text>
    </>
  );
};
