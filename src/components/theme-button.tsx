'use client';

import { useTheme } from './theme-provider';
import { SunIcon, MoonIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-4 right-4"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
