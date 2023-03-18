'use client';

import { EventResponseSuccess, joinEvent } from '@/features/events';
import { createClient } from '@/lib/supabase/browser';
import React from 'react';
import { toast } from 'react-toastify';
import { useSupabase } from '../auth/SupabaseProvider';
import { Button } from '../common';

export const JoinEventButton: React.FC<{
  event: NonNullable<EventResponseSuccess>;
}> = ({ event }) => {
  const supabase = createClient();
  const { session } = useSupabase();

  const handleJoinEvent = async () => {
    if (!session) {
      toast.error('You must be logged in to join an event');
      return;
    }

    const { participation, error } = await joinEvent({
      client: supabase,
      eventId: event.id,
      userId: session?.user.id,
    });

    if (error) {
      toast.error(error.message);
    }

    if (participation) {
      toast.success('You have joined the event');
    }
  };

  return (
    <Button
      title="Join"
      className="absolute bottom-[-20px] right-0 m-2"
      variant="secondary"
      size="small"
      onClick={handleJoinEvent}
    />
  );
};
