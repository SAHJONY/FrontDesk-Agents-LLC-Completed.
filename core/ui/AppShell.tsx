"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/outbound", label: "Outbound" },
  { href: "/dashboard/retention", label: "Retention" },
  { href: "/ai-agents", label: "AI Agents" },
  { href: "/industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <span className="text-lg font-semibold tracking-tight">
            FrontDesk <span className="text-sky-400">Agents</span>
          </span>
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-sky-500/15 text-sky-300 border border-sky-500/40"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 text-xs text-slate-500">
          v1 • SaaS Kernel v2
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-base font-semibold">
              FrontDesk <span className="text-sky-400">Agents</span>
            </span>
          </div>
          <div className="flex-1 flex items-center gap-3">
            <span className="hidden md:inline text-xs uppercase tracking-[0.15em] text-slate-500">
              AI Voice Receptionist • 24/7
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-200 hover:border-sky-500 hover:text-sky-300"
            >
              <span>{theme === "dark" ? "🌙 Dark" : "☀️ Light"}</span>
            </button>
            <Link
              href="/owner"
              className="hidden md:inline-flex items-center rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-950 hover:bg-sky-400"
            >
              Owner Console
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
