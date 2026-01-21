// components/dashboard/UsageStatus.tsx
"use client";

import React from "react";

type Props = {
  minutesUsed?: number;
  minutesIncluded?: number;
  usagePct?: number;
  isOverLimit?: boolean;
};

export default function UsageStatus(props: Props) {
  const minutesUsed = props.minutesUsed ?? 0;
  const minutesIncluded = props.minutesIncluded ?? 0;
  const usagePct = props.usagePct ?? 0;
  const isOverLimit = props.isOverLimit ?? false;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-black uppercase tracking-widest text-zinc-400">
          Usage Status
        </div>
        <div className={`text-[10px] font-black uppercase tracking-widest ${isOverLimit ? "text-red-400" : "text-emerald-400"}`}>
          {isOverLimit ? "Over Limit" : "Active"}
        </div>
      </div>

      <div className="mt-3 text-2xl font-black text-white">
        {minutesUsed.toLocaleString()} / {minutesIncluded.toLocaleString()} mins
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-zinc-900">
        <div
          className="h-2 rounded-full bg-cyan-500"
          style={{ width: `${Math.max(0, Math.min(100, usagePct))}%` }}
        />
      </div>

      <div className="mt-2 text-xs text-zinc-500">
        {Math.round(usagePct)}% used
      </div>
    </div>
  );
}
