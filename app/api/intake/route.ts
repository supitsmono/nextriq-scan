const AIRTABLE_API_BASE = "https://api.airtable.com/v0";
const INTAKES_TABLE_ID = "tblPHbJjGDPATkz4F";
const PROCESSES_TABLE_ID = "tbltOdTDsTwBxQD7O";

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
    Annual_Revenue: annualRevenue || "",
    Employees: employees || "",
    Lost_time: lostTime || "",
    "Time_in_hours": timeInHours || "",
    Mistakes: mistakes || "",
    "Mistake costs": mistakeCosts || "",
    "Company's grow": companyGrow || "",
    watAlsOmzetVerdubbelt: watAls || "",
    "ERP name": erpName || "",
    "CRM usage": crmUsage || "",
    "CRM name": crmName || "",
    "Daily tools": dailyTools,
    "Current Systems": currentSystems || "",
    Integrations: integrations || "",
    "Main goal": mainGoal || "",
    prioriteiten,
    "Biggest impact": biggestImpact || "",
    budgetAutomatisering: budget || "",
    timeline: timeline || "",
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

  return {
    Process: processName || "",
    created_at: createdAt,
    intake: [intakeRecordId],
    Company: company,
    email,
    proces_index: index + 1,
    Description: pickFirst(process.description, process.beschrijving) || "",
    frequentie: pickFirst(process.frequency, process.frequentie) || "",
    Time: pickFirst(process.time_per_task, process.tijdPerKeer) || "",
    aantalMensen: pickFirst(process.people_involved, process.aantalMensen) || "",
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
    const intakeUrl = `${AIRTABLE_API_BASE}/${baseId}/${INTAKES_TABLE_ID}`;
    const intakeRes = await fetch(intakeUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ fields: intakeFields }),
    });

    if (!intakeRes.ok) {
      const errText = await intakeRes.text();
      console.error("Airtable Intakes error", intakeRes.status, errText);
      return Response.json(
        { success: false, error: "Kon intake niet opslaan" },
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
      const processUrl = `${AIRTABLE_API_BASE}/${baseId}/${PROCESSES_TABLE_ID}`;
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
