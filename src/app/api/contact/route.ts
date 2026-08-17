import { NextResponse } from "next/server";
import { z } from "zod";
import { createLogger } from "@/lib/logger";
import { sanitize, validateToken, checkRateLimit, extractIp } from "@/lib/security";
import { sendContactEmails } from "@/lib/email";
import type { ContactEmailData } from "@/lib/email/types";

const log = createLogger("api/contact");

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120)
    .transform(sanitize),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160)
    .transform(sanitize),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitize(v) : v)),
  subject: z.string().trim().min(2).max(120).transform(sanitize),
  message: z
    .string()
    .trim()
    .min(5, "Please write a short message.")
    .max(2000)
    .transform(sanitize),
  csrf_token: z.string(),
  _website: z.string().optional(),
});

export async function POST(req: Request) {
  const ip = extractIp(req);

  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    log.warn("Rate limit exceeded", { ip });
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
        { status: 400 },
      );
    }

    const d = parsed.data;

    if (d._website && d._website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!validateToken(d.csrf_token)) {
      return NextResponse.json(
        { error: "Invalid submission. Please refresh the page and try again." },
        { status: 403 },
      );
    }

    const timestamp = new Date().toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailData: ContactEmailData = {
      name: d.name,
      email: d.email,
      phone: d.phone || "",
      subject: d.subject,
      message: d.message,
      timestamp,
    };

    sendContactEmails(emailData);

    return NextResponse.json({ ok: true });
  } catch (err) {
    log.error("Contact submission failed", { error: String(err) });
    return NextResponse.json(
      {
        error:
          "We could not send your message right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
