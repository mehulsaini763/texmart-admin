import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Store from '@/models/stores.model';

const DashboardLayout = async ({ children, params }) => {
  const session = await auth();

  if (!session) {
    console.log('Session Expired');
    redirect('/login');
  }

  await dbConnect();
  const store = await Store.findById(params.storeId);

  if (!store) {
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
