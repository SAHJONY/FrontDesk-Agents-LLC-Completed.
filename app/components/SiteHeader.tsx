'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Industries', href: '/industries' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Setup', href: '/setup' }
];

export default function SiteHeader() {
  // Normalizamos pathname para evitar null
  const pathnameRaw = usePathname();
  const pathname = pathnameRaw ?? '/';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo + brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 shadow-[0_0_30px_rgba(34,211,238,0.7)]">
            <span className="text-xs font-black text-slate-950">FD</span>
          </div>
          <div className="flex flex-col leading-tight">
            <Link href="/" className="text-sm font-semibold text-slate-50">
              FrontDesk Agents
            </Link>
            <span className="text-[10px] text-slate-400">
              AI Receptionist · Phone OS
            </span>
          </div>
        </div>

        {/* Navegación principal */}
        <nav className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-[0_0_25px_rgba(34,211,238,0.5)]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Lado derecho: toggle + CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/pricing"
            className="hidden rounded-full bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.8)] hover:bg-cyan-400 md:inline-flex"
          >
            View pricing & plans
          </Link>
        </div>
      </div>

      {/* Nav compacto para mobile */}
      <div className="flex gap-2 overflow-x-auto border-t border-slate-900/80 px-4 py-2 text-xs text-slate-300 md:hidden">
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-3 py-1 transition ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                  : 'bg-slate-900/70 text-slate-300 border border-slate-800/80'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
