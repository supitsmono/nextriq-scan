import { WizardFormData } from "./schema";

export interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  timeEstimate: string; // e.g. "~3 min"
  fields: (keyof WizardFormData)[];
}

export const STEPS_CONFIG: StepConfig[] = [
  {
    id: 1,
    title: "Contactgegevens & Bedrijfsprofiel",
    subtitle: "Basisinformatie om het rapport op maat te maken",
    timeEstimate: "~3 min",
    fields: [
      "email",
      "naam",
      "functie",
      "bedrijfsnaam",
      "vestigingsplaats",
      "sector",
      "bedrijfsBeschrijving",
      "jaaromzet",
      "aantalMedewerkers",
    ],
  },
  {
    id: 2,
    title: "Procesinventarisatie",
    subtitle: "Beschrijf uw 5 meest tijdsintensieve bedrijfsprocessen",
    timeEstimate: "~8 min",
    fields: ["processen"],
  },
  {
    id: 3,
    title: "Pijnpunten & Bottlenecks",
    subtitle: "Waar zitten de knelpunten en verborgen kosten?",
    timeEstimate: "~4 min",
    fields: [
      "drieGrootsFrustraties",
      "tijdVerliesPerWeek",
      "repetitieveTaken",
      "waarGaanFoutenMis",
      "bedrijfsgroei",
      "watAlsOmzetVerdubbelt",
    ],
  },
  {
    id: 4,
    title: "Data & Informatiebeheer",
    subtitle: "Hoe uw data is georganiseerd bepaalt welke AI-oplossingen mogelijk zijn",
    timeEstimate: "~3 min",
    fields: ["informatieWaarLeeft"],
  },
  {
    id: 5,
    title: "Technologie & Systemen",
    subtitle: "Een volledig beeld van uw techstack",
    timeEstimate: "~3 min",
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
    id: 6,
    title: "Klantbeleving & Sales",
    subtitle: "Hoe u klanten aantrekt, bedient en behoudt",
    timeEstimate: "~3 min",
    fields: ["salesProces"],
  },
  {
    id: 7,
    title: "Team, Organisatie & HR",
    subtitle: "Hoe AI uw mensen kan ondersteunen",
    timeEstimate: "~3 min",
    fields: ["sleutelmedewerkerRisico"],
  },
  {
    id: 8,
    title: "Financiële Situatie & ROI",
    subtitle: "Eerlijke berekening van wat AI-automatisering u oplevert",
    timeEstimate: "~3 min",
    fields: ["budgetAI"],
  },
  {
    id: 9,
    title: "AI-Gereedheid & Agent-Readiness",
    subtitle: "Welke AI-oplossingen zijn nu al mogelijk voor uw bedrijf?",
    timeEstimate: "~4 min",
    fields: ["automatiseringsKandidaten"],
  },
  {
    id: 10,
    title: "Strategische Doelen & Visie",
    subtitle: "Waar wilt u naartoe? Hoe ambitieuzer, hoe concreter het advies",
    timeEstimate: "~4 min",
    fields: [
      "belangrijksteDoel",
      "topPrioriteiten",
      "grootsteImpact",
    ],
  },
];
