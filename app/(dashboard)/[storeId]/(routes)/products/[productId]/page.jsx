import ProductForm from './_components/ProductForm';
import dbConnect from '@/lib/db';
import Product from '@/models/products.model';
import Category from '@/models/categories.model';
import Size from '@/models/sizes.model';
import Color from '@/models/colors.model';
import mongoose from 'mongoose';

const ProductsPage = async ({ params }) => {
  await dbConnect();
  const product = mongoose.isValidObjectId(params.productId) ? await Product.findById(params.productId) : null;
  const categories = await Category.find({ storeId: params.storeId });
  const sizes = await Size.find({ storeId: params.storeId });
  const colors = await Color.find({ storeId: params.storeId });
  return (
    <div className="flex flex-col gap-4 p-8">
      <ProductForm product={product} categories={categories} sizes={sizes} colors={colors} />
    </div>
  );
};

export default ProductsPage;
