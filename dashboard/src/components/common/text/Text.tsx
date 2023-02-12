import { FunctionComponent } from 'react';
import { TTextProps } from './types';

export const Text: FunctionComponent<TTextProps> = ({
  children,
  style,
  color,
}: TTextProps) => {
  // this line doesn't work in the client, find something better for build the string
  const colorClass = `text-black-100 dark:text-white-100`;

  switch (style) {
    case 'title':
      return (
        <h1 className={`text-2xl font-bold font-sans  ${colorClass} ${color}`}>
          {children}
        </h1>
      );
    case 'subtitle':
      return (
        <h2 className={`text-xl font-bold font-sans ${colorClass} ${color}`}>
          {children}
        </h2>
      );
    case 'body':
      return (
        <p className={`text-base font-sans ${colorClass} ${color}`}>
          {children}
        </p>
      );
    case 'caption':
      return (
        <p className={`text-sm font-sans ${colorClass} ${color}`}>{children}</p>
      );
    case 'overline':
      return (
        <p className={`text-xs font-sans ${colorClass} ${color}`}>{children}</p>
      );
    default:
      return (
        <p className={`text-base font-sans ${colorClass} ${color}`}>
          {children}
        </p>
      );
  }
};
