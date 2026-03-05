const AIRTABLE_API_BASE = "https://api.airtable.com/v0";
const INTAKES_TABLE = "Intakes";
const PROCESSES_TABLE = "Processes";

type WizardPayload = Record<string, unknown>;

/** Return first defined value from list, or empty string. */
function pickFirst(...values: unknown[]): string {
  for (const v of values) {
    if (v != null && v !== "") return String(v);
  }
  return "";
}

/** Safe string for Airtable; omit undefined. */
function str(v: unknown): string {
  if (v == null) return "";
  return String(v);
}

/** Safe string array; empty array if not array. */
function strArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string");
}

/** Map internal value to Airtable-friendly label; fallback to original if unknown. */
function toLabel(map: Record<string, string>, value: string): string {
  if (!value) return "";
  return map[value] ?? value;
}

// ─── Value → label mappings (form select values → leesbare waarden voor Airtable) ───
const JAAROMZET_LABELS: Record<string, string> = {
  lt200k: "< €200k",
  "200k_500k": "€200k – €500k",
  "500k_1m": "€500k – €1M",
  "1m_2_5m": "€1M – €2.5M",
  "2_5m_5m": "€2.5M – €5M",
  "5m_10m": "€5M – €10M",
  gt10m: "> €10M",
};
const MEDEWERKERS_LABELS: Record<string, string> = {
  "1_5": "1 – 5",
  "6_10": "6 – 10",
  "11_25": "11 – 25",
  "26_50": "26 – 50",
  "51_100": "51 – 100",
  "100plus": "100+",
};
const REPETITIEF_UREN_LABELS: Record<string, string> = {
  lt5u: "< 5 uur",
  "5_10u": "5 – 10 uur",
  "10_20u": "10 – 20 uur",
  "20_40u": "20 – 40 uur",
  gt40u: "> 40 uur",
};
const FOUT_KOSTEN_LABELS: Record<string, string> = {
  lt50: "< €50",
  "50_200": "€50 – €200",
  "200_1000": "€200 – €1.000",
  gt1000: "€1.000+",
  onbekend: "Weet ik niet",
};
const GROEI_LABELS: Record<string, string> = {
  stabiel: "Stabiel (< 5%)",
  "5_15pct": "5 – 15%",
  "15_30pct": "15 – 30%",
  gt30pct: "> 30%",
  krimp: "Krimp",
};
const JA_NEE_LABELS: Record<string, string> = {
  ja: "Ja",
  nee: "Nee",
};
const AANTAL_SYSTEMEN_LABELS: Record<string, string> = {
  "1_3": "1–3",
  "4_6": "4–6",
  "7_10": "7–10",
  "10plus": "10+",
};
const INTEGRATIES_LABELS: Record<string, string> = {
  volledig: "Volledig gekoppeld",
  deels: "Deels gekoppeld",
  niet: "Niet gekoppeld",
  weet_niet: "Weet ik niet",
};
const BUDGET_LABELS: Record<string, string> = {
  ja: "Ja",
  overweging: "In overweging",
  nog_niet: "Nog niet",
};
const TIMELINE_LABELS: Record<string, string> = {
  "1_2m": "1–2 maanden",
  "3_6m": "3–6 maanden",
  "6_12m": "6–12 maanden",
  gt12m: ">12 maanden",
};
const FREQUENTIE_LABELS: Record<string, string> = {
  dagelijks: "Dagelijks",
  wekelijks: "Wekelijks",
  maandelijks: "Maandelijks",
  ad_hoc: "Ad hoc",
};
const TIJD_PER_TAK_LABELS: Record<string, string> = {
  lt10min: "< 10 min",
  "10_30min": "10 – 30 min",
  "30_60min": "30 – 60 min",
  "1_2uur": "1 – 2 uur",
  gt2uur: "> 2 uur",
};
const AANTAL_MENSEN_LABELS: Record<string, string> = {
  "1": "1 persoon",
  "2_3": "2 – 3 personen",
  "4_6": "4 – 6 personen",
  "7plus": "7 of meer",
};

