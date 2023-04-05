import { Card, Flex, Text } from '@/components/common';
import { listSpots } from '@/features/spots';
import { createClient } from '@/lib/supabase/server';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/maps/Maps'), { ssr: false });

export default async function Page() {
  const supabase = createClient();
  const { spots } = await listSpots({
    client: supabase,
  });

  return (
    <>
      <Card className="absolute top-2 left-2 m-2 z-20">
        <Flex>
          <Text variant="body">Maps</Text>
        </Flex>
      </Card>
      <Map spots={spots} />
    </>
  );
}
