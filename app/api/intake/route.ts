export async function POST(req: Request) {
  const payload = await req.json();

  // tijdelijke mock verwerking
  console.log("Intake ontvangen:", payload);

  return Response.json({ ok: true });
}
