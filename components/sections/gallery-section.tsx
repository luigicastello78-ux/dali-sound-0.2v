import { SectionShell } from "@/components/sections/section-shell";
import type { HomeGalleryItem } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

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
        {items.map((item, index) => (
          <li
            key={item.title}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60"
          >
            <div
              className={cn(
                "absolute inset-0 bg-[linear-gradient(135deg,oklch(0.2_0_0)_25%,transparent_25%,transparent_50%,oklch(0.2_0_0)_50%,oklch(0.2_0_0)_75%,transparent_75%,transparent)]",
                "bg-[length:16px_16px] bg-card",
                index % 2 === 0 ? "opacity-100" : "opacity-80",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-4 font-medium text-foreground">
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
};
