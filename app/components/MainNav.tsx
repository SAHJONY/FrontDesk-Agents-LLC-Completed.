"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

type MainNavItem = {
  href: string;
  label: string;
};

const DEFAULT_ITEMS: MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/pricing", label: "Pricing" },
  { href: "/signup", label: "Sign up" },
];

type MainNavProps = React.HTMLAttributes<HTMLElement> & {
  items?: MainNavItem[];
  brandName?: string;
};

export default function MainNav({
  className,
  items,
  brandName = "FrontDesk Agents",
  ...rest
}: MainNavProps) {
  const pathname = usePathname();
  const navItems = items ?? DEFAULT_ITEMS;

  return (
    <nav
      className={`flex items-center justify-between gap-6 py-3 px-4 md:px-8 ${className ?? ""}`}
      {...rest}
    >
      {/* LOGO / BRAND */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold">
            FD
          </span>
          <span className="text-base md:text-lg font-semibold tracking-tight">
            {brandName}
          </span>
        </Link>
      </div>

      {/* NAV LINKS + LANGUAGE SWITCHER */}
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "text-sm font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Language switcher (ES / EN) */}
        <LanguageSwitcher />

        {/* CTA principal */}
        <Link
          href="/signup"
          className="hidden md:inline-flex items-center rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
