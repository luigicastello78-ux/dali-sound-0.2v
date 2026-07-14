import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

type CatalogCardProps = {
  href: string;
  title: string;
  description: string;
  image?: string;
  footerLabel?: string;
};

export const CatalogCard = ({
  href,
  title,
  description,
  image,
  footerLabel,
}: CatalogCardProps) => {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full overflow-hidden border-border/60 bg-card/50 transition-colors hover:border-primary/40 hover:bg-card">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border/60 bg-muted/20">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,oklch(0.2_0_0)_25%,transparent_25%,transparent_50%,oklch(0.2_0_0)_50%,oklch(0.2_0_0)_75%,transparent_75%,transparent)] bg-[length:16px_16px]">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {title}
              </span>
            </div>
          )}
        </div>
        <CardHeader className="gap-3">
          <CardTitle className="font-heading text-xl">{title}</CardTitle>
          <CardDescription className="leading-relaxed">
            {description}
          </CardDescription>
          {footerLabel ? (
            <span
              className={cn(
                "text-sm font-medium text-primary transition-transform",
                "group-hover:translate-x-0.5",
              )}
            >
              {footerLabel} →
            </span>
          ) : null}
        </CardHeader>
      </Card>
    </Link>
  );
};

export const getSubcategoryHref = (
  locale: Locale,
  categorySlug: string,
  subcategorySlug: string,
) => {
  return localizedPath(
    locale,
    `/equipment/${categorySlug}/${subcategorySlug}`,
  );
};

export const getProductHref = (
  locale: Locale,
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
) => {
  return localizedPath(
    locale,
    `/equipment/${categorySlug}/${subcategorySlug}/${productSlug}`,
  );
};
