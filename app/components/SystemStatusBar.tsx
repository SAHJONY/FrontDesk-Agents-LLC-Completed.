"use client";

import { useEffect, useState } from "react";
import { frontdeskAgentsSystem } from "@/lib/frontdesk_agents_system";

const messages =
  frontdeskAgentsSystem.ui_ux_unification.system_status_bar
    .example_message_cycle;

export default function SystemStatusBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  if (!messages || messages.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/80 py-2 text-center text-xs text-cyan-300 backdrop-blur">
      {messages[index]}
    </div>
  );
}
