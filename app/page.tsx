// app/page.tsx - CORRECT Location-Based Pricing Section
// Replace your pricing section with this:

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
        <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">
          STARTER
        </div>
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
        <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">
          PROFESSIONAL
        </div>
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
        <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">
          GROWTH
        </div>
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
        <div className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">
          ENTERPRISE
        </div>
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
