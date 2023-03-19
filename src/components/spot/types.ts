import { GetSpotResponseSuccess } from '@/features/spots';
import { Database } from '@/lib/db_types';
import { TTagColor } from '../common';

export type TSpotModalProps = {
  spot: NonNullable<GetSpotResponseSuccess>;
  onClose?: () => void;
  // eslint-disable-next-line no-unused-vars
  onConfirm?: (spot: GetSpotResponseSuccess) => void;
};

export const difficultyColors: Record<
  NonNullable<Database['public']['Tables']['spots']['Row']['difficulty']>,
  TTagColor
> = {
  Easy: 'green',
  Medium: 'yellow',
  Hard: 'red',
};
