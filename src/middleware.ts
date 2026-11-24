import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isSupportedLocale } from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/fonts") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/opengraph-image" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && isSupportedLocale(firstSegment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-batapro-lang", firstSegment);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Detect preferred locale from cookie or Accept-Language header
  const cookieLang = request.cookies.get("batapro_lang")?.value;
  let targetLang = DEFAULT_LOCALE;
  if (cookieLang && isSupportedLocale(cookieLang)) {
    targetLang = cookieLang;
  } else {
    const acceptLang = request.headers.get("accept-language")?.toLowerCase() || "";
    if (acceptLang.startsWith("ar")) targetLang = "ar";
    else if (acceptLang.startsWith("fr")) targetLang = "fr";
    else if (acceptLang.startsWith("es")) targetLang = "es";
    else if (acceptLang.startsWith("de")) targetLang = "de";
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
