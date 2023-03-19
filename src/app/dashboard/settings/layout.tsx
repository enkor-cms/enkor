'use client';

import { useSupabase } from '@/components/auth/SupabaseProvider';
import { Button, Text } from '@/components/common';
import { Flex } from '@/components/common/layout';
import { SideMenu } from '@/components/sidebar';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export const revalidate = 0;

export default function RootLayout({ children }: IProps) {
  const { supabase } = useSupabase();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log({ error });
    }
  };

  return (
    <Flex fullSize direction="column" verticalAlign="stretch">
      <Flex
        className="w-full p-6 border-white-300 dark:border-dark-300"
        direction="row"
        horizontalAlign="left"
      >
        <Text variant="title">Settings</Text>
      </Flex>
      <Flex
        fullSize
        direction="row"
        horizontalAlign="stretch"
        verticalAlign="top"
      >
        <Flex
          className="h-full p-4"
          horizontalAlign="stretch"
          verticalAlign="stretch"
        >
          <SideMenu
            menuItems={[
              {
                label: 'User',
                icon: 'user-circle',
                to: '/dashboard/settings/user',
              },
            ]}
          />
          <Button
            text="Sign Out"
            variant="primary"
            className="text-red-500"
            onClick={() => {
              handleLogout();
            }}
          />
        </Flex>
        <Flex fullSize>{children}</Flex>
      </Flex>
    </Flex>
  );
}
