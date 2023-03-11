import { Card, Flex, Icon, Text } from '@/components/common';
import CustomImage from '../common/image/CustomImage';
import { TReviewWithCreator } from './types';

export type TReviewProps = {
  review: TReviewWithCreator;
};

export const Review = ({ review }: TReviewProps) => {
  return (
    <Card className="p-2">
      <Flex verticalAlign="top">
        <Flex direction="row" horizontalAlign="stretch" className="w-full">
          <Flex
            direction="row"
            horizontalAlign="center"
            verticalAlign="center"
            gap={2}
          >
            <CustomImage
              src={review.creator.avatar_url}
              alt={'Avatar'}
              width={30}
              height={30}
              rounded="full"
              fit="cover"
              className="border border-gray-200"
            />
            <Text style="body">{review.title}</Text>
          </Flex>
          <Flex
            direction="row"
            horizontalAlign="center"
            verticalAlign="center"
            gap={0}
          >
            <Text style="caption" className="opacity-80">
              {review.note}
            </Text>
            <Icon name="star" color="text-yellow-400" scale={0.7} />
          </Flex>
        </Flex>

        <Text style="caption">{review.content}</Text>
      </Flex>
    </Card>
  );
};
