// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import { MainNav } from "@/components/MainNav";

export const metadata = {
  title: "FrontDesk Agents – AI Receptionists",
  description: "24/7 AI phone receptionists that answer, qualify and book your clients automatically.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        {/* Global navigation bar */}
        <MainNav />

        {/* Main content wrapper */}
        <main className="min-h-screen mx-auto max-w-6xl px-4 py-10 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
