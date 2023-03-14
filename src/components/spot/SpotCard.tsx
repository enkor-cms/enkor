import { Card, Flex, Icon, Tag, Text } from '../common';
import { ISpotExtanded } from '../maps';
import { difficultyColors } from './types';

export type TSpotCardProps = {
  spot: ISpotExtanded;
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
            <Text style="title">{spot.name}</Text>
            {spot.note ? (
              <Flex
                direction="row"
                horizontalAlign="center"
                verticalAlign="center"
                gap={0}
              >
                <Text style="body" className="opacity-80">
                  {spot.note.toFixed(1)}
                </Text>
                <Icon name="star" color="text-yellow-400" fill />
              </Flex>
            ) : null}
          </Flex>
          <Flex direction="row" horizontalAlign="left">
            <Text style="body" className="opacity-80">
              {spot.location.city},
            </Text>
            <Text style="body" className="opacity-50">
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
                  <Text style="caption">{'Type'}</Text>
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
                  <Text style="caption">{'Difficulty'}</Text>
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
      <Text style="body" className="opacity-60">
        {spot.description}
      </Text>
    </>
  );
};
