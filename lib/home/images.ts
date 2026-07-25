/** Static marketing images (not CMS/catalog content). */

export const HERO_IMAGE = {
  src: "/images/hero/stage.jpg",
  alt: "Live stage with professional sound equipment",
} as const;

export const GALLERY_IMAGES = [
  "/images/gallery/wedding.jpg",
  "/images/gallery/open-air.jpg",
  "/images/gallery/corporate.jpg",
  "/images/gallery/club.jpg",
  "/images/gallery/festival.jpg",
  "/images/gallery/party.jpg",
] as const;

export const CATEGORY_IMAGES: Record<string, string> = {
  keyboards: "/images/categories/keyboards.jpg",
  drums: "/images/categories/drums.jpg",
  guitars: "/images/categories/guitars.jpg",
  speakers: "/images/categories/speakers.jpg",
  mixers: "/images/categories/mixers.jpg",
  microphones: "/images/categories/microphones.jpg",
};
