import Link from "next/link";
import PremiumImage from "@/components/PremiumImage"; // Import the new component
// import TopNav from "@/components/top-nav"; // Keep this if you need it

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Assuming you have a TopNav component for a premium look */}
      {/* <TopNav /> */} 
      
      <div className="max-w-7xl mx-auto px-4 pb-24 pt-16 space-y-24">
        
        {/* Premium Hero Section - Enhanced Styling */}
        <section className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div className="space-y-8">
            <p className="inline-flex items-center rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-sm font-semibold tracking-[0.3em] uppercase text-sky-400 shadow-lg">
              24/7 AI Reception · FrontDesk Agents
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Turn every phone call
              <br />
              into booked revenue —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">automatically.</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-xl">
              FrontDesk Agents answers, qualifies, and books your best leads
              24/7 so your team only talks to people ready to buy. No missed
              calls, no lost cases, no “sorry, we&apos;re closed”.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-xl bg-sky-500 px-8 py-4 text-base font-bold text-slate-950 shadow-sky-500/50 shadow-lg hover:bg-sky-400 transition transform hover:scale-[1.02]"
              >
                Book a live demo
              </Link>
              <a
                href="tel:+12164804413"
                className="inline-flex items-center justify-center rounded-xl border-2 border-slate-700 bg-slate-900 px-8 py-4 text-base font-bold text-slate-100 hover:border-sky-500 hover:text-sky-400 transition"
              >
                Call sales · +1 (216) 480-4413
              </a>
            </div>

            <p className="text-sm text-slate-400 max-w-md pt-4">
              Trusted by busy law firms, clinics, and service businesses that
              can&apos;t afford missed calls.
            </p>
          </div>

          {/* Hero image - NOW USING PremiumImage component */}
          <div className="relative w-full aspect-[16/10] rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl shadow-sky-900/50">
            <PremiumImage 
              imageKey="home-hero" 
              className="h-full" // Ensure the container has a height
            />
          </div>
        </section>

        {/* Live dashboard teaser - Enhanced Styling */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-sky-400">
                Live AI Reception Dashboard
              </p>
              <p className="text-lg text-slate-300">
                See calls, bookings, and missed-call savings in real time.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Online · 24/7
            </span>
          </div>
          
          {/* Placeholder for a second, smaller image or a chart */}
          <div className="relative w-full aspect-[16/6] rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
             {/* You can use another PremiumImage here, e.g., imageKey="client-dashboard" */}
             <div className="flex items-center justify-center h-full text-slate-500 text-xl font-medium">
                [Placeholder for Live Dashboard Chart/Screenshot]
             </div>
          </div>
        </section>
      </div>
    </main>
  );
}
