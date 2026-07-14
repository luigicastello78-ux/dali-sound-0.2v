"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { submitQuoteRequest } from "@/app/actions/quote-request";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DELIVERY_COUNTRIES } from "@/lib/home/constants";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/utils";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  country: string;
  message: string;
};

const initialFormState: FormFields = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  country: "",
  message: "",
};

type QuoteRequestFormProps = {
  locale: Locale;
  labels: Dictionary["form"];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const QuoteRequestForm = ({ locale, labels }: QuoteRequestFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormFields>(initialFormState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return labels.errors.nameRequired;
    if (!formData.email.trim()) return labels.errors.emailRequired;
    if (!emailPattern.test(formData.email.trim())) return labels.errors.emailInvalid;
    if (!formData.phone.trim()) return labels.errors.phoneRequired;
    if (!formData.eventDate.trim()) return labels.errors.eventDateRequired;
    if (!formData.country.trim()) return labels.errors.countryRequired;
    if (!formData.message.trim()) return labels.errors.messageRequired;
    return null;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    startTransition(async () => {
      const result = await submitQuoteRequest(formData);

      if (result.success) {
        router.push(`/${locale}/thank-you`);
        return;
      }

      setErrorMessage(result.error ?? labels.errors.submitFailed);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5"
      aria-busy={isPending}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">{labels.name}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{labels.email}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{labels.phone}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="eventDate">{labels.eventDate}</Label>
          <Input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            value={formData.eventDate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">{labels.country}</Label>
          <select
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm shadow-xs",
              "outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            )}
          >
            <option value="">{labels.countryPlaceholder}</option>
            {DELIVERY_COUNTRIES.map((code) => (
              <option key={code} value={code}>
                {labels.countries[code]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{labels.message}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {errorMessage ? (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? labels.sending : labels.submit}
      </Button>
    </form>
  );
};
