import { format } from 'date-fns';

import ColorClient from './_components/ColorClient';

import { getColors } from '@/utils/color';

const ColorsPage = async ({ params }) => {
  const colors = await getColors(params);
  const formatedColors = colors.data.map((item) => ({
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
