import { EventsResponseSuccess } from '@/features/events';
import React from 'react';
import { EventCard } from './EventCard';

export const EventContainer: React.FC<{
  events: NonNullable<EventsResponseSuccess>;
}> = ({ events }) => {
  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
