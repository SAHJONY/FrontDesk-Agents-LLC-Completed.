'use client';

import React from 'react';

// Define the supported languages to satisfy the 'languages.some' check
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
];

export default function LanguageSwitcher() {
  const handleLanguageChange = (code: string) => {
    // 1. Set cookie for Middleware (ensures the server remembers preference)
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; SameSite=Lax`;
    
    // 2. Get current URL path (e.g., /en/about)
    const pathname = window.location.pathname;
    const segments = pathname.split('/');

    // 3. Check if the first segment is an existing language code
    // This was the source of the build error: languages is now defined above.
    const hasLocale = languages.some(l => l.code === segments[1]);

    if (hasLocale) {
      // Replace existing locale (e.g., /en/dashboard -> /es/dashboard)
      segments[1] = code;
    } else {
      // Add locale if missing (e.g., /dashboard -> /es/dashboard)
      segments.splice(1, 0, code);
    }

    const newPath = segments.join('/') || '/';
    
    // 4. Navigate to the new URL
    window.location.href = newPath; 
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-zinc-900/50 border border-zinc-800 rounded-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded transition-all"
        >
          {lang.code}
        </button>
      ))}
    </div>
  );
}
