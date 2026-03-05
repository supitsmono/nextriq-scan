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

/** Map form value to exact Airtable Single select option; return empty if no match (don't create new options). */
function toAirtableOption(map: Record<string, string>, value: string): string {
  if (!value) return "";
  return map[value] ?? "";
}

/** Map form sector (vrije tekst) naar exacte Airtable sector-optie. */
function mapSectorToAirtable(sector: string): string {
  if (!sector) return "";
  const s = sector.toLowerCase();
  const mapping: Record<string, string> = {
    "handel & retail": "Retail",
    "productie & industrie": "Industrie",
    "zakelijke dienstverlening": "Zakelijke Dienstverlening",
    "technologie & it": "Technologie",
    "bouw & vastgoed": "Bouw",
    "transport & logistiek": "Logistiek",
    "zorg & welzijn": "Zorg",
    "horeca & toerisme": "Detailhandel",
    "financiën & verzekeringen": "Financieel",
    "onderwijs": "Onderwijs",
    "landbouw & voedsel": "Landbouw",
    "voedingsmiddelen": "Voedingsmiddelen",
    "retail": "Retail",
    "technologie": "Technologie",
    "gezondheidszorg": "Gezondheidszorg",
    "zorg": "Zorg",
    "logistiek": "Logistiek",
    "bouw": "Bouw",
    "marketing": "Marketing",
    "juridisch": "Juridisch",
    "overheid": "Overheid",
    "non-profit": "Non-profit",
    "anders": "Overig",
  };
  for (const [key, airtable] of Object.entries(mapping)) {
    if (s.includes(key) || key.includes(s)) return airtable;
  }
  return "Overig";
}

/** Map form Daily tools labels naar exacte Airtable Multiple select opties. */
function mapDailyToolsToAirtable(tools: string[]): string[] {
  const map: Record<string, string[]> = {
    "Microsoft Office": ["MS Office"],
    "Google Workspace": ["Google Workspace"],
    "Boekhoudpakket": ["Anders"],
    "Project management": ["Trello"],
    "Slack / Teams / WhatsApp": ["Slack", "Teams", "WhatsApp"],
    "E-commerce": ["Anders"],
    "WMS": ["Anders"],
    "Planning software": ["Anders"],
    "Geen": [],
  };
  const allowed = new Set(["MS Office", "Google Workspace", "Slack", "Teams", "Trello", "Asana", "Custom", "Anders", "Excel", "Outlook", "WhatsApp", "Exact", "AFAS", "Salesforce", "Magister", "HubSpot", "Word"]);
  const out: string[] = [];
  for (const t of tools) {
    const mapped = map[t];
    if (mapped) {
      for (const m of mapped) {
        if (m && allowed.has(m) && !out.includes(m)) out.push(m);
      }
    } else if (allowed.has(t) && !out.includes(t)) {
      out.push(t);
    } else if (t && !out.includes("Anders")) {
      out.push("Anders");
    }
  }
  return out;
}

/** Map form prioriteiten naar exacte Airtable Multiple select opties. */
function mapPrioriteitenToAirtable(priorities: string[]): string[] {
  const map: Record<string, string> = {
    "Kosten besparen": "Kostenbesparing",
    "Sneller groeien": "Groei",
    "Foutpercentage verlagen": "Foutreductie",
    "Klanttevredenheid verhogen": "Klanttevredenheid",
    "Schaalbaarheid verbeteren": "Groei",
    "Beter inzicht in cijfers": "Inzicht",
    "Concurrentievoordeel": "Innovatie",
    "Innovatie": "Innovatie",
  };
  const out: string[] = [];
  for (const p of priorities) {
    const mapped = map[p] ?? "Anders";
    if (mapped && !out.includes(mapped)) out.push(mapped);
  }
  return out;
}

/** Map form process tools naar exacte Airtable Multiple select opties. */
function mapProcessToolsToAirtable(tools: string[]): string[] {
  const map: Record<string, string> = {
    "Excel": "Excel",
    "Email": "Outlook",
    "ERP": "Anders",
    "CRM": "Anders",
    "Boekhouding": "Exact Online",
    "Planning software": "Anders",
    "Anders": "Anders",
  };
  const out: string[] = [];
  for (const t of tools) {
    const mapped = map[t] ?? "Anders";
    if (mapped && !out.includes(mapped)) out.push(mapped);
  }
  return out;
}

