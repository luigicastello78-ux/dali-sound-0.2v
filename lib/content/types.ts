export type CategoryRecord = {
  slug: string;
  order: number;
  image?: string;
  name: string;
  description: string;
};

export type SubcategoryRecord = {
  slug: string;
  category: string;
  order: number;
  image?: string;
  name: string;
  description: string;
};

export type ProductRecord = {
  slug: string;
  subcategory: string;
  order: number;
  image?: string;
  gallery?: string[];
  name: string;
  description: string;
  // The CMS "list" widget serializes to a YAML array; older entries use a
  // multiline string. Accept both and normalize in the loader.
  specs: string | string[];
};

export type Category = {
  slug: string;
  order: number;
  image?: string;
  name: string;
  description: string;
};

export type Subcategory = {
  slug: string;
  categorySlug: string;
  order: number;
  image?: string;
  name: string;
  description: string;
};

export type Product = {
  slug: string;
  subcategorySlug: string;
  categorySlug: string;
  order: number;
  image?: string;
  gallery?: string[];
  name: string;
  description: string;
  specs: string;
};
