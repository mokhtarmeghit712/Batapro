import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";
import "./globals.css";
import { getDirectionForLang, normalizeLocale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/metadata";

const latinFont = localFont({
  src: "../fonts/GoogleSans.ttf",
  variable: "--font-latin",
  display: "swap",
});

const arabicFont = localFont({
  src: [
    { path: "../fonts/tahoma.ttf", weight: "400", style: "normal" },
    { path: "../fonts/tahomabd.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BATAPRO — 100% Free ATS Resume & CV Builder",
    template: "%s",
  },
  description:
    "Create unlimited ATS-verified resumes and CVs 100% free with BATAPRO. Arabic RTL, French & English support, crisp vector PDF export.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hdrs = await headers();
  const lang = normalizeLocale(hdrs.get("x-batapro-lang"));
  const dir = getDirectionForLang(lang);

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning
      className={`${latinFont.variable} ${arabicFont.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
