'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import '@/styles/globals.css';

import { Barlow } from '@next/font/google';

const barlow = Barlow({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
});

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className="w-screen h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
        <SessionProvider>
          <div className="h-full w-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
