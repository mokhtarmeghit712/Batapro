import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Sparkles,
  Layers,
  BookOpen,
  Zap,
} from "lucide-react";
import { normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  buildFaqJsonLd,
  buildHowToJsonLd,
  buildLocalizedMetadata,
  buildWebAppJsonLd,
} from "@/lib/seo/metadata";
import { BUILTIN_TEMPLATES, CATEGORY_SEO_META } from "@/lib/templates/catalog";
import { SEO_GUIDES } from "@/lib/seo/guides";
import { JsonLd } from "@/components/seo/JsonLd";
import { TemplateCategory } from "@/types/cv";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = normalizeLocale(raw);
  const dict = getDictionary(lang);
  return buildLocalizedMetadata({
    lang,
    path: "",
    title: dict.seo.homeTitle,
    description: dict.seo.homeDesc,
  });
}

const CATEGORIES: TemplateCategory[] = ["ats", "modern", "academic", "regional"];

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = normalizeLocale(raw);
  const dict = getDictionary(lang);

  const getCategoryTitle = (cat: TemplateCategory) => {
    const m = CATEGORY_SEO_META[cat];
    if (lang === "ar") return m.titleAr;
    if (lang === "fr") return m.titleFr;
    return m.titleEn;
  };

  const getCategoryDesc = (cat: TemplateCategory) => {
    const m = CATEGORY_SEO_META[cat];
    if (lang === "ar") return m.descAr;
    if (lang === "fr") return m.descFr;
    return m.descEn;
  };

  return (
    <>
      <JsonLd data={buildWebAppJsonLd(lang)} />
      <JsonLd data={buildHowToJsonLd(lang)} />
      <JsonLd data={buildFaqJsonLd(lang)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-transparent to-transparent dark:from-emerald-950/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" />
              {dict.hero.badge}
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {dict.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={`/${lang}/builder`}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
              >
                {dict.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Link>
              <Link
                href={`/${lang}/templates`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                <Layers className="h-4 w-4" />
                {dict.hero.ctaSecondary}
              </Link>
            </div>

            <p className="mt-5 text-xs font-medium text-slate-500 dark:text-slate-400">
              {dict.hero.trustNote}
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <Zap className="h-6 w-6 text-emerald-600" />
              <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                100% Free Forever
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Zero paywalls, zero trials, zero watermarks. Build and export unlimited resumes.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <Globe2 className="h-6 w-6 text-teal-600" />
              <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                Arabic RTL, French &amp; English
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Automatic RTL/LTR mirroring and localized SEO routes (/ar, /fr, /en, /es, /de).
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <FileCheck2 className="h-6 w-6 text-blue-600" />
              <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                Crisp Selectable ATS PDF
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                True vector PDF text that Workday, Greenhouse &amp; Taleo parse with 99% accuracy.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <h2 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                Free AI Bullet Enhancer
              </h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                Rewrite basic job duties into quantified action-verb achievements in one click.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SEO Template Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {BUILTIN_TEMPLATES.length} Free ATS &amp; Regional CV Templates
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Dedicated formats for Algeria/MENA Stage PFE, Europe Europass, Canada &amp; Global Tech.
            </p>
          </div>
          <Link
            href={`/${lang}/templates`}
            className="text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
          >
            {dict.hero.ctaSecondary} →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/${lang}/templates/${cat}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold uppercase text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                100% Free • {cat}
              </span>
              <h3 className="mt-3 text-base font-bold text-slate-900 group-hover:text-emerald-600 dark:text-white">
                {getCategoryTitle(cat)}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {getCategoryDesc(cat)}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How-To 3 Steps */}
      <section className="border-y border-slate-200/80 bg-white py-14 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
            Create Your Job-Winning Resume in 3 Free Steps
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {dict.howToSteps.map((step, i) => (
              <div
                key={step.name}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  {step.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Guides Hub Preview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              ATS &amp; Career Guides (2026)
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Expert guides for Algerian, MENA, French, European, and North American job seekers.
            </p>
          </div>
          <Link
            href={`/${lang}/guides`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:underline"
          >
            <BookOpen className="h-4 w-4" />
            All Career Guides →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SEO_GUIDES.map((g) => (
            <article
              key={g.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <span className="text-[11px] font-bold uppercase text-emerald-600">
                  {g.primaryLang.toUpperCase()} • {g.readingMinutes} min read
                </span>
                <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                  <Link href={`/${lang}/guides/${g.slug}`} className="hover:text-emerald-600">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {g.excerpt}
                </p>
              </div>
              <Link
                href={`/${lang}/guides/${g.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
              >
                Read Guide <ArrowRight className="h-3 w-3 rtl:rotate-180" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section (Matches FAQPage JSON-LD) */}
      <section className="border-t border-slate-200/80 bg-white py-14 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            {dict.faq.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  {item.q}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
