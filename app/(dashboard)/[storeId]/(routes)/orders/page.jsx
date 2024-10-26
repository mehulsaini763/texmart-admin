import OrderClient from './_components/OrderClient';
import dbConnect from '@/lib/db';
import Order from '@/models/orders.model';

const OrdersPage = async ({ params }) => {
  await dbConnect();
  const orders = await Order.find({ storeId: params.storeId }).populate('orderItems');
  return (
    <div className="flex flex-col gap-4 p-8">
      <OrderClient orders={JSON.stringify(orders)} />
    </div>
  );
};

export default OrdersPage;
