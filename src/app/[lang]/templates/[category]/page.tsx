import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { normalizeLocale, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata, SITE_URL } from "@/lib/seo/metadata";
import { BUILTIN_TEMPLATES, CATEGORY_SEO_META } from "@/lib/templates/catalog";
import { JsonLd } from "@/components/seo/JsonLd";
import { TemplateCategory } from "@/types/cv";

const VALID_CATEGORIES: TemplateCategory[] = ["ats", "modern", "academic", "regional"];

export function generateStaticParams() {
  const params: { lang: string; category: string }[] = [];
  for (const lang of SUPPORTED_LOCALES) {
    for (const category of VALID_CATEGORIES) {
      params.push({ lang, category });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}): Promise<Metadata> {
  const { lang: raw, category } = await params;
  const lang = normalizeLocale(raw);
  if (!VALID_CATEGORIES.includes(category as TemplateCategory)) {
    return {};
  }
  const cat = category as TemplateCategory;
  const meta = CATEGORY_SEO_META[cat];
  const title = lang === "ar" ? meta.titleAr : lang === "fr" ? meta.titleFr : meta.titleEn;
  const description = lang === "ar" ? meta.descAr : lang === "fr" ? meta.descFr : meta.descEn;

  return buildLocalizedMetadata({
    lang,
    path: `/templates/${cat}`,
    title: `${title} | BATAPRO`,
    description,
  });
}

export default async function CategorySeoLandingPage({
  params,
}: {
  params: Promise<{ lang: string; category: string }>;
}) {
  const { lang: raw, category } = await params;
  const lang = normalizeLocale(raw);
  if (!VALID_CATEGORIES.includes(category as TemplateCategory)) {
    notFound();
  }
  const cat = category as TemplateCategory;
  const meta = CATEGORY_SEO_META[cat];
  const title = lang === "ar" ? meta.titleAr : lang === "fr" ? meta.titleFr : meta.titleEn;
  const description = lang === "ar" ? meta.descAr : lang === "fr" ? meta.descFr : meta.descEn;
  const items = BUILTIN_TEMPLATES.filter((t) => t.category === cat);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: `${SITE_URL}/${lang}/templates/${cat}`,
    isAccessibleForFree: true,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <div className="mb-4 text-xs text-slate-500">
        <Link href={`/${lang}/templates`} className="hover:text-emerald-600">
          All Free Templates
        </Link>{" "}
        / <span className="font-semibold uppercase">{cat}</span>
      </div>

      <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-400">{description}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tpl) => (
          <article
            key={tpl.slug}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                  {tpl.regionTag}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" /> ATS {tpl.atsScore}%
                </span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {lang === "ar" ? tpl.nameAr : lang === "fr" ? tpl.nameFr : tpl.name}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {tpl.description}
              </p>
            </div>
            <Link
              href={`/${lang}/builder?template=${tpl.slug}`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
            >
              Build Free with This Template
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
