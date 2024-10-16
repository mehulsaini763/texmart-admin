import { Montserrat } from 'next/font/google';
import '@/app/globals.css';
import ReduxProvider from '@/providers/ReduxProvider';
import ToastProvider from '@/providers/ToastProvider';
import ModalProvider from '@/providers/ModalProvider';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Texmart Admin',
  description: 'Texmart Admin',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <ToastProvider />
          <ModalProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
