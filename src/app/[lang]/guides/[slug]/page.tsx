import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { getDirectionForLang, normalizeLocale, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata, SITE_URL } from "@/lib/seo/metadata";
import { getGuideBySlug, SEO_GUIDES } from "@/lib/seo/guides";
import { JsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of SUPPORTED_LOCALES) {
    for (const g of SEO_GUIDES) {
      params.push({ lang, slug: g.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = normalizeLocale(raw);
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildLocalizedMetadata({
    lang,
    path: `/guides/${guide.slug}`,
    title: `${guide.title} | BATAPRO`,
    description: guide.excerpt,
    keywords: guide.keywords,
    type: "article",
  });
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = normalizeLocale(raw);
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: guide.publishedAt,
    author: { "@type": "Organization", name: "BATAPRO Career Team" },
    publisher: { "@type": "Organization", name: "BATAPRO", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/${lang}/guides/${guide.slug}`,
  };

  return (
    <article
      dir={getDirectionForLang(guide.primaryLang)}
      className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <JsonLd data={articleJsonLd} />

      <div className="mb-6 text-xs text-slate-500">
        <Link href={`/${lang}/guides`} className="hover:text-emerald-600">
          Career Guides
        </Link>{" "}
        / <span>{guide.publishedAt}</span> • <span>{guide.readingMinutes} min read</span>
      </div>

      <h1 className="text-3xl font-black leading-tight text-slate-900 dark:text-white sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {guide.excerpt}
      </p>

      <div className="mt-8 space-y-8 border-t border-slate-200 pt-8 dark:border-slate-800">
        {guide.sections.map((sec) => (
          <section key={sec.heading}>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{sec.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {sec.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            {sec.bullets && (
              <ul className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs dark:border-slate-800 dark:bg-slate-900">
                {sec.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 dark:border-emerald-900/60 dark:bg-emerald-950/30">
        <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
          <Sparkles className="h-4 w-4 text-emerald-600" />
          Apply This Guide 100% Free in BATAPRO
        </h3>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          Open our recommended template in the live split-screen editor and export your crisp ATS PDF with zero watermarks.
        </p>
        <Link
          href={`/${lang}/builder?template=${guide.recommendedTemplate}`}
          className="mt-4 inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
        >
          Open Free Template Now →
        </Link>
      </div>
    </article>
  );
}
