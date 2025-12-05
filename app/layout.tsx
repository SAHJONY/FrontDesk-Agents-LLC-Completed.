import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainNav from "@/app/components/MainNav";
import LangProvider from "@/app/components/LangProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description: "AI Receptionist SaaS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LangProvider>
          <MainNav />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
