import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'min-h-screen')}>
        {children}
        {modal}
      </body>
    </html>
  );
}
