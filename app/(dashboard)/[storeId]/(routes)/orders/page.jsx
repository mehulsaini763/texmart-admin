import { format } from 'date-fns';
import OrderClient from './_components/OrderClient';
import { formatter } from '@/lib/utils';
import dbConnect from '@/lib/db';
import Order from '@/models/orders.model';

const OrdersPage = async ({ params }) => {
  await dbConnect();
  const orders = await Order.find({ storeId: params.storeId });
  const formatedOrders = orders.map((item) => ({
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
