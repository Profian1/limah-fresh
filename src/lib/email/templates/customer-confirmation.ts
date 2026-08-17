import { escapeHtml } from "@/lib/security";
import type { ConfirmationData } from "../types";
import { emailShell } from "./shared";

const BRAND_BLUE = "#0077b6";
const TEXT = "#0b2239";
const MUTED = "#475569";

export function customerConfirmationEmail(
  data: ConfirmationData,
  type: "contact" | "quote",
): string {
  const subject =
    type === "quote"
      ? "Thank You for Your Quote Request — Limah Fresh"
      : "Thank You for Contacting Limah Fresh";

  const greetingLine =
    type === "quote"
      ? "We have successfully received your quote request."
      : "We have successfully received your message.";

  const content = `<h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:${TEXT};font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Hello ${escapeHtml(data.name)},</h2>
<p style="margin:0 0 8px;font-size:15px;color:${MUTED};line-height:1.6;">Thank you for contacting <strong style="color:${TEXT};">Limah Fresh</strong>.</p>
<p style="margin:0 0 8px;font-size:15px;color:${MUTED};line-height:1.6;">${greetingLine} Our team is currently reviewing your submission, and a member of our customer service team will contact you shortly.</p>

<div style="margin:24px 0;padding:16px 20px;background-color:#f0f7fb;border-radius:10px;border:1px solid #caf0f8;">
  <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:${TEXT};font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">If your request is urgent, please call:</p>
  <p style="margin:0;font-size:20px;font-weight:700;color:${BRAND_BLUE};font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <a href="tel:+254718013391" style="color:${BRAND_BLUE};text-decoration:none;">0718 013 391</a>
  </p>
  <p style="margin:4px 0 0;font-size:14px;color:${MUTED};">
    or <a href="tel:+254742336747" style="color:${BRAND_BLUE};text-decoration:none;">0742 336 747</a>
  </p>
</div>

<div style="margin:24px 0;">
  <h3 style="margin:0 0 8px;font-size:14px;font-weight:700;color:${TEXT};font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Business Hours</h3>
  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;color:${MUTED};line-height:1.8;">
    <tr><td style="padding-right:20px;font-weight:600;color:${TEXT};">Monday \u2013 Saturday</td><td>8:00 AM \u2013 6:00 PM</td></tr>
  </table>
</div>

<p style="margin:24px 0 0;font-size:14px;color:${MUTED};line-height:1.6;">Thank you for trusting <strong style="color:${TEXT};">Limah Fresh</strong>.</p>
<p style="margin:4px 0 0;font-size:14px;color:${TEXT};font-weight:500;line-height:1.6;">Clean Water. Reliable Service.</p>`;

  return emailShell({
    title: subject,
    preheader: `Thank you for reaching out, ${data.name}. The Limah Fresh team will be in touch shortly.`,
    content,
  });
}
