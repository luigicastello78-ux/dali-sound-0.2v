import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GuitarIcon,
  KeyboardIcon,
  Mic01Icon,
  MusicNote01Icon,
  Speaker01Icon,
  VolumeHighIcon,
} from "@hugeicons/core-free-icons";

import { SectionShell } from "@/components/sections/section-shell";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { HomeCategory } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

type CategoriesSectionProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  viewProducts: string;
  items: HomeCategory[];
};

const categoryIcons: Record<string, typeof MusicNote01Icon> = {
  keyboards: KeyboardIcon,
  drums: MusicNote01Icon,
  guitars: GuitarIcon,
  speakers: Speaker01Icon,
  mixers: VolumeHighIcon,
  microphones: Mic01Icon,
};

export const CategoriesSection = ({
  locale,
  title,
  subtitle,
  viewProducts,
  items,
}: CategoriesSectionProps) => {
  return (
    <SectionShell id="equipment">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((category) => {
          const Icon = categoryIcons[category.slug] ?? MusicNote01Icon;

          return (
            <Link
              key={category.slug}
              href={localizedPath(locale, `/equipment/${category.slug}`)}
              className="group block h-full"
            >
              <Card className="h-full border-border/60 bg-card/50 transition-colors hover:border-primary/40 hover:bg-card">
                <CardHeader className="gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <HugeiconsIcon icon={Icon} strokeWidth={2} />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="font-heading text-xl">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {category.description}
                    </CardDescription>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium text-primary transition-transform",
                      "group-hover:translate-x-0.5",
                    )}
                  >
                    {viewProducts} →
                  </span>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </SectionShell>
  );
};
