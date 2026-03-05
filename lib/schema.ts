import { z } from "zod";

// ─── Sub-schema: één proces (Step 2) ───────────────────────────────────────

export const procesSchema = z.object({
  procesNaam: z.string().min(1, "Procesnaam is verplicht"),

  beschrijving: z
    .string()
    .min(20, "Geef een beschrijving van minimaal 20 tekens"),

  // .optional() + .refine() → undefined geeft custom message, Zod v4 compatible
  frequentie: z
    .enum(["dagelijks", "wekelijks", "maandelijks", "ad_hoc"])
    .optional()
    .refine((v) => v !== undefined, "Selecteer een frequentie"),

  tijdPerKeer: z
    .enum(["lt10min", "10_30min", "30_60min", "1_2uur", "gt2uur"])
    .optional()
    .refine((v) => v !== undefined, "Selecteer een tijdsduur"),

  aantalMensen: z
    .enum(["1", "2_3", "4_6", "7plus"])
    .optional()
    .refine((v) => v !== undefined, "Selecteer het aantal mensen"),

  // Optionele extra veld (AI readiness hint)
  volumePerMaand: z
    .enum(["1_10", "11_50", "51_200", "200plus"])
    .optional(),

  tools: z.array(z.string()).min(1, "Selecteer minimaal 1 tool"),

  // Zichtbaar als "Anders" is aangevinkt
  toolsAnders: z.string().optional(),
});

export type ProcesData = z.infer<typeof procesSchema>;

// ─── Hoofd-schema: alle velden van de wizard ───────────────────────────────

const wizardSchemaBase = z.object({
  // ── Step 1: Bedrijf ────────────────────────────────────────────────────
  bedrijfsnaam: z.string().min(1, "Bedrijfsnaam is verplicht"),
  naam: z.string().min(1, "Naam is verplicht"),
  functie: z.string().min(1, "Functie is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  telefoon: z.string().optional(),
  sector: z.string().min(1, "Sector is verplicht"),
  jaaromzet: z.string().min(1, "Selecteer een omzetrange"),
  aantalMedewerkers: z.string().min(1, "Selecteer het aantal medewerkers"),

  // ── Step 2: Kernprocessen ──────────────────────────────────────────────
  processen: z
    .array(procesSchema)
    .min(1, "Voeg minimaal 1 proces toe")
    .max(5, "Maximaal 5 processen"),

  // ── Step 3: Tijd & Inefficiëntie ──────────────────────────────────────
  waarGaatTijdVerloren: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 optie"),
  repetitiefWerkUren: z.string().min(1, "Selecteer een optie"),
  waarGaanFoutenMis: z
    .string()
    .min(20, "Beschrijf dit in minimaal 20 tekens"),
  gemiddeldeFoutKosten: z.string().min(1, "Selecteer een optie"),
  bedrijfsgroei: z.string().min(1, "Selecteer een optie"),
  watAlsOmzetVerdubbelt: z
    .string()
    .min(20, "Beschrijf dit in minimaal 20 tekens"),

  // ── Step 4: Technologie ────────────────────────────────────────────────
  erpGebruik: z.enum(["ja", "nee"]),
  erpNaam: z.string().optional(),
  crmGebruik: z.enum(["ja", "nee"]),
  crmNaam: z.string().optional(),
  dagelijkseTools: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 optie"),
  aantalSystemen: z.string().min(1, "Selecteer een optie"),
  integraties: z.string().min(1, "Selecteer een optie"),
  dataOpslag: z.array(z.string()), // AI readiness input

  // ── Step 5: Strategie ──────────────────────────────────────────────────
  belangrijksteDoel: z.string().min(10, "Geef een beschrijving van minimaal 10 tekens"),
  prioriteiten: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 prioriteit")
    .max(3, "Selecteer maximaal 3 prioriteiten"),
  grootsteImpact: z.string().min(1, "Dit veld is verplicht"),
  budgetAutomatisering: z.string().min(1, "Selecteer een optie"),
  timeline: z.string().min(1, "Selecteer een optie"),
  extraContext: z.string().optional(),
});

// Conditionele validatie: erpNaam verplicht als erpGebruik = "ja", idem crmNaam
export const wizardSchema = wizardSchemaBase.refine(
  (data) =>
    data.erpGebruik !== "ja" || (data.erpNaam ?? "").trim().length > 0,
  { message: "Geef de naam van je ERP-systeem op", path: ["erpNaam"] }
).refine(
  (data) =>
    data.crmGebruik !== "ja" || (data.crmNaam ?? "").trim().length > 0,
  { message: "Geef de naam van je CRM-systeem op", path: ["crmNaam"] }
);

export type WizardFormData = z.infer<typeof wizardSchema>;
