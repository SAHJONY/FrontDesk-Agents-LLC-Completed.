// app/components/ProductScreenshots.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type TabId = "dashboard" | "calls" | "industries";

const TABS: { id: TabId; label: string; caption: string }[] = [
  {
    id: "dashboard",
    label: "Owner Command Center",
    caption: "KPIs en tiempo real: llamadas, revenue, AI performance.",
  },
  {
    id: "calls",
    label: "Live Call Intelligence",
    caption: "Escucha, audita y mejora cada llamada en segundos.",
  },
  {
    id: "industries",
    label: "Industry Playbooks",
    caption: "Flujos optimizados para Medicina, Legal, Real Estate y más.",
  },
];

export default function ProductScreenshots() {
  const [active, setActive] = useState<TabId>("dashboard");

  const renderImage = () => {
    switch (active) {
      case "dashboard":
        return (
          <Image
            src="/0E208AAA-D75C-4EE3-A570-8E88DAF84829.png"
            alt="FrontDesk Agents owner dashboard"
            fill
            className="rounded-2xl object-cover"
            sizes="(min-width: 1024px) 900px, 100vw"
            priority
          />
        );
      case "calls":
        return (
          <Image
            src="/0DD5A262-4F4A-48A6-BCA8-B7D106E781EB.png"
            alt="FrontDesk Agents call intelligence view"
            fill
            className="rounded-2xl object-cover"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        );
      case "industries":
      default:
        return (
          <Image
            src="/08E6E2CC-933F-448F-96AA-E2CAC6AC7598.png"
            alt="FrontDesk Agents industry-specific layouts"
            fill
            className="rounded-2xl object-cover"
            sizes="(min-width: 1024px) 900px, 100vw"
          />
        );
    }
  };

  const activeTab = TABS.find((t) => t.id === active);

  return (
    <section className="mx-auto mt-12 max-w-6xl px-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
            PRODUCT EXPERIENCE
          </p>
          <p className="text-sm text-slate-300">
            Así se ve tu Command Center de múltiples millones.
          </p>
        </div>

        <div className="flex gap-1 rounded-full bg-slate-900/70 p-1">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-transparent text-slate-300 hover:text-cyan-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab && (
        <p className="mb-4 text-xs text-slate-400">{activeTab.caption}</p>
      )}

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70">
        {renderImage()}
      </div>
    </section>
  );
}
