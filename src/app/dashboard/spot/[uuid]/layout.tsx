import { Flex } from '@/components/common';
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({ children }) {
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
