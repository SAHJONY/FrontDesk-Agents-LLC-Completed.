// app/components/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/demo", label: "Live demo" },
  { href: "/setup", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between py-4">
        {/* Logo + brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-sm font-semibold text-slate-950">
            FD
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              AI Receptionist
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "transition-colors hover:text-slate-50" +
                (pathname === link.href ? " text-slate-50 font-medium" : "")
              }
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="rounded-full bg-sky-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400"
          >
            Get started
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-900/60 p-2 text-slate-100 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden">
          <div className="absolute left-3 right-3 top-3 rounded-2xl bg-slate-900 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-sm font-semibold text-slate-950">
                  FD
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold text-slate-50">
                    FrontDesk Agents
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    AI Receptionist
                  </span>
                </div>
              </Link>
              <button
                type="button"
                className="rounded-full border border-slate-700/80 bg-slate-900/60 p-2 text-slate-100"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={
                    "rounded-xl px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800" +
                    (pathname === link.href
                      ? " bg-slate-800 text-slate-50"
                      : "")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-sky-500 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-sky-400"
              >
                Get started
              </Link>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-slate-600 px-4 py-2 text-center text-sm font-semibold text-slate-100 hover:bg-slate-800"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
