import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 16 * 1024;

export function isPost(req: Request): boolean {
  return req.method === "POST";
}

export function methodNotAllowed(): NextResponse {
  return NextResponse.json(
    { error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

export function unsupportedMediaType(): NextResponse {
  return NextResponse.json(
    { error: "Unsupported content type." },
    { status: 415 },
  );
}

export function payloadTooLarge(): NextResponse {
  return NextResponse.json(
    { error: "Request body is too large." },
    { status: 413 },
  );
}

export async function readJsonBody(req: Request): Promise<
  { ok: true; data: unknown } | { ok: false; response: NextResponse }
> {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, response: unsupportedMediaType() };
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, response: payloadTooLarge() };
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Invalid request body." }, { status: 400 }) };
  }

  if (Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) {
    return { ok: false, response: payloadTooLarge() };
  }

  try {
    return { ok: true, data: JSON.parse(text) };
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Invalid JSON." }, { status: 400 }) };
  }
}
