// lib/frontdesk_agents_strategy.ts

export const frontdeskAgentsStrategy = {
  goal: "Achieve market leadership as the most advanced AI agent platform.",

  // --- 1. Advanced AI Agent Features ---
  ai_agent_advancement: {
    title: "Becoming the Most Advanced AI Agent (AI PHONE OS)",
    focus: [
      "Proactive, context-aware, and deeply integrated intelligence.",
    ],
    next_gen_features: [
      {
        name: "Proactive Intent Modeling",
        description:
          "AI predicts the user's next need based on historical data and real-time conversation flow, shifting from reactive support to proactive assistance.",
      },
      {
        name: "Cross-Channel Contextual Memory",
        description:
          "AI maintains a single, persistent memory of the customer across all channels (call, WhatsApp, email), eliminating repetition.",
      },
      {
        name: "Dynamic Persona & Tone Shifting",
        description:
          "AI adjusts its persona (e.g., formal, empathetic) and language complexity based on customer profile and emotional tone.",
      },
      {
        name: "Autonomous Task Execution (ATE)",
        description:
          "AI completes multi-step tasks within integrated systems (e.g., 'Process a refund,' 'Generate a quote') without human intervention.",
      },
      {
        name: "Real-Time Sentiment & Emotion Analysis",
        description:
          "AI analyzes voice inflection and text patterns to gauge frustration/urgency, triggering immediate escalation or tone shift.",
      },
    ],
    technical_roadmap_focus: [
      "Voice-First Optimization: Invest in low-latency, high-fidelity voice models to eliminate the 'robot' sound.",
      "Integration Depth: Move to two-way, real-time synchronization with major CRMs (Salesforce, HubSpot) and booking systems.",
      "Self-Correction and Learning: Implement a feedback loop (RLHF) where human corrections immediately fine-tune the AI model.",
    ],
  },

  // --- 2. Strategic Business and Operational Advice ---
  business_strategy: {
    title: "Strategic Business and Operational Planning",
    market_positioning: [
      {
        strategy: "Vertical Specialization",
        details:
          "Focus on 2-3 high-value verticals (Real Estate, High-End Medical/Dental, B2B SaaS Lead Qualification) for deeper product features and higher pricing power.",
      },
      {
        strategy: "Focus on ROI-Driven Outcomes",
        details:
          "Market the AI as a revenue generator, highlighting metrics like 'X% increase in qualified leads' or 'Y% reduction in missed appointments.'",
      },
      {
        strategy: "Establish a Partner Ecosystem",
        details:
          "Partner with system integrators and vertical-specific software providers for scalable sales channels.",
      },
    ],
    operational_priorities: [
      "Data Security and Compliance: Immediately prioritize SOC 2 Type II and GDPR/CCPA compliance for enterprise clients.",
      "Human-in-the-Loop (HIL) as a Service: Offer HIL as a premium, managed service for complex or sensitive conversations.",
    ],
  },

  // --- 3. Rebranding and Public-Facing Strategy ---
  rebranding_strategy: {
    title: "Brand Transformation and Public Strategy",
    brand_identity: [
      {
        element: "Name",
        suggestion:
          "Keep 'FrontDesk Agents' but always pair with the powerful tagline.",
      },
      {
        element: "Tagline",
        suggestion:
          "AI PHONE OS (Primary) or The Autonomous Customer Intelligence Platform (Secondary).",
      },
    ],
    website_priority: [
      "IMMEDIATE ACTION: Replace the current internal-facing domain with a professional, high-conversion marketing website.",
      "Content: Use case studies and ROI calculators prominently.",
      "Multilingual: Offer seamless language switching (English, Spanish) to capture global market.",
    ],
    marketing_focus: [
      "Thought Leadership: Publish high-quality content on the future of AI in customer service.",
      "Demo-First Approach: Offer an interactive demo (call a number, chat with an agent) to showcase low-latency, human-like interaction.",
    ],
  },

  // --- 4. Refined Value-Based Pricing Model ---
  pricing_model: {
    title: "Refined Value-Based Tiered Pricing Model",
    base_metric:
      "Value delivered (features) and Usage allowance (minutes/interactions).",
    tiers: [
      {
        name: "Starter",
        target: "Small Business / Single Vertical Focus",
        monthly_price_range: "$249 - $349",
        setup_fee_range: "$399 - $599",
        key_features:
          "Core Automation, Appointment Booking, Basic Lead Capture.",
      },
      {
        name: "Pro",
        target: "Growing Business / Multi-Channel Needs",
        monthly_price_range: "$699 - $999",
        setup_fee_range: "$1,299 - $1,999",
        key_features:
          "Cross-Channel Contextual Memory, 2-Way CRM Sync, Dynamic Persona Shifting.",
      },
      {
        name: "Enterprise",
        target: "High-Volume / Complex Needs",
        monthly_price_range: "$1,999 - $4,999+",
        setup_fee_range: "$3,500 - $7,500+",
        key_features:
          "Full Autonomous Task Execution (ATE), HIL Option, Custom Model Training.",
      },
    ],
    vertical_multipliers: [
      {
        vertical: "E-commerce (Cart Recovery)",
        multiplier: "+15% to Base Price",
      },
      {
        vertical: "Law Firms / High-End Medical",
        multiplier: "+20% to Base Price",
      },
      {
        vertical: "B2B SaaS Lead Qualification",
        multiplier: "+25% to Base Price",
      },
    ],
    setup_fee_strategy: [
      "Waive 50-100% of Setup Fee for annual contract commitments.",
      "Offer a discounted Setup Fee for customers converting from the 14-day trial.",
      "Setup Fee is mandatory for any custom integration or advanced workflow setup.",
    ],
  },
} as const;
