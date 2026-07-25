import Image from "next/image";
import Link from "next/link";

import { SectionShell } from "@/components/sections/section-shell";
import { buttonVariants } from "@/components/ui/button";
import { HERO_IMAGE } from "@/lib/home/images";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["home"]["hero"];
};

export const HeroSection = ({ locale, content }: HeroSectionProps) => {
  const homePath = localizedPath(locale);

  return (
    <SectionShell className="pt-8 sm:pt-12">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {content.headline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              {content.subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`${homePath}#contact`}
              className={buttonVariants({ size: "lg" })}
            >
              {content.ctaPrimary}
            </Link>
            <Link
              href={`${homePath}#equipment`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {content.ctaSecondary}
            </Link>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-border/60 pt-8">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl border border-border/60 sm:h-80 lg:h-[22rem]">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/20 to-primary/20" />
        </div>
      </div>
    </SectionShell>
  );
};
