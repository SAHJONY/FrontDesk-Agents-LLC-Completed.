// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  PhoneCall,
  MessageSquare,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  Target,
  Brain,
  Rocket,
  Lock,
  Award,
  ChevronDown,
  Play,
  Check,
  X
} from "lucide-react";

export default function UltimateLandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  useEffect(() => {
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

  const testimonials = [
    {
      quote: "FrontDesk Agents transformed our lead qualification process. We've seen a 156% increase in qualified leads and our sales team can focus on closing deals.",
      author: "Sarah Mitchell",
      role: "VP of Sales",
      company: "TechCorp Global",
      rating: 5
    },
    {
      quote: "The AI voice agents are indistinguishable from human receptionists. Our customer satisfaction scores increased by 40% while reducing operational costs by 60%.",
      author: "James Rodriguez",
      role: "Operations Director",
      company: "HealthFirst Clinics",
      rating: 5
    },
    {
      quote: "We recovered $2.3M in lost revenue through automated reactivation campaigns. The ROI was immediate and continues to compound month over month.",
      author: "Emily Chen",
      role: "CEO",
      company: "RetailPro Solutions",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.15),transparent_50%)]" />
        <div
          className="absolute w-[800px] h-[800px] bg-sky-500/20 rounded-full blur-[120px] transition-all duration-500 ease-out"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] transition-all duration-700 ease-out"
          style={{
            left: mousePosition.x - 300 + 200,
            top: mousePosition.y - 300 - 100,
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              FrontDesk Agents
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-slate-300 hover:text-sky-400 transition-colors relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-sky-400 transition-colors relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/solutions" className="text-sm text-slate-300 hover:text-sky-400 transition-colors relative group">
              Solutions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link href="/login" className="text-sm text-slate-300 hover:text-sky-400 transition-colors relative group">
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/setup"
              className="group px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-sky-500/50 transition-all relative overflow-hidden"
            >
              <span className="relative z-10">Start Free Trial</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Enhanced Animations */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full mb-8 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-sky-400" />
            </motion.div>
            <span className="text-sm text-sky-400 font-medium">AI-Powered Revenue Workforce</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Never Miss Another
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Revenue Opportunity
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            24/7 autonomous AI agents that qualify leads, reactivate customers, and optimize revenue
            while you sleep. Enterprise-grade intelligence that scales infinitely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link
              href="/setup"
              className="group px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-sky-500/50 transition-all flex items-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/demo"
              className="group px-8 py-4 border-2 border-slate-700 rounded-xl text-lg font-semibold hover:border-sky-400 hover:text-sky-400 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </Link>
          </motion.div>

          {/* Trust Indicators with Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400"
          >
            {[
              "No credit card required",
              "14-day free trial",
              "Cancel anytime"
            ].map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: "99.9%", label: "Uptime", icon: Clock, color: "from-green-400 to-emerald-500" },
              { value: "10K+", label: "Calls/Month", icon: PhoneCall, color: "from-sky-400 to-blue-500" },
              { value: "40%", label: "Revenue Increase", icon: TrendingUp, color: "from-purple-400 to-pink-500" },
              { value: "24/7", label: "Always Active", icon: Zap, color: "from-orange-400 to-red-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
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

      {/* Features Section with Stagger Animation */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
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
              Everything you need to automate and scale your revenue operations
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Voice Agents",
                description: "Natural conversations that qualify leads, answer questions, and book appointments automatically",
                gradient: "from-sky-400 to-blue-500"
              },
              {
                icon: MessageSquare,
                title: "Smart Messaging",
                description: "Automated SMS follow-ups, appointment reminders, and customer engagement campaigns",
                gradient: "from-blue-500 to-purple-500"
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Deep insights into call performance, conversion rates, and revenue attribution",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Target,
                title: "Lead Qualification",
                description: "Intelligent scoring and routing based on conversation analysis and intent detection",
                gradient: "from-pink-500 to-rose-500"
              },
              {
                icon: Users,
                title: "Customer Reactivation",
                description: "Automated outreach campaigns to win back dormant customers and recover revenue",
                gradient: "from-rose-500 to-orange-500"
              },
              {
                icon: Globe,
                title: "Multi-Language Support",
                description: "Serve customers globally with AI agents fluent in 50+ languages",
                gradient: "from-orange-500 to-yellow-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all hover:shadow-xl hover:shadow-sky-500/10 cursor-pointer"
              >
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sky-400 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400"
            >
              Choose the plan that scales with your business
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all"
            >
              <div className="text-sm font-semibold text-sky-400 mb-2">STARTER</div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">$297</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-400 mb-6">Perfect for small businesses getting started with AI automation</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Up to 500 calls/month",
                  "2 AI voice agents",
                  "Basic SMS automation",
                  "Email support",
                  "Call analytics dashboard"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?plan=starter"
                className="block w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 rounded-lg text-center font-semibold transition-all"
              >
                Start Free Trial
              </Link>
            </motion.div>

            {/* Professional Plan - Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border-2 border-sky-500 backdrop-blur-sm relative shadow-2xl shadow-sky-500/20"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full text-sm font-bold shadow-lg">
                MOST POPULAR
              </div>
              <div className="text-sm font-semibold text-sky-400 mb-2">PROFESSIONAL</div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">$597</span>
                <span className="text-slate-400">/month</span>
              </div>
              <p className="text-slate-400 mb-6">For growing businesses ready to scale with AI</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Up to 2,000 calls/month",
                  "5 AI voice agents",
                  "Advanced SMS campaigns",
                  "Priority support",
                  "Custom voice cloning",
                  "Multi-language support",
                  "API access"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup?plan=professional"
                className="block w-full py-3 px-4 bg-gradient-to-r from-sky-400 to-blue-500 hover:shadow-lg hover:shadow-sky-500/50 rounded-lg text-center font-semibold transition-all"
              >
                Start Free Trial
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all"
            >
              <div className="text-sm font-semibold text-purple-400 mb-2">ENTERPRISE</div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">Custom</span>
              </div>
              <p className="text-slate-400 mb-6">For large organizations with custom requirements</p>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited calls",
                  "Unlimited AI agents",
                  "White-label solution",
                  "Dedicated account manager",
                  "24/7 phone support",
                  "Custom integrations",
                  "SLA guarantee"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?plan=enterprise"
                className="block w-full py-3 px-4 bg-slate-700 hover:bg-purple-600 rounded-lg text-center font-semibold transition-all"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>

          {/* Money-back guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">14-day money-back guarantee • Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Carousel */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Trusted by Industry Leaders
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-400"
            >
              Join thousands of businesses automating their revenue operations
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
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
                className={`${activeTestimonial === index ? 'relative' : 'absolute inset-0'} p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-slate-400">{testimonial.role}, {testimonial.company}</div>
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
