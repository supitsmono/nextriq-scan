"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Workflow,
  Clock,
  Cpu,
  Target,
  Check,
} from "lucide-react";
import { useWizard, STEP_META } from "./WizardProvider";
import { cn } from "@/lib/utils";

const STEP_ICONS = [Building2, Workflow, Clock, Cpu, Target];

export function WizardProgress() {
  const { currentStep, totalSteps, progressPercent, goToStep } = useWizard();

  return (
    <div className="w-full space-y-4">
      {/* Step counter label */}
      <div className="flex items-center justify-between px-1">
        <motion.span
          key={currentStep}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold tracking-widest text-indigo-500 uppercase"
        >
          Stap {currentStep} van {totalSteps}
        </motion.span>
        <span className="text-xs text-muted-foreground font-medium">
          {progressPercent}% voltooid
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step pills */}
      <div className="flex items-center justify-between gap-1 pt-1">
        {STEP_META.map((meta, idx) => {
          const Icon = STEP_ICONS[idx];
          const stepNum = idx + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          const isClickable = stepNum < currentStep;

          return (
            <button
              key={stepNum}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && goToStep(stepNum)}
              className={cn(
                "group flex flex-col items-center gap-1.5 focus:outline-none",
                isClickable ? "cursor-pointer" : "cursor-default"
              )}
              aria-label={`Ga naar stap ${stepNum}: ${meta.title}`}
            >
              {/* Icon circle */}
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isDone &&
                    "border-indigo-500 bg-indigo-500 text-white",
                  isActive &&
                    "border-indigo-500 bg-white text-indigo-600 shadow-md shadow-indigo-100",
                  !isDone &&
                    !isActive &&
                    "border-zinc-200 bg-white text-zinc-400"
                )}
              >
                {isDone ? (
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                ) : (
                  <Icon className="h-3.5 w-3.5" />
                )}

                {/* Active pulse ring */}
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-indigo-400"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Label — hidden on mobile */}
              <span
                className={cn(
                  "hidden sm:block text-[10px] font-medium leading-none transition-colors duration-200",
                  isActive ? "text-indigo-600" : "text-zinc-400"
                )}
              >
                {meta.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
