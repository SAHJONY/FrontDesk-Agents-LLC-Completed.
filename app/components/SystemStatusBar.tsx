// app/components/SystemStatusBar.tsx

"use client";

import { useEffect, useState } from "react";
import { frontdeskAgentsSystem } from "@/lib/frontdesk_agents_system";

export default function SystemStatusBar() {
  const fallbackMessages = [
    "Optimizing communication channels…",
    "Analyzing call outcomes…",
    "Syncing customer data…"
  ];

  const messages =
    frontdeskAgentsSystem.ui_ux_unification?.system_status_bar
      ?.example_message_cycle ?? fallbackMessages;

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!messages.length) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [messages]);

  const currentMessage = messages[messageIndex] ?? fallbackMessages[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/80 py-2 text-center text-xs text-cyan-300 backdrop-blur">
      {currentMessage}
    </div>
  );
}
