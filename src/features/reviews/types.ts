import { createClient } from '@/lib/supabase/server';
import { getReview, getSpotReviews } from './service';

export type getReviewParams = {
  client: ReturnType<typeof createClient>;
  reviewId: string;
};

type ReviewResponse = Awaited<ReturnType<typeof getReview>>;
export type ReviewResponseSuccess = ReviewResponse['review'];
export type ReviewResponseError = ReviewResponse['error'];

export type getSpotReviewsParams = {
  client: ReturnType<typeof createClient>;
  spotId: string;
};

type ReviewsResponse = Awaited<ReturnType<typeof getSpotReviews>>;
export type ReviewsResponseSuccess = ReviewsResponse['reviews'];
export type ReviewsResponseError = ReviewsResponse['error'];
