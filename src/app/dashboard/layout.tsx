'use client';

import { NavBar } from '@/components/sidebar';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contextClass = {
  success: 'dark:bg-dark-200 bg-white-100',
  error: 'dark:bg-dark-200 bg-white-100',
  info: 'dark:bg-dark-200 bg-white-100',
  warning: 'dark:bg-dark-200 bg-white-100',
  default: 'dark:bg-dark-200 bg-white-100',
  dark: 'dark:bg-dark-200 bg-white-100',
};

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-white-200 dark:bg-dark-100">
      <NavBar />
      <div className="w-full h-full overflow-auto">{children}</div>
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
    </div>
  );
}
