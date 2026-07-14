import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalPageContent } from "@/components/layout/legal-page-content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return {
    title: `${dictionary.legal.termsTitle} | ${dictionary.brand}`,
  };
};

export default async function TermsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return (
    <LegalPageContent
      title={dictionary.legal.termsTitle}
      placeholder={dictionary.legal.placeholder}
    />
  );
}
