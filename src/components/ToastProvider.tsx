'use client';

import { ToastContainer } from 'react-toastify';

const contextClass = {
  success: 'dark:bg-dark-200 bg-white-100',
  error: 'dark:bg-dark-200 bg-white-100',
  info: 'dark:bg-dark-200 bg-white-100',
  warning: 'dark:bg-dark-200 bg-white-100',
  default: 'dark:bg-dark-200 bg-white-100',
  dark: 'dark:bg-dark-200 bg-white-100',
};

export const ToastProvider = () => {
  return (
    <ToastContainer
      toastClassName={({ type } = {}) =>
        contextClass[type || 'default'] +
        ' relative flex my-2 p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer border border-gray-300 dark:border-dark-300'
      }
      bodyClassName={() =>
        'text-sm text-dark-100 dark:text-white-300 font-med flex flex-row p-3'
      }
      position="top-right"
      autoClose={2000}
    />
  );
};
