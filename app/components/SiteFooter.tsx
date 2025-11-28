// app/components/SiteFooter.tsx
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-slate-300">
            FrontDesk Agents LLC · AI Receptionist Command Center
          </p>
          <p className="text-[11px]">
            Convierte cada llamada, WhatsApp y email en ingresos reservados en
            menos de 60 segundos.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/pricing" className="hover:text-cyan-300">
            Pricing
          </Link>
          <Link href="/industries" className="hover:text-cyan-300">
            Industrias
          </Link>
          <Link href="/setup" className="hover:text-cyan-300">
            Onboarding
          </Link>
          <Link href="/admin" className="hover:text-cyan-300">
            Owner Admin
          </Link>
          <span className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} FrontDesk Agents LLC. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
