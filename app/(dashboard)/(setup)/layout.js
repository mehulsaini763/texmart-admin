import { redirect } from 'next/navigation';
import Store from '@/models/stores.model';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';

const SetupLayout = async ({ children }) => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  await dbConnect();
  const stores = await Store.find({ userId: session.user.id });

  if (stores.length != 0) {
    redirect(`/${stores[0]._id}`);
  }

  return children;
};

export default SetupLayout;
