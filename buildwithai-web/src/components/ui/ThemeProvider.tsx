'use client';

import { useState, useEffect } from 'react';

const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem('bwai-theme');
  if (stored && (stored === 'light' || stored === 'dark')) return stored;
  return 'system';
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(getStoredTheme());

  useEffect(() => {
    const onChange = (e: StorageEvent) => {
      if (e.key === 'bwai-theme') setTheme(e.newValue);
    };
    window.addEventListener('storage', onChange);
    return () => window.removeEventListener('storage', onChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.remove('light', 'dark');
      root.classList.add(prefersDark ? 'dark' : 'light');
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    localStorage.setItem('bwai-theme', theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
