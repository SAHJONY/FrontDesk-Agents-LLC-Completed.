"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../providers/LanguageProvider";

const items = [
  { href: "/dashboard", key: "dashboard" },
  { href: "/dashboard/outbound", key: "outbound" },
  { href: "/dashboard/retention", key: "retention" },
  { href: "/settings/numbers", key: "numbers" },
  { href: "/settings/scripts", key: "scripts" },
  { href: "/settings/billing", key: "billing" },
  { href: "/owner", key: "owner" },
  { href: "/support", key: "support" },
];

const labels: Record<string, { en: string; es: string }> = {
  dashboard: { en: "Overview", es: "Resumen" },
  outbound: { en: "Outbound campaigns", es: "Campañas salientes" },
  retention: { en: "Retention & follow-up", es: "Retención y seguimiento" },
  numbers: { en: "Phone numbers", es: "Números telefónicos" },
  scripts: { en: "Call scripts", es: "Guiones de llamadas" },
  billing: { en: "Billing & plans", es: "Facturación y planes" },
  owner: { en: "Owner console", es: "Consola del dueño" },
  support: { en: "Support", es: "Soporte" },
};

export default function SidebarLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { lang } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-56px)] bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-4">
        {/* SIDEBAR */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-sky-500 uppercase">
              {lang === "en" ? "App navigation" : "Navegación de app"}
            </p>
          </div>
          <nav className="flex-1 py-2">
            {items.map((item) => {
              const active = pathname === item.href;
              const label = labels[item.key]?.[lang] ?? item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "mx-2 my-0.5 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                    active
                      ? "bg-sky-500 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
                  ].join(" ")}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500/0 group-data-[active=true]:bg-white" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            {lang === "en"
              ? "AI receptionist coverage 24/7 for every location."
              : "Cobertura con recepcionista IA 24/7 para cada ubicación."}
          </div>
        </aside>

        {/* CONTENIDO */}
        <section className="flex-1">
          {title && (
            <div className="mb-4">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                {title}
              </h1>
            </div>
          )}
          <div className="rounded-2xl border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-900/80 shadow-sm p-4 md:p-6">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
