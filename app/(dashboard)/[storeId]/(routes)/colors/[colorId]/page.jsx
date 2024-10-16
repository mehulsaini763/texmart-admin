import ColorForm from './_components/ColorForm';
import dbConnect from '@/lib/db';
import Color from '@/models/colors.model';
import mongoose from 'mongoose';

const ColorPage = async ({ params }) => {
  await dbConnect();
  const color = mongoose.isValidObjectId(params.categoryId) ? await Color.findById(params.colorId) : null;
  return (
    <div className="flex flex-col gap-4 p-8">
      <ColorForm color={color} />
    </div>
  );
};

export default ColorPage;
