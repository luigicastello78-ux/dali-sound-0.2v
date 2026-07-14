import Link from "next/link";

import { localizedPath } from "@/lib/i18n/navigation";
import { defaultLocale } from "@/lib/i18n/locales";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href={localizedPath(defaultLocale)}
        className="mt-8 text-sm font-medium text-primary hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}
