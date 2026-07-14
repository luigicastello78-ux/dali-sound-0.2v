"use client";

import { usePathname, useRouter } from "next/navigation";

import { localeDefinitions } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { LOCALE_COOKIE } from "@/lib/i18n/locales";
import { stripLocaleFromPathname } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

const setLocaleCookie = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
};

export const LanguageSwitcher = ({
  locale,
  className,
}: LanguageSwitcherProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = localeDefinitions.find((item) => item.code === locale);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as Locale;
    const pathWithoutLocale = stripLocaleFromPathname(pathname, locale);
    setLocaleCookie(nextLocale);
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  return (
    <label className={cn("inline-flex items-center gap-2", className)}>
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={handleChange}
        aria-label="Select language"
        className="h-9 rounded-md border border-border/60 bg-card/80 px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {localeDefinitions.map((item) => (
          <option key={item.code} value={item.code}>
            {item.code.toUpperCase()} — {item.nativeName}
          </option>
        ))}
      </select>
      {currentLocale ? (
        <span className="hidden text-sm text-muted-foreground lg:inline">
          {currentLocale.nativeName}
        </span>
      ) : null}
    </label>
  );
};
