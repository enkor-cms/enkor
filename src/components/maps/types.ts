import { ISpotExtanded } from '@/features/spots';
import { Database } from '@/lib/db_types';

export interface ICluster {
  spots: ISpotExtanded[];
  latitude: number;
  longitude: number;
}
export interface IMapProps {
  spots?: ISpotExtanded[];
}

export type TLocationInsert = Pick<
  Database['public']['Tables']['locations']['Insert'],
  'latitude' | 'longitude' | 'city' | 'department' | 'country'
>;
