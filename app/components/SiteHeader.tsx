// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" },
  { href: "/app/pricing", label: "Pricing" },
  { href: "/app/ai-agents", label: "AI Agents" },
  { href: "/setup", label: "Setup" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 ring-1 ring-cyan-500/40">
            <span className="text-xs font-bold text-cyan-400">FD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-xs text-slate-400">AI PHONE OS</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "transition-colors hover:text-cyan-300",
                  active ? "text-cyan-400" : "text-slate-300",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="#pricing"
            className="hidden rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500 hover:text-cyan-300 md:inline-block"
          >
            View Pricing
          </Link>
          <Link
            href="#setup"
            className="rounded-full bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-sm hover:bg-cyan-400"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </header>
  );
}
