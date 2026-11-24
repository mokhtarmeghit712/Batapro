import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo/metadata";
import { SEO_GUIDES } from "@/lib/seo/guides";
import { TemplateCategory } from "@/types/cv";

const CATEGORIES: TemplateCategory[] = ["ats", "modern", "academic", "regional"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const buildAlternates = (subPath: string) => {
    const languages: Record<string, string> = {};
    for (const l of SUPPORTED_LOCALES) {
      languages[l] = `${SITE_URL}/${l}${subPath}`;
    }
    return { languages };
  };

  for (const lang of SUPPORTED_LOCALES) {
    // 1. Localized Homepages
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: buildAlternates(""),
    });

    // 2. Main Free Templates Gallery & Builder & Guides Hub
    for (const route of [
      { path: "/templates", priority: 0.9 },
      { path: "/builder", priority: 0.95 },
      { path: "/guides", priority: 0.85 },
    ]) {
      entries.push({
        url: `${SITE_URL}/${lang}${route.path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: route.priority,
        alternates: buildAlternates(route.path),
      });
    }

    // 3. SEO Category Landing Pages
    for (const cat of CATEGORIES) {
      const subPath = `/templates/${cat}`;
      entries.push({
        url: `${SITE_URL}/${lang}${subPath}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: buildAlternates(subPath),
      });
    }

    // 4. SEO Career Guide Articles
    for (const guide of SEO_GUIDES) {
      const subPath = `/guides/${guide.slug}`;
      entries.push({
        url: `${SITE_URL}/${lang}${subPath}`,
        lastModified: new Date(guide.publishedAt),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: buildAlternates(subPath),
      });
    }
  }

  return entries;
}
