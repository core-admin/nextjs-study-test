'use client';

import { useTheme } from '@/components/theme-provider';

export function ThemePage() {
  const { theme } = useTheme();
  console.log('theme >>>', theme);

  return <p className="mt-4">当前主题：{theme}</p>;
}
