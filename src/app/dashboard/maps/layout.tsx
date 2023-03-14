import { createClient } from '@/lib/supabase/server';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const Map = dynamic(() => import('@/components/maps/Maps'), { ssr: false });

interface IProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  const supabase = createClient();
  const { data: spots, error } = await supabase
    .from('spot_extanded_view')
    .select(
      `
        *,
        location(*)
      `
    )
    .eq('id', '755f563a-c046-4ed2-9a77-a4ed5776684e')
    .limit(100);

  if (error) {
    console.error(error);
  }

  return (
    <div className="relative h-full w-full">
      <Map spots={spots || undefined} />
      <div className="absolute top-0 z-10">{children}</div>
    </div>
  );
}
