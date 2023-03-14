import { Database } from '@/lib/db_types';

export type TReviewCreateModalProps = {
  spotId: TReview['spot_id'];
  creatorId: TReview['creator_id'];
  onClose?: () => void;
  onConfirm?: (review: TReviewDetailed) => void;
};

export type TReview = Database['public']['Tables']['review']['Row'];

export type TReviewInsert = Database['public']['Tables']['review']['Insert'];

export type TReviewDetailed =
  Database['public']['Views']['detailed_review']['Row'];
