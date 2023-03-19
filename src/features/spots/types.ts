import { Database } from '@/lib/db_types';
import { createClient } from '@/lib/supabase/server';
import { getSpot } from './service';

export type getSpotParams = {
  client: ReturnType<typeof createClient>;
  spotId: string;
};

export type listSpotsParams = {
  client: ReturnType<typeof createClient>;
  limit?: number;
};

type GetSpotResponse = Awaited<ReturnType<typeof getSpot>>;
export type GetSpotResponseError = GetSpotResponse['error'];
type GetSpotResponseSuccessTemp = GetSpotResponse['spot'];

type GetSpotResponseSuccessLocation = {
  location: Location;
};

export type GetSpotResponseSuccess = Omit<
  NonNullable<GetSpotResponseSuccessTemp>,
  'location'
> &
  GetSpotResponseSuccessLocation;

export type Location = Database['public']['Tables']['locations']['Row'];
export type SpotExtanded =
  Database['public']['Views']['spot_extanded_view']['Row'];
export interface ISpotExtanded extends Omit<SpotExtanded, 'location'> {
  location: Location;
}
