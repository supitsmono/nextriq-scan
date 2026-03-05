import { WizardFormData } from "./schema";

export interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  /** Top-level keys van WizardFormData die bij deze stap horen.
   *  WizardNavigation roept trigger(fields) aan vóór het doorgaan. */
  fields: (keyof WizardFormData)[];
}

export const STEPS_CONFIG: StepConfig[] = [
  {
    id: 1,
    title: "Bedrijfsinformatie",
    subtitle: "Vertel ons over je organisatie",
    fields: [
      "bedrijfsnaam",
      "naam",
      "functie",
      "email",
      "telefoon",
      "sector",
      "jaaromzet",
      "aantalMedewerkers",
    ],
  },
  {
    id: 2,
    title: "Kernprocessen",
    subtitle: "Welke processen voert je team dagelijks uit?",
    fields: ["processen"],
  },
  {
    id: 3,
    title: "Tijd & Inefficiëntie",
    subtitle: "Waar lekt tijd weg en waar zitten fouten?",
    fields: [
      "waarGaatTijdVerloren",
      "repetitiefWerkUren",
      "waarGaanFoutenMis",
      "gemiddeldeFoutKosten",
      "bedrijfsgroei",
      "watAlsOmzetVerdubbelt",
    ],
  },
  {
    id: 4,
    title: "Technologie & systemen",
    subtitle: "Welke tools gebruikt uw bedrijf momenteel?",
    fields: [
      "erpGebruik",
      "erpNaam",
      "crmGebruik",
      "crmNaam",
      "dagelijkseTools",
      "aantalSystemen",
      "integraties",
    ],
  },
  {
    id: 5,
    title: "Strategie & Doelen",
    subtitle: "Wat wil je bereiken met AI?",
    fields: [
      "belangrijksteDoel",
      "prioriteiten",
      "grootsteImpact",
      "budgetAutomatisering",
      "timeline",
    ],
  },
];
