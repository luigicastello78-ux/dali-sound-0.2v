import Link from "next/link";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

type NavItem = {
  href: string;
  label: string;
};

export const SiteHeader = ({ locale, dictionary }: SiteHeaderProps) => {
  const homePath = localizedPath(locale);
  const navItems: NavItem[] = [
    { href: `${homePath}#equipment`, label: dictionary.nav.equipment },
    { href: `${homePath}#how-it-works`, label: dictionary.nav.howItWorks },
    { href: `${homePath}#gallery`, label: dictionary.nav.gallery },
    { href: `${homePath}#why-us`, label: dictionary.nav.whyUs },
    { href: `${homePath}#faq`, label: dictionary.nav.faq },
    { href: `${homePath}#contact`, label: dictionary.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={homePath}
            className="font-heading text-lg font-bold tracking-tight text-foreground"
          >
            <span className="text-primary">{dictionary.brand.split(" ")[0]}</span>{" "}
            <span>{dictionary.brand.split(" ").slice(1).join(" ")}</span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 xl:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors",
                  "hover:bg-muted/50 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`${homePath}#contact`}
              className={buttonVariants({ size: "sm" })}
            >
              {dictionary.nav.getQuote}
            </Link>
          </div>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex gap-1 overflow-x-auto pb-3 xl:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={`mobile-${item.href}`}
              href={item.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs text-muted-foreground transition-colors",
                "hover:bg-muted/50 hover:text-foreground sm:text-sm",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
