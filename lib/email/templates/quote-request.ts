import type { QuoteRequestInput } from "@/lib/email/types";

const escapeHtml = (value: string): string => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

const formatOptionalField = (label: string, value?: string): string => {
  if (!value?.trim()) {
    return "";
  }

  return `<p><strong>${label}:</strong> ${escapeHtml(value.trim())}</p>`;
};

export const buildQuoteRequestEmail = (input: QuoteRequestInput) => {
  const subject = `[Quote Request] ${input.name}`;

  const html = `
    <h1>New quote request</h1>
    <p>You received a new contact / quote request from the Dali Sound Rent website.</p>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    ${formatOptionalField("Phone", input.phone)}
    ${formatOptionalField("Event date", input.eventDate)}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
  `.trim();

  const text = [
    "New quote request",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : null,
    input.eventDate ? `Event date: ${input.eventDate}` : null,
    "",
    "Message:",
    input.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return { subject, html, text };
};
