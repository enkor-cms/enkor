'use client';

import { Sidebar } from '@/components/sidebar';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
      <Sidebar />
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
