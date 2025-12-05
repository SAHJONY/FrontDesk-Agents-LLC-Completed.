// app/config/branding.ts

export const BRAND = {
  name: "FrontDesk Agents",
  tagline: "AI Receptionist • 24/7",
  primaryColor: "#009FE3",
  primaryColorDark: "#0074A8",
  accentColor: "#10B981",
  bgLight: "#F3F4F6",
  bgDark: "#020617",
  textMainLight: "#0F172A",
  textMutedLight: "#6B7280",
  textMainDark: "#E5E7EB",
  textMutedDark: "#9CA3AF",
  heroImage: "/images/premium/hero-frontdesk.jpg", // usa un path que exista en /public
  logoLight: "/images/logo/frontdesk-light.svg",
  logoDark: "/images/logo/frontdesk-dark.svg",
};

export type BrandConfig = typeof BRAND
