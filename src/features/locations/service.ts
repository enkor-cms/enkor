import { logger } from '@/lib/logger';
import { insertLocationParams } from './types';

export const insertLocation = async ({
  client,
  location,
}: insertLocationParams) => {
  const { data, error } = await client
    .from('locations')
    .insert(location)
    .select();

  if (error) {
    logger.error(error);
  }

  return { location: data, error };
};
