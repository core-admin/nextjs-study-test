import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin',
};

const navigation = [
  { title: 'Features', path: '#' },
  { title: 'Integrations', path: '#' },
  { title: 'Customers', path: '#' },
  { title: 'Pricing', path: '#' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'min-h-screen')}>
        <nav className="bg-white pb-5 text-sm shadow-lg rounded-xl border border-none mx-2 mt-8 my-2">
          <div className="gap-x-14 items-center max-w-screen-xl mx-auto flex px-8">
            <div className="flex-1 items-center flex">
              <ul className="justify-center items-center flex space-x-6 space-y-0">
                {navigation.map((item, idx) => {
                  return (
                    <li key={idx} className="text-gray-700 hover:text-gray-900">
                      <a href={item.path} className="block">
                        {item.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="flex-1 gap-x-6 flex items-center justify-end">
                <a href="#" className="block text-gray-700 hover:text-gray-900">
                  {' '}
                  Log in{' '}
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full"
                >
                  {' '}
                  Sign in{' '}
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
