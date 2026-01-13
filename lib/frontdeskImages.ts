// lib/frontdeskImages.ts

export type FrontdeskImageTag =
  | "hero"
  | "dashboard"
  | "team"
  | "meeting"
  | "medical"
  | "workflow"
  | "celebration"
  | "demo"
  | "pricing"
  | "industries";

export interface FrontdeskImage {
  src: string;
  alt: string;
  tag: FrontdeskImageTag;
  priority?: boolean;
}

export const frontdeskImages: FrontdeskImage[] = [
  // === HERO / PORTADA ===
  {
    src: "/images/ai_hero_concept.png",
    alt: "Futuristic AI brain hero image for FrontDesk Command Center",
    tag: "hero",
    priority: true
  },
  {
    src: "/images/office_scene_01.png",
    alt: "AI receptionist team collaborating at FrontDesk Agents",
    tag: "hero"
  },
  {
    src: "/images/office_scene_04.png",
    alt: "Receptionist greeting a business visitor at a modern front desk",
    tag: "hero"
  },
  {
    src: "/images/office_scene_15.png",
    alt: "Businesswoman smiling on camera during remote demo call",
    tag: "hero"
  },
  {
    src: "/images/office_scene_18.png",
    alt: "Boardroom presentation with FrontDesk Agents on big screen",
    tag: "hero"
  },

  // === DASHBOARD / METRICS ===
  {
    src: "/images/business_impact_concept.png",
    alt: "Dark themed AI brain graphic representing business impact",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_02.png",
    alt: "Executive presenting growth charts powered by FrontDesk Command Center",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_10.png",
    alt: "Professional using laptop to monitor live calls",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_12.png",
    alt: "Group looking intensely at monitor reviewing call analytics",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_14.png",
    alt: "Professional checking live metrics on tablet near window",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_19.png",
    alt: "Team focused on desktop screen reviewing product UI",
    tag: "dashboard"
  },

  // === WORKFLOW / INFRA ===
  {
    src: "/images/office_scene_03.png",
    alt: "Developer monitoring AI receptionist infrastructure on multiple screens",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_06.png",
    alt: "Engineer working on AI call routing logic",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_09.png",
    alt: "Team lead reviewing ideas on glass board for frontdeskagents.com",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_16.png",
    alt: "Team around whiteboard with website flow for frontdeskagents.com",
    tag: "workflow"
  },

  // === TEAM / CULTURA ===
  {
    src: "/images/office_scene_07.png",
    alt: "Team celebrating successful customer acquisition campaign",
    tag: "celebration"
  },
  {
    src: "/images/office_scene_13.png",
    alt: "Two coworkers talking in the office kitchen",
    tag: "team"
  },
  {
    src: "/images/office_scene_17.png",
    alt: "Leadership coaching small group about goals and teamwork",
    tag: "meeting"
  },
  {
    src: "/images/office_scene_20.png",
    alt: "Professional walking through modern hallway to a meeting",
    tag: "team"
  },

  // === MEETINGS / SALES ===
  {
    src: "/images/office_scene_05.png",
    alt: "Business team in meeting about call handling and customer experience",
    tag: "meeting"
  },
  {
    src: "/images/office_scene_11.png",
    alt: "Team having strategy session around laptop",
    tag: "meeting"
  },

  // === MEDICAL / INDUSTRIES ===
  {
    src: "/images/medical_industry_concept.png",
    alt: "AI receptionist badge glowing at medical clinic front desk",
    tag: "medical",
    priority: true
  },

  // === DEMO PAGE ===
  {
    src: "/images/ai_hero_concept.png",
    alt: "Live demo of the FrontDesk Command Center",
    tag: "demo",
    priority: true
  },

  // === PRICING / PLANES ===
  {
    src: "/images/office_scene_02.png",
    alt: "Executive explaining pricing packages for FrontDesk Agents",
    tag: "pricing"
  },

  // === INDUSTRIES / CLIENTES ===
  {
    src: "/images/office_scene_08.png",
    alt: "Manager talking with receptionist in bright office lobby",
    tag: "industries"
  }
];

// === HELPERS ===

export function getImagesByTag(tag: FrontdeskImageTag): FrontdeskImage[] {
  return frontdeskImages.filter((img) => img.tag === tag);
}

export function getHeroImages(): FrontdeskImage[] {
  return getImagesByTag("hero");
}

export function getDashboardImages(): FrontdeskImage[] {
  return getImagesByTag("dashboard");
}

export function getWorkflowImages(): FrontdeskImage[] {
  return getImagesByTag("workflow");
}

export function getTeamImages(): FrontdeskImage[] {
  return getImagesByTag("team");
}

export function getMedicalImages(): FrontdeskImage[] {
  return getImagesByTag("medical");
}

export function getDemoImage(): FrontdeskImage | undefined {
  return frontdeskImages.find((img) => img.tag === "demo");
}

export function getPricingImages(): FrontdeskImage[] {
  return getImagesByTag("pricing");
}

export function getIndustryImages(): FrontdeskImage[] {
  return getImagesByTag("industries");
}
