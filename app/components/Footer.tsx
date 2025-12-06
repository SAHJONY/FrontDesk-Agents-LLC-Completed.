import React from "react";
import Link from "next/link";

const FooterBase: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:text-sm">
        <div className="flex flex-col gap-1">
          <span>
            © {year} FrontDesk Agents LLC · All rights reserved.
          </span>
          <span className="text-[11px] text-slate-500">
            24/7 AI Receptionists · Inbound & Outbound Calls · HIPAA-ready
            workflows (configurable).
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/terms"
            className="hover:text-slate-200 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-200 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="https://www.frontdeskagents.com"
            className="hover:text-slate-200 transition-colors"
          >
            Website
          </Link>
        </div>
      </div>
    </footer>
  );
};

// Default export (lo que pide layout.tsx)
export default FooterBase;

// Export nombrado por si en algún sitio usan `import { Footer } from ...`
export const Footer = FooterBase;
