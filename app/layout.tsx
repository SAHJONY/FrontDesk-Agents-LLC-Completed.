// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FrontDesk Agents – AI Receptionist Command Center",
  description:
    "AI receptionists, outbound follow-up and retention engine for clinics, law firms and service businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-slate-950">
      <body className="bg-slate-950 text-slate-50">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="rounded bg-sky-500/10 px-2 py-1 text-xs font-semibold text-sky-400">
                FrontDesk Agents
              </span>
              <span className="hidden text-xs text-slate-400 sm:inline">
                AI Receptionist & Command Center
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <Link href="/industries" className="text-slate-300 hover:text-sky-400">
                Industries
              </Link>
              <Link href="/pricing" className="text-slate-300 hover:text-sky-400">
                Pricing
              </Link>
              <Link href="/demo" className="text-slate-300 hover:text-sky-400">
                Live Demo
              </Link>
              <Link href="/dashboard" className="text-slate-300 hover:text-sky-400">
                Client Dashboard
              </Link>
              <Link href="/admin" className="text-slate-300 hover:text-sky-400">
                Owner Console
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-sky-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-300"
              >
                Login
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto min-h-[calc(100vh-60px)] max-w-6xl px-4 py-6 lg:px-8 lg:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
