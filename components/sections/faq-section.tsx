"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionShell } from "@/components/sections/section-shell";
import type { HomeFaqItem } from "@/lib/i18n/types";

type FaqSectionProps = {
  title: string;
  items: HomeFaqItem[];
};

export const FaqSection = ({ title, items }: FaqSectionProps) => {
  return (
    <SectionShell id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>

        <Accordion className="mt-12 w-full">
          {items.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-base text-foreground hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionShell>
  );
};
