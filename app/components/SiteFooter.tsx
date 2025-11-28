// components/SiteFooter.tsx
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Brand + summary */}
          <div className="max-w-sm space-y-2">
            <p className="text-sm font-semibold text-slate-100">
              FrontDesk Agents · AI PHONE OS
            </p>
            <p className="text-xs text-slate-400">
              Turn every call, WhatsApp and email into booked revenue in under
              60 seconds. Built for medical, legal, real estate and high-velocity
              B2B teams.
            </p>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-6 text-xs text-slate-400 md:grid-cols-3">
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Product
              </p>
              <ul className="space-y-1">
                <li>
                  <Link href="/industries" className="hover:text-cyan-300">
                    Industries
                  </Link>
                </li>
                <li>
                  <Link href="/app/pricing" className="hover:text-cyan-300">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/setup" className="hover:text-cyan-300">
                    Setup Wizard
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Trust & Compliance
              </p>
              <ul className="space-y-1">
                <li>
                  <Link href="#trust" className="hover:text-cyan-300">
                    SOC 2–Ready
                  </Link>
                </li>
                <li>
                  <span className="cursor-default">
                    GDPR / CCPA–Ready
                  </span>
                </li>
                <li>
                  <span className="cursor-default">
                    Audit Logs & Call Recordings
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Company
              </p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="mailto:sahjonyllc@outlook.com"
                    className="hover:text-cyan-300"
                  >
                    Contact Sales
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+12164804413"
                    className="hover:text-cyan-300"
                  >
                    +1 (216) 480-4413
                  </a>
                </li>
                <li>
                  <span className="cursor-default text-slate-500">
                    Houston, TX · USA
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-900 pt-4 text-[11px] text-slate-500 md:flex-row">
          <p>© {year} FrontDesk Agents LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-cyan-300">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-cyan-300">
              Terms
            </Link>
            <span className="cursor-default">
              SOC 2 Type II–Ready · GDPR-Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