// ─── Form value → exact Airtable Single select option (uit schema NEXTRIQ crm) ───
const ANNUAL_REVENUE_AIRTABLE: Record<string, string> = {
  lt200k: "< €1M",
  "200k_500k": "€500K-1M",
  "500k_1m": "€500K-1M",
  "1m_2_5m": "€1M-€5M",
  "2_5m_5m": "€1M-€5M",
  "5m_10m": "€5-10M",
  gt10m: "€5M-€20M",
};
const EMPLOYEES_AIRTABLE: Record<string, string> = {
  "1_5": "1-10",
  "6_10": "2-10",
  "11_25": "11-50",
  "26_50": "11-50",
  "51_100": "51-200",
  "100plus": "201-1000",
};
const TIME_IN_HOURS_AIRTABLE: Record<string, string> = {
  lt5u: "2-5 uur",
  "5_10u": "6-10 uur",
  "10_20u": "11-20 uur",
  "20_40u": "26-50",
  gt40u: "51-100",
};
const MISTAKE_COSTS_AIRTABLE: Record<string, string> = {
  lt50: "<€1.000",
  "50_200": "<€1.000",
  "200_1000": "€1.000-€5.000",
  gt1000: "€1K-€10K",
  onbekend: "Onbekend",
};
const COMPANY_GROW_AIRTABLE: Record<string, string> = {
  stabiel: "Stabiel",
  "5_15pct": "Matige groei",
  "15_30pct": "Sterke groei",
  gt30pct: "Sterke groei",
  krimp: "Krimp",
};
const CRM_USAGE_AIRTABLE: Record<string, string> = {
  ja: "Ja",
  nee: "Nee",
};
const CURRENT_SYSTEMS_AIRTABLE: Record<string, string> = {
  "1_3": "2-3",
  "4_6": "4-6",
  "7_10": "6-10",
  "10plus": "7+",
};
const INTEGRATIONS_AIRTABLE: Record<string, string> = {
  volledig: "Uitgebreid",
  deels: "Beperkt",
  niet: "Geen",
  weet_niet: "Geen",
};
const BUDGET_AIRTABLE: Record<string, string> = {
  ja: "Onbekend",
  overweging: "Onbekend",
  nog_niet: "Onbekend",
};
const TIMELINE_AIRTABLE: Record<string, string> = {
  "1_2m": "Binnen 3 maanden",
  "3_6m": "Binnen 6 maanden",
  "6_12m": "Binnen 12 maanden",
  gt12m: "Onbekend",
};
const FREQUENTIE_AIRTABLE: Record<string, string> = {
  dagelijks: "Dagelijks",
  wekelijks: "Wekelijks",
  maandelijks: "Maandelijks",
  ad_hoc: "Onregelmatig",
};
const TIME_PROCESS_AIRTABLE: Record<string, string> = {
  lt10min: "< 15m",
  "10_30min": "15-30m",
  "30_60min": "30-60m",
  "1_2uur": "1-2 uur",
  gt2uur: "2-4 uur",
};
const AANTAL_MENSEN_AIRTABLE: Record<string, string> = {
  "1": "1",
  "2_3": "2-5",
  "4_6": "6-10",
  "7plus": "11-25",
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

  const sectorMapped = mapSectorToAirtable(sector);
  const annualRevenueMapped = toAirtableOption(ANNUAL_REVENUE_AIRTABLE, annualRevenue);
  const employeesMapped = toAirtableOption(EMPLOYEES_AIRTABLE, employees);
  const timeInHoursMapped = toAirtableOption(TIME_IN_HOURS_AIRTABLE, timeInHours);
  const mistakeCostsMapped = toAirtableOption(MISTAKE_COSTS_AIRTABLE, mistakeCosts);
  const companyGrowMapped = toAirtableOption(COMPANY_GROW_AIRTABLE, companyGrow);
  const crmUsageMapped = toAirtableOption(CRM_USAGE_AIRTABLE, crmUsage);
  const dailyToolsMapped = mapDailyToolsToAirtable(dailyTools);
  const currentSystemsMapped = toAirtableOption(CURRENT_SYSTEMS_AIRTABLE, currentSystems);
  const integrationsMapped = toAirtableOption(INTEGRATIONS_AIRTABLE, integrations);
  const prioriteitenMapped = mapPrioriteitenToAirtable(prioriteiten);
  const budgetMapped = toAirtableOption(BUDGET_AIRTABLE, budget);
  const timelineMapped = toAirtableOption(TIMELINE_AIRTABLE, timeline);

  const fields: Record<string, unknown> = {
    Company: company || "",
    created_at: createdAt,
    Name: name || "",
    email: str(payload.email),
    Function: fn || "",
    Phone_number: phone || "",
    sector: sectorMapped || "",
    Annual_Revenue: annualRevenueMapped || "",
    Employees: employeesMapped || "",
    Lost_time: lostTime || "",
    "Time_in_hours": timeInHoursMapped || "",
    Mistakes: mistakes || "",
    "Mistake costs": mistakeCostsMapped || "",
    "Company's grow": companyGrowMapped || "",
    watAlsOmzetVerdubbelt: watAls || "",
    "ERP name": erpName || "",
    "CRM usage": crmUsageMapped || "",
    "CRM name": crmName || "",
    "Daily tools": dailyToolsMapped,
    "Current Systems": currentSystemsMapped || "",
    Integrations: integrationsMapped || "",
    "Main goal": mainGoal || "",
    prioriteiten: prioriteitenMapped,
    "Biggest impact": biggestImpact || "",
    budgetAutomatisering: budgetMapped || "",
    timeline: timelineMapped || "",
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
  const toolsMapped = mapProcessToolsToAirtable(tools);

  return {
    Process: processName || "",
    created_at: createdAt,
    intake: [intakeRecordId],
    Company: company,
    email,
    proces_index: index + 1,
    Description: pickFirst(process.description, process.beschrijving) || "",
    frequentie: toAirtableOption(FREQUENTIE_AIRTABLE, freq) || "",
    Time: toAirtableOption(TIME_PROCESS_AIRTABLE, tijd) || "",
    aantalMensen: toAirtableOption(AANTAL_MENSEN_AIRTABLE, mensen) || "",
    tools: toolsMapped,
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
