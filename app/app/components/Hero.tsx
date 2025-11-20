"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { translations } from "@/lib/i18n";

export default function Hero() {
  const [language, setLanguage] = useState<"en" | "es">("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as "en" | "es";
    if (storedLang) setLanguage(storedLang);
  }, []);

  const t = translations[language];

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between w-full px-6 py-16 lg:py-24 bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-lg space-y-5 text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
          {t.heroTitle}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {t.heroSubtitle}
        </p>
        <button className="mt-4 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-lg transition">
          {t.trial}
        </button>
      </div>

      <div className="mt-10 lg:mt-0 lg:ml-10 w-full max-w-md">
        <Image
          src="/hero-receptionist.jpg"
          alt="AI Receptionist"
          width={600}
          height={400}
          className="rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}
