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
import { Locale } from '@/i18n';
import { getFirstItem } from '@/lib';
import { getDictionary } from '@/lib/get-dictionary';
import { createClient } from '@/lib/supabase/server';

export default async function Page({
  params,
}: {
  params: { uuid: string; lang: Locale };
}) {
  const supabase = createClient();
  const dictionary = await getDictionary(params.lang);

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
    return <Text variant="body">No Spot</Text>;
  }

  return (
    <div className="w-full md:w-11/12 lg:w-5/6">
      <Flex
        fullSize
        verticalAlign="top"
        horizontalAlign="left"
        className="h-full overflow-y-auto p-3 pt-0"
        gap={8}
      >
        <Flex className="h-full w-full">
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
              width={400}
              height={300}
              fullWidth={true}
              style={{
                objectFit: 'cover',
                objectPosition: 'bottom',
              }}
              rounded="md"
              className="z-10"
            />
          ) : (
            <Flex
              className="bg-gray-100 dark:bg-dark-100 w-full h-full rounded-md"
              fullSize
              verticalAlign="center"
              horizontalAlign="center"
            >
              <Text variant="body">{dictionary.common.no_image}</Text>
            </Flex>
          )}
        </Flex>
        <SpotCard spot={spot} />
        <Flex verticalAlign="top" className="w-full">
          <Flex direction="row" horizontalAlign="stretch" className="w-full">
            <Text variant="title">
              {dictionary.events.title}
              <span className="ml-1 opacity-70">({events?.length})</span>{' '}
            </Text>
            {session ? (
              <EventCreateFloatingPanel
                spot={spot}
                creatorId={session?.user?.id || ''}
              />
            ) : (
              <Text variant="body" className="opacity-60">
                {dictionary.events.login_to_create}
              </Text>
            )}
          </Flex>
          {events && events.length > 0 ? (
            <EventContainer events={events} />
          ) : (
            <Text variant="body">{dictionary.events.no_events}</Text>
          )}
        </Flex>
        <Flex verticalAlign="top" className="w-full">
          <Flex direction="row" horizontalAlign="stretch" className="w-full">
            <Text variant="title">
              {dictionary.reviews.title}
              <span className="ml-1 opacity-70">({reviews?.length})</span>{' '}
            </Text>
            {session ? (
              <ReviewCreateModal
                spotId={spot.id || ''}
                creatorId={session?.user?.id || ''}
              />
            ) : (
              <Text variant="body" className="opacity-60">
                {dictionary.reviews.login_to_review}
              </Text>
            )}
          </Flex>
          {reviews && reviews.length > 0 ? (
            <ReviewContainer reviews={reviews} />
          ) : (
            <Text variant="body">{dictionary.reviews.no_reviews}</Text>
          )}
        </Flex>
      </Flex>
    </div>
  );
}
