import { redirect } from 'next/navigation';

import { getUser } from '@/utils/auth';
import { getStores } from '@/utils/store';

const SetupLayout = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const stores = await getStores({ userId: user._id });

  if (stores.data.length != 0) {
    redirect(`/${stores.data[0]._id}`);
  }

  return children;
};

export default SetupLayout;
