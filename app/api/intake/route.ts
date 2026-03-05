import { NextRequest, NextResponse } from "next/server";

// Eenvoudige in-memory opslag voor debug / inspectie tijdens development
let lastIntakePayload: unknown | null = null;

export async function POST(request: NextRequest) {
  const body = await request.json();

  lastIntakePayload = body;
  // eslint-disable-next-line no-console
  console.log("📥 Nieuwe AI Intelligence Scan intake:", body);

  return NextResponse.json({ ok: true });
}

