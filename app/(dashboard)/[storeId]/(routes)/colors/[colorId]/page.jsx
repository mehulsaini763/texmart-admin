import ColorForm from './_components/ColorForm';

import { getColor } from '@/utils/color';

const ColorPage = async ({ params }) => {
  console.log(params);

  const color = await getColor(params);
  return (
    <div className="flex flex-col gap-4 p-8">
      <ColorForm color={color.data} />
    </div>
  );
};

export default ColorPage;
