import {
  Button,
  Card,
  CustomImage,
  Flex,
  Icon,
  Text,
} from '@/components/common';
import { ReviewResponseSuccess } from '@/features/reviews';
import { formatDateString, getFirstItem } from '@/lib';
import { createClient } from '@/lib/supabase/browser';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useSupabase } from '../auth/SupabaseProvider';

export type TReviewProps = {
  review: NonNullable<ReviewResponseSuccess>;
};

export const Review = ({ review }: TReviewProps) => {
  const supabase = createClient();
  const { session } = useSupabase();

  const [likesCount, setLikesCount] = useState<number>(
    review.like_count[0]?.count || 0
  );

  const handleLike = async () => {
    if (!session) {
      toast.error('You need to be logged in to like a review');
      return;
    }

    const { data, error } = await supabase
      .from('reviews_likes')
      .insert({
        review_id: review.id,
        profile_id: session?.user?.id,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      toast.error(error.message);
    }

    if (data) {
      toast.success('Review liked');
      setLikesCount(likesCount ? likesCount + 1 : 1);
    }
  };

  return (
    <Card className="">
      <Flex
        direction="row"
        horizontalAlign="stretch"
        fullSize
        className="divide-x divide-white-300 dark:divide-dark-300"
        gap={0}
      >
        <Flex
          direction="column"
          verticalAlign="center"
          horizontalAlign="left"
          className="w-full h-full"
          gap={0}
        >
          <Flex
            direction="row"
            horizontalAlign="stretch"
            className="relative w-full px-2 border-b border-white-300 dark:border-dark-300"
          >
            <Flex
              direction="row"
              horizontalAlign="center"
              verticalAlign="center"
              gap={2}
            >
              <CustomImage
                src={getFirstItem(review.creator)?.avatar_url}
                alt={'Avatar'}
                width={30}
                height={30}
                rounded="full"
                fit="cover"
                className="border border-gray-200"
              />
              <Flex
                direction="row"
                horizontalAlign="center"
                verticalAlign="center"
                gap={0}
                className="py-2"
              >
                <Text
                  style="body"
                  className="px-1"
                  color="text-brand-300 dark:text-brand-100"
                >
                  <strong>{review.title}</strong>
                </Text>
                <Flex direction="row" horizontalAlign="left" gap={0}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon
                      key={i}
                      name="star"
                      color="text-yellow-500"
                      className="p-0"
                      scale={0.7}
                      fill={review.note > i ? true : false}
                    />
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Card className="absolute right-3 -bottom-2 pl-2">
              <Flex
                direction="row"
                horizontalAlign="center"
                verticalAlign="center"
                gap={0}
              >
                <Text style="body" className="opacity-80">
                  {likesCount}
                </Text>
                <Button
                  title={'Like'}
                  className="text-red-500"
                  variant="none"
                  size="medium"
                  icon="hearth"
                  iconOnly
                  disabled={session ? false : true}
                  iconFill={likesCount > 0 ? true : false}
                  onClick={handleLike}
                />
              </Flex>
            </Card>
          </Flex>
          <Flex
            direction="row"
            horizontalAlign="stretch"
            verticalAlign="stretch"
            className="h-full w-full px-2 py-2"
          >
            <Text style="body" className="w-full px-1">
              {review.content}
            </Text>
            <Flex className="h-full" horizontalAlign="right">
              <Text style="overline" className="text-right px-2 py-1">
                {formatDateString(review.created_at)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
