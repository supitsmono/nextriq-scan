"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useWizard } from "./WizardProvider";
import { useWizardForm } from "./WizardFormProvider";
import { STEPS_CONFIG } from "@/lib/stepsConfig";
import { WizardFormData } from "@/lib/schema";

interface WizardNavigationProps {
  nextLabel?: string;
  onSubmit?: () => void | Promise<void>;
  isSubmitting?: boolean;
}

export function WizardNavigation({
  nextLabel,
  onSubmit,
  isSubmitting = false,
}: WizardNavigationProps) {
  const { currentStep, totalSteps, canGoBack, goBack, goNext } = useWizard();
  const { trigger } = useWizardForm();

  const isLastStep = currentStep === totalSteps;
  const stepConfig = STEPS_CONFIG[currentStep - 1];

  const scrollToFirstError = () => {
    // shadcn FormControl zet aria-invalid="true" op het eerste ongeldige element
    setTimeout(() => {
      const el = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus({ preventScroll: true });
      }
    }, 60);
  };

  const handleNext = async () => {
    const fields = stepConfig.fields as (keyof WizardFormData)[];
    const valid = await trigger(fields);

    if (!valid) {
      scrollToFirstError();
      return;
    }

    if (isLastStep) {
      await onSubmit?.();
    } else {
      goNext();
    }
  };

  const nextButtonLabel = nextLabel
    ? nextLabel
    : isLastStep
    ? "Scan versturen"
    : "Volgende stap";

  return (
    <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-100">
      {/* Vorige knop */}
      <div>
        {canGoBack ? (
          <Button
            type="button"
            variant="ghost"
            onClick={goBack}
            disabled={isSubmitting}
            className="gap-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Vorige
          </Button>
        ) : (
          <div />
        )}
      </div>

      {/* Volgende / Versturen knop */}
      <motion.div whileTap={{ scale: 0.97 }}>
        <Button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className={
            isLastStep
              ? "gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200 px-6"
              : "gap-2 bg-zinc-900 hover:bg-zinc-700 text-white px-6"
          }
        >
          {isLastStep && <Sparkles className="h-4 w-4" />}
          {isSubmitting ? "Bezig…" : nextButtonLabel}
          {!isLastStep && <ArrowRight className="h-4 w-4" />}
        </Button>
      </motion.div>
    </div>
  );
}
