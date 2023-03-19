import { Button } from '@/components/common/button';
import { Text } from '@/components/common/text';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Modal as Component, TModalProps } from '../index';

const Template: StoryFn<TModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button text="Button" size="medium" onClick={() => setIsOpen(true)} />
      <Component
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      >
        <Text variant="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </Component>
    </>
  );
};

export const Modal = Template.bind({});

const meta: Meta = {
  title: 'Commons / Modal / Modal',
  component: Component,
  argTypes: {
    size: {
      description: 'Size of the panel',
      options: ['medium', 'large'],
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    size: 'medium',
    title: 'Title',
  },
};

export default meta;
