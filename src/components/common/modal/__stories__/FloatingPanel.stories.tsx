import { Button } from '@/components/common/button';
import { Text } from '@/components/common/text';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { FloatingPanel as Component, TFloatingPanelProps } from '../index';

const Template: StoryFn<TFloatingPanelProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button text="Button" size="medium" onClick={() => setIsOpen(true)} />
      <Component
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
        forceValidation={args.forceValidation}
      >
        <Text variant="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
        </Text>
      </Component>
    </>
  );
};

export const FloatingPanel = Template.bind({});

const meta: Meta = {
  title: 'Commons / Modal / FloatingPanel',
  component: Component,
  argTypes: {
    size: {
      description: 'Size of the panel',
      options: ['medium', 'large'],
      control: {
        type: 'radio',
      },
    },
    forceValidation: {
      description: 'Force validation',
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    size: 'large',
    title: 'Title',
    forceValidation: false,
  },
};

export default meta;
