import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { LangProvider } from "./components/LangProvider";
import SiteHeader from "./components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Reception & Command Center",
  description:
    "24/7 AI Receptionist & Command Center that answers calls, WhatsApp, SMS and email for your business in any language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <div className="min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-1 max-w-6xl w-full mx-auto px-4 pb-12 pt-4 sm:pt-8">
                {children}
              </main>
            </div>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
