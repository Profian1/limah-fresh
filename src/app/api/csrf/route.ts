import { NextResponse } from "next/server";
import { generateToken } from "@/lib/security";

export function GET() {
  return NextResponse.json({ token: generateToken() });
}
