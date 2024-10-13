import { format } from 'date-fns';

import ProductClient from './_components/ProductClient';

import { getProducts } from '@/utils/product';
import { formatter } from '@/lib/utils';

const ProductsPage = async ({ params }) => {
  const response = await getProducts(params);
  const formatedProducts = response.data.map((item) => ({
    id: item._id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    size: item.sizeId.name,
    category: item.categoryId.name,
    color: item.colorId.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 p-8">
      <ProductClient products={formatedProducts} />
    </div>
  );
};

export default ProductsPage;
