// app/page.tsx
"use client";

import { useState, useEffect } from "react";
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
  Target
} from "lucide-react";

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
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const pricingTiers = [
    { 
      name: "Starter", 
      price: "$299", 
      locations: "1 Location",
      features: ["24/7 AI Receptionist", "Call Summaries & Notes", "Natural Language Intake", "Standard CRM Basics"] 
    },
    { 
      name: "Professional", 
      price: "$699", 
      locations: "2–5 Locations",
      features: ["Multi-staff Scheduling", "Voicemail Transcription", "Advanced Analytics", "TCPA/DNC Support"],
      popular: true 
    },
    { 
      name: "Growth", 
      price: "$1,299", 
      locations: "6–15 Locations",
      features: ["Multi-language Support", "CRM Connectors", "Audit Logs", "99.9% SLA"] 
    },
    { 
      name: "Enterprise", 
      price: "$2,499", 
      locations: "16+ Locations",
      features: ["White-labeling", "SSO (SAML) Integration", "Dedicated Tenant", "99.99% SLA"] 
    }
  ];

  const features = [
    {
      icon: Phone,
      title: "AI Voice Agents",
      description: "Natural conversations that qualify leads and book appointments 24/7"
    },
    {
      icon: MessageSquare,
      title: "Smart Messaging",
      description: "Automated SMS follow-ups and appointment reminders"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Deep insights into call performance and conversion rates"
    },
    {
      icon: Users,
      title: "Multi-Location Support",
      description: "Manage all your locations from one unified dashboard"
    }
  ];

  const testimonials = [
    {
      quote: "We've seen a 156% increase in qualified leads. Our sales team can now focus on closing deals instead of answering phones.",
      author: "Sarah Mitchell",
      role: "VP of Sales, TechCorp",
      rating: 5
    },
    {
      quote: "The AI agents are indistinguishable from humans. Customer satisfaction up 40%, costs down 60%.",
      author: "James Rodriguez",
      role: "Operations Director",
      rating: 5
    },
    {
      quote: "Recovered $2.3M in lost revenue through automated reactivation campaigns. The ROI was immediate.",
      author: "Emily Chen",
      role: "CEO, RetailPro",
      rating: 5
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime", icon: Clock },
    { value: "10K+", label: "Calls/Month", icon: Phone },
    { value: "40%", label: "Revenue Increase", icon: TrendingUp },
    { value: "24/7", label: "Always Active", icon: Zap }
  ];

  if (!mounted) return <div className="min-h-screen bg-slate-950" />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 overflow-x-hidden">
      {/* Advanced Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_50%)]" />
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />
        <motion.div 
          className="absolute w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]"
          animate={{
            x: mousePosition.x - 200 + 150,
            y: mousePosition.y - 200 - 100,
          }}
          transition={{ type: "spring", damping: 40, stiffness: 80 }}
        />
      </div>

      {/* Enhanced Navigation */}
      <nav className="relative z-50 border-b border-slate-800/50 backdrop-blur-md bg-slate-950/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} className="text-sky-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              FrontDesk Agents
            </span>
          </motion.div>
          <Link 
            href="/setup" 
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:shadow-lg hover:shadow-sky-500/50 transition-all"
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </nav>

      {/* Hero Section with Advanced Animations */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full mb-8"
          >
            <Sparkles size={16} className="text-sky-400" />
            <span className="text-sm text-sky-400 font-medium">AI-Powered Revenue Workforce</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight"
          >
            The AI Workforce for{" "}
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Multi-Location Brands
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12"
          >
            Automate intake, scheduling, and revenue capture across every location with 24/7 natural-language voice agents.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/setup" 
              className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-sky-500/30 transition-all inline-flex items-center gap-3 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Deploy Your Agents
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400 mt-12"
          >
            {["No credit card required", "14-day free trial", "Cancel anytime"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all"
              >
                <stat.icon className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex flex-col items-center gap-2 text-slate-400"
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Enterprise-Grade AI Infrastructure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400"
            >
              Everything you need to automate your revenue operations
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-24 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
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
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: tier.popular ? 1.05 : 1.02, y: tier.popular ? -10 : -5 }}
              className={`p-8 rounded-3xl border flex flex-col relative ${
                tier.popular 
                  ? 'border-sky-500 bg-sky-500/5 shadow-2xl shadow-sky-500/20' 
                  : 'border-slate-800 bg-slate-950/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full text-xs font-bold">
                  MOST POPULAR
                </div>
              )}
              <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">
                {tier.name}
              </div>
              <div className="text-5xl font-bold mb-1">{tier.price}</div>
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-400 mb-6">
                <Building2 size={16} /> {tier.locations}
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <Check size={16} className="text-green-500 mt-1 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link 
                href={tier.name === 'Enterprise' ? '/contact' : '/setup'}
                className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${
                  tier.name === 'Enterprise' 
                    ? 'bg-white text-black hover:bg-slate-100' 
                    : tier.popular
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:shadow-lg hover:shadow-sky-500/50'
                    : 'bg-slate-800 text-white hover:bg-sky-500 hover:text-black'
                }`}
              >
                {tier.name === 'Enterprise' ? 'Schedule Demo' : 'Start Trial'}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-medium">14-day money-back guarantee • Cancel anytime</span>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Trusted by Industry Leaders
            </motion.h2>
          </div>

          <div className="relative min-h-[300px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeTestimonial === index ? 1 : 0,
                  scale: activeTestimonial === index ? 1 : 0.95,
                  x: activeTestimonial === index ? 0 : 100,
                }}
                transition={{ duration: 0.5 }}
                className={`${
                  activeTestimonial === index ? 'relative' : 'absolute inset-0'
                } p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Carousel controls */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTestimonial === index ? 'bg-sky-400 w-8' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="relative z-10 py-16 flex justify-center border-t border-slate-900">
        <div className="flex flex-wrap justify-center items-center gap-8 text-slate-500 text-sm font-medium">
          <motion.span 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <Shield size={16} className="text-green-500" /> SOC 2 Aligned
          </motion.span>
          <motion.span 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <Globe size={16} className="text-sky-500" /> Global Deployment
          </motion.span>
          <motion.span 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
          >
            <Zap size={16} className="text-yellow-500" /> Instant Setup
          </motion.span>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-sky-400" />
            <span className="font-bold text-lg">FrontDesk Agents</span>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            AI-Powered Revenue Workforce for Multi-Location Brands
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <Link href="/features" className="hover:text-sky-400 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-sky-400 transition-colors">Pricing</Link>
            <Link href="/legal/privacy" className="hover:text-sky-400 transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-sky-400 transition-colors">Terms</Link>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500">
            © 2026 FrontDesk Agents LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
