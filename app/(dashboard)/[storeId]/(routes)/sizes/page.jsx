import { format } from 'date-fns';

import SizeClient from './_components/SizeClient';

import { getSizes } from '@/utils/size';

const SizesPage = async ({ params }) => {
  const response = await getSizes(params);
  const formatedSizes = response.data.map((item) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 p-8">
      <SizeClient sizes={formatedSizes} />
    </div>
  );
};

export default SizesPage;
