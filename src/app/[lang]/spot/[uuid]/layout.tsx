import { Flex } from '@/components/common';
import Footer from '@/components/footer/Footer';
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
        horizontalAlign="stretch"
        className="overflow-x-hidden pt-10"
      >
        {children}
        <Footer />
      </Flex>
    </Suspense>
  );
}
