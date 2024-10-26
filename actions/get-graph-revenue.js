import Order from '@/models/orders.model';

export const getGraphRevenue = async (storeId) => {
  const paidOrders = await Order.find({ storeId, isPaid: true }).populate('orderItems');

  const monthlyRevenue = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();

    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.price;
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData = [
    { name: 'Jan', total: 0 },
    { name: 'Feb', total: 0 },
    { name: 'Mar', total: 0 },
    { name: 'Apr', total: 0 },
    { name: 'May', total: 0 },
    { name: 'Jun', total: 0 },
    { name: 'Jul', total: 0 },
    { name: 'Aug', total: 0 },
    { name: 'Sep', total: 0 },
    { name: 'Oct', total: 0 },
    { name: 'Nov', total: 0 },
    { name: 'Dec', total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[month].total = monthlyRevenue[month];
  }

  return graphData;
};
