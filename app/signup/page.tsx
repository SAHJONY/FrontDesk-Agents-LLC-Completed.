"use client";

import React from "react";
import {
  LanguageProvider,
  useLanguage,
} from "../components/LanguageProvider";

function SignupContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">
        {isEnglish
          ? "Create your FrontDesk Agents account"
          : "Crea tu cuenta de FrontDesk Agents"}
      </h1>
      <p className="text-slate-600 text-center max-w-md">
        {isEnglish
          ? "Placeholder signup screen. Add billing and onboarding flows later."
          : "Pantalla de registro de ejemplo. Luego puedes añadir el flujo real de alta y pago."}
      </p>

      <form className="flex flex-col gap-3 w-full max-w-sm">
        <input
          className="border rounded px-3 py-2"
          placeholder={isEnglish ? "Full name" : "Nombre completo"}
        />
        <input
          type="email"
          className="border rounded px-3 py-2"
          placeholder={isEnglish ? "Work email" : "Correo de trabajo"}
        />
        <input
          type="password"
          className="border rounded px-3 py-2"
          placeholder={isEnglish ? "Password" : "Contraseña"}
        />
        <button
          type="submit"
          className="mt-2 rounded px-4 py-2 bg-black text-white"
        >
          {isEnglish ? "Create account" : "Crear cuenta"}
        </button>
      </form>

      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded border ${
            isEnglish ? "font-semibold" : ""
          }`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            !isEnglish ? "font-semibold" : ""
          }`}
          onClick={() => setLanguage("es")}
        >
          Español
        </button>
      </div>
    </main>
  );
}

export default function SignupPage() {
  return (
    <LanguageProvider>
      <SignupContent />
    </LanguageProvider>
  );
}
