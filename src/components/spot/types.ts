import { Database } from '@/lib/db_types';
import { ISpot } from '../maps';

export type TSpotModalProps = {
  spot: ISpot;
  onClose?: () => void;
  onConfirm?: (spot: ISpot) => void;
};

export type TReview = Database['public']['Tables']['review']['Row'];

export type TReviewWithCreator = TReview & {
  creator: {
    avatar_url: string;
  };
};
