// components/top-nav.tsx
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-[0.35em] text-sky-400 uppercase">
            FRONTDESK
          </span>
          <span className="hidden text-xs text-slate-400 sm:inline">
            Agents · AI Receptionists
          </span>
        </Link>

        {/* Main nav */}
        <nav className="flex items-center gap-4 text-xs sm:text-sm text-slate-300">
          <Link href="/" className="hover:text-sky-400">
            Home
          </Link>
          <Link href="/demo" className="hover:text-sky-400">
            Demo
          </Link>
          <Link href="/pricing" className="hover:text-sky-400">
            Pricing
          </Link>
          <Link href="/industries" className="hover:text-sky-400">
            Industries
          </Link>
          <Link href="/dashboard" className="hover:text-sky-400">
            Client Dashboard
          </Link>
          <Link href="/owner" className="hover:text-sky-400">
            Owner
          </Link>

          {/* CTA Login / Command Center */}
          <Link
            href="/admin"
            className="rounded-full border border-sky-500 px-3 py-1 text-xs font-semibold text-sky-300 hover:bg-sky-500 hover:text-slate-950 transition-colors"
          >
            Command Center
          </Link>
        </nav>
      </div>
    </header>
  );
}
