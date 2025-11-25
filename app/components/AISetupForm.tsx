"use client";

import { FormEvent, useState } from "react";

type Lang = "en" | "es";

export default function AISetupForm({ lang }: { lang: Lang }) {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [agentName, setAgentName] = useState("");
  const [purpose, setPurpose] = useState("");

  const isSpanish = lang === "es";

  const labels = {
    businessName: isSpanish ? "Nombre del Negocio" : "Business Name",
    website: isSpanish ? "Sitio Web" : "Website",
    agentName: isSpanish ? "Nombre de la Recepcionista" : "Receptionist Name",
    purpose: isSpanish ? "Propósito Principal" : "Main Purpose",
    button: isSpanish ? "Continuar" : "Continue",
    helper: isSpanish
      ? "Estos datos se usarán para personalizar saludos y mensajes."
      : "We’ll use this to personalize greetings and messages.",
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // For now we just log – in production this would call your API / Airtable / etc.
    console.log("AI setup submitted", {
      businessName,
      website,
      agentName,
      purpose,
    });
    alert(
      isSpanish
        ? "Configuración guardada para la demo interna."
        : "Configuration saved for the internal demo."
    );
  }

  return (
    <form className="fd-form" onSubmit={handleSubmit}>
      <label className="fd-form-field">
        <span>{labels.businessName}</span>
        <input
          className="fd-input"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder={
            isSpanish ? "Clínica Sonrisas Miami" : "Downtown Dental Clinic"
          }
        />
      </label>

      <label className="fd-form-field">
        <span>{labels.website}</span>
        <input
          className="fd-input"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://yourclinic.com"
        />
      </label>

      <label className="fd-form-field">
        <span>{labels.agentName}</span>
        <input
          className="fd-input"
          value={agentName}
          onChange={(e) => setAgentName(e.target.value)}
          placeholder={isSpanish ? "SARA" : "SARA"}
        />
      </label>

      <label className="fd-form-field">
        <span>{labels.purpose}</span>
        <input
          className="fd-input"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder={
            isSpanish
              ? "Convertir llamadas en citas en menos de 60 segundos"
              : "Turn calls into booked appointments in 60 seconds"
          }
        />
      </label>

      <p className="fd-form-helper">{labels.helper}</p>

      <button type="submit" className="fd-button fd-button-primary fd-form-cta">
        {labels.button}
      </button>
    </form>
  );
}
