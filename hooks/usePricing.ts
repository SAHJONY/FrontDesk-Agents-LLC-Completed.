'use client';

import { useState, useEffect } from 'react';
import { getAdjustedPricing, PricingPlan } from '@/services/pricing';
import { getRegionFromCountry } from '@/lib/geo';

export function usePricing() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [region, setRegion] = useState('WESTERN');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detectRegion() {
      try {
        // Fast IP check
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const detectedRegion = getRegionFromCountry(data.country_code);
        
        setRegion(detectedRegion);
        setPlans(getAdjustedPricing(detectedRegion));
      } catch (error) {
        console.error("Geo-detection failed, defaulting to Western pricing.");
        setPlans(getAdjustedPricing('WESTERN'));
      } finally {
        setLoading(false);
      }
    }
    detectRegion();
  }, []);

  return { plans, region, loading };
}
