import React from 'react';
import { IconNames } from '../icon/types';

export type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'default'
  | 'alert'
  | 'success'
  | 'none';

export type TButtonSize = 'small' | 'medium' | 'large';

export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoader?: boolean;
  icon?: IconNames;
  iconFill?: boolean;
  iconOnly?: boolean;
  variant: TButtonVariant;
  size?: TButtonSize;
  children?: React.ReactNode;
}
