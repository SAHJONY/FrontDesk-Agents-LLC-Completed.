// lib/frontdeskImages.ts

export type FrontdeskImageTag =
  | "hero"
  | "dashboard"
  | "team"
  | "meeting"
  | "medical"
  | "workflow"
  | "celebration";

export interface FrontdeskImage {
  src: string;
  alt: string;
  tag: FrontdeskImageTag;
  priority?: boolean;
}

export const frontdeskImages: FrontdeskImage[] = [
  {
    src: "/images/office_scene_01.png",
    alt: "AI receptionist team collaborating at FrontDesk Agents",
    tag: "hero",
    priority: true
  },
  {
    src: "/images/office_scene_02.png",
    alt: "Executive presenting growth charts powered by FrontDesk Command Center",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_03.png",
    alt: "Developer monitoring AI receptionist infrastructure on multiple screens",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_04.png",
    alt: "Receptionist greeting a business visitor at a modern front desk",
    tag: "hero"
  },
  {
    src: "/images/office_scene_05.png",
    alt: "Business team in meeting about call handling and customer experience",
    tag: "meeting"
  },
  {
    src: "/images/office_scene_06.png",
    alt: "Engineer working on AI call routing logic",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_07.png",
    alt: "Team celebrating successful customer acquisition campaign",
    tag: "celebration"
  },
  {
    src: "/images/office_scene_08.png",
    alt: "Manager talking with receptionist in bright office lobby",
    tag: "hero"
  },
  {
    src: "/images/office_scene_09.png",
    alt: "Team lead reviewing ideas on glass board for frontdeskagents.com",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_10.png",
    alt: "Professional using laptop to monitor live calls",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_11.png",
    alt: "Team having strategy session around laptop",
    tag: "meeting"
  },
  {
    src: "/images/office_scene_12.png",
    alt: "Group looking intensely at monitor reviewing call analytics",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_13.png",
    alt: "Two coworkers talking in the office kitchen",
    tag: "team"
  },
  {
    src: "/images/office_scene_14.png",
    alt: "Professional checking live metrics on tablet near window",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_15.png",
    alt: "Businesswoman smiling on camera during remote demo call",
    tag: "hero"
  },
  {
    src: "/images/office_scene_16.png",
    alt: "Team around whiteboard with website flow for frontdeskagents.com",
    tag: "workflow"
  },
  {
    src: "/images/office_scene_17.png",
    alt: "Leadership coaching small group about goals and teamwork",
    tag: "meeting"
  },
  {
    src: "/images/office_scene_18.png",
    alt: "Boardroom presentation with FrontDesk Agents on big screen",
    tag: "hero"
  },
  {
    src: "/images/office_scene_19.png",
    alt: "Team focused on desktop screen reviewing product UI",
    tag: "dashboard"
  },
  {
    src: "/images/office_scene_20.png",
    alt: "Professional walking through modern hallway to a meeting",
    tag: "team"
  },
  {
    src: "/images/medical_industry_concept.png",
    alt: "AI receptionist badge glowing at medical clinic front desk",
    tag: "medical"
  },
  {
    src: "/images/business_impact_concept.png",
    alt: "Dark themed AI brain graphic representing business impact",
    tag: "dashboard"
  },
  {
    src: "/images/ai_hero_concept.png",
    alt: "Futuristic AI brain hero image for FrontDesk Command Center",
    tag: "hero",
    priority: true
  }
];

export function getHeroImages(): FrontdeskImage[] {
  return frontdeskImages.filter((img) => img.tag === "hero");
}

export function getDashboardImages(): FrontdeskImage[] {
  return frontdeskImages.filter((img) => img.tag === "dashboard");
}
