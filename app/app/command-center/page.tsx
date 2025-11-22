'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CommandCenterPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) setTheme(stored);
    document.documentElement.classList.toggle('dark', stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <main className="relative min-h-screen overflow-hidden transition-colors duration-300 bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      <Image
        src="/images/hero-bg.jpg"
        alt="Cinematic background"
        fill
        priority
        className="object-cover opacity-40 absolute inset-0 -z-10"
      />

      <header className="flex justify-between items-center p-6">
        <Link
          href="/"
          className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-md hover:opacity-80 transition"
        >
          ← Back Home
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-gray-500 dark:border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <section className="text-center mt-20">
        <h1 className="text-5xl font-bold mb-4">Command Center</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage automations, AI workflows, and client integrations
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl p-6 shadow-md">
          <h2 className="font-semibold mb-2">Automation Monitor</h2>
          <p>All workflows operational ✅</p>
        </div>
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl p-6 shadow-md">
          <h2 className="font-semibold mb-2">Client AI Agents</h2>
          <p>7 agents active / 1 in training</p>
        </div>
      </div>
    </main>
  );
}
