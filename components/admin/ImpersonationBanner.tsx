'use client';
import { useRouter } from 'next/navigation';

export default function ImpersonationBanner() {
  const router = useRouter();

  const handleExit = async () => {
    const res = await fetch('/api/admin/exit-impersonate', { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      router.refresh(); // Refresh to clear the server-side cookie state
      router.push('/admin/tenants');
    }
  };

  return (
    <div className="sticky top-0 z-[100] bg-indigo-600 text-white py-2 px-4 flex justify-between items-center text-sm font-semibold shadow-lg">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
        <span>Admin View: Impersonating Tenant Account</span>
      </div>
      <button 
        onClick={handleExit}
        className="bg-white/10 hover:bg-white/20 border border-white/30 px-3 py-1 rounded-md transition-all text-xs"
      >
        Exit & Return to Admin
      </button>
    </div>
  );
}
