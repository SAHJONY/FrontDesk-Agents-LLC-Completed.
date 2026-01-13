"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/src/contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { I18nProvider } from "../lib/i18n/provider";
import { AutonomousProvider } from "../lib/autonomous/provider";

/**
 * Unified Global Providers for FrontDesk Agents.
 * Consolidates Theme, Language, Auth, and Autonomous logic.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark" 
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <LanguageProvider>
          <I18nProvider>
            <AutonomousProvider>
              {children}
            </AutonomousProvider>
          </I18nProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
