"use client";

import React from "react";
import Link from "next/link"; // Added Link for professional navigation
import {
  LanguageProvider,
  useLanguage,
} from "../../components/LanguageProvider";

// --- Sub-Component for the Page Content (Cinematic Styling Applied) ---
function NumbersSettingsContent() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    // Use the maximum width container and padding consistent with other settings pages
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-premium border border-gray-100">
        
        {/* Header Section */}
        <header className="flex items-center justify-between border-b pb-3 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {isEnglish
              ? "Phone Numbers & Routing Settings"
              : "Configuración de Números Telefónicos y Enrutamiento"}
          </h1>
          
          {/* Language Selector (Styled for polish) */}
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 text-sm rounded transition duration-150 ${
                isEnglish
                  ? "bg-primary-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              className={`px-3 py-1 text-sm rounded transition duration-150 ${
                !isEnglish
                  ? "bg-primary-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
          </div>
        </header>

        {/* Introduction / Info Section */}
        <section className="space-y-4 mb-8">
          <p className="text-gray-600">
            {isEnglish
              ? "Here you manage your Bland.ai and Twilio numbers, defining their function (inbound/outbound) and routing logic for specific lines (real estate, clinic, etc.)."
              : "Aquí gestiona sus números de Bland.ai y Twilio, definiendo su función (entrante/saliente) y la lógica de enrutamiento para líneas específicas (inmobiliaria, clínica, etc.)."}
          </p>
          <button className="btn-primary-premium px-4 py-2 text-sm">
            {isEnglish ? "Add New Phone Number" : "Agregar Nuevo Número"}
          </button>
        </section>

        {/* Numbers List (Cinematic Data Table Style) */}
        <section className="border rounded-xl overflow-hidden shadow-lg">
          <h2 className="font-bold text-xl p-4 bg-gray-50 border-b text-gray-900">
            {isEnglish ? "Active Numbers List" : "Lista de Números Activos"}
          </h2>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isEnglish ? "Number" : "Número"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isEnglish ? "Function / Label" : "Función / Etiqueta"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isEnglish ? "Provider" : "Proveedor"}
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">{isEnglish ? "Edit" : "Editar"}</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              
              {/* Row 1 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  +1 (346) 000-0000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {isEnglish ? "Outbound ALEX" : "ALEX Saliente"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bland.ai</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="#" className="text-primary-600 hover:text-primary-800">
                    {isEnglish ? "Edit Routing" : "Editar Enrutamiento"}
                  </Link>
                </td>
              </tr>
              
              {/* Row 2 */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  +1 (216) 480-4413
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {isEnglish ? "Inbound Website" : "Entrante Website"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Twilio</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href="#" className="text-primary-600 hover:text-primary-800">
                    {isEnglish ? "Edit Routing" : "Editar Enrutamiento"}
                  </Link>
                </td>
              </tr>
              
            </tbody>
          </table>
        </section>
        
      </div>
    </div>
  );
}

// --- Wrapper (Remains the same) ---
export default function NumbersSettingsPage() {
  return (
    <LanguageProvider>
      <NumbersSettingsContent />
    </LanguageProvider>
  );
}
