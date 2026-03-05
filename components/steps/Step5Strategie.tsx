"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Sparkles } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardFormData } from "@/lib/schema";
import { cn } from "@/lib/utils";

// ─── Options ─────────────────────────────────────────────────────────────────

const PRIORITEITEN_OPTIONS = [
  "Kosten besparen",
  "Sneller groeien",
  "Foutpercentage verlagen",
  "Klanttevredenheid verhogen",
  "Schaalbaarheid verbeteren",
  "Beter inzicht in cijfers",
  "Concurrentievoordeel",
  "Innovatie",
];

const TIMELINE_OPTIONS = [
  { value: "1_2m",   label: "1–2 maanden" },
  { value: "3_6m",   label: "3–6 maanden" },
  { value: "6_12m",  label: "6–12 maanden" },
  { value: "gt12m",  label: ">12 maanden" },
];

const BUDGET_RADIO_OPTIONS = [
  { value: "ja",          label: "Ja" },
  { value: "overweging",  label: "In overweging" },
  { value: "nog_niet",    label: "Nog niet" },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface Step5StrategieProps {
  onSubmit?: () => void | Promise<void>;
  isSubmitting?: boolean;
}

export function Step5Strategie({ onSubmit, isSubmitting }: Step5StrategieProps) {
  const { control } = useFormContext<WizardFormData>();
  const prioriteiten = useWatch({ control, name: "prioriteiten" }) ?? [];

  return (
    <div className="mt-5 space-y-5">

      {/* ── Belangrijkste doel — textarea ────────────────────────────── */}
      <FormField
        control={control}
        name="belangrijksteDoel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Wat is het belangrijkste doel van deze AI-scan?{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Bijv. 25% omzetgroei, processen automatiseren, internationale uitbreiding..."
                className="resize-none min-h-[88px] text-sm"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Prioriteiten — checkboxes max 3 ─────────────────────────── */}
      <FormField
        control={control}
        name="prioriteiten"
        render={({ field }) => (
          <FormItem>
            <div>
              <FormLabel>
                Wat zijn je drie belangrijkste prioriteiten?{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-muted-foreground">
                  Selecteer maximaal 3
                </p>
                <p className="text-xs font-medium text-zinc-500">
                  {prioriteiten.length} / 3 gekozen
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 mt-1">
              {PRIORITEITEN_OPTIONS.map((opt) => {
                const checked =
                  Array.isArray(field.value) && field.value.includes(opt);
                const atMax =
                  Array.isArray(field.value) && field.value.length >= 3;
                const disabled = !checked && atMax;

                return (
                  <div key={opt} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`prio-${opt}`}
                      checked={checked}
                      disabled={disabled}
                      onCheckedChange={(isChecked) => {
                        const current = Array.isArray(field.value)
                          ? field.value
                          : [];
                        field.onChange(
                          isChecked
                            ? [...current, opt]
                            : current.filter((v) => v !== opt)
                        );
                      }}
                    />
                    <label
                      htmlFor={`prio-${opt}`}
                      className={`text-sm font-normal cursor-pointer select-none leading-snug ${
                        disabled ? "text-zinc-400" : "text-zinc-700"
                      }`}
                    >
                      {opt}
                    </label>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Grootste impact — textarea ───────────────────────────────── */}
      <FormField
        control={control}
        name="grootsteImpact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Grootste impact{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Als u één ding kon veranderen dat direct resultaat oplevert, wat zou dat zijn?"
                className="resize-none min-h-[88px] text-sm"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Budget — RadioGroup ─────────────────────────────────────── */}
      <FormField
        control={control}
        name="budgetAutomatisering"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Heeft u budget voor automatisering?{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <div
                className="flex flex-col sm:flex-row gap-2"
                role="radiogroup"
                aria-label="Budget automatisering"
              >
                {BUDGET_RADIO_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={field.value === opt.value}
                    onClick={() => field.onChange(opt.value)}
                    className={cn(
                      "flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors",
                      field.value === opt.value
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Timeline — select ────────────────────────────────────────── */}
      <FormField
        control={control}
        name="timeline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Gewenste tijdlijn{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Kies een optie" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {TIMELINE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Extra context — optional textarea ───────────────────────── */}
      <FormField
        control={control}
        name="extraContext"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              Extra context of opmerkingen{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optioneel)
              </span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Eventuele extra context of bijzonderheden..."
                className="resize-none min-h-[80px] text-sm"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Submit info banner ───────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 px-4 py-3.5">
        <Sparkles className="h-4 w-4 text-indigo-500 mt-0.5 shrink-0" />
        <p className="text-xs text-indigo-700 leading-relaxed">
          Na het versturen wordt je AI Intelligence Scan voorbereid. Binnen 24 uur
          ontvang je een analyse van de grootste automatiseringskansen in je bedrijf.
        </p>
      </div>

      <WizardNavigation
        nextLabel="Scan versturen"
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
