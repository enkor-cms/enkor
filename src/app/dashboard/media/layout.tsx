'use client';

import { Text } from '@/components/common';
import { Flex } from '@/components/common/layout';
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
        <Text style="title">Media</Text>
      </Flex>
      <Flex
        fullSize
        direction="row"
        horizontalAlign="stretch"
        verticalAlign="top"
      >
        <Flex fullSize>{children}</Flex>
      </Flex>
    </Flex>
  );
}
