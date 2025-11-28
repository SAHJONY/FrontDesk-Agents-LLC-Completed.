// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// IMPORTS **POR DEFECTO** DESDE app/components
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
    <html lang="en">
      <body className={inter.className}>
        {/* Header global con nav + toggle light/dark */}
        <SiteHeader />

        {/* Contenido de cada página */}
        {children}

        {/* Footer global */}
        <SiteFooter />

        {/* Analytics de Vercel */}
        <Analytics />
      </body>
    </html>
  );
}
