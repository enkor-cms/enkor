import { icons } from './constant';

export type IconNames = keyof typeof icons;
export type TIconProps = {
  name: IconNames;
  color: string;
  scale?: number;
  border?: boolean;
  fill?: boolean;
};
