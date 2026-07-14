import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE,
} from "@/lib/i18n/locales";

const PUBLIC_FILE = /\.[^/]+$/;

const getLocaleFromPathname = (pathname: string): string | null => {
  const segment = pathname.split("/")[1];

  if (segment && isValidLocale(segment)) {
    return segment;
  }

  return null;
};

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/uploads") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/select-language") {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPathname(pathname);
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (pathname === "/") {
    if (cookieLocale && isValidLocale(cookieLocale)) {
      return NextResponse.redirect(new URL(`/${cookieLocale}`, request.url));
    }

    return NextResponse.redirect(new URL("/select-language", request.url));
  }

  if (!pathnameLocale) {
    if (cookieLocale && isValidLocale(cookieLocale)) {
      return NextResponse.redirect(
        new URL(`/${cookieLocale}${pathname}`, request.url),
      );
    }

    return NextResponse.redirect(new URL("/select-language", request.url));
  }

  if (!cookieLocale) {
    return NextResponse.redirect(new URL("/select-language", request.url));
  }

  const response = NextResponse.next();

  if (cookieLocale !== pathnameLocale) {
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
