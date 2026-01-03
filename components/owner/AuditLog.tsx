"use client";

import React from "react";
import { Terminal } from "lucide-react";

export default function AuditLog() {
  return (
    <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 backdrop-blur-xl flex flex-col items-center justify-center min-h-[300px] text-center">
      <div className="p-4 bg-zinc-800/50 rounded-full mb-6">
        <Terminal className="w-8 h-8 text-zinc-600" />
      </div>
      <h2 className="text-white font-black text-xs uppercase tracking-[0.4em] mb-2">Audit Log Ready</h2>
      <p className="text-zinc-500 text-[10px] font-medium uppercase tracking-widest max-w-xs">
        Establishing secure telemetry stream for pdx1 node...
      </p>
    </div>
  );
}
