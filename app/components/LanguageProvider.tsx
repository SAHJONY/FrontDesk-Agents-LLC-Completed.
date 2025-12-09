// app/components/LanguageProvider.tsx
'use client';
import React from 'react';
import { LanguageProvider as ContextProvider } from '@/contexts/LanguageContext';

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <ContextProvider>{children}</ContextProvider>;
}
