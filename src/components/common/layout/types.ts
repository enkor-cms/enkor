import React from 'react';
import { IconNames } from '../icon';
import { TTagColor } from '../tags';

export interface ILayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface IFlexProps extends ILayoutProps {
  fullSize?: boolean;
  direction?: 'row' | 'column';
  verticalAlign?: 'top' | 'center' | 'bottom' | 'stretch';
  horizontalAlign?: 'left' | 'center' | 'right' | 'stretch';
  gap?: number;
}

export interface IInfoCardProps extends ILayoutProps {
  message: string;
  color: TTagColor;
  icon: IconNames;
}
