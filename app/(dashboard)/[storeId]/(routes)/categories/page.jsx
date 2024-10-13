import { format } from 'date-fns';

import CategoryClient from './_components/CategoryClient';
import { getCategories } from '@/utils/category';

const CategoriesPage = async ({ params }) => {
  const categories = await getCategories(params);
  console.log(categories);
  
  const formattedCategories = categories.data.map((item) => ({
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
