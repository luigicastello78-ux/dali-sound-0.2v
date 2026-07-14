export const LOCALE_COOKIE = "NEXT_LOCALE";

export const locales = [
  "en",
  "de",
  "fr",
  "it",
  "es",
  "nl",
  "sr",
  "mk",
  "bg",
  "el",
  "ro",
  "pl",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type LocaleDefinition = {
  code: Locale;
  nativeName: string;
  englishName: string;
};

export const localeDefinitions: LocaleDefinition[] = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "de", nativeName: "Deutsch", englishName: "German" },
  { code: "fr", nativeName: "Français", englishName: "French" },
  { code: "it", nativeName: "Italiano", englishName: "Italian" },
  { code: "es", nativeName: "Español", englishName: "Spanish" },
  { code: "nl", nativeName: "Nederlands", englishName: "Dutch" },
  { code: "sr", nativeName: "Srpski", englishName: "Serbian" },
  { code: "mk", nativeName: "Македонски", englishName: "Macedonian" },
  { code: "bg", nativeName: "Български", englishName: "Bulgarian" },
  { code: "el", nativeName: "Ελληνικά", englishName: "Greek" },
  { code: "ro", nativeName: "Română", englishName: "Romanian" },
  { code: "pl", nativeName: "Polski", englishName: "Polish" },
];

export const isValidLocale = (value: string): value is Locale => {
  return locales.includes(value as Locale);
};

export const getLocaleDefinition = (locale: Locale): LocaleDefinition => {
  const definition = localeDefinitions.find((item) => item.code === locale);

  if (!definition) {
    throw new Error(`Unknown locale: ${locale}`);
  }

  return definition;
};