/** Build Intakes table fields – Airtable field names must match exactly. */
function buildIntakeFields(payload: WizardPayload, createdAt: string): Record<string, unknown> {
  const company = pickFirst(
    payload.company_name,
    payload.Company,
    payload.company,
    payload.companyName,
    payload.bedrijfsnaam
  );
  const name = pickFirst(payload.contact_name, payload.name, payload.naam);
  const fn = pickFirst(payload.role, payload.function, payload.job_title, payload.functie);
  const phone = pickFirst(payload.phone, payload.phone_number, payload.telefoon);
  const sector = pickFirst(payload.industry, payload.sector);
  const annualRevenue = pickFirst(payload.annual_revenue, payload.jaaromzet);
  const employees = pickFirst(payload.employee_count, payload.aantalMedewerkers);

  const ltArr =
    payload.time_wasted != null
      ? strArray(payload.time_wasted)
      : strArray(payload.waarGaatTijdVerloren);
  const lostTime =
    ltArr.length > 0 ? ltArr.join(", ") : pickFirst(payload.lost_time);
  const timeInHours = pickFirst(
    payload.repetitive_work_hours,
    payload.repetitiefWerkUren
  );
  const mistakes = pickFirst(payload.error_points, payload.mistakes, payload.waarGaanFoutenMis);
  const mistakeCosts = pickFirst(
    payload.average_error_cost,
    payload.gemiddeldeFoutKosten
  );
  const companyGrow = pickFirst(payload.company_growth, payload.bedrijfsgroei);
  const watAls = pickFirst(
    payload.what_if_revenue_doubles,
    payload.watAlsOmzetVerdubbelt
  );

  const erpName = pickFirst(payload.erp_name, payload.erpNaam);
  const crmUsage = pickFirst(payload.crm_usage, payload.crmGebruik);
  const crmName = pickFirst(payload.crm_name, payload.crmNaam);
  const dailyTools = payload.daily_tools != null
    ? strArray(payload.daily_tools)
    : strArray(payload.dagelijkseTools);
  const currentSystems = pickFirst(payload.system_count, payload.aantalSystemen);
  const integrations = pickFirst(payload.integrations, payload.integraties);

  const mainGoal = pickFirst(payload.main_goal, payload.belangrijksteDoel);
  const prioriteiten = payload.priorities != null
    ? strArray(payload.priorities)
    : strArray(payload.prioriteiten);
  const biggestImpact = pickFirst(payload.biggest_impact, payload.grootsteImpact);
  const budget = pickFirst(payload.automation_budget, payload.budgetAutomatisering);
  const timeline = pickFirst(payload.timeline);
  const extraContext = pickFirst(payload.extra_context, payload.extraContext);

  const fields: Record<string, unknown> = {
    Company: company || "",
    created_at: createdAt,
    Name: name || "",
    email: str(payload.email),
    Function: fn || "",
    Phone_number: phone || "",
    sector: sector || "",
    Annual_Revenue: toLabel(JAAROMZET_LABELS, annualRevenue) || annualRevenue || "",
    Employees: toLabel(MEDEWERKERS_LABELS, employees) || employees || "",
    Lost_time: lostTime || "",
    "Time_in_hours": toLabel(REPETITIEF_UREN_LABELS, timeInHours) || timeInHours || "",
    Mistakes: mistakes || "",
    "Mistake costs": toLabel(FOUT_KOSTEN_LABELS, mistakeCosts) || mistakeCosts || "",
    "Company's grow": toLabel(GROEI_LABELS, companyGrow) || companyGrow || "",
    watAlsOmzetVerdubbelt: watAls || "",
    "ERP name": erpName || "",
    "CRM usage": toLabel(JA_NEE_LABELS, crmUsage) || crmUsage || "",
    "CRM name": crmName || "",
    "Daily tools": dailyTools,
    "Current Systems": toLabel(AANTAL_SYSTEMEN_LABELS, currentSystems) || currentSystems || "",
    Integrations: toLabel(INTEGRATIES_LABELS, integrations) || integrations || "",
    "Main goal": mainGoal || "",
    prioriteiten,
    "Biggest impact": biggestImpact || "",
    budgetAutomatisering: toLabel(BUDGET_LABELS, budget) || budget || "",
    timeline: toLabel(TIMELINE_LABELS, timeline) || timeline || "",
    extraContext: extraContext || "",
    raw_json: JSON.stringify(payload, null, 2),
  };

  return fields;
}

