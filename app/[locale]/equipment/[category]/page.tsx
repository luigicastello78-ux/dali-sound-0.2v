import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  buildEquipmentBreadcrumb,
  CatalogBreadcrumb,
} from "@/components/equipment/catalog-breadcrumb";
import {
  CatalogCard,
  getSubcategoryHref,
} from "@/components/equipment/catalog-card";
import { buttonVariants } from "@/components/ui/button";
import { getCategory, getSubcategories } from "@/lib/content";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, locales } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";
import { getAllCategorySlugs } from "@/lib/content/catalog";

type CategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export const generateStaticParams = () => {
  const categories = getAllCategorySlugs();

  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category })),
  );
};

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { locale: localeParam, category: categorySlug } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const category = getCategory(categorySlug, localeParam as Locale);

  if (!category) {
    return {};
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return {
    title: `${category.name} | ${dictionary.brand}`,
    description: category.description,
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { locale: localeParam, category: categorySlug } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const category = getCategory(categorySlug, locale);

  if (!category) {
    notFound();
  }

  const subcategories = getSubcategories(categorySlug, locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <CatalogBreadcrumb
        items={buildEquipmentBreadcrumb(locale, [
          {
            label: dictionary.catalog.equipment,
            href: localizedPath(locale, "/equipment"),
          },
          { label: category.name },
        ], dictionary.catalog.home)}
        className="mb-8"
      />

      <div className="max-w-3xl space-y-4">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {category.name}
        </h1>
        <p className="text-lg text-muted-foreground">{category.description}</p>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          {dictionary.catalog.subcategories}
        </h2>

        {subcategories.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subcategories.map((subcategory) => (
              <CatalogCard
                key={subcategory.slug}
                href={getSubcategoryHref(
                  locale,
                  category.slug,
                  subcategory.slug,
                )}
                title={subcategory.name}
                description={subcategory.description}
                image={subcategory.image}
                footerLabel={dictionary.home.categories.viewProducts}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">
            {dictionary.catalog.emptySubcategories}
          </p>
        )}
      </div>

      <Link
        href={localizedPath(locale)}
        className={buttonVariants({ variant: "outline", className: "mt-12" })}
      >
        {dictionary.catalog.backToHome}
      </Link>
    </div>
  );
}
