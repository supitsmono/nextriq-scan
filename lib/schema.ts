import { z } from "zod";

// ─── Sub-schema: één proces (Sectie 2) ────────────────────────────────────────

export const procesSchema = z.object({
  procesNaam: z.string().min(1, "Procesnaam is verplicht"),
  afdeling: z.string().min(1, "Afdeling is verplicht"),
  stapVoorStap: z
    .string()
    .min(20, "Beschrijf het proces in minimaal 20 tekens"),
  tijdPerMaand: z
    .enum(["lt10uur", "10_30uur", "30_60uur", "60_100uur", "100_200uur", "gt200uur"])
    .optional()
    .refine((v) => v !== undefined, "Selecteer tijdsduur per maand"),
  aantalMensen: z.string().min(1, "Aantal betrokken mensen is verplicht"),
  tools: z.string().optional(),
  foutFrequentie: z.enum(["zelden", "soms", "regelmatig", "vaak"]).optional(),
  kostenPerFout: z.string().optional(),
  documentatieStatus: z
    .enum(["volledig", "gedeeltelijk", "hoofden", "geen"])
    .optional(),
  urgentie: z.string().optional(), // "1" – "5"
});

export type ProcesData = z.infer<typeof procesSchema>;

// ─── Hoofd-schema ─────────────────────────────────────────────────────────────

