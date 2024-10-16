import BillboardForm from './_components/BillboardForm';
import dbConnect from '@/lib/db';
import Billboard from '@/models/billboards.model';
import mongoose from 'mongoose';

const BillboardsPage = async ({ params }) => {
  await dbConnect();
  const billboard = mongoose.isValidObjectId(params.billboardId) ? await Billboard.findById(params.billboardId) : null;
  return (
    <div className="flex flex-col gap-4 p-8">
      <BillboardForm billboard={billboard} />
    </div>
  );
};

export default BillboardsPage;
