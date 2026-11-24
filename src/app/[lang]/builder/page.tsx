import React, { Suspense } from "react";
import type { Metadata } from "next";
import { normalizeLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildLocalizedMetadata } from "@/lib/seo/metadata";
import { BuilderWorkspace } from "@/components/cv/BuilderWorkspace";

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
    path: "/builder",
    title: dict.seo.builderTitle,
    description: dict.seo.builderDesc,
  });
}

export default function LocalizedBuilderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading BATAPRO CV Builder...</div>}>
      <BuilderWorkspace />
    </Suspense>
  );
}
