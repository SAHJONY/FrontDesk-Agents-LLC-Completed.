// app/demo/page.tsx

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">
        <p className="inline-flex rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-sky-300">
          Live demo • FrontDesk Agents
        </p>

        <h1 className="text-2xl sm:text-3xl font-semibold">
          Live demo placeholder
        </h1>

        <p className="text-sm text-slate-300">
          Use this page later to embed your call widgets, calendar, or product
          tour. For now it is just a safe demo placeholder.
        </p>

        <div className="mt-4 flex justify-center gap-4">
          <button className="rounded-full border border-sky-500 bg-sky-500/10 px-5 py-2 text-sm font-medium text-sky-200">
            English
          </button>
          <button className="rounded-full border border-slate-600 px-5 py-2 text-sm font-medium text-slate-100">
            Español
          </button>
        </div>
      </div>
    </main>
  );
}
