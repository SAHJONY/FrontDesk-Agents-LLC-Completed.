// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppProviders from "./providers";

const inter = Inter({ subsets: ["latin"] });

// Ajusta el metadata si quieres, no afecta al bug actual.
export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Voice Receptionist & Call Center Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 🔵 Aquí se inyecta el LanguageProvider global */}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
