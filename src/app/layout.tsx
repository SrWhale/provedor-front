import '@src/styles/globals.css';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { Navbar } from '@src/components';

import { Toaster } from 'react-hot-toast';

const poppins = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Bet Games',
  description: 'Bet Games',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} bg-zinc-900`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
