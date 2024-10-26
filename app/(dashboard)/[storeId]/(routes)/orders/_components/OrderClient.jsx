'use client';

import { columns } from './OrderColumns';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';

const OrderClient = ({ orders }) => {
  const formatedOrders = JSON.parse(orders).map((item) => ({
    id: item._id.toString(),
    orderItems: item.orderItems,
    isPaid: item.isPaid,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map(({ name }) => name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, { price }) => total + Number(price), 0)),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <>
      <Heading title={`Orders (${formatedOrders.length})`} description="Manage orders for your store" />
      <Separator />
      <DataTable columns={columns} data={formatedOrders} searchKey={'products'} />
    </>
  );
};

export default OrderClient;
