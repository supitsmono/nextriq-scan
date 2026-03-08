"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Shield } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/40 flex items-start justify-center px-4 py-10 sm:py-14">
      <div className="w-full max-w-2xl space-y-5">
        {/* Top brand bar */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold tracking-tight">N</span>
            </div>
            <span className="font-bold text-zinc-900 text-sm tracking-tight">
              NEXTRIQ
            </span>
            <span className="text-zinc-300 text-sm">·</span>
            <span className="text-zinc-400 text-sm font-medium">AI Intelligence Scan</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 font-medium bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
              <Shield className="h-3 w-3" />
              Volledig vertrouwelijk
            </span>
            <a
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              Annuleren
            </a>
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/5 overflow-hidden">
          {/* Progress section */}
          {!hideProgress && (
            <div className="px-6 pt-5 pb-4 border-b border-zinc-100 bg-zinc-50/60">
              <WizardProgress />
            </div>
          )}

          {/* Step header */}
          {!hideProgress && (
            <div className="px-6 pt-5 pb-2">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`header-${currentStep}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
                    {stepMeta.title}
                  </h1>
                  <p className="text-sm text-zinc-500 mt-0.5 leading-relaxed">
                    {stepMeta.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Step content */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait" initial={false} custom={currentStep}>
              <motion.div
                key={`step-${currentStep}`}
                custom={currentStep}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-400 pb-4">
          Uw gegevens zijn strikt vertrouwelijk en worden uitsluitend gebruikt voor de NEXTRIQ AI Intelligence Scan.{" "}
          <span className="text-violet-500 font-medium">nextriq.nl</span>
        </p>
      </div>
    </div>
  );
}
