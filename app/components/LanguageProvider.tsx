"use client";

import {
  LanguageProvider as RootLanguageProvider,
  useLanguage,
} from "@/contexts/LanguageContext";

const LanguageProvider = RootLanguageProvider;

export { LanguageProvider as default, useLanguage };
