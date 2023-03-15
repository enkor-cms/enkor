import { logger } from '@/lib/logger';
import { getSpotParams } from './types';

export const getSpot = async ({ spotId, client }: getSpotParams) => {
  const { data: spot, error } = await client
    .from('spot_extanded_view')
    .select(
      `
        *,
        location(*)
      `
    )
    .eq('id', spotId)
    .single();

  if (error) {
    logger.error(error);
  }

  return { spot, error };
};
