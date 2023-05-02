import ClientOnly from './components/ClientOnly';
import Modal from './components/Modals/Modal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

const inter = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone, Happy cloning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Modal actionLabel='Submit' title="hello World" isOpen />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
