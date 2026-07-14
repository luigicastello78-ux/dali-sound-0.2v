"use server";

import { sendQuoteRequestEmail } from "@/lib/email/send-quote-request-email";
import type { SendQuoteRequestResult } from "@/lib/email/types";
import { isDeliveryCountry, type DeliveryCountry } from "@/lib/home/constants";

type QuoteRequestFormState = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  country: string;
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

  if (!formData.phone.trim()) {
    return "Phone number is required.";
  }

  if (!formData.eventDate.trim()) {
    return "Event date is required.";
  }

  if (!isDeliveryCountry(formData.country)) {
    return "Please select a valid country.";
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
    phone: formData.phone.trim(),
    eventDate: formData.eventDate.trim(),
    country: formData.country as DeliveryCountry,
    message: formData.message.trim(),
  });
};
