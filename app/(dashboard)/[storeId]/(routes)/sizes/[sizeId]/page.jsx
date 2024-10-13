import SizeForm from './_components/SizeForm';

import { getSize } from '@/utils/size';

const SizePage = async ({ params }) => {
  const size = await getSize(params);
  return (
    <div className="flex flex-col gap-4 p-8">
      <SizeForm size={size.data} />
    </div>
  );
};

export default SizePage;
