'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-800 animate-pulse" />
    );
  }

  const themes = [
    { name: 'light', icon: SunIcon, label: 'Light Mode' },
    { name: 'dark', icon: MoonIcon, label: 'Dark Mode' },
    { name: 'system', icon: ComputerDesktopIcon, label: 'System' },
  ];

  return (
    <div className="relative inline-flex items-center gap-1 p-1 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg">
      {themes.map(({ name, icon: Icon, label }) => {
        const isActive = theme === name;
        const isActiveResolved = !theme || theme === 'system' ? resolvedTheme === name : isActive;
        
        return (
          <button
            key={name}
            onClick={() => setTheme(name)}
            className={`
              relative p-2 rounded-lg transition-all duration-300 ease-out
              ${isActive 
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }
            `}
            aria-label={label}
            title={label}
          >
            <Icon className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            
            {/* Active indicator dot */}
            {isActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            )}
          </button>
        );
      })}
      
      {/* Animated background slider */}
      <div
        className="absolute inset-y-1 w-10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-lg transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: `translateX(${
            theme === 'light' ? '0px' : theme === 'dark' ? '44px' : '88px'
          })`,
        }}
      />
    </div>
  );
}

export function ThemeToggleSimple() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-slate-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2.5 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/70 transition-all duration-300 shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 transition-transform duration-300 hover:rotate-180" />
      ) : (
        <MoonIcon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
