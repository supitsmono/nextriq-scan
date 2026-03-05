"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardFormData } from "@/lib/schema";

// ─── Options ─────────────────────────────────────────────────────────────────

const DAGELIJKSE_TOOLS = [
  "Microsoft Office",
  "Google Workspace",
  "Boekhoudpakket",
  "Project management",
  "Slack / Teams / WhatsApp",
  "E-commerce",
  "WMS",
  "Planning software",
  "Geen",
];

const AANTAL_SYSTEMEN_OPTIONS = [
  { value: "1_3", label: "1–3" },
  { value: "4_6", label: "4–6" },
  { value: "7_10", label: "7–10" },
  { value: "10plus", label: "10+" },
];

const INTEGRATIES_OPTIONS = [
  { value: "volledig", label: "Volledig gekoppeld" },
  { value: "deels", label: "Deels gekoppeld" },
  { value: "niet", label: "Niet gekoppeld" },
  { value: "weet_niet", label: "Weet ik niet" },
];

const DATA_OPSLAG_OPTIONS = [
  "Excel / Google Sheets",
  "Gedeelde schijf (SharePoint, NAS)",
  "Cloud-opslag (Dropbox, OneDrive)",
  "Eigen database / server",
  "Papier / geen digitale opslag",
];

// ─── RadioGroup: Ja / Nee (ERP & CRM) ────────────────────────────────────────

function RadioGroupJaNee({
  value,
  onChange,
}: {
  value: "ja" | "nee";
  onChange: (v: "ja" | "nee") => void;
}) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-label="Keuze">
      {(["ja", "nee"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className={cn(
            "h-9 min-w-[4rem] rounded-md border px-4 text-sm font-medium transition-colors",
            value === opt
              ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
              : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
          )}
        >
          {opt === "ja" ? "Ja" : "Nee"}
        </button>
      ))}
    </div>
  );
}

// ─── RadioGroup: Integraties (4 opties) ──────────────────────────────────────

function RadioGroupIntegraties({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-2"
      role="radiogroup"
      aria-label="Integraties"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "flex items-center justify-center rounded-md border px-3 py-2.5 text-left text-sm font-medium transition-colors",
            value === opt.value
              ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Conditional field wrapper met framer-motion ──────────────────────────────

const conditionalVariants = {
  enter: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function ConditionalField({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          initial="enter"
          animate="visible"
          exit="exit"
          variants={conditionalVariants}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Step4Technologie() {
  const { control } = useFormContext<WizardFormData>();
  const erpGebruik = useWatch({ control, name: "erpGebruik" });
  const crmGebruik = useWatch({ control, name: "crmGebruik" });

  return (
    <div className="mt-5 space-y-6">
      {/* Intro */}
      <p className="text-sm text-zinc-500 -mt-1">
        Welke tools gebruikt uw bedrijf momenteel?
      </p>

      {/* ── ERP + CRM: 2 kolommen desktop ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ERP */}
        <div className="space-y-3">
          <FormField
            control={control}
            name="erpGebruik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gebruik je een ERP-systeem?{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroupJaNee value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ConditionalField show={erpGebruik === "ja"}>
            <FormField
              control={control}
              name="erpNaam"
              render={({ field }) => (
                <FormItem className="pt-1">
                  <FormLabel>
                    Naam ERP-systeem <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bijv. Exact, AFAS, SAP, Odoo, Dynamics"
                      className="bg-zinc-50/80"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ConditionalField>
        </div>

        {/* CRM */}
        <div className="space-y-3">
          <FormField
            control={control}
            name="crmGebruik"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gebruik je een CRM-systeem?{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroupJaNee value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ConditionalField show={crmGebruik === "ja"}>
            <FormField
              control={control}
              name="crmNaam"
              render={({ field }) => (
                <FormItem className="pt-1">
                  <FormLabel>
                    Naam CRM-systeem <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Bijv. HubSpot, Salesforce, Pipedrive"
                      className="bg-zinc-50/80"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </ConditionalField>
        </div>
      </div>

      {/* ── Dagelijkse tools (checkbox, min 1) ───────────────────────────────── */}
      <FormField
        control={control}
        name="dagelijkseTools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Welke tools gebruik je dagelijks?{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mt-1.5">
              {DAGELIJKSE_TOOLS.map((tool) => {
                const checked =
                  Array.isArray(field.value) && field.value.includes(tool);
                return (
                  <div key={tool} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`dagtool-${tool}`}
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const current = Array.isArray(field.value)
                          ? field.value
                          : [];
                        field.onChange(
                          isChecked
                            ? [...current, tool]
                            : current.filter((v) => v !== tool)
                        );
                      }}
                    />
                    <label
                      htmlFor={`dagtool-${tool}`}
                      className="text-sm font-normal text-zinc-700 cursor-pointer select-none leading-snug"
                    >
                      {tool}
                    </label>
                  </div>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Aantal systemen + Integraties: 2 kolommen desktop ─────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="aantalSystemen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Hoeveel systemen gebruik je in totaal?{" "}
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
                  {AANTAL_SYSTEMEN_OPTIONS.map((o) => (
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

        <FormField
          control={control}
          name="integraties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Zijn je systemen aan elkaar gekoppeld?{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroupIntegraties
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  options={INTEGRATIES_OPTIONS}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* ── Data-opslag (optioneel) ───────────────────────────────────────────── */}
      <FormField
        control={control}
        name="dataOpslag"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              Waar sla je data op?{" "}
              <span className="text-xs font-normal text-muted-foreground">
                (optioneel)
              </span>
            </FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 mt-1.5">
              {DATA_OPSLAG_OPTIONS.map((opt) => {
                const checked =
                  Array.isArray(field.value) && field.value.includes(opt);
                return (
                  <div key={opt} className="flex items-start gap-2.5">
                    <Checkbox
                      id={`opslag-${opt}`}
                      checked={checked}
                      className="mt-0.5"
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
                      htmlFor={`opslag-${opt}`}
                      className="text-sm font-normal text-zinc-700 cursor-pointer select-none leading-snug"
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

      {/* ── Info banner ─────────────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 rounded-lg bg-sky-50 border border-sky-100 px-4 py-3">
        <Cpu className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
        <p className="text-xs text-sky-700 leading-relaxed">
          Op basis van je huidige technologie bepalen we welke AI-integraties
          direct toepasbaar zijn.
        </p>
      </div>

      <WizardNavigation />
    </div>
  );
}
