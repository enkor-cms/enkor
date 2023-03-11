import { FunctionComponent } from 'react';
import { ITextProps, textConfig } from './index';

export const Text: FunctionComponent<ITextProps> = ({
  children,
  style,
  color,
  className,
  ...props
}: ITextProps) => {
  // this line doesn't work in the client, find something better for build the string
  const colorClass = `text-black-100 dark:text-white-100`;

  return (
    <div
      className={`${textConfig[style]} ${
        color ? color : colorClass
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
