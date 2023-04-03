'use client';

import {
  CustomImage,
  Flex,
  Icon,
  ImageCarouselController,
  Text,
} from '@/components/common';
import { ReviewContainer } from '@/components/review/ReviewContainer';
import { ReviewCreateModal } from '@/components/review/ReviewCreateModal';
import { EventsResponseSuccess, getSpotEvents } from '@/features/events';
import { getSpotReviews, ReviewsResponseSuccess } from '@/features/reviews';
import { getFirstItem } from '@/lib';
import { createClient } from '@/lib/supabase/browser';
import { useEffect, useState } from 'react';
import { useSupabase } from '../auth/SupabaseProvider';
import { EventCreateFloatingPanel } from '../event';
import { EventContainer } from '../event/EventContainer';
import { SpotCard } from './SpotCard';
import { TSpotModalProps } from './types';

export const SpotModal = ({ spot }: TSpotModalProps) => {
  const supabase = createClient();
  const { session } = useSupabase();

  const [reviews, setReviews] = useState<ReviewsResponseSuccess>(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);

  const fetchReviews = async () => {
    const { reviews, error } = await getSpotReviews({
      client: supabase,
      spotId: spot.id || '',
    });

    if (error) {
      console.error(error);
    }

    setIsLoadingReviews(false);
    setReviews(reviews || []);
  };

  const [events, setEvents] = useState<EventsResponseSuccess>(null);
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);

  const fetchEvents = async () => {
    const { events, error } = await getSpotEvents({
      client: supabase,
      spotId: spot.id || '',
    });

    if (error) {
      console.error(error);
    }

    setIsLoadingEvents(false);
    setEvents(events || []);
  };

  useEffect(() => {
    fetchReviews();
    fetchEvents();
  }, [spot.id]);

  return (
    <Flex
      fullSize
      verticalAlign="top"
      horizontalAlign="left"
      className="h-full overflow-y-auto p-3"
      gap={6}
    >
      <Flex className="h-auto w-full">
        {spot.image && spot.image.length > 1 ? (
          <ImageCarouselController
            images={spot?.image?.map((image) => {
              return {
                src: image,
                alt: spot.name || '',
                width: 400,
              };
            })}
          />
        ) : spot.image && spot.image.length == 1 ? (
          <CustomImage
            src={getFirstItem(spot.image) || ''}
            alt={spot.name || ''}
            loader={true}
            height={300}
            fullWidth={true}
            width={400}
            style={{
              objectFit: 'cover',
            }}
            rounded="md"
            className="z-10"
          />
        ) : (
          <Flex
            className="bg-gray-100 dark:bg-dark-100 w-full h-full rounded-md py-2"
            fullSize
            verticalAlign="center"
            horizontalAlign="center"
          >
            <Text variant="body">No Image</Text>
          </Flex>
        )}
      </Flex>
      <SpotCard spot={spot} />
      <Flex verticalAlign="top" className="w-full">
        <Flex direction="row" horizontalAlign="stretch" className="w-full">
          <Text variant="title">
            {`Events associated `}
            <span className="opacity-70">({events?.length})</span>{' '}
          </Text>
          {session ? (
            <EventCreateFloatingPanel
              spot={spot}
              creatorId={session?.user?.id || ''}
            />
          ) : (
            <Text variant="body" className="opacity-60">
              {'Log in to add a review'}
            </Text>
          )}
        </Flex>
        {isLoadingEvents ? (
          <Flex
            direction="column"
            horizontalAlign="center"
            verticalAlign="center"
            className="w-full"
          >
            <Icon name="spin" scale={2} className="animate-spin-slow" />
          </Flex>
        ) : events && events?.length > 0 ? (
          <EventContainer events={events} />
        ) : (
          <Flex
            direction="column"
            horizontalAlign="center"
            verticalAlign="center"
            className="w-full"
          >
            <Text variant="body" className="opacity-60">
              {'No events yet'}
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex verticalAlign="top" className="w-full">
        <Flex direction="row" horizontalAlign="stretch" className="w-full">
          <Text variant="title">{`Reviews (${reviews?.length})`}</Text>
          {session ? (
            <ReviewCreateModal
              onConfirm={async (reviewCreated) => {
                setReviews((prev) => {
                  return [reviewCreated, ...prev];
                });
              }}
              spotId={spot.id || ''}
              creatorId={session?.user?.id || ''}
            />
          ) : (
            <Text variant="body" className="opacity-60">
              {'Log in to add a review'}
            </Text>
          )}
        </Flex>
        {isLoadingReviews ? (
          <Flex
            direction="column"
            horizontalAlign="center"
            verticalAlign="center"
            className="w-full"
          >
            <Icon name="spin" scale={2} className="animate-spin-slow" />
          </Flex>
        ) : reviews && reviews?.length > 0 ? (
          <ReviewContainer reviews={reviews} />
        ) : (
          <Flex
            direction="column"
            horizontalAlign="center"
            verticalAlign="center"
            className="w-full"
          >
            <Text variant="body" className="opacity-60">
              {'No reviews yet'}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
