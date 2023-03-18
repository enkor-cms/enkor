import { ReviewsResponseSuccess } from '@/features/reviews';
import { Review } from './ReviewCard';

export type TReviewContainerProps = {
  reviews: NonNullable<ReviewsResponseSuccess>;
};

export const ReviewContainer = ({ reviews }: TReviewContainerProps) => {
  const reviewsPerColumn = Math.ceil(reviews.length / 3);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="grid grid-cols-1 gap-3">
        {reviews.slice(0, reviewsPerColumn).map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {reviews.slice(reviewsPerColumn, reviewsPerColumn * 2).map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {reviews.slice(reviewsPerColumn * 2).map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};
