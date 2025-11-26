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

  // 🔒 IDENTIDAD UNIFICADA: VOZ + EMAIL + SMS
  identity_policy: {
    modes: {
      client_white_label: {
        key: "client_white_label",
        description:
          "ALEX acts as the client's own receptionist/representative. No mention of FrontDesk Agents.",
        allowBrandReference: false
      },
      company_public: {
        key: "company_public",
        description:
          "ALEX represents FrontDesk Agents for internal sales, support and ops.",
        allowBrandReference: true
      }
    },

    voice: {
      outbound_templates: {
        client_white_label:
          "Hi, this is ALEX from [CLIENT_NAME]. [MESSAGE_BODY]",
        company_public:
          "Hi, this is ALEX with FrontDesk Agents. [MESSAGE_BODY]"
      },
      inbound_templates: {
        client_white_label:
          "Thank you for calling [CLIENT_NAME]. This is ALEX, how can I assist you today?",
        company_public:
          "Hello, this is ALEX with FrontDesk Agents — how can I help you today?"
      },
      compliance_notice:
        "This call may be recorded for quality and training purposes."
    },

    email: {
      from_name: {
        client_white_label: "ALEX | [CLIENT_NAME]",
        company_public: "ALEX | FrontDesk Agents"
      },
      from_address: {
        // Estos domains luego los puedes mapear en tu proveedor (SendGrid, etc)
        client_white_label: "no-reply@[CLIENT_DOMAIN]",
        company_public: "no-reply@frontdeskagents.com"
      },
      signature: {
        client_white_label:
          "Best regards,\nALEX\n[CLIENT_NAME]",
        company_public:
          "Best regards,\nALEX\nFrontDesk Agents – AI PHONE OS"
      }
    },

    sms: {
      prefix: {
        client_white_label: "[CLIENT_NAME]: ",
        company_public: "FrontDesk Agents: "
      },
      footer_optout: " Reply STOP to opt out."
    },

    // Aquí se hace el mapping por números / remitentes
    mode_selection_logic: {
      company_numbers: [
        // EJEMPLO: agrega aquí tus números de FrontDesk
        "+12164526636"
      ],
      client_numbers: [
        // Se rellena dinámicamente desde DB o panel
      ],
      company_email_domains: ["frontdeskagents.com"],
      // client domains se infieren desde cada cliente
    }
  },

  // El resto de tu estrategia original puede seguir debajo si ya la tenías
  business_strategy: {
    positioning: {
      vertical_specialization: {
        focus_verticals: [
          "Real Estate",
          "Medical / Dental High-End",
          "B2B SaaS Lead Qualification"
        ],
        benefit: "Deeper features + higher pricing power."
      },
      roi_marketing:
        "Market the platform by measurable revenue outcomes.",
      partner_ecosystem:
        "Collaborate with CRMs, call systems, booking systems."
    },
    operational_priorities: {
      data_security: {
        soc2: "SOC 2 Type II compliance mandatory.",
        gdpr: "GDPR/CCPA coverage required for enterprise."
      },
      hil_service: {
        description:
          "Human-in-the-loop escalation for complex cases.",
        value: "Acts as reliability guarantee for enterprise."
      }
    }
  },

  pricing_model: {
    base_principle: "Price based on value delivered, not minutes used.",
    tiers: {
      starter: {
        target: "Small Business / 1 Vertical",
        monthly_price: "$249-$349",
        setup_fee: "$399-$599"
      },
      pro: {
        target: "Scaling Business / Multi-Channel",
        monthly_price: "$699-$999",
        setup_fee: "$1,299-$1,999"
      },
      enterprise: {
        target: "High Volume / Complex workflows",
        monthly_price: "$1,999-$4,999+",
        setup_fee: "$3,500-$7,500+"
      }
    },
    pricing_rules: {
      overage_rate: "$0.10-$0.15 per minute",
      vertical_multipliers: {
        ecommerce: "+15%",
        legal_medical: "+20%",
        b2b_saas: "+25%"
      }
    }
  },

  compliance: {
    legal: {
      note: "All interactions must follow TCPA, GDPR, CCPA, SOC2 guidelines.",
      storage_rules:
        "No storing sensitive data unless encrypted and audited."
    }
  }
};
