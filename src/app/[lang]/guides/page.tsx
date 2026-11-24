import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { SEO_GUIDES } from "@/lib/seo/guides";

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
    path: "/guides",
    title: dict.seo.guidesTitle,
    description: dict.seo.guidesDesc,
  });
}

export default async function GuidesHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = normalizeLocale(raw);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
        <BookOpen className="h-3.5 w-3.5" /> BATAPRO Career &amp; ATS Knowledge Hub
      </div>
      <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        Resume, ATS &amp; International Hiring Guides (2026)
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Actionable, research-backed guides for Algeria, France, MENA/Gulf, Europe, and Canada.
      </p>

      <div className="mt-8 space-y-5">
        {SEO_GUIDES.map((guide) => (
          <article
            key={guide.slug}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="rounded bg-slate-100 px-2 py-0.5 font-bold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {guide.primaryLang}
              </span>
              <span>{guide.publishedAt}</span>
              <span>• {guide.readingMinutes} min read</span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              <Link href={`/${lang}/guides/${guide.slug}`} className="hover:text-emerald-600">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{guide.excerpt}</p>
            <div className="mt-4 flex items-center gap-4">
              <Link
                href={`/${lang}/guides/${guide.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
              >
                Read Full Article <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
              </Link>
              <Link
                href={`/${lang}/builder?template=${guide.recommendedTemplate}`}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300"
              >
                Use Recommended Free Template →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
