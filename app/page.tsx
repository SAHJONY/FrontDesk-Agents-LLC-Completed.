"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Check,
  Shield,
  Phone,
  Clock,
  TrendingUp,
  Zap,
  Globe,
  Cpu,
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-brand-ink" />;

  const features = [
    {
      icon: Cpu,
      title: "Autonomous Nodes",
      description:
        "Dedicated AI instances with sub-150ms latency for natural human dialogue.",
    },
    {
      icon: Globe,
      title: "Global Routing",
      description:
        "Deploy localized agents across regional data centers for near-zero lag response.",
    },
    {
      icon: Shield,
      title: "Encrypted Data",
      description:
        "Your proprietary scripts and lead data remain private and protected.",
    },
    {
      icon: TrendingUp,
      title: "Yield Capture",
      description:
        "Automated ROI tracking that monitors every appointment and lead value.",
    },
  ];

  const stats = [
    { value: "150ms", label: "Latency", icon: Zap },
    { value: "7,000", label: "Max Mins/Node", icon: Phone },
    { value: "91%", label: "Profit Margin", icon: TrendingUp },
    { value: "24/7", label: "Active Fleet", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-brand-ink text-white overflow-x-hidden selection:bg-brand-gold/30">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.10),transparent_55%)]" />
        <motion.div
          className="absolute w-[720px] h-[720px] bg-brand-gold/5 rounded-full blur-[140px]"
          animate={{ x: mousePosition.x - 360, y: mousePosition.y - 360 }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b border-white/10 backdrop-blur-md bg-brand-ink/70 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2 font-black text-xl tracking-tighter uppercase"
            whileHover={{ scale: 1.03 }}
          >
            <Sparkles size={20} className="text-brand-gold" />
            <span className="text-white tracking-widest font-black italic">
              FrontDesk Agents
            </span>
          </motion.div>

          <div className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-xs font-bold tracking-widest text-white/60 hover:text-white uppercase transition-colors"
            >
              Infrastructure
            </Link>
            <Link
              href="/setup"
              className="bg-brand-gold text-black px-5 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-brand-gold/90 transition-colors"
            >
              Initialize Node
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-28 pb-20 px-6">
        {/* 8K Hero Background (optimized delivery via next/image) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/8k/hero-main-8k.jpg"
            alt="FrontDesk Agents — professional team in a modern office environment"
            fill
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1200px, 1920px"
            className="object-cover object-center opacity-70"
          />
          {/* Premium overlays */}
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/75 via-brand-ink/55 to-brand-ink" />
          <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_50%_15%,rgba(212,175,55,0.18),transparent_55%)]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-black/30 glass-dark mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
            </span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.2em]">
              System Status: Operational
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-8 leading-[0.85] tracking-tighter uppercase italic"
          >
            Autonomous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/55">
              Infrastructure
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-2xl mx-auto text-lg text-white/70 mb-12 font-medium leading-relaxed text-balance"
          >
            Deploy autonomous AI fleets that manage intake, qualify leads, and
            secure revenue with 24/7 reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/setup"
              className="bg-brand-gold text-black px-12 py-6 rounded-none font-black text-xs uppercase tracking-[0.3em] inline-flex items-center gap-4 hover:bg-brand-gold/90 transition-all active:scale-95 gold-glow"
            >
              Provision Your Fleet <ArrowRight size={18} />
            </Link>
          </motion.div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 max-w-5xl mx-auto border border-white/10">
            {stats.map((s) => (
              <div key={s.label} className="p-8 bg-black/45 glass-dark">
                <div className="flex items-center justify-center gap-2 text-white/60 text-[10px] uppercase font-bold tracking-widest">
                  <s.icon className="w-3 h-3 text-brand-gold" />
                  {s.label}
                </div>
                <div className="text-4xl font-black text-white mt-3 italic tracking-tighter">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-28 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <feature.icon className="w-6 h-6 text-white/35 group-hover:text-brand-gold transition-colors mb-6" />
              <h3 className="text-xs font-black mb-3 uppercase tracking-widest text-white">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed italic">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-4 text-white uppercase italic tracking-tighter">
              Node Capacity
            </h2>
            <p className="text-white/55 uppercase text-[10px] tracking-[0.4em] font-bold">
              Scaling Infrastructure for 2026
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Starter */}
            <div className="p-10 rounded-none bg-black/45 glass-dark border border-white/10 flex flex-col hover:border-white/20 transition-colors">
              <div className="text-white/55 font-black uppercase tracking-widest text-[10px] mb-6">
                Starter Node
              </div>
              <div className="text-6xl font-black text-white mb-2 italic tracking-tighter">
                $149
              </div>
              <p className="text-white/60 text-xs italic mb-8">
                Essential intake for solo operators.
              </p>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-wider">
                  <Zap size={12} className="text-brand-gold" /> 300 Mins Included
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-wider">
                  <Check size={12} className="text-brand-gold" /> Standard Routing
                </li>
              </ul>
              <Link
                href="/setup?plan=starter"
                className="w-full py-4 text-center font-black text-[10px] uppercase tracking-widest bg-white text-black hover:bg-brand-gold transition-all"
              >
                Activate Node
              </Link>
            </div>

            {/* Professional */}
            <div className="p-10 rounded-none bg-black/55 glass-dark border-2 border-brand-gold flex flex-col relative gold-glow">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-gold text-black text-[10px] font-black tracking-widest uppercase">
                Recommended
              </div>
              <div className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-6">
                Professional Fleet
              </div>
              <div className="text-6xl font-black text-white mb-2 italic tracking-tighter">
                $499
              </div>
              <p className="text-white/70 text-xs italic mb-8">
                Advanced fleet with priority routing.
              </p>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white tracking-wider">
                  <Zap size={12} className="text-brand-gold" /> 1,200 Mins Included
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white tracking-wider">
                  <Check size={12} className="text-brand-gold" /> 50+ Languages
                </li>
              </ul>
              <Link
                href="/setup?plan=professional"
                className="w-full py-4 text-center font-black text-[10px] uppercase tracking-widest bg-brand-gold text-black hover:bg-brand-gold/90 transition-all"
              >
                Scale Fleet
              </Link>
            </div>

            {/* Growth */}
            <div className="p-10 rounded-none bg-black/45 glass-dark border border-white/10 flex flex-col hover:border-white/20 transition-colors">
              <div className="text-white/55 font-black uppercase tracking-widest text-[10px] mb-6">
                Growth Cluster
              </div>
              <div className="text-6xl font-black text-white mb-2 italic tracking-tighter">
                $999
              </div>
              <p className="text-white/60 text-xs italic mb-8">
                Multi-location cluster with custom voice.
              </p>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-wider">
                  <Zap size={12} className="text-brand-gold" /> 3,000 Mins Included
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-wider">
                  <Check size={12} className="text-brand-gold" /> Voice Cloning
                </li>
              </ul>
              <Link
                href="/setup?plan=growth"
                className="w-full py-4 text-center font-black text-[10px] uppercase tracking-widest bg-white text-black hover:bg-brand-gold transition-all"
              >
                Establish Cluster
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-10 rounded-none bg-black/45 glass-dark border border-white/10 flex flex-col hover:border-white/20 transition-colors">
              <div className="text-white/55 font-black uppercase tracking-widest text-[10px] mb-6">
                Enterprise Protocol
              </div>
              <div className="text-6xl font-black text-white mb-2 italic tracking-tighter">
                $1,999
              </div>
              <p className="text-white/60 text-xs italic mb-8">
                Infinite scale with performance royalties.
              </p>
              <ul className="space-y-4 mb-12 flex-grow">
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-wider">
                  <Zap size={12} className="text-brand-gold" /> 7,000 Mins Included
                </li>
                <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-white/70 tracking-wider">
                  <Check size={12} className="text-brand-gold" /> Dedicated Tenant
                </li>
              </ul>
              <Link
                href="/contact"
                className="w-full py-4 text-center font-black text-[10px] uppercase tracking-widest bg-white/10 text-white hover:bg-white hover:text-black transition-all border border-white/10"
              >
                Consult Protocol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-white/35" />
            <span className="text-white/55 font-black uppercase tracking-widest text-[10px]">
              FrontDesk Agents LLC / 2026 Protocol
            </span>
          </div>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest">
            <Link href="/privacy" className="text-white/55 hover:text-brand-gold">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/55 hover:text-brand-gold">
              Terms
            </Link>
            <Link href="/support" className="text-white/55 hover:text-brand-gold">
              Node Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
