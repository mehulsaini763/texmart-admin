import CategoryForm from './_components/CategoryForm';
import dbConnect from '@/lib/db';
import Billboard from '@/models/billboards.model';
import Category from '@/models/categories.model';
import mongoose from 'mongoose';

const CategoryPage = async ({ params }) => {
  await dbConnect();
  const category = mongoose.isValidObjectId(params.categoryId) ? await Category.findById(params.categoryId) : null;
  const billboards = await Billboard.find({ storeId: params.storeId });
  return (
    <div className="flex flex-col gap-4 p-8">
      <CategoryForm billboards={billboards} category={category} />
    </div>
  );
};

export default CategoryPage;
