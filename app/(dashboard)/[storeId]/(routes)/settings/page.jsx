import { redirect } from 'next/navigation';
import SettingsForm from './_components/SettingsForm';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Store from '@/models/stores.model';

const SettingsPage = async ({ params }) => {
  const session = await auth();

  if (!session) {
    console.log('Session Expired');
    redirect('/login');
  }

  await dbConnect()
  const store = await Store.findById(params.storeId);

  if (!store) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <SettingsForm store={store} />
    </div>
  );
};

export default SettingsPage;
