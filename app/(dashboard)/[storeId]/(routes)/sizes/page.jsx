import { format } from 'date-fns';
import SizeClient from './_components/SizeClient';
import dbConnect from '@/lib/db';
import Size from '@/models/sizes.model';

const SizesPage = async ({ params }) => {
  await dbConnect();
  const sizes = await Size.find({ storeId: params.storeId });
  const formatedSizes = sizes.map((item) => ({
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
