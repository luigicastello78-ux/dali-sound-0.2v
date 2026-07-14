import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type CatalogBreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const CatalogBreadcrumb = ({
  items,
  className,
}: CatalogBreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden>/</span> : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-foreground" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const buildEquipmentBreadcrumb = (
  locale: Locale,
  segments: BreadcrumbItem[],
): BreadcrumbItem[] => {
  return [
    { label: "Home", href: localizedPath(locale) },
    ...segments,
  ];
};
