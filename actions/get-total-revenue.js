import Order from '@/models/orders.model';

export const getTotalRevenue = async (storeId) => {
  const paidOrders = await Order.find({ storeId, isPaid: true }).populate('orderItems');  
  const totalRevenue = paidOrders.reduce(
    (total, order) => order.orderItems.reduce((orderSum, item) => orderSum + item.price, 0) + total,
    0,
  );
  return totalRevenue;
};
