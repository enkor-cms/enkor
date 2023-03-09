import Map from '@/components/maps/Maps';
import { createClient } from '@/lib/supabase/server';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: IProps) {
  const supabase = createClient();
  const { data: location, error } = await supabase.from('location').select('*');

  if (error) {
    console.error(error);
  }

  return (
    <div className="relative h-full w-full">
      <Map locations={location} />
      <div className="absolute top-0 z-10">{children}</div>
    </div>
  );
}
