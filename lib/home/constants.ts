export const CATEGORY_SLUGS = [
  "keyboards",
  "drums",
  "guitars",
  "speakers",
  "mixers",
  "microphones",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const DELIVERY_COUNTRIES = ["CH", "DE", "FR"] as const;

export type DeliveryCountry = (typeof DELIVERY_COUNTRIES)[number];

export const isDeliveryCountry = (value: string): value is DeliveryCountry => {
  return DELIVERY_COUNTRIES.includes(value as DeliveryCountry);
};
