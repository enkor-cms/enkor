import { Database } from '@/lib/db_types';
import { TTagColor } from '../common';
import { ISpotExtanded } from '../maps';

export type TSpotModalProps = {
  spot: ISpotExtanded;
  onClose?: () => void;
  onConfirm?: (spot: ISpotExtanded) => void;
};

export const difficultyColors: Record<
  NonNullable<Database['public']['Tables']['spots']['Row']['difficulty']>,
  TTagColor
> = {
  Easy: 'green',
  Medium: 'yellow',
  Hard: 'red',
};
