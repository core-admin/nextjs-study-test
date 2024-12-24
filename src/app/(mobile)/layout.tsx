import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import clsx from 'clsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mobile',
  description: 'Mobile',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'min-h-screen')}>
        <div className="bg-indigo-600">
          <div className="max-w-screen-xl mx-auto px-4 py-3 text-white sm:text-center md:px-8">
            <p className="font-medium">
              We just launched a new version of our library!{' '}
              <a
                href="#"
                className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
