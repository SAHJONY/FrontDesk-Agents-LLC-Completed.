// lib/siteImages.ts
//
// Catálogo OFICIAL de imágenes para toda la aplicación.
// TODAS las rutas deben existir físicamente en /public/images/premium/

interface PageHero {
  title: string;
  src: string;
  alt: string;
}

export function getPageHero(page: string): PageHero {
  switch (page) {
    case "home":
      return {
        title: "AI Hero",
        src: "/images/premium/ai_hero_concept.png",
        alt: "Futuristic AI brain hero image for FrontDesk Command Center"
      };

    case "dashboard":
      return {
        title: "Business Impact",
        src: "/images/premium/business_impact_concept.png",
        alt: "Executive dashboard impact analysis"
      };

    case "demo":
      return {
        title: "Live Demo",
        src: "/images/premium/office_scene_15.png",
        alt: "Professional business AI receptionist demo session"
      };

    case "pricing":
      return {
        title: "Pricing Plans",
        src: "/images/premium/office_scene_18.png",
        alt: "Enterprise pricing visual for AI receptionist"
      };

    case "industries":
      return {
        title: "Industries We Serve",
        src: "/images/premium/office_scene_05.png",
        alt: "Teams and offices that use FrontDesk Agents"
      };

    default:
      return {
        title: "FrontDesk",
        src: "/images/premium/ai_hero_concept.png",
        alt: "FrontDesk AI image"
      };
  }
}
