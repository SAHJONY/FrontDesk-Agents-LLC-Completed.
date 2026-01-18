// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Building2,
  Shield,
  Phone,
  MessageSquare,
  BarChart3,
  Users,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  const features = [
    { icon: Phone, title: "AI Voice Agents", description: "Natural conversations that qualify leads and book appointments 24/7" },
    { icon: MessageSquare, title: "Smart Messaging", description: "Automated SMS follow-ups and appointment reminders" },
    { icon: BarChart3, title: "Real-Time Analytics", description: "Deep insights into call performance and conversion rates" },
    { icon: Users, title: "Multi-Location Support", description: "Manage all your locations from one unified dashboard" },
  ];

  const stats = [
    { value: "99.9%", label: "Uptime", icon: Clock },
    { value: "10K+", label: "Calls/Month", icon: Phone },
    { value: "40%", label: "Revenue Increase", icon: TrendingUp },
    { value: "24/7", label: "Always Active", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_50%)]" />
        <motion.div
          className="absolute w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"
          animate={{ x: mousePosition.x - 300, y: mousePosition.y - 300 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase" whileHover={{ scale: 1.05 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles size={24} className="text-sky-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              FrontDesk Agents
            </span>
          </motion.div>

          <div className="flex items-center gap-3">
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-white">
              Pricing
            </Link>
            <Link
              href="/setup"
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm"
            >
              Start 14-Day Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight"
          >
            The AI Workforce for <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Multi-Location Brands
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-3xl mx-auto text-xl text-slate-300 mb-10"
          >
            Deploy AI receptionists, revenue follow-ups, and compliance-safe workflows across every location—without hiring,
            training, or downtime.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link
              href="/setup"
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl inline-flex items-center gap-3"
            >
              Deploy Your Agents <ArrowRight size={24} />
            </Link>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60">
                <div className="flex items-center justify-center gap-2 text-slate-300 text-sm">
                  <s.icon className="w-4 h-4 text-sky-400" />
                  {s.label}
                </div>
                <div className="text-3xl font-black text-white mt-2">{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50"
            >
              <feature.icon className="w-8 h-8 text-sky-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section - Location-Based */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-white"
            >
              Location-Based Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400"
            >
              Scaling infrastructure for your entire footprint
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-3xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm hover:border-sky-500/50 transition-all flex flex-col"
            >
              <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">STARTER</div>
              <div className="text-5xl font-bold text-white mb-1">$299</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-400 mb-6">
                <Building2 size={16} /> 1 Location
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  24/7 AI Receptionist
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Call Summaries & Notes
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Natural Language Intake
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Standard CRM Basics
                </li>
              </ul>
              <Link
                href="/setup?plan=starter"
                className="block w-full py-4 rounded-xl text-center font-bold bg-slate-800 text-white hover:bg-sky-500 hover:text-black transition-all"
              >
                Start Trial
              </Link>
            </motion.div>

            {/* Professional Plan - Most Popular */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-3xl border-2 border-sky-500 bg-sky-500/5 backdrop-blur-sm shadow-2xl shadow-sky-500/20 relative flex flex-col"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">PROFESSIONAL</div>
              <div className="text-5xl font-bold text-white mb-1">$699</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-400 mb-6">
                <Building2 size={16} /> 2–5 Locations
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Multi-staff Scheduling
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Voicemail Transcription
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Advanced Analytics
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  TCPA/DNC Support
                </li>
              </ul>
              <Link
                href="/setup?plan=professional"
                className="block w-full py-4 rounded-xl text-center font-bold bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:shadow-lg hover:shadow-sky-500/50 transition-all"
              >
                Start Trial
              </Link>
            </motion.div>

            {/* Growth Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-3xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm hover:border-purple-500/50 transition-all flex flex-col"
            >
              <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">GROWTH</div>
              <div className="text-5xl font-bold text-white mb-1">$1,299</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-400 mb-6">
                <Building2 size={16} /> 6–15 Locations
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Multi-language Support
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  CRM Connectors
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Audit Logs
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  99.9% SLA
                </li>
              </ul>
              <Link
                href="/setup?plan=growth"
                className="block w-full py-4 rounded-xl text-center font-bold bg-slate-800 text-white hover:bg-sky-500 hover:text-black transition-all"
              >
                Start Trial
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-3xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm hover:border-purple-500/50 transition-all flex flex-col"
            >
              <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">ENTERPRISE</div>
              <div className="text-5xl font-bold text-white mb-1">$2,499</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-400 mb-6">
                <Building2 size={16} /> 16+ Locations
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  White-labeling
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  SSO (SAML) Integration
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  Dedicated Tenant
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <Check size={16} className="text-green-500 mt-1 flex-shrink-0" />
                  99.99% SLA
                </li>
              </ul>
              <Link
                href="/contact?plan=enterprise"
                className="block w-full py-4 rounded-xl text-center font-bold bg-white text-black hover:bg-slate-100 transition-all"
              >
                Schedule Demo
              </Link>
            </motion.div>
          </div>

          {/* Money-back guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">14-day money-back guarantee • Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-xs">© 2026 FrontDesk Agents LLC. All rights reserved.</div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="text-slate-400 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white">
              Terms
            </Link>
            <Link href="/support" className="text-slate-400 hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
