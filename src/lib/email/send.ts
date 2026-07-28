import { createLogger } from "@/lib/logger";
import { smtpTransport } from "./transport";
import { adminContactEmail } from "./templates/admin-contact";
import { adminQuoteEmail } from "./templates/admin-quote";
import { customerConfirmationEmail } from "./templates/customer-confirmation";
import type { ContactEmailData, QuoteEmailData } from "./types";

const log = createLogger("email/send");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@limahfresh.co.ke";

export function sendContactEmails(data: ContactEmailData) {
  void (async () => {
    const adminHtml = adminContactEmail(data);
    const customerHtml = customerConfirmationEmail(
      { name: data.name, email: data.email },
      "contact",
    );

    const results = await Promise.allSettled([
      smtpTransport.send({
        to: ADMIN_EMAIL,
        subject: "New Contact Form Submission",
        html: adminHtml,
      }),
      data.email
        ? smtpTransport.send({
            to: data.email,
            subject: "Thank You for Contacting Limah Fresh",
            html: customerHtml,
          })
        : Promise.resolve({ success: false }),
    ]);

    results.forEach((result, i) => {
      const label = i === 0 ? "admin notification" : "customer confirmation";
      if (result.status === "rejected") {
        log.error(`${label} failed`, { error: String(result.reason) });
      } else if (!result.value.success) {
        log.warn(`${label} not sent`);
      } else {
        log.info(`${label} sent successfully`);
      }
    });
  })();
}

export function sendQuoteEmails(data: QuoteEmailData) {
  void (async () => {
    const adminHtml = adminQuoteEmail(data);
    const customerHtml = customerConfirmationEmail(
      { name: data.name, email: data.email },
      "quote",
    );

    const results = await Promise.allSettled([
      smtpTransport.send({
        to: ADMIN_EMAIL,
        subject: `New Quote Request — ${data.reference}`,
        html: adminHtml,
      }),
      data.email
        ? smtpTransport.send({
            to: data.email,
            subject: "Thank You for Your Quote Request — Limah Fresh",
            html: customerHtml,
          })
        : Promise.resolve({ success: false }),
    ]);

    results.forEach((result, i) => {
      const label = i === 0 ? "admin notification" : "customer confirmation";
      if (result.status === "rejected") {
        log.error(`${label} failed`, { error: String(result.reason) });
      } else if (!result.value.success) {
        log.warn(`${label} not sent`);
      } else {
        log.info(`${label} sent successfully`);
      }
    });
  })();
}
