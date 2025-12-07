"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/demo", label: "Live Demo" },
  { href: "/owner/onboarding", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/ai-command-center", label: "AI Command Center" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center text-xs font-bold text-slate-950">
            FD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] text-slate-400">
              AI Reception • 24/7 Coverage
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "text-sky-400 text-sm font-medium"
                    : "text-slate-300 text-sm hover:text-white transition"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side placeholder (no theme/language here) */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Production Nav</span>
        </div>
      </div>
    </header>
  );
}
