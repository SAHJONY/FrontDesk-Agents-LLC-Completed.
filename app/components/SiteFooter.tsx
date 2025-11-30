export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} FrontDesk Agents LLC — All rights reserved.
      </div>
    </footer>
  );
}
