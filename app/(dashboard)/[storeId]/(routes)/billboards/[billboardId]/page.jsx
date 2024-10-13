import BillboardForm from './_components/BillboardForm';

import { getBillboard } from '@/utils/billboard';

const BillboardsPage = async ({ params }) => {
  const response = await getBillboard(params);
  return (
    <div className="flex flex-col gap-4 p-8">
      <BillboardForm billboard={response.data} />
    </div>
  );
};

export default BillboardsPage;
