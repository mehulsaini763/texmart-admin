import Order from '@/models/orders.model';

export const getSalesCount = async (storeId) => {
  const salesCount = await Order.countDocuments({ storeId, isPaid: true });
  return salesCount;
};
