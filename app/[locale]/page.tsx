import { headers } from 'next/headers';
import PricingComponent from '@/components/PricingComponent';

export default async function Page() {
  const headerList = await headers();
  const userRegion = headerList.get('x-user-region'); // Injected by middleware.ts

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-10 text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-brand-cyan">
          NEURAL DISPATCH GRID
        </h1>
        <p className="text-zinc-500 mt-4 uppercase tracking-widest text-sm">
          Detected Node: {headerList.get('x-user-city')}, {headerList.get('x-user-country')}
        </p>
      </header>

      {/* Pass the region to the client component */}
      <PricingComponent region={userRegion} />
    </div>
  );
}
