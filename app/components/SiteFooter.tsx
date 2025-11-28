// app/components/SiteFooter.tsx
export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/90 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        FrontDesk Agents LLC · Autonomous AI Phone OS · © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
