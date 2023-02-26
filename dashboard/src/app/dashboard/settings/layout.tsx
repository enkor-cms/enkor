'use client';

import { Button, Text } from '@/components/common';
import { Flex } from '@/components/common/layout';
import { SideMenu } from '@/components/sidebar';
import { signOut } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <Flex fullSize direction="column" verticalAlign="stretch">
      <Flex
        className="w-full p-6 border-white-300 dark:border-dark-300"
        direction="row"
        horizontalAlign="left"
      >
        <Text style="title">Settings</Text>
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
              {
                label: 'Auth providers',
                icon: 'puzzle',
                to: '/dashboard/settings/auth-providers',
              },
            ]}
          />
          <Button
            title="Sign Out"
            variant="primary"
            className="text-red-200"
            onClick={() => {
              signOut();
            }}
          />
        </Flex>
        <Flex fullSize>{children}</Flex>
      </Flex>
    </Flex>
  );
}
