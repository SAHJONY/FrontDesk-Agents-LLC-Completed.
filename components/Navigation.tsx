'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const pathname = usePathname();

  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedLang = localStorage.getItem('fda_language') as 'en' | 'es' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    }
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'es' : 'en';
    setLanguage(newLang);
    localStorage.setItem('fda_language', newLang);
    // You can add actual translation logic here
  };

  const isActive = (path: string) => pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-cyan-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-base">FD</span>
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">FrontDesk Agents</span>
              <span className="text-white font-bold text-sm sm:hidden">FDA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                isActive('/dashboard') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/agents" 
              className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                isActive('/dashboard/agents') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              AI Agents
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                isActive('/pricing') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="/features" 
              className={`text-sm font-medium transition-colors px-3 py-2 rounded ${
                isActive('/features') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Features
            </Link>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Toggle - Shows current language with flag/icon */}
            <button
              onClick={toggleLanguage}
              className="text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors px-2 sm:px-3 py-2 rounded hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center gap-1"
              aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
              title={`Current: ${language === 'en' ? 'English' : 'Spanish'} - Click to switch`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle - Shows current theme with text label */}
            <button
              onClick={toggleTheme}
              className="text-slate-300 hover:text-white transition-colors px-2 sm:px-3 py-2 rounded hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium"
              aria-label={`Currently in ${theme} mode - Click to switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Currently: ${theme === 'dark' ? 'Dark' : 'Light'} Mode - Click to switch`}
            >
              {theme === 'dark' ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="hidden sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="hidden sm:inline">Light</span>
                </>
              )}
            </button>

            {/* CTA Button - Desktop */}
            <Link
              href="/signup"
              className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Start Free Trial
            </Link>

            {/* Mobile Menu Button - Touch-friendly */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-300 hover:text-white p-2 rounded hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced with better touch targets */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800 animate-slideDown">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/dashboard" 
                className={`text-base font-medium transition-colors px-4 py-3 rounded min-h-[48px] flex items-center ${
                  isActive('/dashboard') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/agents" 
                className={`text-base font-medium transition-colors px-4 py-3 rounded min-h-[48px] flex items-center ${
                  isActive('/dashboard/agents') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Agents
              </Link>
              <Link 
                href="/pricing" 
                className={`text-base font-medium transition-colors px-4 py-3 rounded min-h-[48px] flex items-center ${
                  isActive('/pricing') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/features" 
                className={`text-base font-medium transition-colors px-4 py-3 rounded min-h-[48px] flex items-center ${
                  isActive('/features') ? 'text-cyan-400 bg-slate-800' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <div className="pt-2">
                <Link
                  href="/signup"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-3 rounded-lg transition-colors text-base text-center block min-h-[48px] flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
