import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  buildEquipmentBreadcrumb,
  CatalogBreadcrumb,
} from "@/components/equipment/catalog-breadcrumb";
import { getSubcategoryHref } from "@/components/equipment/catalog-card";
import { ProductImage } from "@/components/equipment/product-image";
import { ProductSpecs } from "@/components/equipment/product-specs";
import { buttonVariants } from "@/components/ui/button";
import {
  getCategory,
  getProduct,
  getSubcategory,
} from "@/lib/content";
import { getAllProductPaths } from "@/lib/content/catalog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale, locales } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { localizedPath } from "@/lib/i18n/navigation";

type ProductPageProps = {
  params: Promise<{
    locale: string;
    category: string;
    subcategory: string;
    product: string;
  }>;
};

export const generateStaticParams = () => {
  const paths = getAllProductPaths();

  return locales.flatMap((locale) =>
    paths.map(({ category, subcategory, product }) => ({
      locale,
      category,
      subcategory,
      product,
    })),
  );
};

export const generateMetadata = async ({
  params,
}: ProductPageProps): Promise<Metadata> => {
  const {
    locale: localeParam,
    category: categorySlug,
    subcategory: subcategorySlug,
    product: productSlug,
  } = await params;

  if (!isValidLocale(localeParam)) {
    return {};
  }

  const product = getProduct(
    categorySlug,
    subcategorySlug,
    productSlug,
    localeParam as Locale,
  );

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | DALI SOUND`,
    description: product.description,
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const {
    locale: localeParam,
    category: categorySlug,
    subcategory: subcategorySlug,
    product: productSlug,
  } = await params;

  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const category = getCategory(categorySlug, locale);
  const subcategory = getSubcategory(categorySlug, subcategorySlug, locale);
  const product = getProduct(
    categorySlug,
    subcategorySlug,
    productSlug,
    locale,
  );

  if (!category || !subcategory || !product) {
    notFound();
  }

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
          {
            label: subcategory.name,
            href: getSubcategoryHref(locale, category.slug, subcategory.slug),
          },
          { label: product.name },
        ])}
        className="mb-8"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductImage name={product.name} image={product.image} />

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {product.name}
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <Link
            href={`${localizedPath(locale)}#contact`}
            className={buttonVariants({ size: "lg" })}
          >
            {dictionary.catalog.getQuote}
          </Link>
        </div>
      </div>

      {product.gallery && product.gallery.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {product.gallery.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-card/40"
            >
              <Image
                src={src}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      ) : null}

      <ProductSpecs
        title={dictionary.catalog.specs}
        specs={product.specs}
        className="mt-16 max-w-3xl"
      />

      <Link
        href={getSubcategoryHref(locale, category.slug, subcategory.slug)}
        className={buttonVariants({ variant: "outline", className: "mt-12" })}
      >
        {dictionary.catalog.backToSubcategory}
      </Link>
    </div>
  );
}
