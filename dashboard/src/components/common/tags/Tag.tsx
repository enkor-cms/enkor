import { FunctionComponent } from 'react';
import { ITag, tagsConfig } from './index';

export const Tag: FunctionComponent<ITag> = ({
  text,
  color,
  ...props
}: ITag) => {
  // we can't use the `bg-${color}-100` syntax because tailwind doesn't support it, find a way to do it
  return (
    <span
      className={`${tagsConfig[color].textColor} bg-opacity-10 ${tagsConfig[color].bgColor} border ${tagsConfig[color].borderColor} rounded-full px-2 py-1 m-1 w-fit text-xs`}
      {...props}
    >
      {text}
    </span>
  );
};
