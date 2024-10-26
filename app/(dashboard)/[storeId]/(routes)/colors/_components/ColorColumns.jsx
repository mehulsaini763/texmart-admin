'use client';

import ColorCellActions from './ColorCellActions';

export const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value} <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.value }} />
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ColorCellActions data={row.original} />,
  },
];
