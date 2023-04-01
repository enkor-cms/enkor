'use client';

import { CustomImage, Flex, Icon, Text } from '@/components/common';
import { GetSpotResponseSuccess } from '@/features/spots';
import { actualSpotAtom } from '@/hooks/jotai/maps/atom';
import { getFirstItem } from '@/lib';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';
import { Button, Card, Tag } from '../common';

export type TSpotCardSmallProps = {
  spot: NonNullable<GetSpotResponseSuccess>;
  orientation?: 'horizontal' | 'vertical';
  openFloatingPanel?: boolean;
};

export const SpotCardSmall: React.FC<TSpotCardSmallProps> = ({
  spot,
  orientation = 'vertical',
  openFloatingPanel = false,
}) => {
  const [actualSpot, setActualSpot] = useAtom(actualSpotAtom);
  return (
    <Card className="w-full h-full dark:bg-dark-300">
      <Flex
        fullSize
        direction={orientation === 'vertical' ? 'column' : 'row'}
        verticalAlign="center"
        gap={0}
      >
        <Flex
          fullSize
          direction="row"
          verticalAlign="center"
          horizontalAlign="left"
          className="relative rounded-t-md"
        >
          <CustomImage
            src={getFirstItem(spot.image) || ''}
            alt={spot.name || 'spot'}
            fullWidth
            height={200}
            className={`${
              orientation === 'vertical' ? 'rounded-t-md' : 'rounded-l-md'
            }`}
            style={{
              objectFit: 'cover',
            }}
          />
          <Link
            href={`/dashboard/spot/${spot.id}`}
            target="_blank"
            className="absolute top-1 left-1"
          >
            <Button variant="primary" text="Open spot page" icon="eye" />
          </Link>
          {openFloatingPanel && (
            <Button
              variant="primary"
              text="Open spot panel"
              icon="eye"
              className="absolute bottom-1 right-1"
              iconOnly
              onClick={() => {
                setActualSpot(spot);
              }}
            />
          )}
        </Flex>
        <Flex
          fullSize
          direction={'column'}
          verticalAlign="center"
          gap={0}
          className={`${
            orientation === 'vertical' ? 'divide-y' : 'divide-x'
          }  divide-white-300 dark:divide-gray-600`}
        >
          <Flex
            fullSize
            direction="column"
            verticalAlign="top"
            horizontalAlign="left"
            className="p-2"
            gap={0}
          >
            <Text variant="subtitle" color="text-brand-300 dark:text-brand-100">
              {spot.name}
            </Text>
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
            fullSize
            direction="row"
            verticalAlign="center"
            horizontalAlign="stretch"
            className="px-2 py-1"
          >
            {spot.type && (
              <Tag
                text={spot.type}
                color={spot.type === 'Outdoor' ? 'green' : 'blue'}
              />
            )}
            <Flex
              direction="row"
              verticalAlign="center"
              horizontalAlign="center"
              className="h-full ml-auto"
              gap={0}
            >
              {spot.note ? (
                <>
                  <Text variant="caption" className="tracking-widest">
                    {spot.note?.toFixed(1)}
                    <span className="opacity-70">/5</span>
                  </Text>
                  <Icon name="star" color="text-yellow-500" fill scale={0.8} />
                </>
              ) : (
                <Text variant="caption" className="opacity-60">
                  {'No rating'}
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
