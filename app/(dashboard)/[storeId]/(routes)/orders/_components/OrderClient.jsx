'use client';

import { columns } from './OrderColumns';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

const OrderClient = ({ orders }) => {
  return (
    <>
      <Heading title={`Orders (${orders.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable columns={columns} data={orders} searchKey={'products'} />
    </>
  );
};

export default OrderClient;
