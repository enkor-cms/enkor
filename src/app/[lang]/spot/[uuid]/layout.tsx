import { Flex } from '@/components/common';
import React, { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Flex
        fullSize
        direction="column"
        verticalAlign="center"
        horizontalAlign="left"
        className="overflow-x-hidden py-10"
      >
        {children}
      </Flex>
    </Suspense>
  );
}
