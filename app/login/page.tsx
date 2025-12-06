"use client";

import React from "react";
import {
  LanguageProvider,
  useLanguage,
} from "../components/LanguageProvider";

function LoginContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">
        {isEnglish ? "Log in to FrontDesk Agents" : "Inicia sesión en FrontDesk Agents"}
      </h1>
      <p className="text-slate-600 text-center max-w-md">
        {isEnglish
          ? "Simple placeholder login screen. Replace this with your real login form later."
          : "Pantalla de inicio de sesión de ejemplo. Luego puedes reemplazarla con tu formulario real."}
      </p>

      <form className="flex flex-col gap-3 w-full max-w-sm">
        <input
          type="email"
          className="border rounded px-3 py-2"
          placeholder={isEnglish ? "Email" : "Correo electrónico"}
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
          {isEnglish ? "Login" : "Entrar"}
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

export default function LoginPage() {
  return (
    <LanguageProvider>
      <LoginContent />
    </LanguageProvider>
  );
}
