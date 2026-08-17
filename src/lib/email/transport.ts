import nodemailer from "nodemailer";
import { createLogger } from "@/lib/logger";
import type { EmailTransport, EmailMessage } from "./types";

const log = createLogger("email/transport");

let transporter: nodemailer.Transporter | null = null;
let transportEnabled: boolean | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  if (transportEnabled === false && transporter === null) return null;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    log.warn(
      "SMTP environment variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) are not set — emails will not be sent.",
    );
    transportEnabled = false;
    return null;
  }

  const secure = port === 465;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    ...(port === 587 ? { requireTLS: true } : {}),
  });

  transportEnabled = true;
  log.info("SMTP transport initialised", { host, port, secure });
  return transporter;
}

export const smtpTransport: EmailTransport = {
  async send(msg: EmailMessage) {
    const t = getTransporter();
    if (!t) {
      log.warn("Transport unavailable — skipping email", {
        to: msg.to,
        subject: msg.subject,
      });
      return { success: false };
    }

    try {
      const from =
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        "Limah Fresh <info@limahfresh.co.ke>";
      const replyTo =
        process.env.SMTP_REPLY_TO ||
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        undefined;

      const info = await t.sendMail({
        from,
        replyTo,
        to: msg.to,
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
      });

      log.info("Email sent", { to: msg.to, subject: msg.subject, messageId: info.messageId });
      return { success: true, messageId: info.messageId };
    } catch (err) {
      log.error("SMTP send failed", {
        to: msg.to,
        subject: msg.subject,
        error: err instanceof Error ? err.message : String(err),
      });
      return { success: false };
    }
  },
};
