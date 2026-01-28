"use client";

import { useEffect, useState, useCallback } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<AccountMetrics>({
    tier: "Standard",
    usedMins: 0,
    maxMins: 100,
    usagePct: 0,
    isOverLimit: false,
    answeredToday: 0,
    appointmentsBooked: 0,
    estimatedPipeline: 0,
    recentCalls: [],
  });

  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      // Ensure this endpoint is updated to use createClient() from @supabase/ssr
      const res = await fetch("/api/billing", { 
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) throw new Error("Supabase Sync: Protocol logic offline");
      
      const data = await res.json();

      // Mapping Supabase table columns to your UI state
      const usedMins = Number(data?.minutesUsed ?? 0);
      const maxMins = Number(data?.minutesIncluded ?? 100);
      const usagePct = maxMins > 0 ? Math.min(100, (usedMins / maxMins) * 100) : 0;

      setMetrics({
        tier: data?.tier?.toUpperCase() ?? "FREE",
        usedMins,
        maxMins,
        usagePct,
        isOverLimit: maxMins > 0 && usedMins >= maxMins,
        answeredToday: Number(data?.answeredToday ?? 0),
        appointmentsBooked: Number(data?.appointmentsBooked ?? 0),
        estimatedPipeline: Number(data?.estimatedPipeline ?? 0),
        recentCalls: Array.isArray(data?.recentCalls) ? data.recentCalls : [],
      });
    } catch (err) {
      console.warn("⚠️ Dashboard fallback: Redirecting logic to Supabase fallback state.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return { metrics, isLoading, refresh: fetchMetrics };
}
