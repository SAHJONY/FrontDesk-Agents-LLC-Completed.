import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero Section - Restored with placeholder for the cinematic image */}
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        {/* Placeholder for the cinematic image */}
        <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
          <span className="text-xl font-semibold text-slate-400">
            Hero Cinematic Image Placeholder
          </span>
        </div>
        
        <div className="relative z-10 text-center p-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            FrontDesk Agents – AI Communications
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Enterprise-grade front desk automation. Turn every call into revenue with human-like AI.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link href="/demo" className="rounded-full bg-sky-500 px-6 py-3 text-lg font-semibold text-slate-950 hover:bg-sky-400 transition">
              See demo
            </Link>
            <Link href="/pricing" className="rounded-full border border-slate-700 px-6 py-3 text-lg font-semibold text-slate-50 hover:bg-slate-800 transition">
              Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Restored with basic structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-white mb-10">
          Features
        </h2>
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-sky-400">24/7 Availability</h3>
            <p className="text-slate-400">Never miss a call or a booking opportunity, even outside business hours.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-sky-400">Bilingual Support</h3>
            <p className="text-slate-400">Seamlessly handle calls in both English and Spanish with native fluency.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
            <h3 className="text-xl font-semibold text-sky-400">CRM Integration</h3>
            <p className="text-slate-400">Connects with your existing systems for a smooth workflow.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
