"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { HERO_IMAGE } from "@/lib/home/images";
import { localeDefinitions, LOCALE_COOKIE } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";

type LanguageGateProps = {
  brand: string;
  title: string;
  subtitle: string;
};

const setLocaleCookie = (locale: Locale) => {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
};

export const LanguageGate = ({ brand, title, subtitle }: LanguageGateProps) => {
  const router = useRouter();

  const handleSelectLocale = (locale: Locale) => {
    setLocaleCookie(locale);
    router.push(`/${locale}`);
  };

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={HERO_IMAGE.src}
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <BrandLogo brand={brand} className="h-12 w-auto sm:h-14" priority />
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>

      <ul className="relative z-10 mt-12 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {localeDefinitions.map((locale) => (
          <li key={locale.code}>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-auto w-full flex-col items-start gap-1 border-border/60 bg-card/70 px-4 py-4 text-left backdrop-blur-sm hover:border-primary/50 hover:bg-card"
              onClick={() => handleSelectLocale(locale.code)}
            >
              <span className="text-base font-semibold text-foreground">
                {locale.nativeName}
              </span>
              <span className="text-sm font-normal text-muted-foreground">
                {locale.englishName}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
