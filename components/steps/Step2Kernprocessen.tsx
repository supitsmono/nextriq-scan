"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus, Info, Lightbulb } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { ProcesCard } from "@/components/form/ProcesCard";
import { WizardFormData } from "@/lib/schema";

// Lege proces entry voor useFieldArray.append()
// frequentie / tijdPerKeer / aantalMensen worden undefined (= nog niet ingevuld)
const EMPTY_PROCES = {
  procesNaam: "",
  beschrijving: "",
  tools: [] as string[],
  toolsAnders: "",
};

export function Step2Kernprocessen() {
  const { control } = useFormContext<WizardFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "processen",
  });

  const isAtMax = fields.length >= 5;
  const isAtMin = fields.length <= 1;

  return (
    <div className="mt-5 space-y-5">

      {/* ── Uitleg ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
        <p className="text-xs leading-relaxed text-indigo-700">
          Voeg de <strong>belangrijkste processen</strong> toe waar de meeste
          tijd in gaat. Denk aan terugkerende taken die nu handmatig worden
          uitgevoerd.
        </p>
      </div>

      {/* ── Proces kaarten ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <AnimatePresence initial={false}>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: -8, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <ProcesCard
                index={index}
                canRemove={!isAtMin}
                onRemove={() => remove(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Toevoegen knop ─────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Button
          type="button"
          variant="outline"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => append(EMPTY_PROCES as any)}
          disabled={isAtMax}
          className="w-full gap-2 border-dashed text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4" />
          Proces toevoegen
          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
            {fields.length} / 5
          </span>
        </Button>

        {isAtMax && (
          <p className="text-center text-xs text-muted-foreground">
            Maximum van 5 processen bereikt
          </p>
        )}
      </div>

      {/* ── Tip ────────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <p className="text-xs leading-relaxed text-amber-700">
          <strong>Tip:</strong> kies processen met veel herhaling of handmatig
          werk — dit zijn de grootste kansen voor AI-automatisering.
        </p>
      </div>

      <WizardNavigation />
    </div>
  );
}
