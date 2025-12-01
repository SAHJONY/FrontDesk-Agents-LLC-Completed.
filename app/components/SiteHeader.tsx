"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-black text-slate-950">
            FD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] font-medium text-cyan-300/90">
              AI Receptionist Command Center
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
          <Link href="/industries" className="hover:text-white">
            Industries
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/app/ai-agents" className="hover:text-white">
            AI Agents
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-cyan-400/70 px-3 py-1 text-cyan-200 hover:bg-cyan-400/10"
          >
            Command Center
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/setup"
            className="hidden rounded-full bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 hover:bg-cyan-300 md:inline-flex"
          >
            Start free setup
          </Link>
        </div>
      </div>
    </header>
  );
}
