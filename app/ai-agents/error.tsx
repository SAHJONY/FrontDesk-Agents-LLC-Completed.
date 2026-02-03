"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-3xl mx-auto rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
        <h1 className="text-xl font-bold">AI Agents page failed to load</h1>
        <p className="text-sm text-red-200/80 mt-2 break-words">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15"
        >
          Retry
        </button>
      </div>
    </main>
  );
}
