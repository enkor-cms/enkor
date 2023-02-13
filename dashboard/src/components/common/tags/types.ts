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

export interface ITag extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  color: Color;
}
