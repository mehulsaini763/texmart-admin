import { redirect } from 'next/navigation';

import Navbar from '@/components/Navbar';

import { getUser } from '@/utils/auth';
import { getStore } from '@/utils/store';

const DashboardLayout = async ({ children, params }) => {
  const user = await getUser();

  if (!user) {
    console.log('Session Expired');
    redirect('/login');
  } else console.log('Authorized');

  const store = await getStore(params);

  if (!store.data) {
    redirect('/');
  }
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
