import { LanguageGate } from "@/components/layout/language-gate";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { defaultLocale } from "@/lib/i18n/locales";

export default async function SelectLanguagePage() {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <LanguageGate
      title={dictionary.languageGate.title}
      subtitle={dictionary.languageGate.subtitle}
    />
  );
}
