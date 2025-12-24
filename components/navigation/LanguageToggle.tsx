'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { languages } from '@/config/languages';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Extract current locale from the URL (e.g., /en/dashboard -> en)
  const currentLocale = pathname.split('/')[1] || 'en';
  const activeLanguage = languages.find(l => l.code === currentLocale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Replace the locale segment in the current path
    const pathSegments = pathname.split('/');
    pathSegments[1] = newLocale;
    const newPath = pathSegments.join('/') || `/${newLocale}`;
    
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group"
      >
        <Globe className="w-3 h-3 text-cyan-500 group-hover:rotate-12 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">
          {activeLanguage.name}
        </span>
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full mt-2 right-0 w-48 bg-[#0a0a0b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in backdrop-blur-xl">
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    currentLocale === lang.code 
                    ? 'bg-cyan-500 text-black' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {lang.name}
                  {currentLocale === lang.code && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
