// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import ThemeProvider from "./providers/ThemeProvider";
import LanguageProvider from "./providers/LanguageProvider";
import { BRAND } from "./config/branding";

export const metadata: Metadata = {
  title: `${BRAND.name} • AI Voice Receptionist`,
  description:
    "24/7 AI voice receptionists that answer, qualify, and schedule calls so you never miss a high-value customer again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
