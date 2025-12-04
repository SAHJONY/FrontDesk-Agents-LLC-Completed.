// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "./providers/LanguageProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import TopNav from "@/components/top-nav";

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
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <ThemeProvider>
          <LanguageProvider>
            <TopNav />
            <main>{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
