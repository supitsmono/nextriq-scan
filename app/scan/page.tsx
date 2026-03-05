"use client";

import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { WizardProvider, useWizard } from "@/components/wizard/WizardProvider";
import { WizardFormProvider, useWizardForm } from "@/components/wizard/WizardFormProvider";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { Step1Bedrijf } from "@/components/steps/Step1Bedrijf";
import { Step2Kernprocessen } from "@/components/steps/Step2Kernprocessen";
import { Step3Tijdefficiency } from "@/components/steps/Step3Tijdefficiency";
import { Step4Technologie } from "@/components/steps/Step4Technologie";
import { Step5Strategie } from "@/components/steps/Step5Strategie";
import { Button } from "@/components/ui/button";
import type { WizardFormData } from "@/lib/schema";

// ─── Success screen ──────────────────────────────────────────────────────────

function SuccessScreen({ data }: { data: WizardFormData }) {
  const prioriteiten = data.prioriteiten ?? [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center text-center py-8 space-y-6"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
        <CheckCircle2 className="h-8 w-8 text-white" />
      </div>

      <div className="space-y-1.5 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-zinc-900">
          Bedankt voor uw aanvraag
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Uw AI Intelligence Scan wordt voorbereid. Binnen{" "}
          <strong>24 uur</strong> ontvangt u een analyse van de grootste
          automatiseringskansen in uw bedrijf.
        </p>
      </div>

      {/* Korte samenvatting van de ingevulde data */}
      <div className="w-full max-w-xl rounded-xl bg-zinc-50 border border-zinc-100 px-4 py-3.5 text-left space-y-2">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
          Samenvatting
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600">
          <div>
            <p className="font-medium text-zinc-800">Bedrijf</p>
            <p>{data.bedrijfsnaam || "Niet opgegeven"}</p>
          </div>
          <div>
            <p className="font-medium text-zinc-800">Belangrijkste doel</p>
            <p className="line-clamp-2">
              {data.belangrijksteDoel || "Niet opgegeven"}
            </p>
          </div>
          <div>
            <p className="font-medium text-zinc-800">Prioriteiten</p>
            <p>
              {prioriteiten.length > 0
                ? prioriteiten.join(", ")
                : "Geen prioriteiten geselecteerd"}
            </p>
          </div>
          <div>
            <p className="font-medium text-zinc-800">Grootste impact</p>
            <p className="line-clamp-2">
              {data.grootsteImpact || "Niet opgegeven"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          variant="default"
          onClick={() => window.location.assign("/scan")}
          className="min-w-[160px]"
        >
          Nieuwe scan starten
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.assign("/")}
          className="min-w-[160px]"
        >
          Terug naar homepage
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Wizard steps renderer ───────────────────────────────────────────────────

interface WizardStepsProps {
  onSubmitSuccess: (data: WizardFormData) => void;
}

function WizardSteps({ onSubmitSuccess }: WizardStepsProps) {
  const { currentStep } = useWizard();
  const { handleSubmit } = useWizardForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = async () => {
    await handleSubmit(async (data) => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/intake", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.error("Intake request failed", response.status);
          return;
        }

        onSubmitSuccess(data);
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  switch (currentStep) {
    case 1:  return <Step1Bedrijf />;
    case 2:  return <Step2Kernprocessen />;
    case 3:  return <Step3Tijdefficiency />;
    case 4:  return <Step4Technologie />;
    case 5:  return (
      <Step5Strategie
        onSubmit={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />
    );
    default: return null;
  }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ScanPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<WizardFormData | null>(null);

  return (
    /**
     * Provider volgorde (buiten → binnen):
     * 1. WizardFormProvider  → 1 useForm voor alle stappen + FormProvider (RHF)
     * 2. WizardProvider      → stap-navigatie (currentStep, goNext, goBack)
     * 3. WizardLayout        → card shell + progress bar + animaties
     * 4. WizardSteps / SuccessScreen
     *
     * WizardNavigation heeft toegang tot beide providers:
     *  - useWizardForm() → trigger(fields)
     *  - useWizard()     → goNext / goBack
     */
    <WizardFormProvider>
      <WizardProvider>
        <WizardLayout hideProgress={submitted}>
          {submitted && submittedData ? (
            <SuccessScreen data={submittedData} />
          ) : (
            <WizardSteps
              onSubmitSuccess={(data) => {
                setSubmittedData(data);
                setSubmitted(true);
              }}
            />
          )}
        </WizardLayout>
      </WizardProvider>
    </WizardFormProvider>
  );
}
