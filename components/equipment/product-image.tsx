import Image from "next/image";

import { cn } from "@/lib/utils";

type ProductImageProps = {
  name: string;
  image?: string;
  className?: string;
};

export const ProductImage = ({ name, image, className }: ProductImageProps) => {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card/40",
        className,
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,oklch(0.2_0_0)_25%,transparent_25%,transparent_50%,oklch(0.2_0_0)_50%,oklch(0.2_0_0)_75%,transparent_75%,transparent)] bg-[length:16px_16px]">
          <span className="px-6 text-center text-sm uppercase tracking-widest text-muted-foreground">
            {name}
          </span>
        </div>
      )}
    </div>
  );
};
