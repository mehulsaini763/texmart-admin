import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Store from '@/models/stores.model';

const DashboardPage = async ({ params }) => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  await dbConnect();
  const store = await Store.findById(params.storeId);

  return <div>Active Store = {store.storeName}</div>;
};

export default DashboardPage;
