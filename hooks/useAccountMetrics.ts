// hooks/useAccountMetrics.ts
"use client";

import { useEffect, useState } from "react";

export type AccountMetrics = {
  minutesUsed: number;
  minutesIncluded: number;
  usagePct: number; // 0..100
  isOverLimit: boolean;
};

export function useAccountMetrics() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<AccountMetrics>({
    minutesUsed: 0,
    minutesIncluded: 0,
    usagePct: 0,
    isOverLimit: false,
  });

  useEffect(() => {
    // Minimal safe client-side fetch.
    // If your API exists, wire it. If not, this keeps build stable.
    const run = async () => {
      try {
        const res = await fetch("/api/billing", { cache: "no-store" });
        if (!res.ok) throw new Error("billing api not ready");
        const data = await res.json();

        const minutesUsed = Number(data?.minutesUsed ?? 0);
        const minutesIncluded = Number(data?.minutesIncluded ?? 0);
        const usagePct =
          minutesIncluded > 0 ? Math.min(100, (minutesUsed / minutesIncluded) * 100) : 0;

        setMetrics({
          minutesUsed,
          minutesIncluded,
          usagePct,
          isOverLimit: minutesIncluded > 0 && minutesUsed >= minutesIncluded,
        });
      } catch {
        // Keep safe defaults
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return { loading, metrics };
}
