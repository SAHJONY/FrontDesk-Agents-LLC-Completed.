"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Lang = "en" | "es";

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("en");

  const t =
    lang === "en"
      ? {
          kicker: "AI Phone OS for real businesses",
          title: "Deploy your AI Receptionist in minutes.",
          subtitle:
            "FrontDesk Agents answers, qualifies and books appointments 24/7. No missed calls, no training, no headaches.",
          primaryCta: "Start 14-day free trial",
          secondaryCta: "See Command Center live",
          meta1: "4 continents using FrontDesk Agents",
          meta2: "Under 60 seconds to first booked call",
          heroTagLeft: "Live demo",
          heroTagRight: "Voice • WhatsApp • SMS",
          heroPill: "Real calls, real bookings – not a mockup.",
          howItWorksTitle: "From missed calls to fully booked calendars.",
          howItWorksSubtitle:
            "Plug in your existing numbers, calendar and CRM. The AI receptionist handles the rest.",
          steps: [
            {
              label: "Step 1",
              title: "Connect your numbers",
              body: "Forward your existing line or use dedicated AI numbers from Bland/Twilio in a few clicks."
            },
            {
              label: "Step 2",
              title: "Teach it your business",
              body: "Plain-language instructions: services, pricing, availability, FAQs. No scripts or prompts to code."
            },
            {
              label: "Step 3",
              title: "Watch bookings roll in",
              body: "Every call is logged with transcript, sentiment and outcome inside the Command Center."
            }
          ],
          useCasesTitle: "Who is this built for?",
          useCasesSubtitle:
            "High-intent calls where every missed ring is lost revenue.",
          footerLeft: "© " + new Date().getFullYear() + " FrontDesk Agents LLC",
          footerRight: "Made for clinics, law firms, home services and serious agencies."
        }
      : {
          kicker: "OS de Telefonía IA para negocios reales",
          title: "Implementa tu Recepcionista de IA en minutos.",
          subtitle:
            "FrontDesk Agents atiende, califica y agenda citas 24/7. Sin llamadas perdidas, sin capacitación, sin dolores de cabeza.",
          primaryCta: "Prueba gratis de 14 días",
          secondaryCta: "Ver Command Center en vivo",
          meta1: "Clientes en 4 continentes",
          meta2: "Menos de 60 segundos hasta la primera cita",
          heroTagLeft: "Demo en vivo",
          heroTagRight: "Voz • WhatsApp • SMS",
          heroPill: "Llamadas reales, citas reales – no es maqueta.",
          howItWorksTitle: "De llamadas perdidas a agenda llena.",
          howItWorksSubtitle:
            "Conecta tus números, calendario y CRM. La recepcionista de IA se encarga del resto.",
          steps: [
            {
              label: "Paso 1",
              title: "Conecta tus números",
              body: "Desvía tu línea actual o usa números dedicados de IA (Bland/Twilio) en pocos clics."
            },
            {
              label: "Paso 2",
              title: "Enséñale tu negocio",
              body: "Instrucciones en lenguaje normal: servicios, precios, horario, preguntas frecuentes."
            },
            {
              label: "Paso 3",
              title: "Observa las reservas llegar",
              body: "Cada llamada queda registrada con transcripción, sentimiento y resultado en el Command Center."
            }
          ],
          useCasesTitle: "¿Para quién está construido?",
          useCasesSubtitle:
            "Llamadas de alta intención donde cada timbre perdido es dinero perdido.",
          footerLeft:
            "© " + new Date().getFullYear() + " FrontDesk Agents LLC",
          footerRight: "Hecho para clínicas, despachos legales, servicios y agencias serias."
        };

  const heroImage = lang === "en" ? "/hero-en.jpg" : "/hero-es.jpg";

  return (
    <div className="app-shell">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-title">
            <span>FrontDesk Agents – Command Center</span>
            <span className="nav-badge">AI Phone OS</span>
          </div>
          <div className="nav-lang-toggle">
            <button
              className={
                "nav-lang-pill " + (lang === "en" ? "nav-lang-pill--active" : "")
              }
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              className={
                "nav-lang-pill " + (lang === "es" ? "nav-lang-pill--active" : "")
              }
              onClick={() => setLang("es")}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main>
        <section className="hero">
          <div>
            <div className="hero-kicker">
              <span className="hero-kicker-dot" />
              <span>{t.kicker}</span>
            </div>
            <h1 className="hero-title">{t.title}</h1>
            <p className="hero-subtitle">{t.subtitle}</p>

            <div className="hero-cta-row">
              <Link href="/setup">
                <button className="btn-primary">
                  {t.primaryCta}
                  <span>↗</span>
                </button>
              </Link>
              <Link href="/dashboard">
                <button className="btn-secondary">
                  <span>{t.secondaryCta}</span>
                </button>
              </Link>
            </div>

            <div className="hero-meta">
              <span>
                <strong>24/7</strong> AI receptionists
              </span>
              <span>{t.meta1}</span>
              <span>{t.meta2}</span>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-media-image-wrapper">
              <Image
                src={heroImage}
                alt="FrontDesk Agents AI receptionist dashboard"
                width={900}
                height={700}
                priority
                style={{ width: "100%", height: "auto" }}
              />
              <div className="hero-media-tag">
                <span>{t.heroTagLeft}</span>
                <span>•</span>
                <span>{t.heroTagRight}</span>
              </div>
              <div className="hero-media-pill">{t.heroPill}</div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section">
          <div className="section-header">
            <span className="section-kicker">
              {lang === "en" ? "How it works" : "Cómo funciona"}
            </span>
            <h2 className="section-title">{t.howItWorksTitle}</h2>
            <p className="section-subtitle">{t.howItWorksSubtitle}</p>
          </div>

          <div className="steps-grid">
            {t.steps.map((step) => (
              <article key={step.title} className="step-card">
                <div className="step-pill">{step.label}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-body">{step.body}</div>
              </article>
            ))}
          </div>
        </section>

        {/* USE CASES – estilo banners verticales */}
        <section className="section">
          <div className="section-header">
            <span className="section-kicker">
              {lang === "en" ? "Industries" : "Industrias"}
            </span>
            <h2 className="section-title">{t.useCasesTitle}</h2>
            <p className="section-subtitle">{t.useCasesSubtitle}</p>
          </div>

          <div className="usecases-grid">
            {/* Clinics */}
            <article className="usecase-card">
              <Image
                src="/usecase-clinic.jpg"
                alt="Clinic receptionist"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="usecase-inner">
                <div className="usecase-title">
                  {lang === "en"
                    ? "Clinics & medical practices"
                    : "Clínicas y consultorios"}
                </div>
                <div className="usecase-list">
                  {lang === "en"
                    ? "New patients, follow-ups, no-show reduction."
                    : "Pacientes nuevos, seguimientos, menos ausencias."}
                </div>
                <div className="usecase-cta">
                  {lang === "en" ? "Book more patients" : "Agenda más pacientes"}
                </div>
              </div>
            </article>

            {/* Home services */}
            <article className="usecase-card">
              <Image
                src="/usecase-services.jpg"
                alt="Home services"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="usecase-inner">
                <div className="usecase-title">
                  {lang === "en"
                    ? "Home services & repairs"
                    : "Servicios y reparaciones"}
                </div>
                <div className="usecase-list">
                  {lang === "en"
                    ? "Answer 24/7, dispatch jobs, capture every lead."
                    : "Atiende 24/7, agenda visitas y captura cada lead."}
                </div>
                <div className="usecase-cta">
                  {lang === "en" ? "Fill your calendar" : "Llena tu agenda"}
                </div>
              </div>
            </article>

            {/* Law firms */}
            <article className="usecase-card">
              <Image
                src="/usecase-law.jpg"
                alt="Law firm"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="usecase-inner">
                <div className="usecase-title">
                  {lang === "en" ? "Law firms" : "Despachos legales"}
                </div>
                <div className="usecase-list">
                  {lang === "en"
                    ? "Qualify consultations and book intakes in under a minute."
                    : "Califica consultas y agenda intakes en menos de un minuto."}
                </div>
                <div className="usecase-cta">
                  {lang === "en" ? "Qualify more cases" : "Califica más casos"}
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <span>{t.footerLeft}</span>
        <span>{t.footerRight}</span>
      </footer>
    </div>
  );
}
