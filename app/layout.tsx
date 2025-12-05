// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import MainNav from "./components/MainNav";
import LangProvider from "./components/LangProvider";

export const metadata: Metadata = {
  title: "FrontDesk Agents",
  description:
    "AI Receptionists and Phone Agents that answer, qualify and book for your business 24/7.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {/* Language context for the whole app */}
        <LangProvider>
          {/* Top navigation bar */}
          <MainNav />

          {/* Page content */}
          <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        </LangProvider>
      </body>
    </html>
  );
}
