import { Header } from '@/components/header';
import { List } from '@/components/list';

export default async function Page() {
  return (
    <div id="root">
      <div className="container">
        <Header />
        <List />
      </div>
    </div>
  );
}
