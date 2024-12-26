import { use } from 'react';
import { RefreshButton } from './RefreshButton';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  await sleep(2000);
  return 'child1' + '   ' + Math.random().toString().slice(0, 5);
};

export default function Page() {
  const data = use(fetchData());

  const onRefresh = () => {};

  return (
    <div className="shadow-2xl rounded-2xl flex items-center justify-center min-h-40 gap-4">
      {data}
      <RefreshButton onRefresh={onRefresh} />
    </div>
  );
}
