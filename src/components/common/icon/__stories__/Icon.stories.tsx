import { Meta, StoryFn } from '@storybook/react';
import { icons } from '../constant';

import { Icon as IconComponent } from '../Icon';
import { IIconProps } from '../types';

const Template: StoryFn<IIconProps> = (args: IIconProps) => (
  <>
    <IconComponent {...args} />
  </>
);

export const Icon = Template.bind({});

export const AllIcons = () => (
  <div className="flex flex-wrap">
    {Object.keys(icons).map((icon) => (
      <div className="w-auto p-2" key={icon}>
        <IconComponent name={icon} />
      </div>
    ))}
  </div>
);

const meta: Meta = {
  title: 'Commons / Icon',
  component: IconComponent,
  argTypes: {
    name: {
      description: 'Name of the icon to use',
      options: [...Object.keys(icons)],
      control: {
        type: 'select',
      },
    },
    scale: {
      description: 'Scale of the icon',
      control: {
        type: 'range',
        min: 0.5,
        max: 2,
        step: 0.1,
      },
    },
  },
  args: {
    name: 'arrow-right',
    scale: 1,
    style: 'primary',
    border: false,
    fill: false,
  },
};

export default meta;
