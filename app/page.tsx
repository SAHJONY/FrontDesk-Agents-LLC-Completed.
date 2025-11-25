import Link from "next/link";
import Image from "next/image";

type Lang = "en" | "es";

function getLang(searchParams?: { lang?: string }): Lang {
  if (!searchParams?.lang) return "en";
  return searchParams.lang === "es" ? "es" : "en";
}

export default function HomePage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const lang = getLang(searchParams);

  const copy =
    lang === "en"
      ? {
          badge: "AI Receptionist · FrontDesk Agents LLC",
          title: "Deploy Your AI Receptionist in Minutes",
          subtitle:
            "Quickly set up an AI-powered receptionist for your business with just a few clicks.",
          cta: "Get Started",
          secondaryCta: "Watch how it works",
          localeSwitchLabel: "ES",
          localeCurrent: "EN",
        }
      : {
          badge: "Recepcionista de IA · FrontDesk Agents LLC",
          title: "Implementa Tu Recepcionista de IA en Minutos",
          subtitle:
            "Configura rápidamente una recepcionista impulsada por IA para tu negocio en línea.",
          cta: "Empezar",
          secondaryCta: "Ver cómo funciona",
          localeSwitchLabel: "EN",
          localeCurrent: "ES",
        };

  const otherLang: Lang = lang === "en" ? "es" : "en";

  return (
    <main className="fd-page fd-landing">
      {/* Top bar with language toggle */}
      <header className="fd-topbar">
        <div className="fd-topbar-left">
          <span className="fd-logo-mark">FD</span>
          <span className="fd-logo-text">FrontDesk Agents</span>
        </div>
        <div className="fd-topbar-right">
          <div className="fd-lang-toggle">
            <span className={lang === "en" ? "fd-lang-active" : ""}>EN</span>
            <span className="fd-lang-divider">|</span>
            <span className={lang === "es" ? "fd-lang-active" : ""}>ES</span>
          </div>
          <Link
            href={`/setup?lang=${lang}`}
            className="fd-topbar-button fd-topbar-button-primary"
          >
            {copy.cta}
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <section className="fd-hero">
        <div className="fd-hero-content">
          <span className="fd-badge">{copy.badge}</span>
          <h1 className="fd-hero-title">{copy.title}</h1>
          <p className="fd-hero-subtitle">{copy.subtitle}</p>

          <div className="fd-hero-actions">
            <Link
              href={`/setup?lang=${lang}`}
              className="fd-button fd-button-primary"
            >
              {copy.cta}
            </Link>
            <Link
              href={`/?lang=${otherLang}`}
              className="fd-button fd-button-ghost"
            >
              {copy.localeSwitchLabel}
            </Link>
          </div>

          <div className="fd-hero-trust">
            <p>
              24/7 AI receptionists for clinics, law firms, home services, and
              e-commerce brands.
            </p>
            <div className="fd-hero-metrics">
              <div>
                <span className="fd-metric-number">60s</span>
                <span className="fd-metric-label">to book a call</span>
              </div>
              <div>
                <span className="fd-metric-number">24/7</span>
                <span className="fd-metric-label">coverage</span>
              </div>
              <div>
                <span className="fd-metric-number">+30%</span>
                <span className="fd-metric-label">more appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero image – use your premium 4K receptionist artwork */}
        <div className="fd-hero-visual">
          <div className="fd-hero-image-frame">
            <Image
              src="/images/hero-receptionist.jpg"
              alt="AI receptionist answering calls"
              fill
              priority
              className="fd-hero-image"
            />
            <div className="fd-hero-chip fd-hero-chip-top">
              <span className="fd-chip-title">
                Turn calls into appointments
              </span>
              <span className="fd-chip-subtitle">in under 60 seconds</span>
            </div>
            <div className="fd-hero-chip fd-hero-chip-bottom">
              <span className="fd-chip-pill">Free 14-day trial</span>
              <span className="fd-chip-pill">No charges during the trial</span>
              <span className="fd-chip-pill">@frontdesk.agents</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stripe with verticals like your 6-card graphic */}
      <section className="fd-usecases">
        <h2 className="fd-section-title">
          Built for clinics, law firms, agencies, and home services.
        </h2>
        <div className="fd-usecase-grid">
          <article className="fd-usecase-card">
            <h3>Healthcare & Dental</h3>
            <p>Answer new patient calls 24/7 and book cleanings automatically.</p>
            <span className="fd-pill">Free 14-day trial</span>
          </article>
          <article className="fd-usecase-card">
            <h3>Hospitality</h3>
            <p>Capture direct bookings, upsell late check-out, and reduce no-shows.</p>
            <span className="fd-pill">No charges during trial</span>
          </article>
          <article className="fd-usecase-card">
            <h3>Home Services</h3>
            <p>Handle emergency calls, schedule visits, and win more jobs.</p>
            <span className="fd-pill">24/7 coverage</span>
          </article>
          <article className="fd-usecase-card">
            <h3>E-commerce</h3>
            <p>Recover abandoned carts and qualify buyers via phone & WhatsApp.</p>
            <span className="fd-pill">Omni-channel</span>
          </article>
          <article className="fd-usecase-card">
            <h3>Legal</h3>
            <p>Qualify leads, pre-screen cases, and book paid consultations.</p>
            <span className="fd-pill">Intake done</span>
          </article>
          <article className="fd-usecase-card">
            <h3>Multi-location brands</h3>
            <p>Central command center for all phone numbers and inboxes.</p>
            <span className="fd-pill">Command Center OS</span>
          </article>
        </div>
      </section>
    </main>
  );
}
