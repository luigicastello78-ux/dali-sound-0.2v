"use client";

import { useState, useTransition } from "react";

import { submitQuoteRequest } from "@/app/actions/quote-request";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
};

const initialFormState: FormFields = {
  name: "",
  email: "",
  phone: "",
  eventDate: "",
  message: "",
};

export const QuoteRequestForm = () => {
  const [formData, setFormData] = useState<FormFields>(initialFormState);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    startTransition(async () => {
      const result = await submitQuoteRequest(formData);

      if (result.success) {
        setFormData(initialFormState);
        setFeedback({
          type: "success",
          message: "Your request was sent. We will get back to you soon.",
        });
        return;
      }

      setFeedback({
        type: "error",
        message: result.error,
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl flex-col gap-4"
      aria-busy={isPending}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-medium text-zinc-900">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="text-sm font-medium text-zinc-900">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="eventDate"
          className="text-sm font-medium text-zinc-900"
        >
          Event date (optional)
        </label>
        <input
          id="eventDate"
          name="eventDate"
          type="date"
          value={formData.eventDate}
          onChange={handleChange}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900"
        />
      </div>

      {feedback ? (
        <p
          role="status"
          aria-live="polite"
          className={
            feedback.type === "success"
              ? "text-sm text-green-700"
              : "text-sm text-red-600"
          }
        >
          {feedback.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending..." : "Send quote request"}
      </button>
    </form>
  );
};
