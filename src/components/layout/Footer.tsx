import React from "react";
import Link from "next/link";
import { LanguageCode, LOCALE_META, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { SEO_GUIDES } from "@/lib/seo/guides";

export function Footer({ lang }: { lang: LanguageCode }) {
  return (
    <footer className="no-print border-t border-slate-200 bg-white py-12 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="text-base font-black text-slate-900 dark:text-white">
            BATA<span className="text-emerald-600">PRO</span>
          </div>
          <p className="mt-2 leading-relaxed">
            100% Free Forever ATS Resume &amp; CV Builder. Zero watermarks, Arabic RTL / French /
            English support, and instant selectable-text PDF downloads.
          </p>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Free Templates
          </h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href={`/${lang}/templates/ats`} className="hover:text-emerald-600">
                Strict ATS-Optimized Templates
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/templates/modern`} className="hover:text-emerald-600">
                Modern Two-Column Templates
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/templates/academic`} className="hover:text-emerald-600">
                Academic &amp; Stage PFE Templates
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/templates/regional`} className="hover:text-emerald-600">
                Canadian / Europass / Gulf Formats
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Career Guides
          </h3>
          <ul className="mt-3 space-y-2">
            {SEO_GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/${lang}/guides/${g.slug}`} className="hover:text-emerald-600">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Languages &amp; Crawlers
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORTED_LOCALES.map((code) => (
              <Link
                key={code}
                href={`/${code}`}
                className="rounded border border-slate-200 px-2 py-1 hover:border-emerald-500 dark:border-slate-800"
              >
                {LOCALE_META[code].nativeName}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-[11px]">
            <Link href="/sitemap.xml" className="hover:underline">
              sitemap.xml
            </Link>
            <Link href="/robots.txt" className="hover:underline">
              robots.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
