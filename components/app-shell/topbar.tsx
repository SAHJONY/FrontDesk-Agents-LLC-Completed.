'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/app/providers';

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="text-sm text-muted-foreground">Global UI Shell</div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-border px-3 py-1 text-sm hover:bg-muted"
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            aria-label="Toggle language"
          >
            {lang.toUpperCase()}
          </button>

          <button
            className="rounded-md border border-border px-3 py-1 text-sm hover:bg-muted"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
