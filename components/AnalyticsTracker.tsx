// components/AnalyticsTracker.tsx
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Placeholder for Google Analytics and Event Tracking
// In production, the actual GA/GTM code would be injected here.
const trackingId = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

const trackPageView = (url: string) => {
  if (trackingId) {
    console.log(`[ANALYTICS] PageView tracked: ${url}`);
    // Example: window.gtag('config', trackingId, { page_path: url });
  }
};

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // This hook runs on every page change (client-side navigation)
    trackPageView(pathname);
    
    // Setup event listeners for click tracking on CTAs
    const setupEventTracking = () => {
        document.querySelectorAll('.btn-primary-premium, .btn-secondary-premium').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.currentTarget as HTMLElement;
                const action = target.textContent || 'Click';
                console.log(`[ANALYTICS] Event tracked: CTA_Click - ${action}`);
                // Example: window.gtag('event', 'CTA_Click', { 'event_label': action });
            });
        });
    };
    
    setupEventTracking();
    // Re-run setup if the DOM changes dynamically (e.g., modals, though better handled locally)
    return () => {
        // Cleanup event listeners if needed
    };
  }, [pathname]);

  return null;
}
