import type { ContactEmailData } from "../types";
import { emailShell, fieldRow, button } from "./shared";

export function adminContactEmail(data: ContactEmailData): string {
  const fields: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Subject", data.subject],
    ["Message", data.message],
    ["Submitted", data.timestamp],
  ];

  const rows = fields.map(([label, value]) => fieldRow(label, value)).join("\n");

  const replyHref = `mailto:${encodeURIComponent(data.email)}?subject=Re:%20${encodeURIComponent(data.subject)}`;

  const content = `<h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#0b2239;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">New Contact Form Submission</h2>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:8px;">
  ${rows}
</table>
${button(replyHref, `Reply to ${data.name}`)}`;

  return emailShell({
    title: "New Contact Form Submission — Limah Fresh",
    preheader: `New message from ${data.name} — ${data.subject}`,
    content,
  });
}
