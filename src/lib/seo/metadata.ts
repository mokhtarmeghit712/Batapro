import type { Metadata } from "next";
import { LanguageCode, LOCALE_META, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://batapro.app";

export function buildLocalizedMetadata(params: {
  lang: LanguageCode;
  path: string; // e.g. "" or "/templates" or "/guides/how-to-pass-ats-2026"
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
}): Metadata {
  const { lang, path, title, description, keywords, type = "website" } = params;
  const normalizedPath = path.startsWith("/") || path === "" ? path : `/${path}`;
  const canonical = `${SITE_URL}/${lang}${normalizedPath}`;

  const languageAlternates: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languageAlternates[l] = `${SITE_URL}/${l}${normalizedPath}`;
  }
  languageAlternates["x-default"] = `${SITE_URL}/en${normalizedPath}`;

  return {
    title,
    description,
    keywords:
      keywords ?? [
        "BATAPRO",
        "free CV builder",
        "ATS resume builder",
        "modèle CV gratuit Algérie",
        "سيرة ذاتية مجانية",
        "Arabic RTL CV",
        "PDF resume free",
      ],
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "BATAPRO",
      locale: LOCALE_META[lang].ogLocale,
      type,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "BATAPRO — 100% Free ATS Resume & CV Builder",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function buildWebAppJsonLd(lang: LanguageCode) {
  const dict = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: "BATAPRO",
    url: `${SITE_URL}/${lang}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (Web Browser)",
    inLanguage: SUPPORTED_LOCALES,
    isAccessibleForFree: true,
    description: dict.seo.homeDesc,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "100% Free Forever ATS Resume Builder",
      "Arabic RTL, French, English, Spanish & German support",
      "Selectable-text Vector A4 PDF Export",
      "Free AI Achievement Bullet Enhancer",
      "Instant LocalStorage Auto-Save",
    ],
  };
}

export function buildHowToJsonLd(lang: LanguageCode) {
  const dict = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: dict.seo.homeTitle,
    description: dict.seo.homeDesc,
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    step: dict.howToSteps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}/${lang}/builder`,
    })),
  };
}

export function buildFaqJsonLd(lang: LanguageCode) {
  const dict = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
