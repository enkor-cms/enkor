import React from 'react';
import { ILayoutProps } from './types';

export const Card = React.forwardRef<HTMLDivElement, ILayoutProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        className={`bg-white-200 dark:bg-dark-200 border border-white-300 dark:border-dark-300 rounded-md shadow ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
