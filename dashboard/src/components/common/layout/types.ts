import React from 'react';

export interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface IFlexProps extends ILayoutProps {
  direction?: 'row' | 'column';
  verticalAlign?: 'top' | 'center' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
}
