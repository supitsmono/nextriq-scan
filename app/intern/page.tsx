import { formatRapport } from "@/lib/formatRapport";
import type { WizardFormData } from "@/lib/schema";
import ScanItem from "./ScanItem";

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

async function getSubmissions(): Promise<AirtableRecord[]> {
  const token =
    process.env.AIRTABLE_API_TOKEN ?? process.env.AIRTABLE_API_CODE;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) return [];

  const params = new URLSearchParams({
    "fields[]": "Company",
    "sort[0][field]": "created_at",
    "sort[0][direction]": "desc",
    maxRecords: "100",
  });
  // Also fetch these fields
  params.append("fields[]", "email");
  params.append("fields[]", "Name");
  params.append("fields[]", "created_at");
  params.append("fields[]", "raw_json");

  const url = `https://api.airtable.com/v0/${baseId}/Intakes?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = (await res.json()) as { records?: AirtableRecord[] };
    return data.records ?? [];
  } catch {
    return [];
  }
}

export default async function InternPage({
  searchParams,
}: {
  searchParams: Promise<{ pw?: string }>;
}) {
  const { pw } = await searchParams;
  const password = process.env.INTERN_PASSWORD;

  if (password && pw !== password) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold text-zinc-700">Toegang vereist</p>
          <p className="text-xs text-zinc-400">
            Voeg <code className="bg-zinc-100 px-1 rounded">?pw=…</code> toe aan de URL.
          </p>
        </div>
      </main>
    );
  }

  const records = await getSubmissions();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-zinc-900">
              NEXTRIQ · Ingediende Scans
            </h1>
            <p className="text-sm text-zinc-400 mt-0.5">
              {records.length} scan{records.length !== 1 ? "s" : ""} gevonden
            </p>
          </div>
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow">
            <span className="text-white font-bold text-base">N</span>
          </div>
        </div>

        {records.length === 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white px-6 py-10 text-center">
            <p className="text-sm text-zinc-400">Nog geen ingevulde scans.</p>
          </div>
        )}

        {records.map((record) => {
          const fields = record.fields;
          let rapport = "";

          const rawJson = fields.raw_json as string | undefined;
          if (rawJson) {
            try {
              const formData = JSON.parse(rawJson) as WizardFormData;
              rapport = formatRapport(formData);
            } catch {
              rapport = rawJson;
            }
          } else {
            rapport = "Geen data beschikbaar voor dit record.";
          }

          return (
            <ScanItem
              key={record.id}
              bedrijf={String(fields.Company ?? "—")}
              naam={String(fields.Name ?? "—")}
              email={String(fields.email ?? "—")}
              datum={String(fields.created_at ?? "")}
              rapport={rapport}
            />
          );
        })}

        <p className="text-xs text-zinc-300 text-center pt-4">
          nextriq.nl · intern gebruik
        </p>
      </div>
    </main>
  );
}
