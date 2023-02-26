'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavIcon } from './NavIcons';

interface ISidebarProps {}

export const Sidebar: React.FC<ISidebarProps> = () => {
  return (
    <div className="w-auto h-full bg-white-200 dark:bg-dark-200 border-r border-white-300 dark:border-dark-300 flex flex-col">
      <Link
        href={'/dashboard'}
        className="w-full p-3 gap-2 flex justify-center items-center border-b border-white-300 dark:border-dark-300"
      >
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
      </Link>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-b border-white-30 dark:border-dark-300">
            <NavIcon icon="models" label="content" to="/dashboard/content" />
            <NavIcon icon="swatch" label="models" to="/dashboard/model" />
          </div>
          <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-white-30 dark:border-dark-300">
            <NavIcon icon="photo" label="media" to="/dashboard/media" />
          </div>
        </div>
        <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-t border-white-30 dark:border-dark-300">
          <NavIcon icon="cog" label="settings" to="/dashboard/settings" />
        </div>
      </div>
    </div>
  );
};
