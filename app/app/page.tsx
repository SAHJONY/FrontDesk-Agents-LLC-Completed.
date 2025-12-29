import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 relative z-10">
      <h1 className="text-7xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
        FRONT DESK AGENTS LLC
      </h1>
      <p className="text-slate-400 max-w-2xl text-xl mb-12">
        The world's first autonomous AI receptionist fleet. 
        Local presence, global scale, sovereign control.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link 
          href="/pricing" 
          className="bg-brand-cyan text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-cyan-400 transition-all"
        >
          View Global Pricing
        </Link>
        <Link 
          href="/login" 
          className="border border-slate-700 bg-slate-900/50 backdrop-blur-md px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all"
        >
          Partner Login
        </Link>
      </div>
    </div>
  );
}
