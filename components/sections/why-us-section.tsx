import { SectionShell } from "@/components/sections/section-shell";
import type { HomeValueProp } from "@/lib/i18n/types";

type WhyUsSectionProps = {
  title: string;
  items: HomeValueProp[];
};

export const WhyUsSection = ({ title, items }: WhyUsSectionProps) => {
  return (
    <SectionShell id="why-us">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-xl border border-border/60 bg-card/40 p-6"
          >
            <div className="mb-3 size-2 rounded-full bg-primary" />
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
};
