import { GetSpotResponseSuccess } from '@/features/spots';
import { getFirstItem } from '@/lib';
import Link from 'next/link';
import React from 'react';
import { Button, Card, CustomImage, Flex, Icon, Tag, Text } from '../common';

export const SpotCardSmall: React.FC<{
  spot: NonNullable<GetSpotResponseSuccess>;
}> = ({ spot }) => {
  return (
    <Card className="w-full bg-white-300 dark:bg-dark-300">
      <Flex
        fullSize
        direction="column"
        verticalAlign="center"
        gap={0}
        className="divide-y divide-white-300 dark:divide-gray-600"
      >
        <Flex
          fullSize
          direction="row"
          verticalAlign="center"
          horizontalAlign="left"
          className="relative rounded-t-md"
        >
          <CustomImage
            src={getFirstItem(spot.image)}
            // src="/hiking.png"
            alt={spot.name || 'spot'}
            fullWidth
            height={200}
            className="rounded-t-md"
            style={{
              objectFit: 'cover',
            }}
          />
          <Link
            href={`/dashboard/spot/${spot.id}`}
            target="_blank"
            className="absolute top-0 left-0"
          >
            <Button title="see spot" icon="eye" iconOnly />
          </Link>
        </Flex>
        <Flex
          fullSize
          direction="column"
          verticalAlign="top"
          horizontalAlign="left"
          className="p-2"
          gap={0}
        >
          <Text style="subtitle" color="text-brand-300 dark:text-brand-100">
            {spot.name}
          </Text>
          <Flex direction="row" horizontalAlign="left">
            <Text style="body" className="opacity-80">
              {spot.location.city}
            </Text>
            <Text style="body" className="opacity-50">
              {spot.location.department}
            </Text>
          </Flex>
        </Flex>
        <Flex
          fullSize
          direction="row"
          verticalAlign="center"
          horizontalAlign="stretch"
          className="p-2"
        >
          <Text style="caption" color="text-brand-300">
            {spot.type && (
              <Tag
                text={spot.type}
                color={spot.type === 'Outdoor' ? 'green' : 'blue'}
              />
            )}
          </Text>
          <Flex
            direction="row"
            verticalAlign="center"
            horizontalAlign="center"
            className="h-full ml-auto"
            gap={0}
          >
            <Text style="caption" className="tracking-widest">
              {spot.note?.toFixed(1)}
              <span className="opacity-70">/5</span>
            </Text>
            <Icon name="star" color="text-yellow-500" fill scale={0.8} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