const wizardSchemaBase = z.object({

  // ── Sectie 1: Contactgegevens & Bedrijfsprofiel ───────────────────────────
  email: z.string().email("Voer een geldig e-mailadres in"),
  naam: z.string().min(1, "Naam is verplicht"),
  functie: z.string().min(1, "Functietitel is verplicht"),
  telefoon: z.string().optional(),
  linkedin: z.string().optional(),
  bedrijfsnaam: z.string().min(1, "Bedrijfsnaam is verplicht"),
  kvk: z.string().optional(),
  website: z.string().optional(),
  vestigingsplaats: z.string().min(1, "Vestigingsplaats is verplicht"),
  aantalVestigingen: z.string().optional(),
  sector: z.string().min(1, "Sector is verplicht"),
  bedrijfsBeschrijving: z
    .string()
    .min(10, "Geef een beschrijving van minimaal 10 tekens"),
  jaaromzet: z.string().min(1, "Selecteer een omzetrange"),
  aantalMedewerkers: z.string().min(1, "Selecteer het aantal medewerkers"),
  bedrijfsStructuur: z.string().optional(),

  // ── Sectie 2: Procesinventarisatie (Top 5) ────────────────────────────────
  processen: z
    .array(procesSchema)
    .min(1, "Voeg minimaal 1 proces toe")
    .max(5, "Maximaal 5 processen"),

  // ── Sectie 3: Pijnpunten, Bottlenecks & Verborgen Kosten ─────────────────
  drieGrootsFrustraties: z
    .string()
    .min(20, "Beschrijf uw 3 frustraties in minimaal 20 tekens"),
  tijdVerliesPerWeek: z
    .string()
    .min(10, "Beschrijf tijdverlies in minimaal 10 tekens"),
  repetitieveTaken: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 optie"),
  percentageRepetitief: z.string().optional(),
  waarGaanFoutenMis: z
    .string()
    .min(20, "Beschrijf dit in minimaal 20 tekens"),
  gevolgFouten: z.array(z.string()).optional(),
  foutKostenPerMaand: z.string().optional(),
  bedrijfsgroei: z.string().min(1, "Selecteer een optie"),
  watAlsOmzetVerdubbelt: z
    .string()
    .min(20, "Beschrijf dit in minimaal 20 tekens"),
  bottlenecksGroei: z.string().optional(),
  personeelTekort: z.string().optional(),

  // ── Sectie 4: Data, Informatiebeheer & Digitale Volwassenheid ────────────
  informatieWaarLeeft: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 optie"),
  dataConsistentie: z.string().optional(),
  dataVertrouwen: z.string().optional(), // "1"–"5"
  dataSoorten: z.array(z.string()).optional(),
  inzichtBedrijfsprestaties: z.array(z.string()).optional(),
  metricsGoedZicht: z.string().optional(),
  metricsBeterInzicht: z.string().optional(),
  rapportageDuur: z.string().optional(),
  documentenBeheer: z.array(z.string()).optional(),
  documentZoekenDuur: z.string().optional(),

  // ── Sectie 5: Huidige Technologie & Systemen ─────────────────────────────
  erpGebruik: z.enum(["ja", "nee", "zoeken"]),
  erpNaam: z.string().optional(),
  crmGebruik: z.enum(["ja", "nee", "excel"]),
  crmNaam: z.string().optional(),
  boekhoudsoftware: z.array(z.string()).optional(),
  planningsoplossing: z.string().optional(),
  planningsSoftwareNaam: z.string().optional(),
  dagelijkseTools: z.array(z.string()).min(1, "Selecteer minimaal 1 tool"),
  interneCommunicatie: z.array(z.string()).optional(),
  aantalSystemen: z.string().min(1, "Selecteer een optie"),
  integraties: z.string().min(1, "Selecteer een optie"),
  handmatigeDataOverzet: z.string().optional(),
  automatiseringsErvaring: z.string().optional(),
  itVolwassenheid: z.string().optional(), // "1"–"5"

  // ── Sectie 6: Klantbeleving, Sales & Klantenservice ───────────────────────
  salesProces: z
    .string()
    .min(20, "Beschrijf uw salesproces in minimaal 20 tekens"),
  leadTotDealDoorlooptijd: z.string().optional(),
  conversieratio: z.string().optional(),
  leadsAfhaakpunt: z.string().optional(),
  tijdOftesPerWeek: z.string().optional(),
  klantvragenPerDag: z.string().optional(),
  reactietijdKlant: z.string().optional(),
  soortKlantvragen: z.array(z.string()).optional(),
  klanttevredenheidNPS: z.string().optional(),
  klantretentie: z.string().optional(),
  aantalActieveKlanten: z.string().optional(),
  klantsegmentatie: z.string().optional(),
  upsellCrossSell: z.string().optional(),

  // ── Sectie 7: Team, Organisatie & HR-Processen ───────────────────────────
  bedrijfsOrganisatie: z.string().optional(),
  aanwezigeRollen: z.array(z.string()).optional(),
  percentageRepetitieveWerkers: z.string().optional(),
  sleutelmedewerkerRisico: z
    .string()
    .min(10, "Beschrijf dit in minimaal 10 tekens"),
  onboardingDuur: z.string().optional(),
  onboardingGestandaardiseerd: z.string().optional(),
  teamHoudingAI: z.string().optional(),
  technischeAffiniteit: z.string().optional(),
  gebruiksgemakBelang: z.string().optional(), // "1"–"5"

  // ── Sectie 8: Financiële Situatie & ROI-Perspectief ──────────────────────
  grootsteKostenpost: z.string().optional(),
  brutomarge: z.string().optional(),
  gemiddeldUurtarief: z.string().optional(),
  budgetAI: z.string().min(1, "Selecteer een optie"),
  roiBeoordeling: z.string().optional(),
  eerdereInvesteringen: z.string().optional(),
  waarde40Uur: z.string().optional(),
  bewijsSuccesAI: z.array(z.string()).optional(),

  // ── Sectie 9: AI-Gereedheid & Agent-Readiness ─────────────────────────────
  huidigeAITools: z.array(z.string()).optional(),
  aiGebruikWijze: z.array(z.string()).optional(),
  agentBegrip: z.string().optional(),
  automatiseringsKandidaten: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 kandidaat"),
  comfortNiveauAI: z.string().optional(),
  dataToegangAI: z.array(z.string()).optional(),
  sectorRegelgeving: z.string().optional(),
  klantdataPrivacy: z.array(z.string()).optional(),
  aiTraceerbaarheid: z.string().optional(), // "1"–"5"

  // ── Sectie 10: Strategische Doelen & Transformatievisie ──────────────────
  belangrijksteDoel: z
    .string()
    .min(10, "Beschrijf uw doel in minimaal 10 tekens"),
  topPrioriteiten: z
    .array(z.string())
    .min(1, "Selecteer minimaal 1 prioriteit")
    .max(3, "Selecteer maximaal 3 prioriteiten"),
  grootsteImpact: z.string().min(1, "Dit veld is verplicht"),
  eersteResultatenTimeline: z.string().optional(),
  bedrijfOver3Jaar: z.string().optional(),
  rolAIToekomst: z.string().optional(),
  aiExpertiseBeslissing: z.string().optional(),
  samenwerkingsVorm: z.string().optional(),
  startSnelheid: z.string().optional(),
  aanleiding: z.string().optional(),
  eerderAIBureaus: z.string().optional(),
  bijzonderheden: z.string().optional(),
  hoeGevonden: z.string().optional(),
});

// Conditionele validaties
export const wizardSchema = wizardSchemaBase
  .refine(
    (d) => d.erpGebruik !== "ja" || (d.erpNaam ?? "").trim().length > 0,
    { message: "Geef de naam van het ERP-systeem op", path: ["erpNaam"] }
  )
  .refine(
    (d) => d.crmGebruik !== "ja" || (d.crmNaam ?? "").trim().length > 0,
    { message: "Geef de naam van het CRM-systeem op", path: ["crmNaam"] }
  );

export type WizardFormData = z.infer<typeof wizardSchema>;
