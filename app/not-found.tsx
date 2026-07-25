import { cookies } from "next/headers";
import Link from "next/link";

import { localizedPath } from "@/lib/i18n/navigation";
import { defaultLocale, isValidLocale, LOCALE_COOKIE } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function NotFound() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = cookieLocale && isValidLocale(cookieLocale)
    ? (cookieLocale as Locale)
    : defaultLocale;

  const dictionary = await getDictionary(locale);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        {dictionary.notFound.title}
      </h1>
      <p className="mt-3 text-muted-foreground">
        {dictionary.notFound.description}
      </p>
      <Link
        href={localizedPath(locale)}
        className="mt-8 text-sm font-medium text-primary hover:underline"
      >
        {dictionary.notFound.backHome}
      </Link>
    </div>
  );
}
