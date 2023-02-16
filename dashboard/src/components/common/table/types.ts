import React from 'react';

export type TColumn = {
  key?: string;
  id?: string;
  name?: string;
  label?: string;
  [key: string]: any;
};

export type TRow = {
  key?: string;
  id?: number;
  testId?: string;
  [key: string]: any;
};

export interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
  columns: TColumn[];
  rows: TRow[];
}
