"use client";

import { useState } from "react";

const LanguageSwitcher = () => {
  const [lang, setLang] = useState("en");

  return (
    <div className="inline-flex items-center">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="rounded-md border border-gray-200 bg-white py-1 px-2 text-sm"
        aria-label="Seleccionar idioma"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
