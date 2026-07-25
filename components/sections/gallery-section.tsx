import Image from "next/image";

import { SectionShell } from "@/components/sections/section-shell";
import { GALLERY_IMAGES } from "@/lib/home/images";
import type { HomeGalleryItem } from "@/lib/i18n/types";

type GallerySectionProps = {
  title: string;
  items: HomeGalleryItem[];
};

export const GallerySection = ({ title, items }: GallerySectionProps) => {
  return (
    <SectionShell id="gallery" className="border-y border-border/40 bg-card/20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => {
          const imageSrc = GALLERY_IMAGES[index % GALLERY_IMAGES.length];

          return (
            <li
              key={item.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60"
            >
              <Image
                src={imageSrc}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-4 font-medium text-foreground">
                {item.title}
              </p>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
};
