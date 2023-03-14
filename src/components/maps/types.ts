import { Database } from '@/lib/db_types';

export type Location = Database['public']['Tables']['locations']['Row'];
export type SpotExtanded =
  Database['public']['Views']['spot_extanded_view']['Row'];
export interface ISpotExtanded extends Omit<SpotExtanded, 'location'> {
  location: Location;
}
export interface IMapProps {
  spots?: ISpotExtanded[];
}
