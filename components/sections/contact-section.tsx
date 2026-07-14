import { HugeiconsIcon } from "@hugeicons/react";
import {
  CallIcon,
  Location01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";

import { QuoteRequestForm } from "@/components/quote-request-form";
import { SectionShell } from "@/components/sections/section-shell";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";

type ContactSectionProps = {
  locale: Locale;
  homeContact: Dictionary["home"]["contact"];
  contact: Dictionary["contact"];
  form: Dictionary["form"];
};

export const ContactSection = ({
  locale,
  homeContact,
  contact,
  form,
}: ContactSectionProps) => {
  return (
    <SectionShell id="contact" className="border-t border-border/40">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {homeContact.title}
            </h2>
            <p className="mt-4 text-muted-foreground">{homeContact.subtitle}</p>
          </div>

          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <HugeiconsIcon icon={CallIcon} strokeWidth={2} className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Phone</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <HugeiconsIcon
                  icon={Location01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Address</p>
                <p className="text-sm text-muted-foreground">{contact.address}</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/40 p-6 sm:p-8">
          <QuoteRequestForm locale={locale} labels={form} />
        </div>
      </div>
    </SectionShell>
  );
};
