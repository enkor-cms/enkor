import { Database } from '@/lib/db_types';

export type Location = Database['public']['Tables']['locations']['Row'];
export type Spot = Database['public']['Tables']['spots']['Row'];
export interface ISpot extends Omit<Spot, 'location'> {
  location: Location;
}
export interface IMapProps {
  spots?: ISpot[];
}
