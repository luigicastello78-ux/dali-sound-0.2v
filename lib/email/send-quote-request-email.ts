import { emailConfig } from "@/lib/email/config";
import { getResendClient } from "@/lib/email/resend";
import { buildQuoteRequestEmail } from "@/lib/email/templates/quote-request";
import type { QuoteRequestInput, SendQuoteRequestResult } from "@/lib/email/types";

export const sendQuoteRequestEmail = async (
  input: QuoteRequestInput,
): Promise<SendQuoteRequestResult> => {
  const resend = getResendClient();
  const { subject, html, text } = buildQuoteRequestEmail(input);

  const { data, error } = await resend.emails.send({
    from: emailConfig.fromAddress,
    to: [emailConfig.notificationEmail],
    replyTo: input.email,
    subject,
    html,
    text,
  });

  if (error) {
    console.error("Failed to send quote request email:", error);
    return {
      success: false,
      error: "Unable to send your request right now. Please try again later.",
    };
  }

  if (!data?.id) {
    return {
      success: false,
      error: "Unable to send your request right now. Please try again later.",
    };
  }

  return { success: true };
};
