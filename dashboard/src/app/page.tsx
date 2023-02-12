'use client';

import { Button } from '@/components/common/button/Button';
import { FloatingPanel } from '@/components/common/modal';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center bg-white-200 dark:bg-dark-100">
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
    </div>
  );
}
