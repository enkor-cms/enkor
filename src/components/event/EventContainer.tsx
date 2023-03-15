import { EventsResponseSuccess } from '@/features/events';
import React from 'react';
import { EventCard } from './EventCard';

export const EventContainer: React.FC<{
  events: NonNullable<EventsResponseSuccess>;
}> = ({ events }) => {
  return (
    <div className="flex flex-col w-full h-full bg-white-100 dark:bg-dark-200 rounded-lg shadow-lg">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
