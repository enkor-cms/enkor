import { IconNames } from '../icon';

export type TButtonStyle = 'default' | 'alert' | 'success';

export type TButtonSize = 'small' | 'medium' | 'large';

export type TButtonProps = {
  title: string;
  isLoader?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  icon?: IconNames;
  iconFill?: boolean;
  style?: TButtonStyle;
  size?: TButtonSize;
};
