export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-t-2 border-brand-cyan rounded-full animate-spin mb-4"></div>
      <p className="text-brand-cyan font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">
        Synchronizing Global Node...
      </p>
    </div>
  );
}
