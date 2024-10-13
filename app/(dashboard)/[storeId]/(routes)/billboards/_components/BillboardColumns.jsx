"use client";

import BillboardCellActions from "./BillboardCellActions";

export const columns = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <BillboardCellActions data={row.original} />,
  },
];
