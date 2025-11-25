"use client";

import Image from "next/image";
import { useState } from "react";
import AISetupForm from "../components/AISetupForm";

type Lang = "en" | "es";

export default function SetupPage() {
  const [lang, setLang] = useState<Lang>("en");

  const t =
    lang === "en"
      ? {
          title: "Set up your AI Receptionist",
          subtitle:
            "Tell FrontDesk Agents how your business works. You’ll have a trained receptionist in minutes.",
          helper:
            "You can change all of this later. This is just to get your first AI agent live quickly.",
          businessName: "Business name",
          website: "Website",
          receptionistName: "Receptionist name",
          purpose: "Main purpose"
        }
      : {
          title: "Configura tu Recepcionista de IA",
          subtitle:
            "Explícale a FrontDesk Agents cómo funciona tu negocio. Tendrás una recepcionista entrenada en minutos.",
          helper:
            "Todo se puede editar después. Esto es solo para poner tu primera agente de IA en producción rápido.",
          businessName: "Nombre del negocio",
          website: "Sitio web",
          receptionistName: "Nombre de la recepcionista",
          purpose: "Propósito principal"
        };

  const heroImage = lang === "en" ? "/setup-en.jpg" : "/setup-es.jpg";

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="nav-inner">
          <div className="nav-title">
            <span>FrontDesk Agents – Setup</span>
            <span className="nav-badge">Onboarding</span>
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

      <main className="setup-page">
        <div className="setup-layout">
          <aside className="setup-media">
            <div className="hero-media-image-wrapper">
              <Image
                src={heroImage}
                alt="AI Receptionist configuration dashboard"
                width={900}
                height={700}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </aside>

          <section className="setup-form-shell">
            <h1 className="setup-title">{t.title}</h1>
            <p className="setup-subtitle">{t.subtitle}</p>

            {/* Reutiliza tu formulario existente */}
            <AISetupForm
              labels={{
                businessName: t.businessName,
                website: t.website,
                receptionistName: t.receptionistName,
                purpose: t.purpose
              }}
            />

            <p className="form-helper">{t.helper}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
