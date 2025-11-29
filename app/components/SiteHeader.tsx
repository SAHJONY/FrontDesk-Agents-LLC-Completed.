"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

const NAV_ITEMS = [
  { href: "/", labelEn: "Home", labelEs: "Inicio" },
  { href: "/industries", labelEn: "Industries", labelEs: "Industrias" },
  { href: "/pricing", labelEn: "Pricing", labelEs: "Precios" },
  { href: "/dashboard", labelEn: "Command Center", labelEs: "Command Center" },
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/90 shadow-lg shadow-cyan-500/40">
            <span className="text-xs font-black tracking-tight text-slate-950">
              FD
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-cyan-300/90">
              AI PHONE OS
            </span>
          </div>
        </Link>

        {/* Nav + toggles */}
        <div className="flex items-center gap-3">
          {/* Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border border-slate-800 bg-slate-900/70 px-1 py-0.5 text-xs text-slate-300 shadow-sm sm:flex">
            {NAV_ITEMS.map((item) => {
              const isHome = item.href === "/";
              const isActive = isHome
                ? pathname === "/"
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-full px-3 py-1 transition-colors",
                    isActive
                      ? "bg-cyan-500/90 text-slate-950"
                      : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50",
                  ].join(" ")}
                >
                  {item.labelEn}
                </Link>
              );
            })}
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
