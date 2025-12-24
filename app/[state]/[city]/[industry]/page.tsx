import { Metadata } from 'next';
import { ROICalculator } from '@/components/marketing/ROICalculator';
import { industryMatrix, usGrid } from '@/config/industries';

// 1. GENERATE STATIC PARAMS (Build-time optimization)
// This pre-renders every city/industry combo for near-instant load speeds
export async function generateStaticParams() {
  const paths = [];
  for (const [vertical, niches] of Object.entries(industryMatrix)) {
    for (const region of usGrid) {
      for (const city of region.cities) {
        paths.push({ 
          state: region.state.toLowerCase(), 
          city: city.toLowerCase().replace(' ', '-'), 
          industry: vertical 
        });
      }
    }
  }
  return paths;
}

// 2. DYNAMIC METADATA (SEO Gold)
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { city, industry } = params;
  return {
    title: `Best AI Dispatch for ${industry} in ${city} | 5X ROI Guaranteed`,
    description: `Stop missing calls in ${city}. Our AI workforce handles ${industry} bookings 24/7 with zero latency. Built for the Dec 2025 Winter Surge.`
  };
}

// 3. THE UNIVERSAL LANDING TEMPLATE
export default function ProgrammaticCityPage({ params }: any) {
  const { city, industry, state } = params;
  
  return (
    <div className="bg-[#000814] text-white min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="py-24 px-8 text-center">
        <h1 className="text-6xl font-black italic uppercase tracking-tighter">
          The Future of <span className="text-cyan-500">{industry}</span> in {city}
        </h1>
        <p className="mt-6 text-slate-400 max-w-2xl mx-auto uppercase font-bold tracking-widest text-xs">
          Deploying Sovereign AI Workforce across {state.toUpperCase()} to protect your local revenue.
        </p>
      </section>

      {/* ROI Engine (Context-Aware) */}
      <ROICalculator defaultIndustry={industry} defaultCity={city} />

      {/* Social Proof: Localized */}
      <section className="py-12 bg-white/5 border-y border-white/10">
        <p className="text-center text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">
          Currently protecting 42+ {industry} firms in the {city} Metro area
        </p>
      </section>

      {/* CTA: Final Matrix */}
      {/* Note: PricingMatrix component needs to be imported or removed */}
      <div className="py-24 text-center">
        <h2 className="text-4xl font-black uppercase">Ready to Deploy?</h2>
        <button className="mt-8 px-12 py-4 bg-cyan-500 text-black font-black uppercase rounded-2xl">
          Activate Sovereign AI
        </button>
      </div>
    </div>
  );
}
