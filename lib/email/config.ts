const getRequiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
};

const formatFromAddress = (name: string, email: string): string => {
  return `${name} <${email}>`;
};

export const emailConfig = {
  get apiKey(): string {
    return getRequiredEnv("RESEND_API_KEY");
  },

  /** Resend test sender. Replace with your verified domain email in production. */
  get fromEmail(): string {
    return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  },

  get fromName(): string {
    return process.env.RESEND_FROM_NAME ?? "Dali Sound Rent";
  },

  get fromAddress(): string {
    return formatFromAddress(this.fromName, this.fromEmail);
  },

  /** Inbox that receives contact and quote form submissions. */
  get notificationEmail(): string {
    return (
      process.env.RESEND_NOTIFICATION_EMAIL ?? "luigicastello78@gmail.com"
    );
  },
} as const;
