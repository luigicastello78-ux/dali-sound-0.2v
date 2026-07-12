import { Resend } from "resend";

import { emailConfig } from "@/lib/email/config";

let resendClient: Resend | null = null;

export const getResendClient = (): Resend => {
  if (!resendClient) {
    resendClient = new Resend(emailConfig.apiKey);
  }

  return resendClient;
};
