export type QuoteRequestInput = {
  name: string;
  email: string;
  phone?: string;
  eventDate?: string;
  message: string;
};

export type SendQuoteRequestResult =
  | { success: true }
  | { success: false; error: string };
