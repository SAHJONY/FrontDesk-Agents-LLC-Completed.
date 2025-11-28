// app/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-cyan-300">
          FrontDesk Agents
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/pricing" className="text-slate-300 text-sm hover:text-cyan-300">
            Pricing
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
