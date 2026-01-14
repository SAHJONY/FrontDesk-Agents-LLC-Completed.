// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Award
} from "lucide-react";

export default function PremiumLandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)]" />
        <div
          className="absolute w-96 h-96 bg-sky-500/20 rounded-full blur-3xl transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 border-b border-slate-800/50 backdrop-blur-xl bg-slate-950/80"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              FrontDesk Agents
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
              Pricing
            </Link>
            <Link href="/solutions" className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
              Solutions
            </Link>
            <Link href="/login" className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
              Login
            </Link>
            <Link
              href="/setup"
              className="px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-sky-500/50 transition-all"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <motion.div
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span className="text-sm text-sky-400 font-medium">AI-Powered Revenue Workforce</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Never Miss Another
            <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Revenue Opportunity
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
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
              className="group px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-sky-500/50 transition-all flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border-2 border-slate-700 rounded-xl text-lg font-semibold hover:border-sky-400 hover:text-sky-400 transition-all"
            >
              Watch Demo
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {[
              { value: "99.9%", label: "Uptime", icon: Clock },
              { value: "10K+", label: "Calls/Month", icon: PhoneCall },
              { value: "40%", label: "Revenue Increase", icon: TrendingUp },
              { value: "24/7", label: "Always Active", icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all group"
              >
                <stat.icon className="w-8 h-8 text-sky-400 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
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
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all hover:shadow-xl hover:shadow-sky-500/10"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
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

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-sky-500/50 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
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
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="relative z-10 py-20 px-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Shield, label: "SOC 2 Compliant" },
              { icon: Lock, label: "256-bit Encryption" },
              { icon: Award, label: "HIPAA Certified" },
              { icon: CheckCircle2, label: "GDPR Ready" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-3"
              >
                <item.icon className="w-10 h-10 text-sky-400" />
                <span className="text-slate-300 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/20 backdrop-blur-sm">
            <Rocket className="w-16 h-16 text-sky-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Revenue Operations?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using AI to never miss another opportunity. 
              Start your free 14-day trial today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/setup"
                className="group px-8 py-4 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-sky-500/50 transition-all flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-slate-700 rounded-xl text-lg font-semibold hover:border-sky-400 hover:text-sky-400 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">FrontDesk Agents</span>
              </div>
              <p className="text-sm text-slate-400">
                AI-Powered Revenue Workforce for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/features" className="hover:text-sky-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-sky-400 transition-colors">Pricing</Link></li>
                <li><Link href="/solutions" className="hover:text-sky-400 transition-colors">Solutions</Link></li>
                <li><Link href="/demo" className="hover:text-sky-400 transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/about" className="hover:text-sky-400 transition-colors">About</Link></li>
                <li><Link href="/support" className="hover:text-sky-400 transition-colors">Support</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-sky-400 transition-colors">Privacy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-sky-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="https://twitter.com/frontdeskagents" className="hover:text-sky-400 transition-colors">Twitter</a></li>
                <li><a href="https://linkedin.com/company/frontdeskagents" className="hover:text-sky-400 transition-colors">LinkedIn</a></li>
                <li><a href="mailto:support@frontdeskagents.com" className="hover:text-sky-400 transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
            <p>&copy; 2026 FrontDesk Agents LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
