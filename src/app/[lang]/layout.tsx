import React from "react";
import { notFound } from "next/navigation";
import { isSupportedLocale, LanguageCode, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { LangProvider } from "@/components/providers/LangProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLocale(lang)) {
    notFound();
  }

  return (
    <LangProvider initialLang={lang as LanguageCode}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer lang={lang as LanguageCode} />
    </LangProvider>
  );
}
