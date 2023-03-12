import { Database } from '@/lib/db_types';
import { ISpot } from '../maps';

export type TSpotModalProps = {
  spot: ISpot;
  onClose?: () => void;
  onConfirm?: (spot: ISpot) => void;
};

export type TReviewCreateModalProps = {
  spotId: TReview['spot_id'];
  creatorId: TReview['creator_id'];
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (review: TReviewWithCreator) => void;
};

export type TReview = Database['public']['Tables']['review']['Row'];

export type TReviewInsert = Database['public']['Tables']['review']['Insert'];

export type TReviewWithCreator = TReview & {
  creator: {
    avatar_url: string;
  };
};