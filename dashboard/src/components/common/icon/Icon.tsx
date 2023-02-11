import { FunctionComponent } from 'react';
import { icons } from './constant';
import { TIconProps } from './types';

export const Icon: FunctionComponent<TIconProps> = ({
  scale = 1,
  ...props
}) => {
  // scale without greater than 2
  scale = scale > 2 ? 2 : scale;
  const width = scale * 20;
  const height = scale * 20;

  const IconSvg = icons[props.name];

  return (
    <div
      className={`${props.color} h-fit w-fit inline-block p-1 ${
        props.border ? 'border-2 rounded-full border-current' : ''
      }`}
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