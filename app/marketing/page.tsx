"use client";

// app/marketing/page.tsx
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  Globe,
  Phone,
  Shield,
  Sparkles,
  Zap,
  MessageSquare,
  Users,
  Clock,
  TrendingUp,
} from "lucide-react";

type PricingTier = {
  name: "STARTER" | "PROFESSIONAL" | "GROWTH" | "ENTERPRISE";
  price: string;
  locations: string;
  bullets: string[];
  cta: string;
  href: string;
  popular?: boolean;
};

export default function MarketingPage() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.985]);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Prevent SSR/mismatch issues
  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  // ✅ Official pricing (ONLY)
  const tiers: PricingTier[] = useMemo(
    () => [
      {
        name: "STARTER",
        price: "$299",
        locations: "1 Location",
        bullets: [
          "24/7 AI Receptionist",
          "Call Summaries & Notes",
          "Natural Language Intake",
          "Standard CRM Basics",
        ],
        cta: "Start Trial",
        href: "/setup",
      },
      {
        name: "PROFESSIONAL",
        price: "$699",
        locations: "2–5 Locations",
        bullets: [
          "Multi-staff Scheduling",
          "Voicemail Transcription",
          "Advanced Analytics",
          "TCPA/DNC Support",
        ],
        cta: "Start Trial",
        href: "/setup",
        popular: true,
      },
      {
        name: "GROWTH",
        price: "$1,299",
        locations: "6–15 Locations",
        bullets: [
          "Multi-language Support",
          "CRM Connectors",
          "Audit Logs",
          "99.9% SLA",
        ],
        cta: "Start Trial",
        href: "/setup",
      },
      {
        name: "ENTERPRISE",
        price: "$2,499",
        locations: "16+ Locations",
        bullets: [
          "White-labeling",
          "SSO (SAML) Integration",
          "Dedicated Tenant",
          "99.99% SLA",
        ],
        cta: "Schedule Demo",
        href: "/support",
      },
    ],
    []
  );

  const valueCards = [
    {
      icon: Phone,
      title: "Never Miss a Call",
      desc: "AI answers on the first ring, 24/7—captures every lead and books appointments.",
    },
    {
      icon: MessageSquare,
      title: "Smart Follow-Ups",
      desc: "Automated SMS confirmations, reminders, and reactivation campaigns to recover revenue.",
    },
    {
      icon: BarChart3,
      title: "Executive Analytics",
      desc: "Live dashboards for call volume, conversion, and revenue impact across all locations.",
    },
    {
      icon: Users,
      title: "Multi-Location Control",
      desc: "Centralized settings, scripts, and routing rules for your entire footprint.",
    },
  ] as const;

  const proofStats = [
    { icon: Clock, value: "99.9%", label: "Uptime target" },
    { icon: TrendingUp, value: "40%+", label: "Revenue lift potential" },
    { icon: Zap, value: "24/7", label: "Always-on coverage" },
    { icon: Globe, value: "Multi-site", label: "Built for scale" },
  ] as const;

  const faqs = [
    {
      q: "Will this replace my team?",
      a: "No. It handles inbound capture, intake, scheduling, and follow-ups—so your staff focuses on high-value work.",
    },
    {
      q: "How fast can we go live?",
      a: "Typical setup is same-day. You connect numbers/calendars, set business rules, and deploy scripts.",
    },
    {
      q: "Does it support TCPA/DNC workflows?",
      a: "Yes. We support opt-in workflows, quiet hours, and compliance-friendly messaging patterns.",
    },
    {
      q: "Can we integrate with our CRM?",
      a: "Yes. Growth+ supports CRM connectors. Starter includes standard CRM basics (logging + contact records).",
    },
  ] as const;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-50">
      {/* Premium background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.10),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(56,189,248,0.10),transparent_45%)]" />
        <motion.div
          className="absolute w-[720px] h-[720px] rounded-full blur-[140px] bg-amber-400/10"
          animate={{ x: mouse.x - 360, y: mouse.y - 360 }}
          transition={{ type: "spring", stiffness: 80, damping: 40 }}
        />
        <div className="absolute inset-0 opacity-35 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.85),rgba(2,6,23,0.92),rgba(2,6,23,1))]" />
      </div>

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-slate-800/70 bg-slate-900/40 p-2">
              <Sparkles className="text-amber-300" size={18} />
            </div>
            <div className="leading-tight">
              <div className="font-black tracking-tight uppercase">
                FrontDesk Agents
              </div>
              <div className="text-[11px] text-slate-400">
                Global Revenue Workforce
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="hidden md:inline-flex text-sm text-slate-300 hover:text-white"
            >
              Pricing
            </Link>
            <Link
              href="/features"
              className="hidden md:inline-flex text-sm text-slate-300 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 text-slate-950 px-4 py-2 text-sm font-black hover:bg-amber-300"
            >
              Start Trial <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-14">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-xs text-slate-200">
                  <Shield size={14} className="text-amber-300" />
                  Enterprise-grade AI reception + revenue ops
                </div>

                <h1 className="mt-6 text-5xl md:text-6xl font-black leading-[1.05] tracking-tight">
                  The AI Workforce for{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-sky-300 bg-clip-text text-transparent">
                    Multi-Location Brands
                  </span>
                </h1>

                <p className="mt-5 text-slate-300 text-lg leading-relaxed max-w-xl">
                  Capture every inbound lead, qualify intent, book appointments, and
                  drive follow-ups automatically—so you grow revenue without adding headcount.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/setup"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 font-black text-slate-950 hover:bg-amber-300"
                  >
                    Deploy Your Agents <ArrowRight size={18} />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-900/40 px-6 py-4 font-bold text-slate-200 hover:bg-slate-900/60"
                  >
                    View Demo
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {proofStats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-4"
                    >
                      <s.icon className="text-amber-300" size={18} />
                      <div className="mt-2 text-xl font-black">{s.value}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cinematic image block */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/15 via-sky-400/10 to-purple-500/10 blur-2xl" />
                <div className="relative rounded-3xl border border-slate-800/70 bg-slate-900/25 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(2,6,23,0.75))]" />
                  <img
                    src="/marketing/hero-building.png"
                    alt="FrontDesk Agents — Premium Operations"
                    className="w-full h-[420px] object-cover"
                    loading="eager"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/60 border border-slate-800/60 px-4 py-2 text-xs text-slate-200 backdrop-blur">
                      <Building2 size={14} className="text-amber-300" />
                      Fortune-500 design. Built to scale.
                    </div>
                    <div className="mt-3 text-sm text-slate-300">
                      Multi-location routing • Scheduling logic • Compliance support • Audit logs
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-800/60 bg-slate-900/25 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold">14-day money-back guarantee</div>
                    <div className="text-xs text-slate-400">Cancel anytime • Upgrade as you scale</div>
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs text-slate-300">
                    <Zap size={14} className="text-amber-300" />
                    Fast go-live
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUE */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Enterprise-grade capabilities, operator-simple workflows
              </h2>
              <p className="mt-3 text-slate-300 max-w-2xl">
                Designed for owners and operators: predictable performance, clean reporting, and scalable controls.
              </p>
            </div>
            <Link
              href="/setup"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-800/70 bg-slate-900/35 px-5 py-3 text-sm font-bold text-slate-200 hover:bg-slate-900/55"
            >
              Start Trial <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {valueCards.map((c) => (
              <div
                key={c.title}
                className="rounded-3xl border border-slate-800/60 bg-slate-900/25 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-3">
                    <c.icon className="text-amber-300" size={18} />
                  </div>
                  <div className="font-black">{c.title}</div>
                </div>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">{c.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                  <Check size={14} className="text-sky-300" />
                  Live-ready • measurable impact
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-slate-800/60 bg-slate-900/20 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8">
                <div className="text-xs text-slate-400">How it works</div>
                <h3 className="mt-2 text-2xl font-black">
                  Deploy in 3 steps
                </h3>
                <ol className="mt-6 space-y-4 text-slate-300">
                  <li className="flex gap-3">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-sm">
                      1
                    </div>
                    <div>
                      <div className="font-bold">Connect systems</div>
                      <div className="text-sm text-slate-400">Phone numbers, calendars, and routing rules.</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-sm">
                      2
                    </div>
                    <div>
                      <div className="font-bold">Configure logic</div>
                      <div className="text-sm text-slate-400">Services, hours, policies, and scripts.</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 h-7 w-7 flex items-center justify-center rounded-full bg-amber-400 text-slate-950 font-black text-sm">
                      3
                    </div>
                    <div>
                      <div className="font-bold">Go live</div>
                      <div className="text-sm text-slate-400">AI answers, books, logs, and follows up automatically.</div>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(2,6,23,0.2),rgba(2,6,23,0.9))]" />
                <img
                  src="/marketing/office-glass.png"
                  alt="Premium business environment"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative z-10 py-16 bg-slate-900/20 border-y border-slate-800/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-xs text-slate-200">
              <Globe size={14} className="text-amber-300" />
              Location-based pricing
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-black tracking-tight">
              Scaling infrastructure for your entire footprint
            </h2>
            <p className="mt-3 text-slate-300">
              14-day money-back guarantee • Cancel anytime
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={[
                  "rounded-3xl border p-6 bg-slate-950/50",
                  t.popular
                    ? "border-amber-400/70 bg-amber-400/5"
                    : "border-slate-800/60",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400">{t.name}</div>
                  {t.popular && (
                    <div className="text-[10px] font-black tracking-wide rounded-full bg-amber-400 text-slate-950 px-3 py-1">
                      MOST POPULAR
                    </div>
                  )}
                </div>

                <div className="mt-3 text-4xl font-black">{t.price}</div>
                <div className="mt-1 text-sm text-slate-300">{t.locations}</div>

                <ul className="mt-5 space-y-2 text-sm text-slate-300">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <Check size={16} className="mt-0.5 text-sky-300" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={t.href}
                  className={[
                    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-black",
                    t.popular
                      ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                      : "bg-slate-900/40 border border-slate-800/70 text-slate-100 hover:bg-slate-900/60",
                  ].join(" ")}
                >
                  {t.cta} <ArrowRight size={16} />
                </Link>

                <div className="mt-3 text-[11px] text-slate-500 text-center">
                  Cancel anytime
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-6 items-start">
          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/20 p-8">
            <div className="text-xs text-slate-400">FAQs</div>
            <h3 className="mt-2 text-2xl font-black">Answer the objections before they happen</h3>
            <div className="mt-6 space-y-5">
              {faqs.map((f) => (
                <div key={f.q}>
                  <div className="font-bold">{f.q}</div>
                  <div className="mt-1 text-sm text-slate-300 leading-relaxed">{f.a}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800/60 bg-slate-900/20 p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/40 px-4 py-2 text-xs text-slate-200">
              <Shield size={14} className="text-amber-300" />
              Designed for trust and performance
            </div>
            <h3 className="mt-4 text-3xl font-black leading-tight">
              Ready to capture more revenue this week?
            </h3>
            <p className="mt-3 text-slate-300">
              Deploy the AI Receptionist + Revenue Workforce and scale across locations with confidence.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 font-black text-slate-950 hover:bg-amber-300"
              >
                Start Trial <ArrowRight size={18} />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-900/40 px-6 py-4 font-bold text-slate-200 hover:bg-slate-900/60"
              >
                Talk to Sales
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-slate-400">
              <div className="rounded-2xl border border-slate-800/60 bg-slate-950/30 p-4">
                <div className="font-bold text-slate-200">Public page</div>
                <div className="mt-1">Does not require login</div>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-slate-950/30 p-4">
                <div className="font-bold text-slate-200">Campaign-ready</div>
                <div className="mt-1">Built for ads & conversion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-slate-950/60">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link className="text-slate-400 hover:text-white" href="/privacy">
              Privacy
            </Link>
            <Link className="text-slate-400 hover:text-white" href="/terms">
              Terms
            </Link>
            <Link className="text-slate-400 hover:text-white" href="/support">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
                    }
