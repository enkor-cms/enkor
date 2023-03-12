'use client';

import {
  Button,
  Card,
  Flex,
  Icon,
  Tag,
  Text,
  TTagColor,
} from '@/components/common';
import ImageCarouselController from '@/components/common/image/ImageCaroussel';
import { useToggle } from '@/hooks';
import { Database } from '@/lib/db_types';
import { createClient } from '@/lib/supabase/browser';
import { useEffect, useState } from 'react';
import { useSupabase } from '../auth/SupabaseProvider';
import { ReviewContainer } from './ReviewContainer';
import { ReviewCreateModal } from './ReviewCreateModal';
import { TReviewDetailed, TSpotModalProps } from './types';

export const SpotModal = ({ spot, onClose, onConfirm }: TSpotModalProps) => {
  const supabase = createClient();
  const { session } = useSupabase();

  const [reviews, setReviews] = useState<TReviewDetailed[]>([]);
  const [creatingModalOpen, openCreatingModal, closeCreatingModal] =
    useToggle(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState<boolean>(true);
  const [note, setNote] = useState<number | null>(null);

  const fetchReviews = async () => {
    const { data: reviews, error } = await supabase
      .from('detailed_review')
      .select()
      .limit(10)
      .order('created_at', { ascending: false })
      .eq('spot_id', spot.id);

    if (error) {
      console.error(error);
    }

    console.log(reviews);

    setIsLoadingReviews(false);
    setReviews(reviews || []);
  };

  useEffect(() => {
    fetchReviews();
  }, [spot.id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const note = reviews.reduce((acc, review) => acc + review.note, 0);
      setNote(note / reviews.length);
    }
  }, [reviews]);

  const difficultyColors: Record<
    NonNullable<Database['public']['Tables']['spots']['Row']['difficulty']>,
    TTagColor
  > = {
    Easy: 'green',
    Medium: 'yellow',
    Hard: 'red',
  };

  return (
    <Flex fullSize verticalAlign="top" horizontalAlign="left">
      <ImageCarouselController
        images={[
          {
            src: 'https://picsum.photos/id/1012/600/400',
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
      <Flex className="w-full" direction="row" horizontalAlign="stretch">
        <Flex direction="column" horizontalAlign="left" verticalAlign="top">
          <Flex
            direction="row"
            horizontalAlign="center"
            verticalAlign="center"
            gap={4}
          >
            <Text style="title">{spot.name}</Text>
            {note ? (
              <Flex
                direction="row"
                horizontalAlign="center"
                verticalAlign="center"
                gap={0}
              >
                <Text style="body" className="opacity-80">
                  {note.toFixed(1)}
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
      <Flex verticalAlign="top" className="w-full">
        <Flex direction="row" horizontalAlign="stretch" className="w-full">
          <Text style="title">{`Reviews (${reviews.length})`}</Text>
          {session ? (
            <Button
              title="Add a review"
              variant="default"
              onClick={() => openCreatingModal()}
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
        ) : reviews.length > 0 ? (
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
      <ReviewCreateModal
        isOpen={creatingModalOpen}
        onConfirm={async (reviewCreated) => {
          if (reviewCreated) {
            setReviews((reviews) => [reviewCreated, ...reviews]);
          }
          closeCreatingModal();
        }}
        onClose={() => {
          closeCreatingModal();
        }}
        spotId={spot.id}
        creatorId={session?.user?.id || ''}
      />
    </Flex>
  );
};
