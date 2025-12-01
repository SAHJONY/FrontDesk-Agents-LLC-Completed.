import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { LangProvider } from "./components/LangProvider";
import SiteHeader from "./components/SiteHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "AI Receptionist 24/7 para negocios modernos. Atendemos llamadas, mensajes y leads mientras tú cierras ventas.",
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
        <ThemeProvider>
          <LangProvider>
            <div className="min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
            </div>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
