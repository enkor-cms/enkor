import { Meta, StoryFn } from '@storybook/react';
import { icons } from '../../icon';

import { Button as ButtonComponent } from '../Button';
import { TButtonProps } from '../types';

const Template: StoryFn<TButtonProps> = (args: TButtonProps) => (
  <>
    <ButtonComponent {...args} />
  </>
);

export const Button = Template.bind({});

const meta: Meta = {
  title: 'Commons / Button',
  component: ButtonComponent,
  argTypes: {
    icon: {
      description: 'Name of the icon to use',
      options: [null, ...Object.keys(icons)],
      control: {
        type: 'select',
      },
    },
    style: {
      description: 'Style of the button',
      options: [null, 'default', 'alert', 'success'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;
