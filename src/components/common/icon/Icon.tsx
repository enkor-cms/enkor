import { FunctionComponent } from 'react';
import { icons } from './constant';
import { IIconProps } from './types';

export const Icon: FunctionComponent<IIconProps> = ({
  scale = 1,
  color,
  className,
  ...props
}) => {
  // scale without greater than 2
  scale = scale > 2 ? 2 : scale;
  const width = scale * 20;
  const height = scale * 20;
  const IconSvg = icons[props.name];

  return (
    <div
      className={`${
        color ? color : `text-black-100 dark:text-white-100`
      } h-fit w-fit inline-block ${
        props.border ? 'border-2 rounded-full border-current' : ''
      } ${className}  p-1`}
    >
      <IconSvg
        width={width}
        height={height}
        fill={props.fill ? 'currentColor' : 'none'}
        strokeWidth={1.5}
      />
    </div>
  );
};

export default Icon;
