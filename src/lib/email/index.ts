export { smtpTransport } from "./transport";
export { emailShell, fieldRow, button } from "./templates/shared";
export { adminContactEmail } from "./templates/admin-contact";
export { adminQuoteEmail } from "./templates/admin-quote";
export { customerConfirmationEmail } from "./templates/customer-confirmation";
export { sendContactEmails, sendQuoteEmails } from "./send";
export type {
  EmailMessage,
  EmailTransport,
  ContactEmailData,
  QuoteEmailData,
  ConfirmationData,
} from "./types";
