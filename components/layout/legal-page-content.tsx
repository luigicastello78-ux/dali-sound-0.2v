import type { Dictionary } from "@/lib/i18n/types";

type LegalPageContentProps = {
  title: string;
  placeholder: string;
};

export const LegalPageContent = ({
  title,
  placeholder,
}: LegalPageContentProps) => {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-8 leading-relaxed text-muted-foreground">{placeholder}</p>
    </article>
  );
};

export type LegalDictionary = Pick<
  Dictionary["legal"],
  "privacyTitle" | "termsTitle" | "impressumTitle" | "placeholder"
>;
