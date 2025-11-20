'use client';
import './globals.css';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'es'>('en');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedLang = localStorage.getItem('lang') as 'en' | 'es' | null;
    if (savedTheme) document.documentElement.dataset.theme = savedTheme;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col transition-colors duration-300">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 border-b border-gray-300 dark:border-slate-700">
          <h1 className="text-xl font-extrabold text-cyan-600 dark:text-cyan-300">
            FrontDesk Agents LLC
          </h1>
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleLang}
              className="text-sm font-medium hover:text-cyan-500 transition-colors"
            >
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:scale-110 transition-transform"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-cyan-600" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-400" />
              )}
            </button>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="py-6 text-center text-sm text-gray-500 dark:text-slate-400 border-t border-gray-200 dark:border-slate-800">
          © {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
