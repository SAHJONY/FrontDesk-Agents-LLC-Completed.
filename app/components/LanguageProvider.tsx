// app/components/LanguageProvider.tsx
'use client';
import React from 'react';
import { LanguageProvider as ContextProvider } from '@/contexts/LanguageContext';

/**
 * Wrapper para uso en app/layout.tsx o en _app.tsx
 * Importar y envolver la aplicación:
 * <LanguageProvider>{children}</LanguageProvider>
 */
export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <ContextProvider>{children}</ContextProvider>;
}
