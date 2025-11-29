"use client";

import { useLang } from "./LangProvider";

export default function SiteFooter() {
  const { lang } = useLang();

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-medium text-slate-300">
            © {year} FrontDesk Agents LLC.{" "}
            {lang === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </p>
          <p className="text-[11px] leading-snug">
            {lang === "es"
              ? "Central de mando IA para recepcionistas virtuales 24/7: llamadas, WhatsApp, SMS y email."
              : "AI command center for 24/7 virtual receptionists: calls, WhatsApp, SMS and email."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-[11px]">
          <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
            24/7 AI Receptionist
          </span>
          <span className="rounded-full border border-sky-500/50 bg-sky-500/10 px-2 py-0.5 text-sky-300">
            HIPAA / GDPR ready*
          </span>
          <span className="rounded-full border border-slate-600/80 bg-slate-900/80 px-2 py-0.5 text-slate-300">
            {lang === "es" ? "Panel dueño incluido" : "Owner dashboard included"}
          </span>
        </div>
      </div>
    </footer>
  );
}