/** Build one Process record fields – exact Airtable names. */
function buildProcessFields(
  process: Record<string, unknown>,
  index: number,
  company: string,
  email: string,
  createdAt: string,
  intakeRecordId: string
): Record<string, unknown> {
  const processName = pickFirst(
    process.process_name,
    process.procesNaam,
    process.name
  );
  let tools = strArray(process.tools);
  const anders = str(process.toolsAnders);
  if (anders) tools = [...tools, anders];

  const freq = pickFirst(process.frequency, process.frequentie);
  const tijd = pickFirst(process.time_per_task, process.tijdPerKeer);
  const mensen = pickFirst(process.people_involved, process.aantalMensen);

  return {
    Process: processName || "",
    created_at: createdAt,
    intake: [intakeRecordId],
    Company: company,
    email,
    proces_index: index + 1,
    Description: pickFirst(process.description, process.beschrijving) || "",
    frequentie: toLabel(FREQUENTIE_LABELS, freq) || freq || "",
    Time: toLabel(TIJD_PER_TAK_LABELS, tijd) || tijd || "",
    aantalMensen: toLabel(AANTAL_MENSEN_LABELS, mensen) || mensen || "",
    tools,
  };
}

export async function POST(req: Request) {
  const token =
    process.env.AIRTABLE_API_TOKEN ?? process.env.AIRTABLE_API_CODE;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!token || !baseId) {
    console.error(
      "Missing AIRTABLE_API_TOKEN/AIRTABLE_API_CODE or AIRTABLE_BASE_ID"
    );
    return Response.json(
      { success: false, error: "Server configuratie ontbreekt" },
      { status: 500 }
    );
  }

  let payload: WizardPayload;
  try {
    payload = await req.json();
  } catch {
    return Response.json(
      { success: false, error: "Ongeldige JSON" },
      { status: 400 }
    );
  }

  const createdAt = new Date().toISOString();
  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    // Step 1: Create Intake
    const intakeFields = buildIntakeFields(payload, createdAt);
    const intakeUrl = `${AIRTABLE_API_BASE}/${baseId}/${INTAKES_TABLE}`;
    const intakeRes = await fetch(intakeUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ fields: intakeFields }),
    });

    if (!intakeRes.ok) {
      const errText = await intakeRes.text();
      console.error("Airtable Intakes error", intakeRes.status, errText);
      let airtableMessage = "";
      try {
        const errJson = JSON.parse(errText) as { error?: { message?: string } };
        airtableMessage = errJson?.error?.message ?? errText;
      } catch {
        airtableMessage = errText.slice(0, 200);
      }
      return Response.json(
        {
          success: false,
          error: "Kon intake niet opslaan",
          details: airtableMessage,
        },
        { status: 502 }
      );
    }

    const intakeData = (await intakeRes.json()) as { id?: string };
    const intakeId = intakeData?.id;
    if (!intakeId) {
      console.error("Airtable Intakes response missing id", intakeData);
      return Response.json(
        { success: false, error: "Intake opgeslagen maar id ontbreekt" },
        { status: 502 }
      );
    }

    // Step 2: Create Processes (batch), linked to intake
    const processen = Array.isArray(payload.processes) ? payload.processes : Array.isArray(payload.processen) ? payload.processen : [];
    const company = pickFirst(
      payload.company_name,
      payload.Company,
      payload.company,
      payload.bedrijfsnaam
    );
    const email = str(payload.email);

    const processRecords = processen.map((proc: unknown, i: number) => {
      const p = proc as Record<string, unknown>;
      return {
        fields: buildProcessFields(p, i, company, email, createdAt, intakeId),
      };
    });

    let processCount = 0;
    if (processRecords.length > 0) {
      const processUrl = `${AIRTABLE_API_BASE}/${baseId}/${PROCESSES_TABLE}`;
      const processRes = await fetch(processUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ records: processRecords }),
      });

      if (!processRes.ok) {
        const errText = await processRes.text();
        console.error("Airtable Processes error", processRes.status, errText);
        return Response.json(
          { success: false, error: "Kon processen niet opslaan" },
          { status: 502 }
        );
      }
      processCount = processRecords.length;
    }

    return Response.json({
      success: true,
      intakeId,
      processCount,
    });
  } catch (err) {
    console.error("Intake → Airtable", err);
    return Response.json(
      { success: false, error: "Versturen mislukt" },
      { status: 500 }
    );
  }
}
