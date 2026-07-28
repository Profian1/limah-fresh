import type { QuoteEmailData } from "../types";
import { emailShell, fieldRow, button } from "./shared";

const BORDER_BLUE = "#0077b6";

export function adminQuoteEmail(data: QuoteEmailData): string {
  const fields: [string, string][] = [
    ["Reference", data.reference],
    ["Service", data.serviceLabel],
    ["Name", data.name],
    ["Company", data.company],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Location", data.location],
    ["Volume", data.volume],
    ["Delivery Date", data.deliveryDate],
    ["Message", data.message],
    ["Submitted", data.timestamp],
  ];

  const rows = fields.map(([label, value]) => fieldRow(label, value)).join("\n");

  const replyHref = data.email
    ? `mailto:${encodeURIComponent(data.email)}?subject=Re:%20Quote%20${encodeURIComponent(data.reference)}`
    : `mailto:info@limahfresh.co.ke?subject=Re:%20Quote%20${encodeURIComponent(data.reference)}`;

  const content = `<div style="border-left:4px solid ${BORDER_BLUE};padding-left:20px;margin-bottom:8px;">
  <h2 style="margin:0 0 4px;font-size:18px;font-weight:700;color:#0b2239;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">New Quote Request</h2>
  <p style="margin:0;font-size:13px;color:#0077b6;font-weight:600;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${data.reference}</p>
</div>
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:8px;">
  ${rows}
</table>
${button(replyHref, `Reply to ${data.name}`)}`;

  return emailShell({
    title: `New Quote Request — ${data.reference} — Limah Fresh`,
    preheader: `Quote request ${data.reference} from ${data.name} — ${data.serviceLabel}`,
    content,
  });
}
