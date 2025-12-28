'use client';

import { useRouter, usePathname } from 'next/navigation';
// Direct relative pathing to bypass TS alias conflicts
import { PRICING_MATRIX } from '../hooks/useMarketPricing';

export default function CurrencySwitcher({ currentRegion }: { currentRegion: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (region: string) => {
    // Ensuring the platform serves any market as a local platform
    document.cookie = `NEXT_LOCALE_OVERRIDE=${region}; path=/; max-age=31536000`;
    router.refresh(); 
  };

  return (
    <div className="flex items-center gap-2 p-1 bg-zinc-900 rounded-full border border-zinc-800">
      {Object.keys(PRICING_MATRIX).map((region) => (
        <button
          key={region}
          onClick={() => handleSwitch(region)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            currentRegion === region 
              ? 'bg-brand-cyan text-black' 
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          {region.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
