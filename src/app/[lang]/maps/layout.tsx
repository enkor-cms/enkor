import { listSpots } from '@/features/spots';
import { createClient } from '@/lib/supabase/server';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Map = dynamic(() => import('@/components/maps/Maps'), { ssr: false });

interface IProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  const supabase = createClient();
  const { spots, error } = await listSpots({
    client: supabase,
  });

  if (error) {
    console.error(error);
  }

  return (
    <div className="relative h-full w-full">
      <Map spots={spots} />
      <div className="absolute top-0 z-10">{children}</div>
    </div>
  );
}
