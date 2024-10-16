import { redirect } from 'next/navigation';
import LoginClient from './_components/Client';
import { auth } from  '@/lib/auth';

const LoginPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return <LoginClient />;
};

export default LoginPage;
