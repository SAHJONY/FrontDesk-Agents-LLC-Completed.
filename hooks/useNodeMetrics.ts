'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNodeMetrics() {
  const { data, error, mutate } = useSWR('/api/node/metrics', fetcher, {
    refreshInterval: 30000, // Sync every 30 seconds
    revalidateOnFocus: true,
  });

  return {
    metrics: data?.metrics || {
      answeredToday: 0,
      appointmentsBooked: 0,
      estimatedPipeline: 0,
      tier: "Starter",
      usedMins: 0,
      maxMins: 300,
    },
    isLoading: !error && !data,
    isError: error,
    refresh: mutate
  };
}
