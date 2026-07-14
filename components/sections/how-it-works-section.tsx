import { SectionShell } from "@/components/sections/section-shell";
import type { HomeStep } from "@/lib/i18n/types";

type HowItWorksSectionProps = {
  title: string;
  steps: HomeStep[];
};

export const HowItWorksSection = ({ title, steps }: HowItWorksSectionProps) => {
  return (
    <SectionShell id="how-it-works" className="border-y border-border/40 bg-card/20">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </div>

      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="relative space-y-4">
            <span className="font-heading text-5xl font-bold text-primary/90">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
};
