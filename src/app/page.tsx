import { ThemePage } from '@/components/theme-page';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl text-black dark:text-white">Hello World</h1>
      <ThemePage />
    </main>
  );
}
