import { FunctionComponent } from 'react';
import { ITableProps } from './types';

export const Table: FunctionComponent<ITableProps> = ({
  columns,
  rows,
  ...props
}: ITableProps) => {
  return (
    <div className="table-container w-5/6">
      <table className="table" {...props}>
        <thead>
          <tr className="border rounded-md border-gray-500">
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-3 px-4 text-left hidden lg:table-cell text-xs font-medium text-gray-500 uppercase"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {row[column.key as keyof typeof row]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
