import {
  CustomImage,
  Flex,
  ImageCarouselController,
  Text,
} from '@/components/common';
import { EventCreateFloatingPanel } from '@/components/event';
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
    <div className="w-full md:w-11/12 lg:w-5/6">
      <Flex
        fullSize
        verticalAlign="top"
        horizontalAlign="left"
        className="h-full overflow-y-auto p-3"
        gap={8}
      >
        <Flex className="h-full w-full">
          {spot.image && spot.image.length > 1 ? (
            <ImageCarouselController
              images={spot?.image?.map((image) => {
                return {
                  src: image,
                  alt: spot.name,
                  width: 400,
                };
              })}
            />
          ) : (
            <CustomImage
              src={spot.image[0]}
              alt={spot.name}
              loader={true}
              height={300}
              fullWidth={true}
              style={{
                objectFit: 'cover',
              }}
              rounded="md"
              className="z-10"
            />
          )}
        </Flex>
        <SpotCard spot={spot} />

        <Flex verticalAlign="top" className="w-full">
          <Flex direction="row" horizontalAlign="stretch" className="w-full">
            <Text style="title">
              {`Events associated `}
              <span className="opacity-70">({events?.length})</span>{' '}
            </Text>
            {session ? (
              <EventCreateFloatingPanel
                spot={spot}
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
            <Text style="title">
              {`Reviews`}{' '}
              <span className="opacity-70">({reviews?.length})</span>{' '}
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
