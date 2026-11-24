"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDirectionForLang, LanguageCode, SUPPORTED_LOCALES } from "@/lib/i18n/config";
import { DICTIONARIES, UiDictionary } from "@/lib/i18n/dictionaries";

export interface CloudUser {
  userId: string;
  email: string;
  fullName: string;
}

interface LangContextValue {
  lang: LanguageCode;
  dict: UiDictionary;
  theme: "light" | "dark";
  toggleTheme: () => void;
  switchLocale: (nextLang: LanguageCode) => void;
  cloudUser: CloudUser | null;
  refreshCloudUser: () => Promise<void>;
  logoutCloud: () => Promise<void>;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LangProvider({
  initialLang,
  children,
}: {
  initialLang: LanguageCode;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<LanguageCode>(initialLang);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [cloudUser, setCloudUser] = useState<CloudUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLang(initialLang);
    document.documentElement.lang = initialLang;
    document.documentElement.dir = getDirectionForLang(initialLang);
  }, [initialLang]);

  const refreshCloudUser = useCallback(async () => {
    try {
      const res = await fetch("/api/cloud/auth", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        setCloudUser(json.user ?? null);
      }
    } catch {
      // Optional cloud sync never blocks guest usage
    }
  }, []);

  const logoutCloud = useCallback(async () => {
    await fetch("/api/cloud/auth", { method: "DELETE" });
    setCloudUser(null);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("batapro_theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
    refreshCloudUser();
  }, [refreshCloudUser]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("batapro_theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  const switchLocale = useCallback(
    (nextLang: LanguageCode) => {
      document.cookie = `batapro_lang=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 0 && (SUPPORTED_LOCALES as readonly string[]).includes(segments[0])) {
        segments[0] = nextLang;
        router.push(`/${segments.join("/")}`);
      } else {
        router.push(`/${nextLang}`);
      }
    },
    [pathname, router]
  );

  const dict = DICTIONARIES[lang] ?? DICTIONARIES.en;

  return (
    <LangContext.Provider
      value={{
        lang,
        dict,
        theme,
        toggleTheme,
        switchLocale,
        cloudUser,
        refreshCloudUser,
        logoutCloud,
      }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
