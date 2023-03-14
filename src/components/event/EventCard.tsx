import React from 'react';
import { Text } from '../common';
import { Event } from './index';

export const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="flex flex-col w-full h-full bg-white-100 dark:bg-dark-200 rounded-lg shadow-lg">
      <Text style="caption" className="p-2">
        {event.name}
      </Text>
    </div>
  );
};
