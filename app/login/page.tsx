// app/login/page.tsx
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md space-y-6 rounded-xl border border-slate-800 bg-slate-950/60 p-6">
      <h1 className="text-xl font-semibold text-slate-50">Sign in</h1>
      <p className="text-sm text-slate-300">
        Choose how you want to access FrontDesk Agents. This screen is only a
        visual entry point – your real authentication (Supabase / OAuth) can be
        wired behind these flows later.
      </p>

      <div className="space-y-3">
        <Link
          href="/admin"
          className="block rounded-md bg-sky-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 hover:bg-sky-300"
        >
          Owner / Admin access
        </Link>
        <Link
          href="/dashboard"
          className="block rounded-md border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-slate-100 hover:border-sky-400 hover:text-sky-300"
        >
          Client / Team dashboard
        </Link>
      </div>

      <p className="text-[11px] text-slate-500">
        For production, connect this screen to Supabase auth or your existing
        login provider. For now, it simply routes you to the correct console.
      </p>
    </div>
  );
}
