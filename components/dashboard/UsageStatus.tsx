"use client";

import React from "react";

type UsageStatusProps = {
  usedMinutes?: number;
  maxMinutes?: number;
};

export function UsageStatus({ usedMinutes = 0, maxMinutes = 0 }: UsageStatusProps) {
  const pct =
    maxMinutes > 0 ? Math.min(100, Math.round((usedMinutes / maxMinutes) * 100)) : 0;

  const label =
    maxMinutes === 0
      ? "Usage unavailable"
      : pct >= 100
      ? "Limit reached"
      : pct >= 80
      ? "Approaching limit"
      : "Healthy";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-900">Usage</div>
        <div className="text-xs font-semibold text-gray-600">{label}</div>
      </div>

      <div className="text-sm text-gray-700">
        {usedMinutes} / {maxMinutes || "—"} minutes
      </div>

      <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
        <div className="h-2 rounded-full bg-gray-900" style={{ width: `${pct}%` }} />
      </div>

      <div className="text-xs text-gray-500">{pct}%</div>
    </div>
  );
}

export default UsageStatus;
