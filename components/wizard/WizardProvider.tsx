"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export const TOTAL_STEPS = 10;

export const STEP_META = [
  {
    step: 1,
    title: "Bedrijfsprofiel",
    subtitle: "Basisinformatie om het rapport op maat te maken",
    timeEstimate: "~3 min",
    icon: "Building2",
  },
  {
    step: 2,
    title: "Procesinventarisatie",
    subtitle: "Beschrijf uw 5 meest tijdsintensieve bedrijfsprocessen",
    timeEstimate: "~8 min",
    icon: "Workflow",
  },
  {
    step: 3,
    title: "Pijnpunten & Bottlenecks",
    subtitle: "Waar zitten de knelpunten en verborgen kosten?",
    timeEstimate: "~4 min",
    icon: "AlertTriangle",
  },
  {
    step: 4,
    title: "Data & Informatiebeheer",
    subtitle: "Hoe is uw data georganiseerd?",
    timeEstimate: "~3 min",
    icon: "Database",
  },
  {
    step: 5,
    title: "Technologie & Systemen",
    subtitle: "Een volledig beeld van uw techstack",
    timeEstimate: "~3 min",
    icon: "Cpu",
  },
  {
    step: 6,
    title: "Klantbeleving & Sales",
    subtitle: "Hoe u klanten aantrekt, bedient en behoudt",
    timeEstimate: "~3 min",
    icon: "Users",
  },
  {
    step: 7,
    title: "Team, Organisatie & HR",
    subtitle: "Hoe AI uw mensen kan ondersteunen",
    timeEstimate: "~3 min",
    icon: "UserCheck",
  },
  {
    step: 8,
    title: "Financieel & ROI",
    subtitle: "Eerlijke berekening van uw AI-potentieel",
    timeEstimate: "~3 min",
    icon: "TrendingUp",
  },
  {
    step: 9,
    title: "AI-Gereedheid",
    subtitle: "Welke AI-oplossingen zijn nu al mogelijk?",
    timeEstimate: "~4 min",
    icon: "Sparkles",
  },
  {
    step: 10,
    title: "Strategie & Visie",
    subtitle: "Waar wilt u naartoe?",
    timeEstimate: "~4 min",
    icon: "Target",
  },
] as const;

interface WizardContextValue {
  currentStep: number;
  totalSteps: number;
  progressPercent: number;
  stepMeta: (typeof STEP_META)[number];
  canGoBack: boolean;
  canGoNext: boolean;
  goNext: () => void;
  goBack: () => void;
  goToStep: (step: number) => void;
  formData: Record<string, unknown>;
  updateFormData: (data: Record<string, unknown>) => void;
}

const WizardContext = createContext<WizardContextValue | null>(null);

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error("useWizard must be used inside WizardProvider");
  return ctx;
}

interface WizardProviderProps {
  children: React.ReactNode;
}

export function WizardProvider({ children }: WizardProviderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const progressPercent = Math.round(((currentStep - 1) / (TOTAL_STEPS - 1)) * 100);

  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) setCurrentStep(step);
  }, []);

  const updateFormData = useCallback((data: Record<string, unknown>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const value: WizardContextValue = {
    currentStep,
    totalSteps: TOTAL_STEPS,
    progressPercent,
    stepMeta: STEP_META[currentStep - 1],
    canGoBack: currentStep > 1,
    canGoNext: currentStep < TOTAL_STEPS,
    goNext,
    goBack,
    goToStep,
    formData,
    updateFormData,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}
