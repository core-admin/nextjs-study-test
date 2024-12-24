'use client';

import React, { Suspense, use, useEffect, useState } from 'react';

function Loading() {
  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-sky-500 text-white flex items-center justify-center">
      Loading
    </div>
  );
}

const sleep = (ms: number = 2000) => new Promise(r => setTimeout(r, ms));

// function SleepComponent() {
//   const [ready, setReady] = useState(false);

//   console.log('template SleepComponent >>>>>>>');

//   if (!ready) {
//     const promise = new Promise(resolve => {
//       setTimeout(() => {
//         setReady(true);
//         resolve(true);
//       }, 2000);
//     });
//     throw promise;
//   }

//   return (
//     <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
//       Hello, Template!
//     </div>
//   );
// }

function SleepComponent() {
  use(sleep());
  return (
    <div className="h-10 mt-5 mb-2 flex-1 rounded-xl bg-indigo-500 text-white flex items-center justify-center">
      Hello, Template!
    </div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('count page view');
  }, []);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <SleepComponent />
      </Suspense>
      <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
        在这里随意输入一些内容：
      </label>
      <div className="mt-2">
        <input
          id="text"
          required
          className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
}
