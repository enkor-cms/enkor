'use client';

import { Button } from '@/components/common/button';
import { FloatingPanel } from '@/components/common/modal';
import { Table } from '@/components/common/table';
import { Tag } from '@/components/common/tags';
import { useState } from 'react';

export default function Page() {
  const [test, setTest] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white-200 dark:bg-dark-100">
      <Button
        title="Open classic Modal"
        size="medium"
        icon="cross"
        iconOnly
        onClick={() => {
          setTest(!test);
        }}
      />

      <FloatingPanel
        title="Open floating Modal"
        size="medium"
        isOpen={test}
        onConfirm={() => {
          setTest(!test);
        }}
        onClose={() => {
          setTest(!test);
        }}
      >
        <Tag text="Red" color="red" />
        <Tag text="Green" color="green" />
        <Tag text="Blue" color="blue" />
        <Tag text="Yellow" color="yellow" />
        <Tag text="Purple" color="purple" />
        <Tag text="Pink" color="pink" />
      </FloatingPanel>

      <Table
        columns={[
          {
            id: 'label',
            key: 'label',
            name: 'Label',
            label: 'Label',
          },
          {
            id: 'age',
            key: 'age',
            name: 'Age',
            label: 'Age',
          },
          {
            id: 'actions',
            key: 'actions',
            name: 'Actions',
            label: 'Actions',
          },
          {
            id: 'actions2',
            key: 'actions2',
            name: 'Actions2',
            label: 'Actions2',
          },
        ]}
        rows={[
          {
            id: 1,
            label: 'John',
            age: 20,
            actions: (
              <Button
                title="Open classic Modal"
                size="medium"
                icon="cross"
                iconOnly
              />
            ),
          },
          {
            id: 2,
            label: 'Jane',
            age: 21,
            actions: (
              <Button
                title="Open classic Modal"
                iconFill={true}
                size="small"
                icon="bolt"
                color="text-brand-300"
                variant="primary"
                iconOnly
              />
            ),
          },
          {
            id: 3,
            label: 'Jack',
            age: 22,
          },
        ]}
      />
    </div>
  );
}
