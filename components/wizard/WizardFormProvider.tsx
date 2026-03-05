"use client";

import React, { createContext, useContext } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, WizardFormData } from "@/lib/schema";
import { defaultValues } from "@/lib/defaultValues";

// ─── Context ────────────────────────────────────────────────────────────────

const WizardFormContext = createContext<UseFormReturn<WizardFormData> | null>(
  null
);

/** Geeft toegang tot het volledige RHF form object (control, trigger, watch…) */
export function useWizardForm(): UseFormReturn<WizardFormData> {
  const ctx = useContext(WizardFormContext);
  if (!ctx)
    throw new Error("useWizardForm must be used inside <WizardFormProvider>");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface WizardFormProviderProps {
  children: React.ReactNode;
}

export function WizardFormProvider({ children }: WizardFormProviderProps) {
  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues,
    /**
     * onTouched: validatie wordt getoond zodra een veld verlaten is (blur).
     * Daarna wordt live gevalideerd bij elke keystroke totdat de fout weg is.
     * Meest gebruiksvriendelijke mode voor een wizard.
     */
    mode: "onTouched",
  });

  return (
    // WizardFormContext → geeft trigger() toegang aan WizardNavigation
    // FormProvider      → maakt useFormContext() beschikbaar in alle steps
    <WizardFormContext.Provider value={form}>
      <FormProvider {...form}>{children}</FormProvider>
    </WizardFormContext.Provider>
  );
}
