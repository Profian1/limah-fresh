import { NextResponse } from "next/server";
import { generateToken, methodNotAllowed } from "@/lib/security";

export function GET() {
  return NextResponse.json(
    { token: generateToken() },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export function POST() {
  return methodNotAllowed();
}

export function PUT() {
  return methodNotAllowed();
}

export function PATCH() {
  return methodNotAllowed();
}

export function DELETE() {
  return methodNotAllowed();
}

export function OPTIONS() {
  return methodNotAllowed();
}

export function HEAD() {
  return new Response(null, { status: 405, headers: { Allow: "GET" } });
}
