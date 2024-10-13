import { format } from 'date-fns';

import BillboardClient from './_components/BillboardClient';

import { getBillboards } from '@/utils/billboard';

const BillboardsPage = async ({ params }) => {
  const response = await getBillboards(params);
  const formatedBillboards = response.data.map((item) => ({
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
