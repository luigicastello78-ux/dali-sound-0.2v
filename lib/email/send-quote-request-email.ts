import { emailConfig } from "@/lib/email/config";
import { getResendClient } from "@/lib/email/resend";
import { buildQuoteRequestEmail } from "@/lib/email/templates/quote-request";
import type { QuoteRequestInput, SendQuoteRequestResult } from "@/lib/email/types";

export const sendQuoteRequestEmail = async (
  input: QuoteRequestInput,
): Promise<SendQuoteRequestResult> => {
  try {
    const resend = getResendClient();
    const { subject, html, text } = buildQuoteRequestEmail(input);

    console.log("[QuoteRequest] Sending email to:", emailConfig.notificationEmail);
    console.log("[QuoteRequest] From:", emailConfig.fromAddress);

    const { data, error } = await resend.emails.send({
      from: emailConfig.fromAddress,
      to: [emailConfig.notificationEmail],
      replyTo: input.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("[QuoteRequest] Resend API error:", JSON.stringify(error, null, 2));
      
      // Provide more specific error messages for common issues
      if (error.message?.includes("not allowed") || error.message?.includes("verify")) {
        return {
          success: false,
          error: "Email configuration error. Please contact support.",
        };
      }
      
      return {
        success: false,
        error: "Unable to send your request right now. Please try again later.",
      };
    }

    if (!data?.id) {
      console.error("[QuoteRequest] No email ID returned from Resend");
      return {
        success: false,
        error: "Unable to send your request right now. Please try again later.",
      };
    }

    console.log("[QuoteRequest] Email sent successfully, ID:", data.id);
    return { success: true };
  } catch (err) {
    console.error("[QuoteRequest] Unexpected error:", err);
    return {
      success: false,
      error: "Unable to send your request right now. Please try again later.",
    };
  }
};
