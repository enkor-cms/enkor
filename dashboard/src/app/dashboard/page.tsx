'use client';

import { Button } from '@/components/common/button';
import { Card } from '@/components/common/layout';
import { Tag } from '@/components/common/tags';
import { Text } from '@/components/common/text';

export default async function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Button
        title="Open classic Modal"
        size="medium"
        icon="cross"
        onClick={() => console.log('Open classic Modal')}
      />

      <Button
        title="Open classic Modal"
        size="medium"
        icon="cross"
        iconOnly
        onClick={() => console.log('Open classic Modal')}
      />

      <Button
        title="Open classic Modal"
        size="medium"
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
          elit, aliquet nec victo
        </Text>
      </Card>
    </div>
  );
}
