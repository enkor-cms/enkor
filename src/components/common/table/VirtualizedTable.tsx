// Table.tsx
import React from 'react';
import BaseTable, { AutoResizer, Column } from 'react-base-table';
import 'react-base-table/styles.css';
import { Text } from '../text';

import './table.css';

interface TableProps {
  rows: Array<{ [key: string]: any }>;
  headers: Array<{
    title: string;
    width?: number;
  }>;
}

export const VirtualizedTable: React.FC<TableProps> = ({ rows, headers }) => {
  return (
    <div className="w-full h-full p-3">
      <div className="w-full h-full">
        <AutoResizer>
          {({ width, height }) => (
            <BaseTable
              data={rows}
              width={width} // Adjust the table width as needed
              height={height} // Adjust the table height as needed
              rowHeight={40} // Adjust the row height as needed
              headerHeight={40} // Adjust the header height as needed
              rowEventHandlers={{
                onClick: (row) => console.log(row),
              }}
            >
              {headers.map((header, index) => (
                <Column
                  key={index}
                  title={header.title}
                  dataKey={header.title}
                  width={header.width || 100}
                  flexGrow={header.width ? 0 : 1}
                  headerRenderer={() => (
                    <Text variant="caption" weight={500} className="capitalize">
                      {header.title.split('_').join(' ')}
                    </Text>
                  )}
                />
              ))}
            </BaseTable>
          )}
        </AutoResizer>
      </div>
    </div>
  );
};
