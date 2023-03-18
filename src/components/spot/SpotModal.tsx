'use client';

import { Flex, Icon, ImageCarouselController, Text } from '@/components/common';
import { ReviewContainer } from '@/components/review/ReviewContainer';
import { ReviewCreateModal } from '@/components/review/ReviewCreateModal';
import { EventsResponseSuccess, getSpotEvents } from '@/features/events';
import { getSpotReviews, ReviewsResponseSuccess } from '@/features/reviews';
import { createClient } from '@/lib/supabase/browser';
import { useEffect, useState } from 'react';
import { useSupabase } from '../auth/SupabaseProvider';
import { EventContainer } from '../event/EventContainer';
import { SpotCard } from './SpotCard';
import { TSpotModalProps } from './types';

export const SpotModal = ({ spot, onClose, onConfirm }: TSpotModalProps) => {
  const supabase = createClient();
  const { session } = useSupabase();

  const [reviews, setReviews] = useState<ReviewsResponseSuccess>([]);
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

  const [events, setEvents] = useState<EventsResponseSuccess>([]);
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
      <Flex className="h-full w-full">
        <ImageCarouselController
          images={[
            {
              src: 'https://picsum.photos/id/1000/600/400',
              alt: spot.name || 'Spot',
              width: 600,
            },
            {
              src: 'https://picsum.photos/id/1001/600/400',
              alt: spot.name || 'Spot',
              width: 300,
            },
            {
              src: 'https://picsum.photos/id/1002/600/400',
              alt: spot.name || 'Spot',
              width: 600,
            },
          ]}
        />
      </Flex>
      <SpotCard spot={spot} />
      <Flex verticalAlign="top" className="w-full">
        <Flex direction="row" horizontalAlign="stretch" className="w-full">
          <Text style="title">
            {`Events associated `}
            <span className="opacity-70">({events?.length})</span>{' '}
          </Text>
          {session ? (
            <ReviewCreateModal
              spotId={spot.id}
              creatorId={session?.user?.id || ''}
            />
          ) : (
            <Text style="body" className="opacity-60">
              {'Log in to add a review'}
            </Text>
          )}
        </Flex>
        {events && events.length > 0 ? (
          <EventContainer events={events} />
        ) : (
          <Text style="body">No Events</Text>
        )}
      </Flex>
      <Flex verticalAlign="top" className="w-full">
        <Flex direction="row" horizontalAlign="stretch" className="w-full">
          <Text style="title">{`Reviews (${reviews?.length})`}</Text>
          {session ? (
            <ReviewCreateModal
              onConfirm={async (reviewCreated) => {
                setReviews((reviews) => [reviewCreated, ...reviews]);
              }}
              spotId={spot.id || ''}
              creatorId={session?.user?.id || ''}
            />
          ) : (
            <Text style="body" className="opacity-60">
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
            <Text style="body" className="opacity-60">
              {'No reviews yet'}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
