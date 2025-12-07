"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/demo", label: "Demo" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname?.startsWith(href);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-sky-500 text-xs font-bold text-slate-950">
            FD
          </span>
          <span className="hidden sm:inline">
            FrontDesk Agents
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "transition-colors " +
                (isActive(link.href)
                  ? "text-sky-400"
                  : "text-slate-300 hover:text-white")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+12164804413"
            className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-sky-500 transition"
          >
            Call sales · (216) 480-4413
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-100 hover:border-sky-500 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {open ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95">
          <div className="mx-auto max-w-6xl px-4 py-3 space-y-1 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className={
                  "block rounded-xl px-3 py-2 " +
                  (isActive(link.href)
                    ? "bg-slate-900 text-sky-400"
                    : "text-slate-200 hover:bg-slate-900")
                }
              >
                {link.label}
              </Link>
            ))}

            <a
              href="tel:+12164804413"
              onClick={close}
              className="mt-2 block rounded-xl bg-sky-500 px-3 py-2 text-center text-xs font-semibold text-slate-950 hover:bg-sky-400"
            >
              Call sales · (216) 480-4413
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
