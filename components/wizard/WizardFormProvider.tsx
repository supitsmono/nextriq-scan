"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, WizardFormData } from "@/lib/schema";
import { defaultValues } from "@/lib/defaultValues";

const STORAGE_KEY = "nextriq_scan_progress";

// ─── Context ──────────────────────────────────────────────────────────────────

const WizardFormContext = createContext<UseFormReturn<WizardFormData> | null>(null);

export function useWizardForm(): UseFormReturn<WizardFormData> {
  const ctx = useContext(WizardFormContext);
  if (!ctx)
    throw new Error("useWizardForm must be used inside <WizardFormProvider>");
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

interface WizardFormProviderProps {
  children: React.ReactNode;
}

function getSavedValues(): Partial<WizardFormData> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function WizardFormProvider({ children }: WizardFormProviderProps) {
  const saved = getSavedValues();

  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: saved ? { ...defaultValues, ...saved } : defaultValues,
    mode: "onTouched",
  });

  // Auto-save to localStorage on every change
  useEffect(() => {
    const subscription = form.watch((values) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch {
        // quota exceeded — ignore
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <WizardFormContext.Provider value={form}>
      <FormProvider {...form}>{children}</FormProvider>
    </WizardFormContext.Provider>
  );
}

/** Call this after successful submission to clear saved progress */
export function clearSavedProgress() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
