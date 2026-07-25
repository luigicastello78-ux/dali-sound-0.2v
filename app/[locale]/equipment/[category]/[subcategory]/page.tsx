import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  buildEquipmentBreadcrumb,
  CatalogBreadcrumb,
} from "@/components/equipment/catalog-breadcrumb";
import {
  CatalogCard,
  getProductHref,
} from "@/components/equipment/catalog-card";
import { buttonVariants } from "@/components/ui/button";
import {
  getCategory,
  getProducts,
  getSubcategory,
} from "@/lib/content";
import { getAllSubcategoryPaths } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, locales } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";

type SubcategoryPageProps = {
  params: Promise<{ locale: string; category: string; subcategory: string }>;
};

export const generateStaticParams = () => {
  const paths = getAllSubcategoryPaths();

  return locales.flatMap((locale) =>
    paths.map(({ category, subcategory }) => ({
      locale,
      category,
      subcategory,
    })),
  );
};

export const generateMetadata = async ({
  params,
}: SubcategoryPageProps): Promise<Metadata> => {
  const {
    locale: localeParam,
    category: categorySlug,
    subcategory: subcategorySlug,
  } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const subcategory = getSubcategory(
    categorySlug,
    subcategorySlug,
    localeParam as Locale,
  );

  if (!subcategory) {
    return {};
  }

  const dictionary = await getDictionary(localeParam as Locale);

  return {
    title: `${subcategory.name} | ${dictionary.brand}`,
    description: subcategory.description,
  };
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const {
    locale: localeParam,
    category: categorySlug,
    subcategory: subcategorySlug,
  } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const category = getCategory(categorySlug, locale);
  const subcategory = getSubcategory(categorySlug, subcategorySlug, locale);

  if (!category || !subcategory) {
    notFound();
  }

  const products = getProducts(subcategorySlug, locale);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <CatalogBreadcrumb
        items={buildEquipmentBreadcrumb(locale, [
          {
            label: dictionary.catalog.equipment,
            href: localizedPath(locale, "/equipment"),
          },
          {
            label: category.name,
            href: localizedPath(locale, `/equipment/${category.slug}`),
          },
          { label: subcategory.name },
        ], dictionary.catalog.home)}
        className="mb-8"
      />

      <div className="max-w-3xl space-y-4">
        <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {subcategory.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {subcategory.description}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          {dictionary.catalog.products}
        </h2>

        {products.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <CatalogCard
                key={product.slug}
                href={getProductHref(
                  locale,
                  category.slug,
                  subcategory.slug,
                  product.slug,
                )}
                title={product.name}
                description={product.description}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">
            {dictionary.catalog.emptyProducts}
          </p>
        )}
      </div>

      <Link
        href={localizedPath(locale, `/equipment/${category.slug}`)}
        className={buttonVariants({ variant: "outline", className: "mt-12" })}
      >
        {dictionary.catalog.backToCategory}
      </Link>
    </div>
  );
}
