'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const isServer = typeof window === 'undefined';

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

export const ThemeContext = createContext<ThemeProviderState>(initialState);

function updateRootElementTheme(theme: Theme) {
  // const classList = window.document.documentElement.classList;
  // classList.toggle('dark', theme === 'dark');
}

const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {}
  return theme || fallback;
};

export function ThemeProvider({
  children,
  defaultTheme = initialState.theme,
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    console.log('getTheme >>>', getTheme(storageKey, defaultTheme));
    return getTheme(storageKey, defaultTheme) as Theme;
  });

  console.log('theme 1111111 >>>', theme);

  useEffect(() => {
    /**
     * 如果主题不是系统主题，则直接更新根元素主题
     * 只要设置为非系统主题，则不再监听系统主题的变化，否则系统主题变化时，需要监听并同步更新
     */
    if (theme !== 'system') {
      updateRootElementTheme(theme);
      return;
    }

    // 获取当前系统主题
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

    updateRootElementTheme(systemTheme);

    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (event: MediaQueryListEvent) => {
      updateRootElementTheme(event.matches ? 'dark' : 'light');
    };

    darkThemeMq.addEventListener('change', listener);

    return () => darkThemeMq.removeEventListener('change', listener);
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
