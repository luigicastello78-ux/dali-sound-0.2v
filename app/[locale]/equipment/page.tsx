import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  CatalogCard,
} from "@/components/equipment/catalog-card";
import { getCategories } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, locales } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";

type EquipmentIndexPageProps = {
  params: Promise<{ locale: string }>;
};

export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

export const generateMetadata = async ({
  params,
}: EquipmentIndexPageProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return {
    title: `${dictionary.catalog.equipment} | ${dictionary.brand}`,
    description: dictionary.meta.description,
  };
};

export default async function EquipmentIndexPage({
  params,
}: EquipmentIndexPageProps) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const categories = getCategories(locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-4">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {dictionary.catalog.equipment}
        </h1>
        <p className="text-lg text-muted-foreground">
          {dictionary.home.categories.subtitle}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CatalogCard
            key={category.slug}
            href={localizedPath(locale, `/equipment/${category.slug}`)}
            title={category.name}
            description={category.description}
            image={category.image}
            footerLabel={dictionary.home.categories.viewProducts}
          />
        ))}
      </div>
    </div>
  );
}
