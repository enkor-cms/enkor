'use client'; // Error components must be Client components

import { Button, Flex, Text } from '@/components/common';
import { logger } from '@/lib/logger';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(error);
  }, [error]);

  return (
    <Flex fullSize>
      <Text variant="title">Something went wrong when loading the map</Text>
      <Button
        text="Try again"
        variant="primary"
        icon="refresh"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      />
    </Flex>
  );
}
