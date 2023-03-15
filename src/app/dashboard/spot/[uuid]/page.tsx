import { Flex, ImageCarouselController, Text } from '@/components/common';
import { EventContainer } from '@/components/event/EventContainer';
import { ReviewContainer, ReviewCreateModal } from '@/components/review';
import { SpotCard } from '@/components/spot';
import { getSpotEvents } from '@/features/events/service';
import { getSpotReviews } from '@/features/reviews';
import { getSpot } from '@/features/spots';
import { createClient } from '@/lib/supabase/server';

export default async function Page({ params }: { params: { uuid: string } }) {
  const supabase = createClient();

  const { spot } = await getSpot({
    client: supabase,
    spotId: params.uuid,
  });
  const { reviews } = await getSpotReviews({
    client: supabase,
    spotId: params.uuid,
  });
  const { events } = await getSpotEvents({
    client: supabase,
    spotId: params.uuid,
  });

  const {
    data: { session: session },
  } = await supabase.auth.getSession();

  if (!spot) {
    return <Text style="body">No Spot</Text>;
  }

  return (
    <div className="w-5/6">
      <Flex
        fullSize
        verticalAlign="top"
        horizontalAlign="left"
        className="h-full overflow-y-auto p-3"
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
        {events && events.length > 0 ? (
          <EventContainer events={events} />
        ) : (
          <Text style="body">No Events</Text>
        )}
        <Flex verticalAlign="top" className="w-full">
          <Flex direction="row" horizontalAlign="stretch" className="w-full">
            <Text style="title">{`Reviews (${reviews?.length})`}</Text>
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
          {reviews && reviews.length > 0 ? (
            <ReviewContainer reviews={reviews} />
          ) : (
            <Text style="body">No Reviews</Text>
          )}
        </Flex>
      </Flex>
    </div>
  );
}
