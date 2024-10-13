import { getUser } from '@/utils/auth';
import LoginClient from './_components/Client';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return <LoginClient />;
};

export default LoginPage;
