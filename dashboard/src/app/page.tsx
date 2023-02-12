'use client';

import { Button } from '@/components/common/button';
import { FloatingPanel, Modal } from '@/components/common/modal';
import { Text } from '@/components/common/text';
import { useState } from 'react';

export default function Page() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white-200 dark:bg-dark-100">
      <Button
        title="Open classic Modal"
        size="medium"
        onClick={() => setOpen(!open)}
      />
      <Modal
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
        <Text style="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </Modal>

      <Button
        title="Open Floating Panel"
        size="medium"
        style="secondary"
        onClick={() => setOpen2(!open2)}
      />
      <FloatingPanel
        onClose={() => {
          setOpen2(false);
        }}
        onConfirm={() => {
          setOpen2(false);
        }}
        isOpen={open2}
        title="Title"
        size="medium"
        forceValidation
      >
        <Text style="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </FloatingPanel>
    </div>
  );
}
