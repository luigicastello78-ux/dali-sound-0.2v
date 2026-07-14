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
  name: string;
  description: string;
  specs: string;
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
  name: string;
  description: string;
  specs: string;
};
