import { Database } from '@/lib/db_types';

export type TReviewCreateModalProps = {
  spotId: TReview['spot_id'];
  creatorId: TReview['creator_id'];
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (review: TReview) => void;
};

export type TReview = Database['public']['Tables']['reviews']['Row'];

export type TReviewInsert = Database['public']['Tables']['reviews']['Insert'];
