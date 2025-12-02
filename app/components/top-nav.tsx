// components/top-nav.tsx
import Link from "next/link";

export function TopNav() {
  return (
    <header className="mb-8 border-b border-slate-800 bg-slate-950/80 pb-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between lg:px-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="rounded-md bg-sky-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-400">
              FRONTDESK AGENTS
            </span>
            <span className="text-xs text-slate-400">
              AI Receptionist · Voice · SMS · WhatsApp
            </span>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-slate-300">
          <Link href="/" className="hover:text-sky-400">
            Home
          </Link>
          <Link href="/industries" className="hover:text-sky-400">
            Industries
          </Link>
          <Link href="/pricing" className="hover:text-sky-400">
            Pricing
          </Link>
          <Link href="/demo" className="font-semibold text-sky-400 hover:text-sky-300">
            Book Demo
          </Link>
          <Link href="/setup" className="hover:text-sky-400">
            Client Setup
          </Link>
          <span className="h-4 w-px bg-slate-700" />
          <Link href="/dashboard" className="hover:text-sky-400">
            Dashboard
          </Link>
          <Link href="/admin" className="hover:text-sky-400">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
