import type { DefaultValues } from "react-hook-form";
import type { WizardFormData } from "./schema";

/**
 * DefaultValues<T> = DeepPartial<T> — staat undefined toe voor required fields.
 * Dit is nodig omdat frequentie / tijdPerKeer / aantalMensen required enums zijn
 * maar nog niet zijn ingevuld bij het openen van de wizard.
 */
export const defaultValues: DefaultValues<WizardFormData> = {
  // ── Step 1: Bedrijf ──────────────────────────────────────────────────
  bedrijfsnaam: "",
  naam: "",
  functie: "",
  email: "",
  telefoon: "",
  sector: "",
  jaaromzet: "",
  aantalMedewerkers: "",

  // ── Step 2: Kernprocessen ────────────────────────────────────────────
  processen: [
    {
      procesNaam: "",
      beschrijving: "",
      // frequentie, tijdPerKeer, aantalMensen, volumePerMaand → undefined (required by Zod, leeg tot selectie)
      tools: [],
      toolsAnders: "",
    },
  ],

  // ── Step 3: Tijd & Inefficiëntie ────────────────────────────────────
  waarGaatTijdVerloren: [],
  repetitiefWerkUren: "",
  waarGaanFoutenMis: "",
  gemiddeldeFoutKosten: "",
  bedrijfsgroei: "",
  watAlsOmzetVerdubbelt: "",

  // ── Step 4: Technologie ──────────────────────────────────────────────
  erpGebruik: "nee",
  erpNaam: "",
  crmGebruik: "nee",
  crmNaam: "",
  dagelijkseTools: [],
  aantalSystemen: "",
  integraties: "",
  dataOpslag: [],

  // ── Step 5: Strategie ────────────────────────────────────────────────
  belangrijksteDoel: "",
  prioriteiten: [],
  grootsteImpact: "",
  budgetAutomatisering: "",
  timeline: "",
  extraContext: "",
};
