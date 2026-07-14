import { cn } from "@/lib/utils";

type ProductSpecsProps = {
  title: string;
  specs: string;
  className?: string;
};

export const ProductSpecs = ({ title, specs, className }: ProductSpecsProps) => {
  const lines = specs
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^-\s*/, ""));

  return (
    <section className={cn("space-y-4", className)}>
      <h2 className="font-heading text-2xl font-semibold text-foreground">
        {title}
      </h2>
      <ul className="space-y-2">
        {lines.map((line) => (
          <li
            key={line}
            className="flex items-start gap-3 text-sm text-muted-foreground"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
