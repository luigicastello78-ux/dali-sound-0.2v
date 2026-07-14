import type { QuoteRequestInput } from "@/lib/email/types";

const escapeHtml = (value: string): string => {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

const countryLabels: Record<QuoteRequestInput["country"], string> = {
  CH: "Switzerland",
  DE: "Germany",
  FR: "France",
};

export const buildQuoteRequestEmail = (input: QuoteRequestInput) => {
  const subject = `[Quote Request] ${input.name}`;

  const html = `
    <h1>New quote request</h1>
    <p>You received a new contact / quote request from the DALI SOUND website.</p>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
    <p><strong>Event date:</strong> ${escapeHtml(input.eventDate)}</p>
    <p><strong>Country:</strong> ${escapeHtml(countryLabels[input.country])}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(input.message).replaceAll("\n", "<br />")}</p>
  `.trim();

  const text = [
    "New quote request",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Event date: ${input.eventDate}`,
    `Country: ${countryLabels[input.country]}`,
    "",
    "Message:",
    input.message,
  ].join("\n");

  return { subject, html, text };
};
