import { Button } from '@/components/common/button';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { FloatingPanel as Component, TFloatingPanelProps } from '../index';

const Template: StoryFn<TFloatingPanelProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button title="Button" size="medium" onClick={() => setIsOpen(true)} />
      <Component {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>Content</h1>
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
  },
  args: {
    size: 'large',
    title: 'Title',
  },
};

export default meta;
