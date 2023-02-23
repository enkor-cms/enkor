'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import './globals.css';

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className="w-screen h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
        <SessionProvider>
          <div className="h-full w-full">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
