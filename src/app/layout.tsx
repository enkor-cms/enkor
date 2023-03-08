'use client';

import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Barlow } from '@next/font/google';

const barlow = Barlow({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-barlow',
});

interface IProps {
  children: ReactNode;
}

const contextClass = {
  success: 'dark:bg-dark-200 bg-white-100',
  error: 'dark:bg-dark-200 bg-white-100',
  info: 'dark:bg-dark-200 bg-white-100',
  warning: 'dark:bg-dark-200 bg-white-100',
  default: 'dark:bg-dark-200 bg-white-100',
  dark: 'dark:bg-dark-200 bg-white-100',
};

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en" className={`${barlow.variable}`}>
      <body className="w-screen h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
        <SessionProvider>
          <div className="h-full w-full">{children}</div>
        </SessionProvider>
        <ToastContainer
          toastClassName={({ type }) =>
            contextClass[type || 'default'] +
            ' relative flex my-2 p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer border border-gray-300 dark:border-dark-300'
          }
          bodyClassName={() =>
            'text-sm text-dark-100 dark:text-white-300 font-med flex flex-row p-3'
          }
          position="top-right"
          autoClose={2000}
        />
      </body>
    </html>
  );
}
