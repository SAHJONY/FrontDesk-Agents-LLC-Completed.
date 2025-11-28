// app/components/ProductScreenshots.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type TabId = "dashboard" | "inbox" | "analytics";

interface TabConfig {
  id: TabId;
  label: string;
  description: string;
  image: string;
}

const TABS: TabConfig[] = [
  {
    id: "dashboard",
    label: "Command Center",
    description:
      "Vista general en tiempo real: llamadas, WhatsApps y emails en una sola pantalla.",
    image: "/images/product/dashboard-preview.png",
  },
  {
    id: "inbox",
    label: "AI Inbox",
    description:
      "Cada interacción clasificada, resumida y lista para responder o escalar.",
    image: "/images/product/inbox-preview.png",
  },
  {
    id: "analytics",
    label: "Revenue & Analytics",
    description:
      "Métricas de ingresos, tasa de respuesta y conversión de llamadas a citas.",
    image: "/images/product/analytics-preview.png",
  },
];

export default function ProductScreenshots() {
  const [active, setActive] = useState<TabId>("dashboard");

  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <section className="w-full rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-[0_0_40px_rgba(15,23,42,0.8)] overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800/80 px-4 pt-3 pb-2 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs md:text-sm font-medium transition ${
              tab.id === active
                ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screenshot + description */}
      <div className="grid md:grid-cols-[1.7fr_1fr] gap-4 p-4 md:p-6 items-center">
        <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900">
          <Image
            src={activeTab.image}
            alt={activeTab.label}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3">
          <p className="uppercase text-[11px] tracking-wide text-cyan-300">
            FRONTDESK AGENTS · PREVIEW
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-slate-50">
            {activeTab.label}
          </h3>
          <p className="text-sm text-slate-300">{activeTab.description}</p>
          <p className="text-xs text-slate-500">
            *Las capturas son ilustrativas. La aplicación real se adapta a tu
            idioma, marca y flujos de negocio.
          </p>
        </div>
      </div>
    </section>
  );
}
