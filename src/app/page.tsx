import { ThemeButton } from '@/components/theme-button';
import { ThemePage } from '@/components/theme-page';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl">Hello World</h1>
      <ThemePage />
      <ThemeButton />
    </main>
  );
}
