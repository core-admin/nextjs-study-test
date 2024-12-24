import Link from 'next/link';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

function Loading() {
  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-sky-500 text-white flex items-center justify-center">
      Loading
    </div>
  );
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function SleepComponent() {
  await sleep(2000);
  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, Layout!
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5">
      <h1 className="text-2xl text-center my-4">layout head</h1>
      <nav className="flex items-center justify-center gap-10 text-blue-600">
        <Link href="/layout-and-template/shared/about">About</Link>
        <Link href="/layout-and-template/shared/settings">Settings</Link>
      </nav>
      <Suspense fallback={<Loading />}>
        <SleepComponent />
      </Suspense>

      <div className="my-8 border-b border-gray-300"></div>
      {children}
    </div>
  );
}
