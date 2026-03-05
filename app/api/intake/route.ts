const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyMiw0byhLqQqwbbQM_rO4D8OoKmIwtyuAXeHmvzsIvBhcfARujBML7U0eQJBBY2kFq/exec";

/** Map wizard form data naar de kolommen van je Google Sheet: datum, bedrijfsnaam, naam, email, sector, omzet, pijnpunten, technologie, strategie */
function mapToSheetPayload(data: Record<string, unknown>): Record<string, string> {
  const datum = new Date().toISOString().slice(0, 10);

  const pijnpunten = [
    Array.isArray(data.waarGaatTijdVerloren) ? (data.waarGaatTijdVerloren as string[]).join(", ") : "",
    data.repetitiefWerkUren ? `Repetitief werk: ${data.repetitiefWerkUren}` : "",
    data.waarGaanFoutenMis ? `Fouten/mis: ${data.waarGaanFoutenMis}` : "",
    data.gemiddeldeFoutKosten ? `Foutkosten: ${data.gemiddeldeFoutKosten}` : "",
    data.bedrijfsgroei ? `Groei: ${data.bedrijfsgroei}` : "",
    data.watAlsOmzetVerdubbelt ? `Bij verdubbeling: ${data.watAlsOmzetVerdubbelt}` : "",
  ]
    .filter(Boolean)
    .join(" | ");

  const techParts = [
    data.erpGebruik === "ja" ? `ERP: ${data.erpNaam ?? "ja"}` : "ERP: nee",
    data.crmGebruik === "ja" ? `CRM: ${data.crmNaam ?? "ja"}` : "CRM: nee",
    Array.isArray(data.dagelijkseTools) ? (data.dagelijkseTools as string[]).join(", ") : "",
    data.aantalSystemen ? `Systemen: ${data.aantalSystemen}` : "",
    data.integraties ? `Integraties: ${data.integraties}` : "",
    Array.isArray(data.dataOpslag) ? (data.dataOpslag as string[]).join(", ") : "",
  ].filter(Boolean);
  const technologie = techParts.join(" | ");

  const strategieParts = [
    data.belangrijksteDoel ? `Doel: ${data.belangrijksteDoel}` : "",
    Array.isArray(data.prioriteiten) ? `Prioriteiten: ${(data.prioriteiten as string[]).join(", ")}` : "",
    data.grootsteImpact ? `Impact: ${data.grootsteImpact}` : "",
    data.budgetAutomatisering ? `Budget: ${data.budgetAutomatisering}` : "",
    data.timeline ? `Timeline: ${data.timeline}` : "",
    data.extraContext ? `Context: ${data.extraContext}` : "",
  ].filter(Boolean);
  const strategie = strategieParts.join(" | ");

  return {
    datum,
    bedrijfsnaam: String(data.bedrijfsnaam ?? ""),
    naam: String(data.naam ?? ""),
    email: String(data.email ?? ""),
    sector: String(data.sector ?? ""),
    omzet: String(data.jaaromzet ?? ""),
    pijnpunten,
    technologie,
    strategie,
  };
}

export async function POST(req: Request) {
  const data = await req.json();

  const payload = mapToSheetPayload(data);

  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Google Script error", res.status, await res.text());
      return Response.json(
        { ok: false, error: "Kon niet naar spreadsheet schrijven" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Intake → Google Script", err);
    return Response.json(
      { ok: false, error: "Versturen mislukt" },
      { status: 500 }
    );
  }
}
