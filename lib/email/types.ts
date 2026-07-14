import type { DeliveryCountry } from "@/lib/home/constants";

export type QuoteRequestInput = {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  country: DeliveryCountry;
  message: string;
};

export type SendQuoteRequestResult =
  | { success: true }
  | { success: false; error: string };
