// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import MainNav from "./components/MainNav";

export const metadata: Metadata = {
  title: "FrontDesk Agents · AI Receptionists 24/7",
  description:
    "AI receptionists that answer every call, qualify leads and book appointments for your business, 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        <LanguageProvider>
          <MainNav />
          <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
