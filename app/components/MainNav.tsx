// app/components/MainNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle"; // si no existe, borra esta línea y el componente de abajo

const mainLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/demo", label: "Live Demo" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold">
              FD
            </span>
            <span className="text-sm font-semibold tracking-tight">
              FrontDesk Agents
            </span>
          </Link>
        </div>

        {/* Center: Nav links (desktop) */}
        <nav className="hidden gap-4 text-xs font-medium sm:flex">
          {mainLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-full px-3 py-1 transition " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language + Theme + Auth */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {/* Elimina ThemeToggle si no existe ese componente */}
          <ThemeToggle />

          <Link
            href="/login"
            className="hidden rounded-full border px-3 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default MainNav;
