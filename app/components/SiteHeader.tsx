// app/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Command Center", href: "/dashboard" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing", href: "/pricing" },
];

export default function SiteHeader() {
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? "/";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/40 bg-slate-950/90 text-slate-50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-lg font-semibold shadow-lg shadow-sky-500/40">
            FD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">
              FrontDesk Agents
            </span>
            <span className="text-[11px] text-slate-400">
              24/7 AI Receptionist Command Center
            </span>
          </div>
        </Link>

        {/* Center nav */}
        <nav className="hidden items-center gap-4 text-xs md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right controls: tema + idioma + CTA corta */}
        <div className="flex items-center gap-2">
          {/* Placeholder simple para Dark/Light; puedes cambiarlo por tu toggle real */}
          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            Dark
          </span>
          <button className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            ES
          </button>
          <Link
            href="/setup"
            className="hidden rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-slate-950 shadow-md shadow-sky-500/40 hover:bg-sky-400 md:inline-flex"
          >
            Launch Command Center
          </Link>
        </div>
      </div>
    </header>
  );
}
