import { ReviewsResponseSuccess } from '@/features/reviews';
import { Review } from './ReviewCard';

export type TReviewContainerProps = {
  reviews: NonNullable<ReviewsResponseSuccess>;
};

export const ReviewContainer = ({ reviews }: TReviewContainerProps) => {
  const reviewsPerColumn = Math.ceil(reviews.length / 3);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="grid grid-cols-1 gap-3" key={index}>
          {reviews
            .slice(index * reviewsPerColumn, (index + 1) * reviewsPerColumn)
            .map((review) => (
              <Review review={review} key={review.id} />
            ))}
        </div>
      ))}
    </div>
  );
};
