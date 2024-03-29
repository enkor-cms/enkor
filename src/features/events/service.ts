import { logger } from '@/lib/logger';
import {
  createEventParams,
  getEventParams,
  getSpotEventsParams,
  joinEventParams,
} from './types';

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

export const createEvent = async ({ client, event }: createEventParams) => {
  const { data: createdEvent, error } = await client
    .from('events')
    .insert(event)
    .select(
      `
        *,
        creator:profiles(avatar_url, username),
        participations:events_participations(*, user:profiles(avatar_url, username))
      `
    )
    .single();

  if (error) {
    logger.error(error);
  }

  return { event: createdEvent, error };
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
    .order('start_at', { ascending: true })
    .eq('spot_id', spotId);

  if (error) {
    logger.error(error);
  }

  return { events, error };
};

export const joinEvent = async ({
  eventId,
  userId,
  client,
}: joinEventParams) => {
  const { data: participation, error } = await client
    .from('events_participations')
    .insert({ event_id: eventId, user_id: userId })
    .select(
      `
        *,
        user:profiles(avatar_url, username)
      `
    )
    .single();

  if (error) {
    logger.error(error);
  }

  return { participation, error };
};
