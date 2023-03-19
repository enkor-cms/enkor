import { HTMLAttributes } from 'react';

export type TTextStyles =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

export interface ITextProps extends HTMLAttributes<HTMLDivElement> {
  variant: TTextStyles;
  color?: string;
}
