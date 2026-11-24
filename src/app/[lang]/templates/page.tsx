import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildLocalizedMetadata, SITE_URL } from "@/lib/seo/metadata";
import { BUILTIN_TEMPLATES } from "@/lib/templates/catalog";
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
    path: "/templates",
    title: dict.seo.templatesTitle,
    description: dict.seo.templatesDesc,
  });
}

const CATEGORY_LINKS: { id: TemplateCategory; label: string }[] = [
  { id: "ats", label: "Strict ATS-Optimized" },
  { id: "modern", label: "Modern Professional" },
  { id: "academic", label: "Academic & Stage (PFE)" },
  { id: "regional", label: "Canadian / European / Gulf" },
];

export default async function TemplatesGalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = normalizeLocale(raw);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BATAPRO 100% Free Resume Templates",
    itemListElement: BUILTIN_TEMPLATES.map((t, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: t.name,
      url: `${SITE_URL}/${lang}/builder?template=${t.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd data={itemListJsonLd} />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" /> 100% Free Unlimited Downloads
          </span>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Free ATS &amp; Professional Resume Templates
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Every template supports Arabic (RTL), French, English, Spanish &amp; German with selectable vector PDF export.
          </p>
        </div>

        <Link
          href={`/${lang}/builder`}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500"
        >
          Open Live Builder
        </Link>
      </div>

      <nav aria-label="Template categories" className="mt-8 flex flex-wrap gap-2">
        <span className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white dark:bg-emerald-600">
          All ({BUILTIN_TEMPLATES.length})
        </span>
        {CATEGORY_LINKS.map((cat) => (
          <Link
            key={cat.id}
            href={`/${lang}/templates/${cat.id}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BUILTIN_TEMPLATES.map((tpl) => {
          const title = lang === "ar" ? tpl.nameAr : lang === "fr" ? tpl.nameFr : tpl.name;
          return (
            <article
              key={tpl.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="mb-5 h-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
                  <div className="h-4 w-2/3 rounded" style={{ backgroundColor: tpl.accentColor }} />
                  <div className="mt-1.5 h-2 w-1/3 rounded bg-slate-300 dark:bg-slate-700" />
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="col-span-2 space-y-1.5">
                      <div className="h-2 w-full rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-2 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
                      <div className="h-2 w-4/6 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                    <div className="col-span-1 space-y-1.5">
                      <div
                        className="h-2 w-full rounded opacity-40"
                        style={{ backgroundColor: tpl.accentColor }}
                      />
                      <div className="h-2 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {tpl.regionTag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> ATS {tpl.atsScore}%
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {tpl.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                <span className="text-xs font-bold text-emerald-600">Free PDF • No Watermark</span>
                <Link
                  href={`/${lang}/builder?template=${tpl.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  Use Free Template
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
