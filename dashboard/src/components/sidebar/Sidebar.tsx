import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavIcon } from './NavIcons';

interface ISidebarProps {}

export const Sidebar: React.FC<ISidebarProps> = () => {
  return (
    <div className="w-auto h-full bg-white-100 dark:bg-dark-100 border-r border-white-300 dark:border-dark-300 flex flex-col">
      <Link
        href={'/'}
        className="w-full p-3 gap-2 flex justify-center items-center border-b border-white-300 dark:border-dark-300"
      >
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
      </Link>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-b border-white-30 dark:border-dark-300">
            <NavIcon icon="models" label="content" to="/content" />
            <NavIcon icon="swatch" label="models" to="/model" />
          </div>
          <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-white-30 dark:border-dark-300">
            <NavIcon icon="photo" label="media" to="/media" />
          </div>
        </div>
        <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-t border-white-30 dark:border-dark-300">
          <NavIcon icon="cog" label="media" to="/settings" />
        </div>
      </div>
    </div>
  );
};
