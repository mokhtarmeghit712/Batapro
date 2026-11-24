export const SUPPORTED_LOCALES = ["en", "fr", "ar", "es", "de"] as const;
export type LanguageCode = (typeof SUPPORTED_LOCALES)[number];
export type Direction = "rtl" | "ltr";

export const DEFAULT_LOCALE: LanguageCode = "en";

export const LOCALE_META: Record<
  LanguageCode,
  { name: string; nativeName: string; dir: Direction; ogLocale: string }
> = {
  en: { name: "English", nativeName: "English", dir: "ltr", ogLocale: "en_US" },
  fr: { name: "French", nativeName: "Français", dir: "ltr", ogLocale: "fr_FR" },
  ar: { name: "Arabic", nativeName: "العربية", dir: "rtl", ogLocale: "ar_DZ" },
  es: { name: "Spanish", nativeName: "Español", dir: "ltr", ogLocale: "es_ES" },
  de: { name: "German", nativeName: "Deutsch", dir: "ltr", ogLocale: "de_DE" },
};

export function isSupportedLocale(value: string): value is LanguageCode {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(value?: string | null): LanguageCode {
  if (value && isSupportedLocale(value)) return value;
  return DEFAULT_LOCALE;
}

export function getDirectionForLang(lang: LanguageCode): Direction {
  return lang === "ar" ? "rtl" : "ltr";
}
