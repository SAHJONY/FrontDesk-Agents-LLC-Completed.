"use client";

import { useEffect, useState } from "react";

export type AccountMetrics = {
  tier: string;
  usedMins: number;
  maxMins: number;
  usagePct: number;
  isOverLimit: boolean;
  answeredToday: number;
  appointmentsBooked: number;
  estimatedPipeline: number;
  recentCalls: any[];
};

export function useAccountMetrics() {
  const [isLoading, setIsLoading] = useState(true); // Renamed to match your Dashboard component
  const [metrics, setMetrics] = useState<AccountMetrics>({
    tier: "PRO",
    usedMins: 0,
    maxMins: 0,
    usagePct: 0,
    isOverLimit: false,
    answeredToday: 0,
    appointmentsBooked: 0,
    estimatedPipeline: 0,
    recentCalls: [],
  });

  useEffect(() => {
    const run = async () => {
      try {
        // Fetch from your billing/dashboard API
        const res = await fetch("/api/billing", { cache: "no-store" });
        if (!res.ok) throw new Error("API not ready");
        const data = await res.json();

        const usedMins = Number(data?.minutesUsed ?? 0);
        const maxMins = Number(data?.minutesIncluded ?? 1000);
        const usagePct = maxMins > 0 ? Math.min(100, (usedMins / maxMins) * 100) : 0;

        setMetrics({
          tier: data?.tier ?? "Standard",
          usedMins,
          maxMins,
          usagePct,
          isOverLimit: maxMins > 0 && usedMins >= maxMins,
          answeredToday: data?.answeredToday ?? 0,
          appointmentsBooked: data?.appointmentsBooked ?? 0,
          estimatedPipeline: data?.estimatedPipeline ?? 0,
          recentCalls: data?.recentCalls ?? [],
        });
      } catch (err) {
        console.warn("Using fallback metrics: Protocol sync in progress...");
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, []);

  return { metrics, isLoading };
}
