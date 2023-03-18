import { TEventInsert } from '@/components/event';
import { createClient } from '@/lib/supabase/server';
import { createEvent, getEvent, getSpotEvents, joinEvent } from './service';

export type getEventParams = {
  client: ReturnType<typeof createClient>;
  eventId: string;
};

type EventResponse = Awaited<ReturnType<typeof getEvent>>;
export type EventResponseSuccess = EventResponse['event'];
export type EventResponseError = EventResponse['error'];

export type getSpotEventsParams = {
  client: ReturnType<typeof createClient>;
  spotId: string;
};

type EventsResponse = Awaited<ReturnType<typeof getSpotEvents>>;
export type EventsResponseSuccess = EventsResponse['events'];
export type EventsResponseError = EventsResponse['error'];

export type joinEventParams = {
  client: ReturnType<typeof createClient>;
  eventId: string;
  userId: string;
};

type JoinEventResponse = Awaited<ReturnType<typeof joinEvent>>;
export type JoinEventResponseSuccess = JoinEventResponse['participation'];
export type JoinEventResponseError = JoinEventResponse['error'];

export type createEventParams = {
  client: ReturnType<typeof createClient>;
  event: TEventInsert;
};

type CreateEventResponse = Awaited<ReturnType<typeof createEvent>>;
export type CreateEventResponseSuccess = CreateEventResponse['event'];
export type CreateEventResponseError = CreateEventResponse['error'];
