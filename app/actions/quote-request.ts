"use server";

import { sendQuoteRequestEmail } from "@/lib/email/send-quote-request-email";
import type { SendQuoteRequestResult } from "@/lib/email/types";

type QuoteRequestFormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateQuoteRequest = (
  formData: QuoteRequestFormState,
): string | null => {
  if (!formData.name.trim()) {
    return "Name is required.";
  }

  if (!formData.email.trim()) {
    return "Email is required.";
  }

  if (!emailPattern.test(formData.email.trim())) {
    return "Please enter a valid email address.";
  }

  if (!formData.message.trim()) {
    return "Message is required.";
  }

  return null;
};

export const submitQuoteRequest = async (
  formData: QuoteRequestFormState,
): Promise<SendQuoteRequestResult> => {
  const validationError = validateQuoteRequest(formData);

  if (validationError) {
    return { success: false, error: validationError };
  }

  return sendQuoteRequestEmail({
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim() || undefined,
    eventDate: formData.eventDate.trim() || undefined,
    message: formData.message.trim(),
  });
};
