import { getUser } from '@/utils/auth';
import { getStore } from '@/utils/store';
import { redirect } from 'next/navigation';

const DashboardPage = async ({ params }) => {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const store = await getStore(params);

  return <div>Active Store = {store.data.storeName}</div>;
};

export default DashboardPage;
