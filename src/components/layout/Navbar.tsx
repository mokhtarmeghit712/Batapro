"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Globe, Moon, Sun, Sparkles, Cloud } from "lucide-react";
import { useLang } from "@/components/providers/LangProvider";
import { LanguageCode, LOCALE_META, SUPPORTED_LOCALES } from "@/lib/i18n/config";

export function Navbar() {
  const { lang, dict, theme, toggleTheme, switchLocale, cloudUser } = useLang();
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname.startsWith(href)
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    }`;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href={`/${lang}`} className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                BATA<span className="text-emerald-600 dark:text-emerald-400">PRO</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {dict.nav.freeBadge}
              </span>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-5 md:flex">
            <Link href={`/${lang}/templates`} className={linkClass(`/${lang}/templates`)}>
              {dict.nav.templates}
            </Link>
            <Link href={`/${lang}/builder`} className={linkClass(`/${lang}/builder`)}>
              {dict.nav.builder}
            </Link>
            <Link href={`/${lang}/guides`} className={linkClass(`/${lang}/guides`)}>
              {dict.nav.guides}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          {cloudUser && (
            <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 sm:inline-flex">
              <Cloud className="h-3 w-3" />
              {cloudUser.fullName.split(" ")[0]}
            </span>
          )}

          {/* Localized URL Switcher (/ar, /fr, /en, /es, /de) */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 dark:border-slate-800 dark:bg-slate-900">
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => switchLocale(e.target.value as LanguageCode)}
              className="bg-transparent text-xs font-semibold text-slate-700 outline-none dark:text-slate-200"
            >
              {SUPPORTED_LOCALES.map((code) => (
                <option key={code} value={code} className="dark:bg-slate-900">
                  {LOCALE_META[code].nativeName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href={`/${lang}/builder`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-500"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {dict.nav.builder}
          </Link>
        </div>
      </div>
    </header>
  );
}
