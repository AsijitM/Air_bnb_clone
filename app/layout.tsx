import ClientOnly from './components/ClientOnly';
import Modal from './components/Modals/Modal';
import RegisterModal from './components/Modals/RegisterModal';

import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

const inter = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone, Happy cloning',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        {/* <Modal actionLabel="Submit" title="hello World" isOpen /> */}
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
