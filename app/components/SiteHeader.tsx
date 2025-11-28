// components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/#industries", label: "Industrias" },
  { href: "/#features", label: "Características" },
  { href: "/pricing", label: "Precios" },
  { href: "/#contact", label: "Contacto" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 ring-1 ring-cyan-400/40">
            <span className="text-sm font-semibold text-cyan-300">FD</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-cyan-400/80">
              AI PHONE OS
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-cyan-300 ${
                  isActive ? "text-cyan-300" : "text-slate-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/setup"
            className="rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-slate-950 shadow-sm shadow-cyan-500/40 hover:bg-cyan-400"
          >
            Iniciar demo guiada
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-1.5 text-slate-200 hover:bg-slate-900 hover:text-cyan-300"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/setup"
              className="mt-2 rounded-full bg-cyan-500 px-4 py-1.5 text-center text-sm font-semibold text-slate-950 shadow-sm shadow-cyan-500/40 hover:bg-cyan-400"
              onClick={() => setOpen(false)}
            >
              Iniciar demo guiada
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
