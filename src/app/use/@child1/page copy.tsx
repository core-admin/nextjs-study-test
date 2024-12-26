'use client';

import { use } from 'react';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  await sleep(3000);
  return 'child1';
};

export default function Page() {
  const data = use(fetchData());
  return (
    <div className="shadow-2xl rounded-2xl flex items-center justify-center min-h-40">{data}</div>
  );
}

/**
 * Warning: A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.
 *
 * 这个错误出现是因为在客户端组件中直接使用 use hook 来处理未缓存的 Promise 是不支持的。
 * 在 React 的客户端组件中，我们需要使用其他方式来处理异步数据。
 *
 * 就总感觉新增的 use 这个 hook 很鸡肋，既然 use 是给服务端用的，那我直接在 server component 中使用 async 不就好了。
 *
 * 鸡肋！！！
 */

// ------------------------------------------------------------------------------------------------

/*

使用 React Query 或 SWR 这样的数据获取库（推荐）

'use client';

import { useState, useEffect } from 'react';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  await sleep(3000);
  return 'child1';
};

export default function Page() {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div className="shadow-2xl rounded-2xl flex items-center justify-center min-h-40">
      {data || 'Loading...'}
    </div>
  );
}

*/

// ------------------------------------------------------------------------------------------------

/*

使用 SWR 这样的数据获取库（推荐）

'use client';

import useSWR from 'swr';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  await sleep(3000);
  return 'child1';
};

export default function Page() {
  const { data } = useSWR('child1', fetchData);
  
  return (
    <div className="shadow-2xl rounded-2xl flex items-center justify-center min-h-40">
      {data || 'Loading...'}
    </div>
  );
}

*/
