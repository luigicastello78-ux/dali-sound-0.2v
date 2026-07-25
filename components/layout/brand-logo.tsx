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
      width={883}
      height={283}
      priority={priority}
      className={cn("h-9 w-auto sm:h-10", className)}
    />
  );
};
