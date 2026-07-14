import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";

type ThankYouPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: ThankYouPageProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return {
    title: `${dictionary.thankYou.title} | ${dictionary.brand}`,
  };
};

export default async function ThankYouPage({ params }: ThankYouPageProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/15 text-2xl font-bold text-primary">
        ✓
      </div>
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {dictionary.thankYou.title}
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        {dictionary.thankYou.message}
      </p>
      <Link
        href={localizedPath(locale)}
        className={buttonVariants({ size: "lg", className: "mt-10" })}
      >
        {dictionary.thankYou.backHome}
      </Link>
    </div>
  );
}
