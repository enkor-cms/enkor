import { HTMLAttributes } from 'react';

export type TTextStyles =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

export interface ITextProps extends HTMLAttributes<HTMLDivElement> {
  variant: TTextStyles;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  color?: string;
}
