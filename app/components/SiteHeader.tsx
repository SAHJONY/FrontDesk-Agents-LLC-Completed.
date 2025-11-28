// app/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home / Inicio" },
  { href: "/industries", label: "Industrias" },
  { href: "/pricing", label: "Pricing / Precios" },
  { href: "/setup", label: "Onboarding" },
  { href: "/dashboard", label: "Command Center" },
  { href: "/admin", label: "Owner Admin" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/60">
            <span className="text-sm font-bold text-cyan-300">FD</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">
              FrontDesk Agents
            </span>
            <span className="text-[11px] text-slate-400">
              AI PHONE · 24/7 Revenue OS
            </span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-medium transition-colors ${
                  active
                    ? "text-cyan-300"
                    : "text-slate-300/80 hover:text-cyan-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/setup"
            className="hidden rounded-full bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-md shadow-cyan-500/40 hover:bg-cyan-400 md:inline-flex"
          >
            Iniciar demo guiada
          </Link>
        </div>
      </div>
    </header>
  );
}
