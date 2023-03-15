import { logger } from '@/lib/logger';
import { getEventParams, getSpotEventsParams } from './types';

export const getEvent = async ({ eventId, client }: getEventParams) => {
  const { data: event, error } = await client
    .from('events')
    .select(
      `
        *,
        creator:profiles(avatar_url, username),
        participations:events_participations(*, user:profiles(avatar_url, username))
      `
    )
    .eq('id', eventId)
    .single();

  if (error) {
    logger.error(error);
  }

  return { event, error };
};

export const getSpotEvents = async ({
  spotId,
  client,
}: getSpotEventsParams) => {
  const { data: events, error } = await client
    .from('events')
    .select(
      `
        *,
        creator:profiles(avatar_url, username),
        participations:events_participations(*, user:profiles(avatar_url, username))
      `
    )
    .limit(10)
    .order('created_at', { ascending: false })
    .eq('spot_id', spotId);

  if (error) {
    logger.error(error);
  }

  return { events, error };
};
