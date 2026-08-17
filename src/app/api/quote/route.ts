import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { serviceLabel } from "@/lib/site";
import { createLogger } from "@/lib/logger";
import { sanitize, validateToken, checkRateLimit, extractIp } from "@/lib/security";
import { sendQuoteEmails } from "@/lib/email";
import type { QuoteEmailData } from "@/lib/email/types";

const log = createLogger("api/quote");

function optionalText(max: number) {
  return z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitize(v) : v));
}

const quoteSchema = z.object({
  serviceType: z
    .string()
    .trim()
    .refine(
      (v) =>
        [
          "bowser",
          "dispenser_maintenance",
          "delivery_contract",
          "bulk_bottled",
          "branded_water",
          "general",
        ].includes(v),
      { message: "Please choose a valid service type." },
    ),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120)
    .transform(sanitize),
  company: optionalText(160),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(20)
    .transform(sanitize),
  email: z
    .union([
      z.literal(""),
      z
        .string()
        .trim()
        .email("Please enter a valid email.")
        .max(160)
        .transform(sanitize),
    ])
    .optional(),
  location: optionalText(200),
  volume: optionalText(80),
  deliveryDate: optionalText(40),
  message: optionalText(1000),
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
    const parsed = quoteSchema.safeParse(body);

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

    const reference = `LF-${randomUUID().slice(0, 8).toUpperCase()}`;

    const lines = [
      `Hello Limah Fresh, I just submitted quote request ${reference} on your website.`,
      "",
      `\u2022 Service: ${serviceLabel(d.serviceType)}`,
      `\u2022 Name: ${d.name}${d.company ? ` (${d.company})` : ""}`,
      `\u2022 Phone: ${d.phone}`,
    ];
    if (d.location) lines.push(`\u2022 Location: ${d.location}`);
    if (d.volume) lines.push(`\u2022 Volume: ${d.volume}`);
    if (d.deliveryDate) lines.push(`\u2022 Preferred date: ${d.deliveryDate}`);
    if (d.message) lines.push(`\u2022 Notes: ${d.message}`);

    const timestamp = new Date().toLocaleString("en-KE", {
      timeZone: "Africa/Nairobi",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailData: QuoteEmailData = {
      serviceType: d.serviceType,
      serviceLabel: serviceLabel(d.serviceType),
      name: d.name,
      company: d.company || "",
      phone: d.phone,
      email: d.email || "",
      location: d.location || "",
      volume: d.volume || "",
      deliveryDate: d.deliveryDate || "",
      message: d.message || "",
      reference,
      timestamp,
    };

    sendQuoteEmails(emailData);

    return NextResponse.json({
      ok: true,
      reference,
      whatsAppSummary: lines.join("\n"),
    });
  } catch (err) {
    log.error("Quote submission failed", { error: String(err) });
    return NextResponse.json(
      {
        error:
          "We could not save your request right now. Please try again or reach us on WhatsApp.",
      },
      { status: 500 },
    );
  }
}
