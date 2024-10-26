import Product from '@/models/products.model';

export const getStockCount = async (storeId) => {
  const stockCount = await Product.countDocuments({ storeId, isArchived: false });
  return stockCount;
};
