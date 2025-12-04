// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

import { LanguageProvider } from "./components/LanguageProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist",
  description:
    "24/7 AI receptionist that answers calls, texts back missed calls, and books appointments for your business in English and Spanish.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
