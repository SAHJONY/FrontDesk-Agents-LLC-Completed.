import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import LangProvider from "./components/LangProvider";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "AI phone, WhatsApp & email receptionist that turns every call into booked revenue in under 60 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-50`}>
        <ThemeProvider>
          <LangProvider>
            <div className="min-h-screen flex flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
