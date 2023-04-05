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
      <Map spots={spots} />
    </>
  );
}
