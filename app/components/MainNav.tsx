// app/components/MainNav.tsx
"use client";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();

  const isMarketing = [
    "/",
    "/demo",
    "/pricing",
    "/industries",
    "/support",
  ].includes(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-900 font-black">
            FD
          </div>
          <span className="text-sm font-semibold text-slate-100">
            FrontDesk Agents
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {isMarketing && (
            <>
              <Link
                href="/pricing"
                className="hidden text-xs font-medium text-slate-300 hover:text-white sm:inline-block"
              >
                Pricing
              </Link>
              <Link
                href="/demo"
                className="hidden text-xs font-medium text-slate-300 hover:text-white sm:inline-block"
              >
                Live demo
              </Link>
            </>
          )}

          <LanguageSwitcher />

          <Link
            href="/login"
            className="hidden rounded-lg border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-100 hover:bg-slate-900 sm:inline-block"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
