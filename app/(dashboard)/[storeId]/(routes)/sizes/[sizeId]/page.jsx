import SizeForm from './_components/SizeForm';
import dbConnect from '@/lib/db';
import Size from '@/models/sizes.model';
import mongoose from 'mongoose';

const SizePage = async ({ params }) => {
  await dbConnect();
  const size = mongoose.isValidObjectId(params.sizeId) ? await Size.findById(params.sizeId) : null;
  return (
    <div className="flex flex-col gap-4 p-8">
      <SizeForm size={size} />
    </div>
  );
};

export default SizePage;
