import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { quoteRequests } from "@/db/schema";
import { serviceLabel } from "@/lib/site";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

const quoteSchema = z.object({
  serviceType: z
    .string()
    .trim()
    .refine((v) => ["bowser", "dispenser_maintenance", "delivery_contract", "bulk_bottled", "general"].includes(v), {
      message: "Please choose a valid service type.",
    }),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  company: optionalText(160),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(20),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email.").max(160)]).optional(),
  location: optionalText(200),
  volume: optionalText(80),
  deliveryDate: optionalText(40),
  message: optionalText(1000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = quoteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid submission." },
        { status: 400 }
      );
    }

    const d = parsed.data;
    const reference = `LF-${randomUUID().slice(0, 8).toUpperCase()}`;

    await db.insert(quoteRequests).values({
      reference,
      serviceType: d.serviceType,
      name: d.name,
      company: d.company || null,
      phone: d.phone,
      email: d.email || null,
      location: d.location || null,
      volume: d.volume || null,
      deliveryDate: d.deliveryDate || null,
      message: d.message || null,
    });

    // Prepare a WhatsApp fast-track summary the client can open directly.
    const lines = [
      `Hello Limah Fresh, I just submitted quote request ${reference} on your website.`,
      "",
      `• Service: ${serviceLabel(d.serviceType)}`,
      `• Name: ${d.name}${d.company ? ` (${d.company})` : ""}`,
      `• Phone: ${d.phone}`,
    ];
    if (d.location) lines.push(`• Location: ${d.location}`);
    if (d.volume) lines.push(`• Volume: ${d.volume}`);
    if (d.deliveryDate) lines.push(`• Preferred date: ${d.deliveryDate}`);
    if (d.message) lines.push(`• Notes: ${d.message}`);

    return NextResponse.json({ ok: true, reference, whatsAppSummary: lines.join("\n") });
  } catch (err) {
    console.error("[api/quote]", err);
    return NextResponse.json(
      { error: "We could not save your request right now. Please try again or reach us on WhatsApp." },
      { status: 500 }
    );
  }
}
