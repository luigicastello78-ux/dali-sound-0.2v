// Categories are fully CMS-driven — any category created in the CMS
// (content/categories/*.md) appears on the site automatically. There is no
// fixed allow-list. See components/sections/categories-section.tsx for the
// optional per-slug icon mapping (with a default fallback icon).

export const DELIVERY_COUNTRIES = ["CH", "DE", "FR"] as const;

export type DeliveryCountry = (typeof DELIVERY_COUNTRIES)[number];

export const isDeliveryCountry = (value: string): value is DeliveryCountry => {
  return DELIVERY_COUNTRIES.includes(value as DeliveryCountry);
};
