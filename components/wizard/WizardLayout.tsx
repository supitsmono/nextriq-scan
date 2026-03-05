"use client";

import { AnimatePresence, motion } from "framer-motion";
import { WizardProgress } from "./WizardProgress";
import { useWizard } from "./WizardProvider";

const STEP_VARIANTS = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
};

interface WizardLayoutProps {
  children: React.ReactNode;
  hideProgress?: boolean;
}

export function WizardLayout({ children, hideProgress = false }: WizardLayoutProps) {
  const { currentStep, stepMeta } = useWizard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex items-start justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-2xl space-y-6">
        {/* Top brand bar */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-tight">N</span>
            </div>
            <span className="font-semibold text-zinc-900 text-sm tracking-tight">
              NEXTRIQ
            </span>
            <span className="text-zinc-300 text-sm">·</span>
            <span className="text-zinc-400 text-sm">AI Intelligence Scan</span>
          </div>
          <a
            href="/"
            className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            Annuleren
          </a>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/5 overflow-hidden">
          {/* Progress section — hidden on success screen */}
          {!hideProgress && (
            <div className="px-6 pt-6 pb-5 border-b border-zinc-100 bg-zinc-50/50">
              <WizardProgress />
            </div>
          )}

          {/* Step header — hidden on success screen */}
          {!hideProgress && (
            <div className="px-6 pt-6 pb-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`header-${currentStep}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">
                    {stepMeta.title}
                  </h1>
                  <p className="text-sm text-zinc-500 mt-0.5">{stepMeta.subtitle}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Step content */}
          <div className="px-6 pb-6">
            <AnimatePresence
              mode="wait"
              initial={false}
              custom={currentStep}
            >
              <motion.div
                key={`step-${currentStep}`}
                custom={currentStep}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-400 pb-4">
          Je gegevens zijn vertrouwelijk en worden alleen gebruikt voor de AI Intelligence Scan.
        </p>
      </div>
    </div>
  );
}
