"use client";

import { useState } from "react";
import { CheckCircle2, Clock, FileText, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { WizardProvider, useWizard } from "@/components/wizard/WizardProvider";
import { WizardFormProvider, useWizardForm, clearSavedProgress } from "@/components/wizard/WizardFormProvider";
import { WizardLayout } from "@/components/wizard/WizardLayout";
import { Step1Bedrijf } from "@/components/steps/Step1Bedrijf";
import { Step2Kernprocessen } from "@/components/steps/Step2Kernprocessen";
import { Step3Pijnpunten } from "@/components/steps/Step3Pijnpunten";
import { Step4DataBeheer } from "@/components/steps/Step4DataBeheer";
import { Step5Technologie } from "@/components/steps/Step5Technologie";
import { Step6KlantSales } from "@/components/steps/Step6KlantSales";
import { Step7Team } from "@/components/steps/Step7Team";
import { Step8Financieel } from "@/components/steps/Step8Financieel";
import { Step9AIGereedheid } from "@/components/steps/Step9AIGereedheid";
import { Step10Strategie } from "@/components/steps/Step10Strategie";
import { Button } from "@/components/ui/button";
import type { WizardFormData } from "@/lib/schema";

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ data }: { data: WizardFormData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center py-10 space-y-6"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-200">
        <CheckCircle2 className="h-10 w-10 text-white" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-zinc-900">Scan ontvangen — bedankt!</h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          Uw NEXTRIQ AI Intelligence Scan is volledig ingevuld. Binnen{" "}
          <strong className="text-zinc-700">48 uur</strong> ontvangt u een gepersonaliseerd
          rapport met concrete AI-aanbevelingen en een ROI-berekening op maat.
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl bg-violet-50 border border-violet-200 px-5 py-4 text-left space-y-3">
        <p className="text-xs font-bold text-violet-700 uppercase tracking-widest">Wat gebeurt er nu?</p>
        {[
          { icon: FileText, text: "Uw antwoorden worden geanalyseerd door ons AI-team" },
          { icon: Sparkles, text: "We identificeren de grootste automatiseringskansen" },
          { icon: Clock, text: "Binnen 48 uur ontvangt u uw persoonlijke rapport" },
        ].map(({ icon: Icon, text }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100">
              <Icon className="h-3.5 w-3.5 text-violet-600" />
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md rounded-xl bg-zinc-50 border border-zinc-100 px-5 py-4 text-left space-y-3">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Samenvatting</p>
        <div className="grid grid-cols-2 gap-3 text-xs text-zinc-600">
          <div><p className="font-semibold text-zinc-800">Bedrijf</p><p>{data.bedrijfsnaam || "—"}</p></div>
          <div><p className="font-semibold text-zinc-800">E-mail</p><p>{data.email || "—"}</p></div>
          <div><p className="font-semibold text-zinc-800">Sector</p><p>{data.sector || "—"}</p></div>
          <div><p className="font-semibold text-zinc-800">Processen</p><p>{data.processen?.length ?? 0} ingevuld</p></div>
          <div className="col-span-2"><p className="font-semibold text-zinc-800">Belangrijkste doel</p><p className="line-clamp-2">{data.belangrijksteDoel || "—"}</p></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button variant="default" onClick={() => { clearSavedProgress(); window.location.assign("/scan"); }}
          className="min-w-[160px] bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
          Nieuwe scan starten
        </Button>
        <Button variant="outline" onClick={() => window.location.assign("/")} className="min-w-[160px]">
          Terug naar homepage
        </Button>
      </div>
      <p className="text-xs text-zinc-400">nextriq.nl · Samen bouwen. Samen groeien.</p>
    </motion.div>
  );
}

// ─── Wizard steps renderer ────────────────────────────────────────────────────

interface WizardStepsProps {
  onSubmitSuccess: (data: WizardFormData) => void;
}

function WizardSteps({ onSubmitSuccess }: WizardStepsProps) {
  const { currentStep } = useWizard();
  const { handleSubmit } = useWizardForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFinalSubmit = async () => {
    setSubmitError(null);
    await handleSubmit(async (data) => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
          const res = result as { error?: string; details?: string };
          const msg = res?.error ?? "Versturen mislukt. Probeer het later opnieuw.";
          const details = res?.details ? ` (${res.details})` : "";
          setSubmitError(msg + details);
          return;
        }

        clearSavedProgress();
        onSubmitSuccess(data);
      } catch {
        setSubmitError(
          "Versturen mislukt. Controleer je internet en probeer opnieuw."
        );
      } finally {
        setIsSubmitting(false);
      }
    })();
  };

  switch (currentStep) {
    case 1:  return <Step1Bedrijf />;
    case 2:  return <Step2Kernprocessen />;
    case 3:  return <Step3Pijnpunten />;
    case 4:  return <Step4DataBeheer />;
    case 5:  return <Step5Technologie />;
    case 6:  return <Step6KlantSales />;
    case 7:  return <Step7Team />;
    case 8:  return <Step8Financieel />;
    case 9:  return <Step9AIGereedheid />;
    case 10: return (
      <>
        <Step10Strategie
          onSubmit={handleFinalSubmit}
          isSubmitting={isSubmitting}
        />
        {submitError && (
          <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {submitError}
          </p>
        )}
      </>
    );
    default: return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ScanPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<WizardFormData | null>(null);

  return (
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
