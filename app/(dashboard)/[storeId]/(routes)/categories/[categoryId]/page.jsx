import { getBillboards } from '@/utils/billboard';
import CategoryForm from './_components/CategoryForm';

import { getCategory } from '@/utils/category';

const CategoryPage = async ({ params }) => {
  const category = await getCategory(params);
  const billboards = await getBillboards(params);  
  return (
    <div className="flex flex-col gap-4 p-8">
      <CategoryForm billboards={billboards.data} category={category.data} />
    </div>
  );
};

export default CategoryPage;
