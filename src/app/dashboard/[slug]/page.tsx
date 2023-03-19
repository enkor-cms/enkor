'use client';
import { Flex, FloatingPanel } from '@/components/common';
import { Text } from '@/components/common/text';
import React from 'react';
export default function Page({ params }: { params: { slug: string } }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <Text variant="body">{params.slug}</Text>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open panel
      </button>
      <FloatingPanel
        title="Configure provider"
        isOpen={isOpen}
        onClose={function (): void {
          setIsOpen(false);
        }}
        onConfirm={function (): void {
          setIsOpen(false);
        }}
      >
        <Flex direction="column" horizontalAlign="left">
          <Text variant="subtitle">Public key</Text>
        </Flex>
      </FloatingPanel>
    </div>
  );
}
