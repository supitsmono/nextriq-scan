"use client";

import { motion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { useWizard, STEP_META } from "./WizardProvider";
import { cn } from "@/lib/utils";

export function WizardProgress() {
  const { currentStep, totalSteps, progressPercent, goToStep, stepMeta } =
    useWizard();

  return (
    <div className="w-full space-y-3">
      {/* Top row: section info + time estimate */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 border border-violet-200 px-2.5 py-0.5 text-[11px] font-semibold text-violet-700">
            Sectie {currentStep}/{totalSteps}
          </span>
          <motion.span
            key={currentStep}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs font-medium text-zinc-700 hidden sm:block"
          >
            {stepMeta.title}
          </motion.span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-zinc-400 font-medium">
            {stepMeta.timeEstimate}
          </span>
          <span className="text-[11px] text-zinc-400">
            {progressPercent}% voltooid
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Numbered step dots */}
      <div className="flex items-center justify-between gap-0.5 pt-0.5">
        {STEP_META.map((meta, idx) => {
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
              title={meta.title}
              className={cn(
                "relative flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-200 focus:outline-none",
                isDone &&
                  "border-violet-500 bg-violet-500 text-white cursor-pointer hover:bg-violet-600",
                isActive &&
                  "border-violet-600 bg-white text-violet-600 shadow-sm shadow-violet-200 ring-2 ring-violet-300/60",
                !isDone &&
                  !isActive &&
                  "border-zinc-200 bg-white text-zinc-300 cursor-default"
              )}
              aria-label={`Ga naar sectie ${stepNum}: ${meta.title}`}
            >
              {isDone ? (
                <Check className="h-3 w-3 stroke-[3]" />
              ) : isActive ? (
                stepNum
              ) : stepNum > currentStep + 3 ? (
                <Lock className="h-2.5 w-2.5" />
              ) : (
                stepNum
              )}

              {/* Active pulse */}
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-violet-400"
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
