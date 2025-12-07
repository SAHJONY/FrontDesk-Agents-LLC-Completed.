// components/top-nav.tsx
"use client";  

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/demo", label: "Demo" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function IconMenu() {
  return <span className="text-xl leading-none">☰</span>;
}

function IconClose() {
  return <span className="text-xl leading-none">✕</span>;
}

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo / badge */}
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950">
            24/7 AI Reception • FrontDesk Agents
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                isActive(pathname, link.href)
                  ? "text-slate-50"
                  : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/pricing"
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Book a live demo
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-slate-50"
          >
            Log in
          </Link>

          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-50"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-b border-slate-800/60 bg-slate-950/95 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(pathname, link.href)
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-200 hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-cyan-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-cyan-400"
            >
              Book a live demo
            </Link>

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-1 text-center text-sm font-medium text-slate-300 hover:text-slate-50"
            >
              Log in
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
