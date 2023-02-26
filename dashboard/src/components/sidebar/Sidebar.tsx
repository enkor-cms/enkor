import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { NavIcon } from './NavIcons';

interface ISidebarProps {}

export const Sidebar: React.FC<ISidebarProps> = () => {
  const { data: session } = useSession();
  const user = session?.user as User;
  return (
    <div className="w-auto h-full bg-white-100 dark:bg-dark-100 border-r border-white-300 dark:border-dark-300 flex flex-col">
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
          {user?.image ? (
            <Link href={`/dashboard/user`}>
              <Image
                src={user?.image}
                alt={user?.name || "User's profile image"}
                width={30}
                height={30}
                className="rounded-full border-2 border-white-300 dark:border-dark-400"
              />
            </Link>
          ) : (
            <Link href={`/dashboard/user`}>
              <div className="w-8 h-8 rounded-full border-2 border-white-300 dark:border-dark-400 flex justify-center items-center">
                <span className="text-2xl font-bold text-white-300 dark:text-dark-300">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            </Link>
          )}
          <NavIcon icon="cog" label="media" to="/dashboard/settings" />
        </div>
      </div>
    </div>
  );
};
