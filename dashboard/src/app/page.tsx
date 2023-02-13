'use client';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/layout';
import { Tag } from '@/components/common/tags';
import { Text } from '@/components/common/text';

export default function Page() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white-200 dark:bg-dark-100">
      <Button
        title="Open classic Modal"
        size="medium"
        icon="cross"
        iconOnly
        onClick={() => console.log('Open classic Modal')}
      />

      <Tag text="Red" color="red" />
      <Tag text="Green" color="green" />
      <Tag text="Blue" color="blue" />
      <Tag text="Yellow" color="yellow" />
      <Tag text="Purple" color="purple" />
      <Tag text="Pink" color="pink" />

      <Card>
        <Text style="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          <Tag text="Red" color="red" />
          elit, aliquet nec
        </Text>
      </Card>
    </div>
  );
}
