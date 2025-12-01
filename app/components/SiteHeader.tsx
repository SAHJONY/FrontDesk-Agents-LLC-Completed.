"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar desajustes de hidratación con next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-slate-950 shadow-lg">
            FD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-300/90">
              AI Receptionist Command Center
            </span>
          </div>
        </div>

        {/* Nav + actions */}
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-xs font-medium text-slate-200/80 sm:flex">
            <Link
              href="/industries"
              className="rounded-md px-2 py-1 transition hover:bg-slate-900/80 hover:text-slate-50"
            >
              Industries
            </Link>
            <Link
              href="/pricing"
              className="rounded-md px-2 py-1 transition hover:bg-slate-900/80 hover:text-slate-50"
            >
              Pricing
            </Link>
            <Link
              href="/app/ai-agents"
              className="rounded-md px-2 py-1 transition hover:bg-slate-900/80 hover:text-slate-50"
            >
              AI Agents
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md px-2 py-1 transition hover:bg-slate-900/80 hover:text-slate-50"
            >
              Command Center
            </Link>
          </nav>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-[11px] font-semibold text-slate-100 shadow-sm transition hover:border-cyan-400/70 hover:bg-slate-900"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? "🌙" : "☀️") : "…"}
          </button>

          {/* CTA */}
          <Link
            href="/setup"
            className="hidden items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:brightness-110 sm:inline-flex"
          >
            Launch Your AI Desk
          </Link>
        </div>
      </div>
    </header>
  );
}
