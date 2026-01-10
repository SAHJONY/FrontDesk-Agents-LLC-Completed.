"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
// This links your UI to the localization logic you just updated
import { LanguageProvider } from "./components/LanguageProvider";
import { AuthProvider } from "./contexts/AuthContext";

/**
 * Global Providers for FrontDesk Agents Global Revenue Workforce.
 * Handles Light/Dark themes and Autonomous Localization (EN/ES).
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="dark" 
        enableSystem
        disableTransitionOnChange
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
