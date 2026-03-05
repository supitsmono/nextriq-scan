"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export const TOTAL_STEPS = 5;

export const STEP_META = [
  {
    step: 1,
    title: "Bedrijfsinformatie",
    subtitle: "Vertel ons over je organisatie",
    icon: "Building2",
  },
  {
    step: 2,
    title: "Kernprocessen",
    subtitle: "Welke processen voert je team dagelijks uit?",
    icon: "Workflow",
  },
  {
    step: 3,
    title: "Tijd & Inefficiëntie",
    subtitle: "Waar lekt tijd weg en waar zitten fouten?",
    icon: "Clock",
  },
  {
    step: 4,
    title: "Technologie & systemen",
    subtitle: "Welke tools gebruikt uw bedrijf momenteel?",
    icon: "Cpu",
  },
  {
    step: 5,
    title: "Strategie & Doelen",
    subtitle: "Wat wil je bereiken met AI?",
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
