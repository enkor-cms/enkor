'use client';

import { Button } from '@/components/common/button';
import { FloatingPanel } from '@/components/common/modal';
import { Text } from '@/components/common/text';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white-200 dark:bg-dark-100">
      <Button title="Button" size="medium" onClick={() => setOpen(!open)} />
      <FloatingPanel
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          setOpen(false);
        }}
        isOpen={open}
        title="Title"
        size="medium"
      >
        <h1>Content</h1>
      </FloatingPanel>

      <Text style="title">Text</Text>
      <Text style="subtitle" className="opacity-30">
        Text
      </Text>
      <Text style="body">Text</Text>
      <Text style="caption">Text</Text>
      <Text style="overline">Text</Text>
    </div>
  );
}
