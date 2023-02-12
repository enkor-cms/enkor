import { FunctionComponent } from 'react';
import { TTextProps } from './types';

export const Text: FunctionComponent<TTextProps> = ({
  children,
  style,
  className,
}: TTextProps) => {
  // this line doesn't work in the client, find something better for build the string
  const colorClass = `text-black-100 dark:text-white-100`;

  switch (style) {
    case 'title':
      return (
        <h1 className={`text-2xl font-bold ${colorClass} ${className}`}>
          {children}
        </h1>
      );
    case 'subtitle':
      return (
        <h2 className={`text-xl font-bold ${colorClass} ${className}`}>
          {children}
        </h2>
      );
    case 'body':
      return <p className={`text-base ${colorClass}`}>{children}</p>;
    case 'caption':
      return <p className={`text-sm ${colorClass} ${className}`}>{children}</p>;
    case 'overline':
      return <p className={`text-xs ${colorClass} ${className}`}>{children}</p>;
    default:
      return (
        <p className={`text-base ${colorClass} ${className}`}>{children}</p>
      );
  }
};
