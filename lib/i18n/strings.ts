export type Locale = "en" | "es";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALES: Locale[] = ["en", "es"];

export const STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    nav_solutions: "Solutions",
    nav_pricing: "Pricing",
    nav_demo: "Watch Demo",
    nav_support: "Support",
    nav_login: "Login",
    nav_signup: "Sign up",
    nav_dashboard: "Dashboard",
    sol_law: "Law Firms",
    sol_med: "Medical Clinics",
    sol_pm: "Property Management",
    auth_welcome_back: "Welcome back",
    auth_create_account: "Create your account",
    auth_email: "Email",
    auth_password: "Password",
    auth_continue: "Continue",
  },
  es: {
    nav_solutions: "Soluciones",
    nav_pricing: "Precios",
    nav_demo: "Ver demo",
    nav_support: "Soporte",
    nav_login: "Iniciar sesión",
    nav_signup: "Crear cuenta",
    nav_dashboard: "Panel",
    sol_law: "Bufetes",
    sol_med: "Clínicas",
    sol_pm: "Administración de propiedades",
    auth_welcome_back: "Bienvenido de nuevo",
    auth_create_account: "Crea tu cuenta",
    auth_email: "Correo",
    auth_password: "Contraseña",
    auth_continue: "Continuar",
  },
};

export function t(locale: Locale, key: string): string {
  return STRINGS[locale]?.[key] ?? STRINGS[DEFAULT_LOCALE][key] ?? key;
}