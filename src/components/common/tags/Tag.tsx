import { FunctionComponent } from 'react';
import { ITag, tagsConfig } from './index';

export const Tag: FunctionComponent<ITag> = ({
  text,
  color,
  size = 'small',
  className,
  ...props
}: ITag) => {
  const sizeConfig = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  };
  return (
    <span
      className={`${tagsConfig[color].textColor} bg-opacity-10 ${tagsConfig[color].bgColor} border ${tagsConfig[color].borderColor} rounded-full px-2 py-1 m-0 w-fit ${sizeConfig[size]} ${className}`}
      {...props}
    >
      {text}
    </span>
  );
};
