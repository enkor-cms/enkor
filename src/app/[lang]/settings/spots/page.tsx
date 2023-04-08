'use client';

import { useSupabase } from '@/components/auth/SupabaseProvider';
import { Flex, Icon, Text, VirtualizedTable } from '@/components/common';
import { SpotCreationPanel } from '@/components/spot/';
import {
  CreatorsSpotsResponseSuccess,
  listCreatorSpots,
} from '@/features/spots';
import { createClient } from '@/lib/supabase/browser';
import { logger } from '@supabase/auth-helpers-nextjs';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const supabase = createClient();
  const { session } = useSupabase();
  const [spots, setSpots] = useState<CreatorsSpotsResponseSuccess>(null);
  const spotsLoaded = useRef(false);

  const fetchSpots = async (userId: string) => {
    const { spots, error } = await listCreatorSpots({
      client: supabase,
      creatorId: userId,
    });

    if (error) {
      logger.error(error);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSpots(spots);
  };

  useEffect(() => {
    if (session && !spotsLoaded.current) {
      spotsLoaded.current = true;
      fetchSpots(session.user.id);
    }
  }, [session]);

  return (
    <>
      <Flex
        className="w-full p-3 pb-0"
        verticalAlign="bottom"
        horizontalAlign="center"
      >
        <SpotCreationPanel
          onSpotCreated={(spot) => {
            toast.success(`Spot ${spot.name} created!`);
            session && fetchSpots(session.user.id);
          }}
        />
      </Flex>
      {spots ? (
        <VirtualizedTable
          rows={spots}
          headers={[
            { title: 'name', width: 300 },
            { title: 'created_at', width: 300 },
            { title: 'description' },
            { title: 'difficulty', width: 100 },
            { title: 'rock_type', width: 100 },
            {
              title: 'cliff_height',
              width: 150,
            },
          ]}
        />
      ) : (
        <Flex fullSize verticalAlign="center" horizontalAlign="center">
          <Text variant="caption">Searching for spots...</Text>
          <Icon name="spin" className="animate-spin" />
        </Flex>
      )}
    </>
  );
}
