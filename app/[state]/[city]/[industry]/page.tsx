import { Metadata } from 'next';
import { ROICalculator } from '@/components/marketing/ROICalculator';
import { industryMatrix, usGrid } from '@/config/industries';

// 1. GENERATE STATIC PARAMS (Build-time optimization)
export async function generateStaticParams() {
  const paths = [];
  for (const [vertical] of Object.entries(industryMatrix)) {
    for (const region of usGrid) {
      for (const city of region.cities) {
        paths.push({ 
          state: region.state.toLowerCase(), 
          city: city.toLowerCase().replace(/\s+/g, '-'), 
          industry: vertical 
        });
      }
    }
  }
  return paths;
}

// 2. DYNAMIC METADATA (Awaited for Next.js 15 compliance)
export async function generateMetadata({ params }: { params: Promise<{ city: string, industry: string }> }): Promise<Metadata> {
  const { city, industry } = await params;
  const decodedCity = city.replace(/-/g, ' ');
  
  return {
    title: `Best AI Dispatch for ${industry} in ${decodedCity} | 5X ROI Guaranteed`,
    description: `Stop missing calls in ${decodedCity}. Our AI workforce handles ${industry} bookings 24/7. Built for the Dec 2025 Winter Surge.`
  };
}

// 3. THE UNIVERSAL LANDING TEMPLATE
export default async function ProgrammaticCityPage({ params }: { params: Promise<{ city: string, industry: string, state: string }> }) {
  // Awaiting params is REQUIRED in Next.js 15
  const { city, industry, state } = await params;
  const decodedCity = city.replace(/-/g, ' ');

  return (
    <div className="bg-[#000814] text-white min-h-screen font-sans">
      {/* Dynamic Hero Section */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter">
          The Future of <span className="text-cyan-500">{industry}</span> in <span className="capitalize">{decodedCity}</span>
        </h1>
        <p className="mt-6 text-slate-400 max-w-2xl mx-auto uppercase font-bold tracking-widest text-xs">
          Deploying Sovereign AI Workforce across {state.toUpperCase()} to protect your local revenue.
        </p>
      </section>

      {/* ROI Engine (Context-Aware) */}
      <ROICalculator />

      {/* Localized Social Proof */}
      <section className="py-12 bg-white/5 border-y border-white/10">
        <p className="text-center text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">
          Currently protecting 42+ {industry} firms in the {decodedCity} area
        </p>
      </section>

      {/* CTA: Final Matrix */}
      <div className="py-24 text-center">
        <h2 className="text-4xl font-black uppercase">Ready to Deploy?</h2>
        <button className="mt-8 px-12 py-4 bg-cyan-500 text-black font-black uppercase rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          Activate Sovereign AI
        </button>
      </div>
    </div>
  );
}
