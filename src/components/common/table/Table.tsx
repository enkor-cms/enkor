// SimpleTable.tsx
import React from 'react';

interface TableProps {
  rows: Array<{ [key: string]: any }>;
}

export const Table: React.FC<TableProps> = ({ rows }) => {
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-gray-50 sticky top-0 flex">
        {headers.map((header, index) => (
          <div
            key={index}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-1"
          >
            {header}
          </div>
        ))}
      </div>
      <div className="w-full h-full flex-1 overflow-x-auto overflow-y-auto">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {headers.map((header, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap flex-1"
                  >
                    {row[header]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
