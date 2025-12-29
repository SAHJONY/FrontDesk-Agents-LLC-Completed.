import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-black text-white/5 italic">404</h1>
      <p className="text-brand-cyan font-mono uppercase tracking-[0.5em] -mt-10 mb-8">Node Not Found</p>
      <Link href="/dashboard" className="titan-card hover:border-brand-cyan text-sm font-bold">
        Return to Command Center
      </Link>
    </div>
  );
}
