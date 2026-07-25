import { readMarkdownFiles } from "@/lib/content/read-markdown";
import type {
  Category,
  CategoryRecord,
  Subcategory,
  SubcategoryRecord,
  Product,
  ProductRecord,
} from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locales";

const sortByOrder = <T extends { order: number }>(items: T[]): T[] => {
  return [...items].sort((a, b) => a.order - b.order);
};

const toCategory = (record: CategoryRecord): Category | null => {
  if (!record.slug?.trim() || !record.name?.trim() || !record.description?.trim()) {
    return null;
  }

  return {
    slug: record.slug,
    order: record.order ?? 0,
    image: record.image,
    name: record.name.trim(),
    description: record.description.trim(),
  };
};

const toSubcategory = (record: SubcategoryRecord): Subcategory | null => {
  if (!record.name?.trim() || !record.description?.trim()) {
    return null;
  }

  return {
    slug: record.slug,
    categorySlug: record.category,
    order: record.order ?? 0,
    image: record.image,
    name: record.name.trim(),
    description: record.description.trim(),
  };
};

const normalizeSpecs = (specs: string | string[] | undefined): string => {
  if (Array.isArray(specs)) {
    return specs
      .map((item) => String(item).trim())
      .filter(Boolean)
      .join("\n");
  }

  return (specs ?? "").trim();
};

const toProduct = (
  record: ProductRecord,
  categorySlug: string,
): Product | null => {
  const specs = normalizeSpecs(record.specs);

  if (!record.name?.trim() || !record.description?.trim() || !specs) {
    return null;
  }

  return {
    slug: record.slug,
    subcategorySlug: record.subcategory,
    categorySlug,
    order: record.order ?? 0,
    image: record.image,
    gallery: record.gallery,
    name: record.name.trim(),
    description: record.description.trim(),
    specs,
  };
};

export const getCategoryRecords = (): CategoryRecord[] => {
  return readMarkdownFiles<CategoryRecord>("categories");
};

export const getSubcategoryRecords = (): SubcategoryRecord[] => {
  return readMarkdownFiles<SubcategoryRecord>("subcategories");
};

export const getProductRecords = (): ProductRecord[] => {
  return readMarkdownFiles<ProductRecord>("products");
};

export const getCategories = (_locale: Locale): Category[] => {
  const subcategories = getSubcategoryRecords();
  const categoriesWithSubs = new Set(subcategories.map((item) => item.category));

  return sortByOrder(getCategoryRecords())
    .map((record) => toCategory(record))
    .filter((category): category is Category => category !== null)
    .filter((category) => categoriesWithSubs.has(category.slug));
};

export const getCategory = (slug: string, _locale: Locale): Category | null => {
  const record = getCategoryRecords().find((item) => item.slug === slug);
  if (!record) return null;
  return toCategory(record);
};

export const getSubcategories = (
  categorySlug: string,
  _locale: Locale,
): Subcategory[] => {
  const products = getProductRecords();
  const subcategoriesWithProducts = new Set(products.map((item) => item.subcategory));

  const subcategories = getSubcategoryRecords()
    .filter((item) => item.category === categorySlug)
    .map((record) => toSubcategory(record))
    .filter((item): item is Subcategory => item !== null)
    .filter((item) => subcategoriesWithProducts.has(item.slug));

  return sortByOrder(subcategories);
};

export const getSubcategory = (
  categorySlug: string,
  subcategorySlug: string,
  _locale: Locale,
): Subcategory | null => {
  const record = getSubcategoryRecords().find(
    (item) => item.category === categorySlug && item.slug === subcategorySlug,
  );

  if (!record) return null;
  return toSubcategory(record);
};

export const getProducts = (
  subcategorySlug: string,
  _locale: Locale,
): Product[] => {
  const subcategoryRecord = getSubcategoryRecords().find(
    (item) => item.slug === subcategorySlug,
  );

  if (!subcategoryRecord) {
    return [];
  }

  const products = getProductRecords()
    .filter((item) => item.subcategory === subcategorySlug)
    .map((record) => toProduct(record, subcategoryRecord.category))
    .filter((item): item is Product => item !== null);

  return sortByOrder(products);
};

export const getProduct = (
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
  _locale: Locale,
): Product | null => {
  const record = getProductRecords().find(
    (item) =>
      item.slug === productSlug && item.subcategory === subcategorySlug,
  );

  if (!record) return null;

  const subcategory = getSubcategoryRecords().find(
    (item) => item.slug === subcategorySlug && item.category === categorySlug,
  );

  if (!subcategory) return null;

  return toProduct(record, subcategory.category);
};

export const getAllCategorySlugs = (): string[] => {
  return getCategories("en").map((item) => item.slug);
};

export const getAllSubcategoryPaths = (): Array<{
  category: string;
  subcategory: string;
}> => {
  return getSubcategoryRecords().map((item) => ({
    category: item.category,
    subcategory: item.slug,
  }));
};

export const getAllProductPaths = (): Array<{
  category: string;
  subcategory: string;
  product: string;
}> => {
  const subcategoryMap = new Map(
    getSubcategoryRecords().map((item) => [item.slug, item.category]),
  );

  return getProductRecords()
    .map((item) => {
      const category = subcategoryMap.get(item.subcategory);
      if (!category) return null;
      return {
        category,
        subcategory: item.subcategory,
        product: item.slug,
      };
    })
    .filter(
      (
        item,
      ): item is { category: string; subcategory: string; product: string } =>
        item !== null,
    );
};
