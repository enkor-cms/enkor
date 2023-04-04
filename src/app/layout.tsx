import '@/styles/globals.css';
import { ReactNode } from 'react';

import SupabaseListener from '@/components/auth/SupabaseListener';
import SupabaseProvider from '@/components/auth/SupabaseProvider';
import { JobaiProvider } from '@/components/JobaiProvider';
import type { Database } from '@/lib/db_types';
import { createClient } from '@/lib/supabase/server';
import { Barlow } from '@next/font/google';
import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
export type TypedSupabaseClient = SupabaseClient<Database>;

const barlow = Barlow({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
});

// do not cache this layout
export const revalidate = 0;

interface IProps {
  children: ReactNode;
}

export const metadata = {
  title: `ClimbingSpot - Communauté d'escalade mondiale - Découvrez, connectez-vous et grimpez ensemble !`,
  description: `Rejoignez ClimbingSpot, la communauté d'escalade en pleine croissance, pour explorer les meilleurs sites d'escalade, rencontrer d'autres grimpeurs et organiser des événements pour grimper ensemble. Commencez votre aventure d'escalade dès aujourd'hui !`,
};

export default async function RootLayout({ children }: IProps) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className="w-screen h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <JobaiProvider>
            <div className="h-full w-full">{children}</div>
          </JobaiProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
