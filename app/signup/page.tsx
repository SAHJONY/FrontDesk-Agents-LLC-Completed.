import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl space-y-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-sky-400">
            Get started
          </p>
          <h1 className="mt-3 text-2xl font-semibold">
            Create your FrontDesk Agents account
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Start with your first AI receptionist and upgrade as call volume
            grows.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Work email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Create account
          </button>
        </form>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="font-semibold text-sky-400 hover:text-sky-300"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
