"use client";

import { useState } from "react";
import Image from "next/image";

type TabId = "dashboard" | "inbox" | "analytics";

const TABS: { id: TabId; label: string }[] = [
  { id: "dashboard", label: "Command Center" },
  { id: "inbox", label: "AI Inbox" },
  { id: "analytics", label: "Revenue & Analytics" },
];

// Importa tus imágenes (asegúrate de que existan en /public/screenshots)
import dashboardImg from "@/public/screenshots/dashboard.png";
import inboxImg from "@/public/screenshots/inbox.png";
import analyticsImg from "@/public/screenshots/analytics.png";

export default function ProductScreenshots() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");

  const screenshots: Record<TabId, any> = {
    dashboard: dashboardImg,
    inbox: inboxImg,
    analytics: analyticsImg,
  };

  return (
    <div className="w-full bg-slate-950/90 rounded-xl border border-slate-800 p-4">
      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm transition ${
              activeTab === tab.id
                ? "bg-cyan-600 text-white"
                : "bg-slate-800 text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Screenshot */}
      <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <Image
          src={screenshots[activeTab]}
          alt="Product Screenshot"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
