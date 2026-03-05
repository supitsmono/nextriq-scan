"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { Clock } from "lucide-react";

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

// ─── Options ─────────────────────────────────────────────────────────────────

const TIJD_VERLOREN_OPTIONS = [
  "Handmatige data invoer",
  "Zoeken naar informatie",
  "Dubbele invoer",
  "Wachten op goedkeuring",
  "Rapportages maken",
  "Emails verwerken",
];

const REPETITIEF_UREN_OPTIONS = [
  { value: "lt5u",   label: "< 5 uur" },
  { value: "5_10u",  label: "5 – 10 uur" },
  { value: "10_20u", label: "10 – 20 uur" },
  { value: "20_40u", label: "20 – 40 uur" },
  { value: "gt40u",  label: "> 40 uur" },
];

const FOUT_KOSTEN_OPTIONS = [
  { value: "lt50",     label: "< €50" },
  { value: "50_200",   label: "€50 – €200" },
  { value: "200_1000", label: "€200 – €1.000" },
  { value: "gt1000",   label: "€1.000+" },
  { value: "onbekend", label: "Weet ik niet" },
];

const GROEI_OPTIONS = [
  { value: "stabiel",   label: "Stabiel (< 5%)" },
  { value: "5_15pct",   label: "5 – 15%" },
  { value: "15_30pct",  label: "15 – 30%" },
  { value: "gt30pct",   label: "> 30%" },
  { value: "krimp",     label: "Krimp" },
];

// ─── Char counter helper ──────────────────────────────────────────────────────

function CharCounter({ value, min }: { value: string; min: number }) {
  const len = (value ?? "").length;
  const done = len >= min;
  return (
    <span
      className={`text-xs tabular-nums ${
        done ? "text-emerald-600" : "text-muted-foreground"
      }`}
    >
      {len}/{min}
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Step3Tijdefficiency() {
  const { control } = useFormContext<WizardFormData>();

  const foutenMisValue = useWatch({ control, name: "waarGaanFoutenMis" }) ?? "";
  const omzetValue     = useWatch({ control, name: "watAlsOmzetVerdubbelt" }) ?? "";

  return (
    <div className="mt-5 space-y-6">

      {/* ── 1. Waar gaat tijd verloren — 2-col checkbox grid ─────────── */}
      <FormField
        control={control}
        name="waarGaatTijdVerloren"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Waar gaat de meeste tijd verloren?{" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mt-1.5">
              {TIJD_VERLOREN_OPTIONS.map((opt) => {
                const checked =
                  Array.isArray(field.value) && field.value.includes(opt);
                return (
                  <div key={opt} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`tijdverloren-${opt}`}
                      checked={checked}
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
                      htmlFor={`tijdverloren-${opt}`}
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

      {/* ── 2 + 4. Repetitief uren & Foutkosten — 2-col on md ────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* repetitiefWerkUren */}
        <FormField
          control={control}
          name="repetitiefWerkUren"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Uren verloren aan repetitief werk{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  / week
                </span>{" "}
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
                  {REPETITIEF_UREN_OPTIONS.map((o) => (
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

        {/* gemiddeldeFoutKosten */}
        <FormField
          control={control}
          name="gemiddeldeFoutKosten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Gemiddelde kosten per fout{" "}
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
                  {FOUT_KOSTEN_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Schatting is prima — dit gebruiken we voor een besparingsindicatie.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* ── 5. Bedrijfsgroei — select ────────────────────────────────── */}
      <FormField
        control={control}
        name="bedrijfsgroei"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Hoe groeit je bedrijf?{" "}
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
                {GROEI_OPTIONS.map((o) => (
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

      {/* ── 3. Waar gaan fouten mis — required textarea ──────────────── */}
      <FormField
        control={control}
        name="waarGaanFoutenMis"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-baseline justify-between">
              <FormLabel>
                Waar gaan fouten het meest mis?{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <CharCounter value={foutenMisValue} min={20} />
            </div>
            <FormControl>
              <Textarea
                placeholder="bijv. Bij het overtypen van orders gaat regelmatig een cijfer fout, waardoor we verkeerde hoeveelheden bestellen…"
                className="resize-none min-h-[88px] text-sm"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── 6. Wat als omzet verdubbelt — required textarea ──────────── */}
      <FormField
        control={control}
        name="watAlsOmzetVerdubbelt"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-baseline justify-between">
              <FormLabel>
                Wat als je omzet verdubbelt — kan je organisatie dat aan?{" "}
                <span className="text-destructive">*</span>
              </FormLabel>
              <CharCounter value={omzetValue} min={20} />
            </div>
            <FormControl>
              <Textarea
                placeholder="bijv. Nee, we hebben dan minstens 2 extra FTE nodig voor de administratie en klantenservice…"
                className="resize-none min-h-[88px] text-sm"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* ── Info banner ──────────────────────────────────────────────── */}
      <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
        <Clock className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Deze informatie helpt ons precies berekenen hoeveel tijd en geld je
          kunt besparen met AI-automatisering.
        </p>
      </div>

      <WizardNavigation />
    </div>
  );
}
