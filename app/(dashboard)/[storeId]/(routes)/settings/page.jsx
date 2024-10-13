import { redirect } from 'next/navigation';
import SettingsForm from './_components/SettingsForm';
import { getUser } from '@/utils/auth';
import { getStore } from '@/utils/store';

const SettingsPage = async ({ params }) => {
  const user = await getUser();

  if (!user) {
    console.log('Session Expired');
    redirect('/login');
  } else console.log('Authorized');

  const store = await getStore(params);

  if (!store.data) {
    console.log(store.message);
    redirect('/');
  } else console.log(store.message);

  return (
    <div className="flex flex-col gap-4 p-8">
      <SettingsForm store={store.data} />
    </div>
  );
};

export default SettingsPage;
