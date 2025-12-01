// app/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xs font-bold text-slate-950 shadow-lg">
            FD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] text-slate-400">
              AI Receptionist Command Center
            </span>
          </div>
        </div>

        {/* Nav + Theme toggle */}
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-xs font-medium text-slate-300 md:flex">
            <Link
              href="/"
              className="hover:text-cyan-400 transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-cyan-400 transition-colors"
            >
              Command Center
            </Link>
            <Link
              href="/setup"
              className="hover:text-cyan-400 transition-colors"
            >
              Setup
            </Link>
            <Link
              href="/pricing"
              className="hover:text-cyan-400 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/industries"
              className="hover:text-cyan-400 transition-colors"
            >
              Industries
            </Link>
          </nav>

          {/* Theme toggle */}
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100 shadow-sm hover:border-cyan-400 hover:text-cyan-300"
              aria-label="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
