import { format } from 'date-fns';

import OrderClient from './_components/OrderClient';

import { getOrders } from '@/utils/order';
import { formatter } from '@/lib/utils';

const OrdersPage = async ({ params }) => {
  const response = await getOrders(params);
  const formatedOrders = response.data.map((item) => ({
    id: item._id,
    orderItems: item.orderItems,
    isPaid: item.isPaid,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map(({ productId }) => productId.name.join(', ')),
    totalPrice: formatter.format(item.orderItems.reduce((total, { productId }) => total + Number(productId.price), 0)),
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 p-8">
      <OrderClient orders={formatedOrders} />
    </div>
  );
};

export default OrdersPage;
