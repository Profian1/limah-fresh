import { createLogger } from "@/lib/logger";
import { smtpTransport } from "./transport";
import { adminContactEmail } from "./templates/admin-contact";
import { adminQuoteEmail } from "./templates/admin-quote";
import { customerConfirmationEmail } from "./templates/customer-confirmation";
import type { ContactEmailData, QuoteEmailData, ConfirmationData, EmailMessage } from "./types";

const log = createLogger("email/send");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@limahfresh.co.ke";

function fireAndForget(fn: () => Promise<void>) {
  void fn();
}

async function sendDualEmail(
  adminMsg: EmailMessage,
  customerMsg: EmailMessage | null,
  logPrefix: string,
) {
  const tasks: Promise<{ success: boolean; messageId?: string }>[] = [
    smtpTransport.send(adminMsg),
  ];

  const labels = [
    `${logPrefix} admin notification`,
    `${logPrefix} customer confirmation`,
  ];

  if (customerMsg) {
    tasks.push(smtpTransport.send(customerMsg));
  } else {
    tasks.push(Promise.resolve({ success: false }));
  }

  const results = await Promise.allSettled(tasks);

  results.forEach((result, i) => {
    const label = labels[i];
    if (result.status === "rejected") {
      log.error(`${label} failed`, { error: String(result.reason) });
    } else if (!result.value.success) {
      log.warn(`${label} not sent`);
    } else {
      log.info(`${label} sent successfully`);
    }
  });
}

export function sendContactEmails(data: ContactEmailData) {
  fireAndForget(async () => {
    const adminHtml = adminContactEmail(data);
    const customerHtml = customerConfirmationEmail(
      { name: data.name, email: data.email },
      "contact",
    );

    await sendDualEmail(
      { to: ADMIN_EMAIL, subject: "New Contact Form Submission", html: adminHtml },
      data.email
        ? { to: data.email, subject: "Thank You for Contacting Limah Fresh", html: customerHtml }
        : null,
      "contact",
    );
  });
}

export function sendQuoteEmails(data: QuoteEmailData) {
  fireAndForget(async () => {
    const adminHtml = adminQuoteEmail(data);
    const customerHtml = customerConfirmationEmail(
      { name: data.name, email: data.email },
      "quote",
    );

    await sendDualEmail(
      { to: ADMIN_EMAIL, subject: `New Quote Request — ${data.reference}`, html: adminHtml },
      data.email
        ? { to: data.email, subject: "Thank You for Your Quote Request — Limah Fresh", html: customerHtml }
        : null,
      "quote",
    );
  });
}
