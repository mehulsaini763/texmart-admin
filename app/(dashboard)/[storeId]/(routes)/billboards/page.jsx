import { format } from 'date-fns';
import BillboardClient from './_components/BillboardClient';
import dbConnect from '@/lib/db';
import Billboard from '@/models/billboards.model';

const BillboardsPage = async ({ params }) => {
  await dbConnect();
  const billboards = await Billboard.find({ storeId: params.storeId });
  const formatedBillboards = billboards.map((item) => ({
    id: item._id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));
  return (
    <div className="flex flex-col gap-4 p-8">
      <BillboardClient billboards={formatedBillboards} />
    </div>
  );
};

export default BillboardsPage;
