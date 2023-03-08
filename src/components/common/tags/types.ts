import React from 'react';

type Color =
  | 'red'
  | 'green'
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'pink'
  | 'brand';

type Size = 'small' | 'medium' | 'large';

export interface ITag extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  color: Color;
  size?: Size;
}
