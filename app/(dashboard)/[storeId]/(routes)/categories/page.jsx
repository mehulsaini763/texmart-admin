import { format } from 'date-fns';
import CategoryClient from './_components/CategoryClient';
import dbConnect from '@/lib/db';
import Categories from '@/models/categories.model';

const CategoriesPage = async ({ params }) => {
  await dbConnect();
  const categories = await Categories.find({ storeId: params.storeId }).populate('billboardId');
  const formattedCategories = categories.map((item) => ({
    id: item._id,
    name: item.name,
    billboardLabel: item.billboardId.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 p-8">
      <CategoryClient categories={formattedCategories} />
    </div>
  );
};

export default CategoriesPage;
