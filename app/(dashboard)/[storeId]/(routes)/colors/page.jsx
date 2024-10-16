import { format } from 'date-fns';
import ColorClient from './_components/ColorClient';
import dbConnect from '@/lib/db';
import Color from '@/models/colors.model';

const ColorsPage = async ({ params }) => {
  await dbConnect();
  const colors = await Color.find({ storeId: params.storeId });
  const formatedColors = colors.map((item) => ({
    id: item._id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 p-8">
      <ColorClient colors={formatedColors} />
    </div>
  );
};

export default ColorsPage;
