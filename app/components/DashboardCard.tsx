// app/components/DashboardCard.tsx
import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "default" | "primary" | "danger" | "outline";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  value?: string | number;
  badgeText?: string;
  badgeTone?: "success" | "warning";
  children?: ReactNode;
  variant?: Variant;
}

export default function DashboardCard({
  title,
  subtitle,
  value,
  badgeText,
  badgeTone = "success",
  children,
  variant = "default",
}: DashboardCardProps) {
  const base =
    "rounded-xl border text-left p-4 sm:p-5 md:p-6 shadow-sm transition hover:shadow-md";

  const variantClasses: Record<Variant, string> = {
    default: "bg-slate-900/70 border-slate-800",
    primary: "bg-sky-900/40 border-sky-700/60",
    danger: "bg-rose-900/30 border-rose-700/60",
    outline: "bg-slate-950/60 border-slate-700",
  };

  const badgeClasses =
    badgeTone === "success"
      ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
      : "bg-amber-500/15 text-amber-300 border border-amber-500/40";

  return (
    <section className={clsx(base, variantClasses[variant])}>
      <header className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h2 className="text-sm font-medium text-slate-100 uppercase tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {badgeText && (
          <span className={`text-[10px] px-2 py-1 rounded-full ${badgeClasses}`}>
            {badgeText}
          </span>
        )}
      </header>

      {value !== undefined && (
        <p className="text-2xl font-semibold text-slate-50 mb-2">{value}</p>
      )}

      {children && <div className="text-sm text-slate-300">{children}</div>}
    </section>
  );
}
