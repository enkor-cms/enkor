import React from 'react';

export type TTagColor =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'brand'
  | 'warning';

export type TTagSize = 'small' | 'medium' | 'large';

export interface ITag extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  color: TTagColor;
  size?: TTagSize;
}
