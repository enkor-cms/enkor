import { logger } from '@/lib/logger';
import { PostgrestError } from '@supabase/supabase-js';
import { getSpotParams, ISpotExtanded, listSpotsParams } from './types';

export const getSpot = async ({
  spotId,
  client,
}: getSpotParams): Promise<{
  spot: ISpotExtanded | null;
  error: PostgrestError | null;
}> => {
  const { data: spot, error } = await client
    .from('spot_extanded_view')
    .select(
      `
        *,
        location(*)
      `,
    )
    .eq('id', spotId)
    .single();

  if (error) {
    logger.error(error);
  }

  return { spot: spot as unknown as ISpotExtanded, error };
};

export const listSpots = async ({
  client,
  limit = 10,
}: listSpotsParams): Promise<{
  spots: ISpotExtanded[];
  error: PostgrestError | null;
}> => {
  const { data: spots, error } = await client
    .from('spot_extanded_view')
    .select(
      `
        *,
        location(*)
      `,
    )
    // .eq('id', '755f563a-c046-4ed2-9a77-a4ed5776684e')
    .limit(limit);

  if (error) {
    logger.error(error);
  }

  return {
    spots: spots as unknown as ISpotExtanded[],
    error,
  };
};
