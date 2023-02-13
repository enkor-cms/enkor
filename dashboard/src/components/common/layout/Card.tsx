import { FunctionComponent } from 'react';
import { ILayoutProps } from './types';

export const Card: FunctionComponent<ILayoutProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`bg-white-200 dark:bg-dark-200 border border-white-300 dark:border-dark-300 rounded-md shadow p-4 m-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
