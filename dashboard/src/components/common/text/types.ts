import React from 'react';

export type TTextStyles =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

export interface ITextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  style: TTextStyles;
  color?: string;
}
