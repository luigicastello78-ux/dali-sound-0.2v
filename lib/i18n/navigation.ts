import type { Locale } from "@/lib/i18n/locales";

export const localizedPath = (locale: Locale, path = ""): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `/${locale}` : `/${locale}${normalizedPath}`;
};

export const stripLocaleFromPathname = (
  pathname: string,
  locale: Locale,
): string => {
  const prefix = `/${locale}`;

  if (pathname === prefix) {
    return "";
  }

  if (pathname.startsWith(`${prefix}/`)) {
    return pathname.slice(prefix.length);
  }

  return pathname;
};
