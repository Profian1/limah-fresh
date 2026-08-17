import { escapeHtml } from "@/lib/security";

const BRAND_BLUE = "#0077b6";
const NAVY = "#023e8a";
const WHITE = "#ffffff";
const BODY_BG = "#f4f8fb";
const TEXT = "#0b2239";
const MUTED = "#64748b";

export interface EmailShell {
  title: string;
  preheader: string;
  content: string;
}

export function emailShell({ title, preheader, content }: EmailShell): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BODY_BG};font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <span style="display:none;font-size:1px;color:${BODY_BG};max-height:0;overflow:hidden;">${escapeHtml(preheader)}</span>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BODY_BG};">
    <tr>
      <td align="center" style="padding:24px 16px 40px;">

        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

          <!-- HEADER -->
          <tr>
            <td bgcolor="${BRAND_BLUE}" style="background:linear-gradient(135deg,${BRAND_BLUE} 0%,${NAVY} 100%);padding:28px 32px;text-align:center;border-radius:12px 12px 0 0;">
              <p style="margin:0;font-size:22px;font-weight:700;color:${WHITE};letter-spacing:0.5px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                Limah Fresh
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#caf0f8;font-weight:500;">
                Pure Drinking Water
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td bgcolor="${WHITE}" style="padding:32px;background-color:${WHITE};">
              ${content}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td bgcolor="#eef5fa" style="padding:24px 32px;text-align:center;background-color:#eef5fa;border-radius:0 0 12px 12px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="padding:0 10px;">
                    <a href="https://www.tiktok.com/@limah.fresh.water" style="color:${TEXT};text-decoration:none;font-size:13px;font-weight:600;">TikTok</a>
                  </td>
                  <td style="padding:0 10px;">
                    <a href="https://www.instagram.com/limah_fresh_water_company" style="color:${TEXT};text-decoration:none;font-size:13px;font-weight:600;">Instagram</a>
                  </td>
                  <td style="padding:0 10px;">
                    <a href="https://www.facebook.com/limahfresh/" style="color:${TEXT};text-decoration:none;font-size:13px;font-weight:600;">Facebook</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 4px;font-size:12px;color:${MUTED};">
                <a href="https://limahfresh.co.ke" style="color:${BRAND_BLUE};text-decoration:none;font-weight:600;">limahfresh.co.ke</a>
              </p>
              <p style="margin:0;font-size:12px;color:${MUTED};line-height:1.6;">
                Clean Water. Reliable Service.<br />
                <strong style="color:${TEXT};">The Limah Fresh Team</strong>
              </p>
            </td>
          </tr>

        </table>
        <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function fieldRow(label: string, value: string): string {
  const display = value ? escapeHtml(value) : "\u2014";
  return `<tr>
    <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;color:${TEXT};vertical-align:top;width:130px;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:${TEXT};line-height:1.5;">${display}</td>
  </tr>`;
}

export function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:20px;">
    <tr>
      <td align="center" bgcolor="${BRAND_BLUE}" style="border-radius:8px;">
        <a href="${escapeHtml(href)}" target="_blank" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:700;color:${WHITE};text-decoration:none;border-radius:8px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}
