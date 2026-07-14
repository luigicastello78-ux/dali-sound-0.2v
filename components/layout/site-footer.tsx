import Link from "next/link";

import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export const SiteFooter = ({ locale, dictionary }: SiteFooterProps) => {
  const year = new Date().getFullYear();
  const copyright = dictionary.footer.copyright.replace(
    "{year}",
    String(year),
  );

  return (
    <footer className="border-t border-border/60 bg-card/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-3">
            <p className="font-heading text-lg font-bold text-foreground">
              {dictionary.brand}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {dictionary.footer.tagline}
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{dictionary.contact.phone}</p>
              <p>{dictionary.contact.email}</p>
              <p>{dictionary.contact.address}</p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-2">
            <Link
              href={localizedPath(locale, "/privacy")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {dictionary.footer.privacy}
            </Link>
            <Link
              href={localizedPath(locale, "/terms")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {dictionary.footer.terms}
            </Link>
            <Link
              href={localizedPath(locale, "/impressum")}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {dictionary.footer.impressum}
            </Link>
          </nav>
        </div>

        <p className="text-xs text-muted-foreground">{copyright}</p>
      </div>
    </footer>
  );
};
