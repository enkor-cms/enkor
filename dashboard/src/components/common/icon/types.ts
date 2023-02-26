import React from 'react';
import { icons } from './constant';

export type IconNames = keyof typeof icons;
export interface IIconProps extends React.HTMLAttributes<HTMLDivElement> {
  name: IconNames;
  color?: string;
  scale?: number;
  border?: boolean;
  fill?: boolean;
}
