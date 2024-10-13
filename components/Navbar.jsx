import MainNav from './MainNav';
import StoreSwitcher from './StoreSwitcher';

import { getStores } from '@/utils/store';
import { getUser } from '@/utils/auth';

const Navbar = async () => {
  const user = await getUser();
  const stores = await getStores({ userId: user._id });

  return (
    <div className="p-2 lg:p-4 flex items-center justify-between gap-4 border-b">
      <StoreSwitcher stores={stores.data} />
      <MainNav />
      <div>USER</div>
    </div>
  );
};

export default Navbar;
