import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // eslint-disable-next-line no-console
  console.log("📥 Nieuwe AI Intelligence Scan intake:", body);

  return NextResponse.json({ ok: true });
}

