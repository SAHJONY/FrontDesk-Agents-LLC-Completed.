// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "./providers/LanguageProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { MainNav } from "./components/MainNav";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist",
  description:
    "24/7 AI receptionist that answers, texts and books appointments for your business.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
              <MainNav />
              <main className="flex-1">{children}</main>
              {/* Puedes añadir un footer aquí más adelante */}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
