'use client';

import { useSupabase } from '@/components/auth/SupabaseProvider';
import { Button, Text } from '@/components/common';
import { Flex } from '@/components/common/layout';
import { SideMenu } from '@/components/navbar';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const revalidate = 0;

export default function RootLayout({ children }: IProps) {
  const { supabase } = useSupabase();
  const pathname = usePathname();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  return (
    <Flex fullSize direction="column" verticalAlign="stretch">
      <Flex
        fullSize
        direction="row"
        horizontalAlign="stretch"
        verticalAlign="top"
        gap={0}
      >
        <Flex
          className="h-full p-4 border-r border-white-300 dark:border-dark-300"
          horizontalAlign="stretch"
          verticalAlign="stretch"
        >
          <SideMenu
            menuItems={[
              {
                label: 'User',
                icon: 'user-circle',
                to: '/settings/user',
              },
              {
                label: 'Spots',
                icon: 'models',
                to: '/settings/spots',
              },
            ]}
          />
          <Button
            text="Sign Out"
            variant="alert"
            onClick={() => {
              handleLogout();
            }}
          />
        </Flex>
        <Flex fullSize direction="column" horizontalAlign="stretch" gap={0}>
          <Flex
            className="w-full px-6 py-4 border-b border-white-300 dark:border-dark-300"
            direction="row"
            horizontalAlign="left"
          >
            <Text variant="subtitle">
              {pathname &&
                pathname
                  .split('/')
                  .slice(2)
                  .map((item, index) => (
                    <span
                      key={item}
                      className="opacity-70 capitalize last:opacity-100 last:text-brand-700"
                    >
                      {`${item} `}
                    </span>
                  ))}
            </Text>
          </Flex>
          <Flex fullSize horizontalAlign="left">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
