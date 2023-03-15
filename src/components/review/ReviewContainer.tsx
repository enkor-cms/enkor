import { ReviewsResponseSuccess } from '@/features/reviews';
import { Review } from './ReviewCard';

export type TReviewContainerProps = {
  reviews: NonNullable<ReviewsResponseSuccess>;
};

export const ReviewContainer = ({ reviews }: TReviewContainerProps) => {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      <div className="grid grid-cols-1 gap-3">
        {reviews.slice(0, Math.ceil(reviews.length / 2)).map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {reviews.slice(Math.ceil(reviews.length / 2)).map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};
