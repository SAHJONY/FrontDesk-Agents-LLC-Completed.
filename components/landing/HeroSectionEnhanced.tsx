"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function HeroSectionEnhanced() {
  const [stats, setStats] = useState({
    uptime: 0,
    languages: 0,
    businesses: 0
  });

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Animated counter effect
  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          uptime: Math.min(99.9, progress * 99.9),
          languages: Math.min(50, Math.floor(progress * 50)),
          businesses: Math.min(1000, Math.floor(progress * 1000))
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats({ uptime: 99.9, languages: 50, businesses: 1000 });
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [inView]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-zinc-900 to-black">
      {/* Animated background with particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-950/20 via-black to-black" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Animated floating orbs - Optimized for mobile */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/10 rounded-full blur-3xl will-change-transform"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl will-change-transform"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Animated Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-sm"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-cyan-400"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="text-sm font-medium text-cyan-400">
            ✨ Enterprise AI Workforce - Fully Autonomous
          </span>
        </motion.div>
        
        {/* Main heading with gradient animation */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
        >
          Transform Your Front Office
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
            With AI Agents
          </span>
        </motion.h1>
        
        {/* Enhanced subheading */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Deploy 50+ autonomous AI agents across 8 divisions. 24/7 operations for 
          <span className="text-cyan-400 font-semibold"> lead qualification</span>,
          <span className="text-cyan-400 font-semibold"> customer service</span>, and
          <span className="text-cyan-400 font-semibold"> revenue optimization</span>.
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 mb-12 text-sm text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Setup in 5 minutes</span>
          </div>
        </motion.div>
        
        {/* Enhanced CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/signup"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/50 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free Trial
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          <Link
            href="/demo"
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all border border-white/10 hover:border-cyan-500/50 backdrop-blur-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Watch Demo
          </Link>

          <Link
            href="/pricing"
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-lg transition-all border border-white/10 hover:border-purple-500/50 backdrop-blur-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            View Pricing
          </Link>
        </motion.div>
        
        {/* Animated Stats with counter */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
        >
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all">
            <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">
              {stats.uptime.toFixed(1)}%
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider">
              Uptime SLA
            </div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all">
            <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2">
              {stats.languages}+
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider">
              Languages
            </div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all">
            <div className="text-4xl md:text-5xl font-black text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider">
              Autonomous
            </div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all">
            <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">
              {stats.businesses}+
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider">
              Businesses
            </div>
          </div>
        </motion.div>

        {/* Social Proof - Live Activity */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 border-2 border-black flex items-center justify-center text-xs font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-green-400 font-medium">
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ●
              </motion.span>
              {' '}127 businesses deployed AI agents this week
            </span>
          </div>
        </motion.div>
        
        {/* Hero Image/Video Placeholder */}
        <motion.div
          variants={itemVariants}
          className="mt-16 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
          <div className="relative">
            <Image
              src="/images/hero-main.jpg"
              alt="FrontDesk Agents AI Workforce Dashboard"
              width={1200}
              height={600}
              className="rounded-2xl shadow-2xl border border-white/10 group-hover:border-cyan-500/30 transition-all"
              priority
            />
            {/* Play button overlay for demo video */}
            <Link
              href="/demo"
              className="absolute inset-0 flex items-center justify-center group/play"
            >
              <div className="w-20 h-20 rounded-full bg-cyan-500/90 backdrop-blur-sm flex items-center justify-center group-hover/play:scale-110 transition-transform shadow-lg shadow-cyan-500/50">
                <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60"
        >
          <div className="text-zinc-600 text-sm font-semibold">ENTERPRISE-GRADE SECURITY</div>
          {['SOC 2-Aligned', 'GDPR Ready', 'Enterprise Security', 'Data Protection'].map((badge) => (
            <div
              key={badge}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-zinc-500 text-sm font-medium"
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}
