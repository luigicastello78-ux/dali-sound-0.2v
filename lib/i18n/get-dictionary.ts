import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { defaultLocale } from "@/lib/i18n/locales";

import bg from "@/messages/bg.json";
import de from "@/messages/de.json";
import el from "@/messages/el.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import it from "@/messages/it.json";
import mk from "@/messages/mk.json";
import nl from "@/messages/nl.json";
import pl from "@/messages/pl.json";
import ro from "@/messages/ro.json";
import sr from "@/messages/sr.json";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  de,
  fr,
  it,
  es,
  nl,
  sr,
  mk,
  bg,
  el,
  ro,
  pl,
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
};
