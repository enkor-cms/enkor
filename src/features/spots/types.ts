import { createClient } from '@/lib/supabase/server';
import { getSpot } from './service';

export type getSpotParams = {
  client: ReturnType<typeof createClient>;
  spotId: string;
};

type GetSpotResponse = Awaited<ReturnType<typeof getSpot>>;
export type GetSpotResponseSuccess = GetSpotResponse['spot'];
export type GetSpotResponseError = GetSpotResponse['error'];
