import 'server-only'; // Ensures this only runs on the server for security

const dictionaries: any = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  vi: () => import('@/dictionaries/vi.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
  // Add other languages here as you scale
};

export const getDictionary = async (locale: string) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};
