"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/calls", label: "Calls" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-neutral-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-black">
            FD
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">
              FrontDesk Agents
            </span>
            <span className="text-[10px] text-neutral-400">
              AI Receptionist · 24/7
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-4 text-sm text-neutral-300 sm:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-md px-3 py-1 transition-colors " +
                  (active
                    ? "bg-neutral-800 text-white"
                    : "hover:bg-neutral-900 hover:text-white")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side (placeholder for future actions) */}
        <div className="flex items-center gap-2">
          {/* Aquí después podemos re-agregar ThemeToggle o LanguageSwitcher */}
          <span className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-300">
            v1 · Enterprise Ready
          </span>
        </div>
      </div>
    </header>
  );
}
