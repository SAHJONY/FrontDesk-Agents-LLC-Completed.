"use client";

import React from "react";

type Tone = "green" | "blue" | "gray";

const toneClasses: Record<Tone, { border: string; badge: string }> = {
  green: {
    border: "border-emerald-500/60",
    badge: "text-emerald-300",
  },
  blue: {
    border: "border-sky-500/60",
    badge: "text-sky-300",
  },
  gray: {
    border: "border-slate-500/60",
    badge: "text-slate-300",
  },
};

interface DashboardCardProps {
  title: string;
  value: string | number;
  helper?: string;
  badge?: string;
  tone?: Tone;
}

export default function DashboardCard({
  title,
  value,
  helper,
  badge,
  tone = "gray",
}: DashboardCardProps) {
  const t = toneClasses[tone];

  return (
    <div
      className={[
        "card",
        "border",
        t.border,
        "bg-[radial-gradient(circle_at_top,#020617,#020617_55%,#000_100%)]",
      ].join(" ")}
    >
      <div className="card-header">
        <div className="card-title">{title}</div>
        {badge && <span className={["card-pill", t.badge].join(" ")}>{badge}</span>}
      </div>
      <div className="card-value">{value}</div>
      {helper && <div className="card-footer">{helper}</div>}
    </div>
  );
}
