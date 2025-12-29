import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="titan-card w-full max-w-md">
        <h2 className="text-3xl font-black italic mb-6">JOIN THE FLEET</h2>
        <div className="space-y-4">
          <input placeholder="Full Name" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl" />
          <input placeholder="Work Email" className="w-full bg-slate-900 border border-white/5 p-4 rounded-xl" />
          <button className="w-full bg-brand-cyan text-black py-4 rounded-xl font-bold uppercase">Create Sovereign Account</button>
        </div>
        <p className="mt-6 text-center text-slate-500 text-xs">
          Already have a node? <Link href="/login" className="text-brand-cyan">Login</Link>
        </p>
      </div>
    </div>
  );
}
