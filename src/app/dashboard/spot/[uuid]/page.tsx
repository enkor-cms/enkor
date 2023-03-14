import { Flex, ImageCarouselController, Text } from '@/components/common';
import { ReviewContainer, ReviewCreateModal } from '@/components/review';
import { SpotCard } from '@/components/spot';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@supabase/auth-helpers-nextjs';

const getSpot = async (uuid: string) => {
  const supabase = createClient();
  const { data: spot, error } = await supabase
    .from('spot_extanded_view')
    .select(
      `
        *,
        location(*)
      `
    )
    .eq('id', uuid)
    .single();

  if (error) {
    logger.error(error);
  }

  return { spot, error };
};

const getReviews = async (uuid: string) => {
  const supabase = createClient();
  const { data: reviews, error } = await supabase
    .from('detailed_review')
    .select()
    .limit(10)
    .order('created_at', { ascending: false })
    .eq('spot_id', uuid);

  if (error) {
    logger.error(error);
  }

  return { reviews, error };
};

export default async function Page({ params }: { params: { uuid: string } }) {
  const { spot, error: errorSpots } = await getSpot(params.uuid);
  const { reviews, error: errorReviews } = await getReviews(params.uuid);

  const supabase = createClient();
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
