import MainNav from './MainNav';
import StoreSwitcher from './StoreSwitcher';
import Store from '@/models/stores.model';
import { auth } from '@/lib/auth';
import Profile from './Profile';

const Navbar = async () => {
  const { user } = await auth();
  const stores = await Store.find({ userId: user.id });
  return (
    <div className="p-2 lg:p-4 flex items-center justify-between gap-4 border-b">
      <StoreSwitcher stores={stores} />
      <MainNav />
      <Profile user={user} />
    </div>
  );
};

export default Navbar;
