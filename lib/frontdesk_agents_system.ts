// lib/frontdesk_agents_system.ts

export const frontdeskAgentsSystem = {
  identity: {
    name: "FrontDesk Agents",
    core_tagline: "AI PHONE OS",
    description:
      "The Autonomous Customer Intelligence Platform powering calls, bookings, and client communication at scale."
  },

  architecture: {
    marketing_site: "https://www.frontdeskagents.com",
    internal_app: "https://app.frontdeskagents.com",
    separation_principle:
      "Public-facing site builds trust; internal app delivers operational value."
  },

  strategic_goal:
    "Achieve market leadership as the most advanced AI agent platform.",

  // 🔹 NUEVA SECCIÓN: AVANCE DEL AGENTE DE IA (AI PHONE OS)
  ai_agent_advancement: {
    title: "Next-Gen Autonomous Agent System",
    focus: [
      "Proactive, context-aware, and deeply integrated intelligence.",
      "From simple call handling to full AI PHONE OS orchestration."
    ],
    next_gen_features: [
      {
        name: "Proactive Intent Modeling",
        description:
          "Predicts user needs based on history and real-time interaction, shifting from reactive support to proactive assistance."
      },
      {
        name: "Cross-Channel Contextual Memory",
        description:
          "Maintains a shared memory across voice, WhatsApp, SMS, and email so customers never repeat themselves."
      },
      {
        name: "Dynamic Persona & Tone Shifting",
        description:
          "Adapts tone, persona, and language complexity based on customer profile and emotional state."
      },
      {
        name: "Autonomous Task Execution (ATE)",
        description:
          "Executes multi-step workflows (quotes, bookings, follow-ups) without human intervention, inside connected systems."
      },
      {
        name: "Real-Time Sentiment & Emotion Analysis",
        description:
          "Detects frustration, urgency, and purchase intent to escalate, slow down, or push for a close when appropriate."
      }
    ],
    technical_priorities: [
      "Ultra-low latency voice pipeline with natural turn-taking.",
      "Two-way deep CRM synchronization (Salesforce, HubSpot, etc.).",
      "Continuous feedback loop and reinforcement learning from real calls.",
      "Automated error-correction training on misclassified or escalated calls."
    ]
  },

  // Política de identidad: modo cliente (white-label) vs modo empresa
  identity_policy: {
    modes: {
      client_white_label: {
        description:
          "Acts as the client’s receptionist. No mention of FrontDesk Agents.",
        outbound_example:
          "Hi, this is ALEX from [Client Business Name]. I’m reaching out about your recent inquiry.",
        inbound_example:
          "Thank you for calling [Client Business Name]. This is ALEX, how can I assist you today?"
      },
      company_public: {
        description:
          "Represents FrontDesk Agents directly in sales or support.",
        outbound_example:
          "Hi, this is ALEX with FrontDesk Agents. I wanted to share how our AI PHONE OS helps automate client communications.",
        inbound_example:
          "Hello, this is ALEX with FrontDesk Agents — how can I help you today?"
      }
    },
    routing_logic:
      "Phone numbers and call flows determine whether ALEX represents the client or FrontDesk Agents."
  },

  business_strategy: {
    positioning: {
      vertical_specialization: {
        focus_verticals: [
          "Real Estate",
          "High-End Medical / Dental",
          "B2B SaaS Lead Qualification"
        ],
        benefit: "Deeper features and stronger pricing power per vertical."
      },
      roi_marketing:
        "Communicate value using measurable outcomes: more booked appointments, fewer missed calls, higher conversion.",
      partner_ecosystem:
        "Collaborate with CRMs, call systems, and booking platforms for scalable distribution."
    },
    operational_priorities: {
      data_security: {
        soc2: "SOC 2 Type II compliance required for enterprise targets.",
        gdpr: "GDPR/CCPA coverage required where applicable."
      },
      hil_service: {
        description:
          "Human-in-the-loop escalation for complex or sensitive conversations.",
        value:
          "Acts as a reliability guarantee and safety net for enterprise clients."
      }
    }
  },

  pricing_model: {
    base_principle: "Price based on value delivered, not only minutes used.",
    tiers: {
      starter: {
        name: "Starter",
        target: "Small business / 1 vertical",
        monthly_price: "$249–$349 / month",
        setup_fee: "$399–$599 one-time",
        core_features: [
          "Core automation and routing",
          "Basic appointment booking",
          "Lead capture and intake",
          "Single phone number"
        ]
      },
      pro: {
        name: "Pro",
        target: "Scaling business / multi-channel",
        monthly_price: "$699–$999 / month",
        setup_fee: "$1,299–$1,999 one-time",
        core_features: [
          "Everything in Starter",
          "Cross-channel contextual memory",
          "2-way CRM sync",
          "Dynamic persona and tone shifting"
        ]
      },
      enterprise: {
        name: "Enterprise",
        target: "High volume / complex workflows",
        monthly_price: "$1,999–$4,999+ / month",
        setup_fee: "$3,500–$7,500+ one-time",
        core_features: [
          "Everything in Pro",
          "Autonomous Task Execution (ATE)",
          "Human-in-the-loop (HIL)",
          "Custom model tuning and SLAs"
        ]
      }
    },
    pricing_rules: {
      overage_rate: "$0.10–$0.15 per minute beyond included usage",
      vertical_multipliers: {
        ecommerce: "+15%",
        legal_medical: "+20%",
        b2b_saas: "+25%"
      },
      setup_fee_strategy:
        "Discount or waive part of the setup fee for annual commitments; keep mandatory for custom integrations."
    }
  },

  compliance: {
    legal_note:
      "All interactions must follow TCPA, GDPR, CCPA, and SOC 2-aligned guidelines.",
    storage_rules:
      "Sensitive data must be encrypted, access-controlled, and auditable."
  },

  ui_ux_unification: {
    system_status_bar: {
      example_message_cycle: [
        "Analyzing call outcomes…",
        "Syncing customer data…",
        "Optimizing response models…"
      ]
    }
  }
} as const;
