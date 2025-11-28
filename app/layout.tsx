// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// IMPORTS RELATIVOS
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontDesk Agents · AI PHONE OS",
  description:
    "Enterprise-grade AI receptionist, scheduling and inbound OS for high-value industries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 transition-colors duration-300">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
