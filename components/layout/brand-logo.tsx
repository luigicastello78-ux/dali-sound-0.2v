import Image from "next/image";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  brand: string;
  className?: string;
  priority?: boolean;
};

export const BrandLogo = ({
  brand,
  className,
  priority = false,
}: BrandLogoProps) => {
  return (
    <Image
      src="/dali-sound-logo.png"
      alt={brand}
      width={1024}
      height={328}
      priority={priority}
      className={cn("h-9 w-auto sm:h-10", className)}
    />
  );
};
