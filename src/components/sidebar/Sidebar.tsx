'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSupabase } from '../auth/SupabaseProvider';
import { NavIcon } from './NavIcons';

interface ISidebarProps {}

export const Sidebar: React.FC<ISidebarProps> = () => {
  const { session } = useSupabase();

  return (
    <div className="w-auto h-full bg-white-100 dark:bg-dark-200 border-r border-white-300 dark:border-dark-300 flex flex-col">
      <Link
        href={'/dashboard'}
        className="w-full p-3 gap-2 flex justify-center items-center border-b border-white-300 dark:border-dark-300"
      >
        <Image src="/logo_little.png" alt="Logo" width={40} height={40} />
      </Link>
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-b border-white-30 dark:border-dark-300">
            <NavIcon icon="map" label="map" to="/dashboard/maps" />
            <NavIcon icon="swatch" label="models" to="/dashboard/model" />
          </div>
        </div>
        <div className="w-full p-3 flex flex-col justify-center items-center gap-2 border-t border-white-30 dark:border-dark-300">
          <NavIcon
            icon="cog"
            label="settings"
            to="/dashboard/settings/user"
            userImage={
              session ? session.user.user_metadata?.avatar_url : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};
