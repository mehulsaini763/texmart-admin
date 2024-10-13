import { getCategories } from '@/utils/category';
import ProductForm from './_components/ProductForm';

import { getProduct } from '@/utils/product';
import { getSizes } from '@/utils/size';
import { getColors } from '@/utils/color';

const ProductsPage = async ({ params }) => {
  const product = await getProduct(params);
  const categories = await getCategories(params);
  const sizes = await getSizes(params);
  const colors = await getColors(params);
  return (
    <div className="flex flex-col gap-4 p-8">
      <ProductForm product={product.data} categories={categories.data} sizes={sizes.data} colors={colors.data} />
    </div>
  );
};

export default ProductsPage;
