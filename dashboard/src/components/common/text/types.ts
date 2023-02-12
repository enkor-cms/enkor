import React from 'react';

export type TTextStyles =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

export type TTextProps = {
  children: React.ReactNode;
  style: TTextStyles;
  className?: string;
};
