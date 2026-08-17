import type { ContactEmailData, QuoteEmailData } from "./types";

function line(label: string, value: string): string {
  return `${label}: ${value || "—"}`;
}

export function contactPlainText(data: ContactEmailData): string {
  return [
    "New Contact Form Submission — Limah Fresh",
    "",
    line("Name", data.name),
    line("Email", data.email),
    line("Phone", data.phone),
    line("Subject", data.subject),
    line("Message", data.message),
    line("Submitted", data.timestamp),
  ].join("\n");
}

export function quotePlainText(data: QuoteEmailData): string {
  return [
    `New Quote Request — ${data.reference} — Limah Fresh`,
    "",
    line("Reference", data.reference),
    line("Service", data.serviceLabel),
    line("Name", data.name),
    line("Company", data.company),
    line("Phone", data.phone),
    line("Email", data.email),
    line("Location", data.location),
    line("Volume", data.volume),
    line("Delivery Date", data.deliveryDate),
    line("Message", data.message),
    line("Submitted", data.timestamp),
  ].join("\n");
}

export function confirmationPlainText(
  name: string,
  type: "contact" | "quote",
): string {
  const subject =
    type === "quote"
      ? "Thank You for Your Quote Request — Limah Fresh"
      : "Thank You for Contacting Limah Fresh";
  const greeting =
    type === "quote"
      ? "We have successfully received your quote request."
      : "We have successfully received your message.";

  return [
    `Hello ${name},`,
    "",
    `Thank you for contacting Limah Fresh. ${greeting} Our team is reviewing your submission and a member of our customer service team will contact you shortly.`,
    "",
    "If your request is urgent, please call:",
    "0718 013 391 or 0742 336 747",
    "",
    "Business Hours",
    "Monday – Saturday: 8:00 AM – 6:00 PM",
    "",
    "Clean Water. Reliable Service.",
    "The Limah Fresh Team",
  ].join("\n");
}
