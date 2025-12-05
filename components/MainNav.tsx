// components/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/pricing", label: "Precios" },
  { href: "/demo", label: "Demo en vivo" },
  { href: "/industries", label: "Industrias" },
  { href: "/setup", label: "Onboarding" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
];

function NavItem({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
        isActive
          ? "bg-sky-500 text-slate-950"
          : "text-slate-200 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-sky-500" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide text-slate-100">
              FrontDesk Agents
            </span>
            <span className="text-xs text-slate-400">
              AI Phone Receptionists 24/7
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
            />
          ))}
        </nav>

        {/* Placeholder para botón de acción (ej: Login) */}
        <div className="hidden md:flex">
          <Link
            href="/demo"
            className="rounded-md bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-400"
          >
            Agenda una demo
          </Link>
        </div>

        {/* En mobile por ahora solo logo (si quieres luego metemos menú hamburguesa) */}
        <div className="md:hidden" />
      </div>
    </header>
  );
}
