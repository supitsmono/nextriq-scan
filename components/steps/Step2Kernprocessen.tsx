"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProcesCard } from "@/components/form/ProcesCard";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

export function Step2Kernprocessen() {
  const { control } = useFormContext<WizardFormData>();
  const { fields, append, remove } = useFieldArray({ control, name: "processen" });

  const addProces = () => {
    if (fields.length >= 5) return;
    append({ procesNaam: "", afdeling: "", stapVoorStap: "", aantalMensen: "", tools: "", kostenPerFout: "" });
  };

  return (
    <div className="space-y-5 pt-4">
      <div className="rounded-lg bg-violet-50 border border-violet-200 px-4 py-3 text-sm text-violet-700">
        <strong>Tip:</strong> Beschrijf uw 5 meest tijdsintensieve of foutgevoelige processen. Hoe concreter, hoe beter het advies dat wij kunnen geven.
      </div>

      <AnimatePresence initial={false}>
        {fields.map((field, index) => (
          <motion.div key={field.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <ProcesCard index={index} onRemove={() => remove(index)} canRemove={fields.length > 1} />
          </motion.div>
        ))}
      </AnimatePresence>

      {fields.length < 5 && (
        <Button type="button" variant="outline" onClick={addProces} className="w-full border-dashed border-violet-300 text-violet-600 hover:bg-violet-50 hover:border-violet-400 gap-2">
          <Plus className="h-4 w-4" />
          Proces toevoegen ({fields.length}/5)
        </Button>
      )}

      <WizardNavigation />
    </div>
  );
}
