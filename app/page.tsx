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
  Globe,
  Zap,
  Phone,
  MessageSquare,
  BarChart3,
  Users,
  Star,
  ChevronDown,
  Clock,
  TrendingUp,
} from "lucide-react";

type PricingTier = {
  name: "Starter" | "Professional" | "Growth" | "Enterprise";
  price: string;
  locations: string;
  features: string[];
  popular?: boolean;
};

export default function UltimateLandingPage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted]);

  // If not mounted, return a static skeleton to prevent ReferenceErrors during build/SSR
  if (!mounted) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  // ✅ Official pricing (ONLY)
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$299",
      locations: "1 Location",
      features: ["24/7 AI Receptionist", "Call Summaries & Notes", "Natural Language Intake", "Standard CRM Basics"],
    },
    {
      name: "Professional",
      price: "$699",
      locations: "2–5 Locations",
      features: ["Multi-staff Scheduling", "Voicemail Transcription", "Advanced Analytics", "TCPA/DNC Support"],
      popular: true,
    },
    {
      name: "Growth",
      price: "$1,299",
      locations: "6–15 Locations",
      features: ["Multi-language Support", "CRM Connectors", "Audit Logs", "99.9% SLA"],
    },
    {
      name: "Enterprise",
      price: "$2,499",
      locations: "16+ Locations",
      features: ["White-labeling", "SSO (SAML) Integration", "Dedicated Tenant", "99.99% SLA"],
    },
  ];

  const features = [
    { icon: Phone, title: "AI Voice Agents", description: "Natural conversations that qualify leads and book appointments 24/7" },
    { icon: MessageSquare, title: "Smart Messaging", description: "Automated SMS follow-ups and appointment reminders" },
    { icon: BarChart3, title: "Real-Time Analytics", description: "Deep insights into call performance and conversion rates" },
    { icon: Users, title: "Multi-Location Support", description: "Manage all your locations from one unified dashboard" },
  ];

  const testimonials = [
    { quote: "We've seen a 156% increase in qualified leads. Our sales team can now focus on closing deals.", author: "Sarah Mitchell", role: "VP of Sales, TechCorp", rating: 5 },
    { quote: "The AI agents are indistinguishable from humans. Customer satisfaction up 40%.", author: "James Rodriguez", role: "Operations Director", rating: 5 },
    { quote: "Recovered $2.3M in lost revenue through automated reactivation campaigns.", author: "Emily Chen", role: "CEO, RetailPro", rating: 5 },
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

      <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase" whileHover={{ scale: 1.05 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              <Sparkles size={24} className="text-sky-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">FrontDesk Agents</span>
          </motion.div>
          <Link href="/setup" className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm">
            Start 14-Day Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black mb-8 leading-tight">
            The AI Workforce for <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Multi-Location Brands</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/setup" className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl inline-flex items-center gap-3">
              Deploy Your Agents <ArrowRight size={24} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50">
              <feature.icon className="w-8 h-8 text-sky-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="relative z-10 py-24 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-3xl border ${tier.popular ? "border-sky-500 bg-sky-500/5" : "border-slate-800 bg-slate-950/50"}`}>
              <div className="text-5xl font-bold mb-6">{tier.price}</div>
              <Link href={tier.name === "Enterprise" ? "/support" : "/setup"} className="block w-full py-4 rounded-xl text-center bg-sky-500 text-white font-bold">
                {tier.name === "Enterprise" ? "Contact Sales" : "Start Trial"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-xs">
          © 2026 FrontDesk Agents LLC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
