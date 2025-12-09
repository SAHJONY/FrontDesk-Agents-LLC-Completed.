// contexts/LanguageContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the shape of the context state
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

// 2. Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 3. Define the Provider component (which was previously aliased as ContextLanguageProvider)
export function LanguageProvider({ children }: { children: ReactNode }) {
  // You can set your default language here
  const [language, setLanguage] = useState('en'); 

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Define the custom hook for consuming the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
