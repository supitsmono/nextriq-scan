"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { X } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { WizardFormData } from "@/lib/schema";
import { cn } from "@/lib/utils";

// ─── Options ─────────────────────────────────────────────────────────────────

const FREQUENTIE_OPTIONS = [
  { value: "dagelijks",   label: "Dagelijks" },
  { value: "wekelijks",   label: "Wekelijks" },
  { value: "maandelijks", label: "Maandelijks" },
  { value: "ad_hoc",      label: "Ad hoc" },
];

const TIJD_OPTIONS = [
  { value: "lt10min",  label: "< 10 min" },
  { value: "10_30min", label: "10 – 30 min" },
  { value: "30_60min", label: "30 – 60 min" },
  { value: "1_2uur",   label: "1 – 2 uur" },
  { value: "gt2uur",   label: "> 2 uur" },
];

const MENSEN_OPTIONS = [
  { value: "1",     label: "1 persoon" },
  { value: "2_3",   label: "2 – 3 personen" },
  { value: "4_6",   label: "4 – 6 personen" },
  { value: "7plus", label: "7 of meer" },
];

const VOLUME_OPTIONS = [
  { value: "1_10",    label: "1 – 10 × /maand" },
  { value: "11_50",   label: "11 – 50 × /maand" },
  { value: "51_200",  label: "51 – 200 × /maand" },
  { value: "200plus", label: "> 200 × /maand" },
];

const TOOLS_OPTIONS = [
  "Excel",
  "Email",
  "ERP",
  "CRM",
  "Boekhouding",
  "Planning software",
  "Anders",
];

// ─── Component ────────────────────────────────────────────────────────────────

interface ProcesCardProps {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export function ProcesCard({ index, canRemove, onRemove }: ProcesCardProps) {
  const { control } = useFormContext<WizardFormData>();

  // Watch tools van dit specifieke proces voor de conditionale "Anders" input
  const watchedTools = useWatch({
    control,
    name: `processen.${index}.tools`,
  });
  const showToolsAnders = Array.isArray(watchedTools) && watchedTools.includes("Anders");

  return (
    <Card className="border-zinc-200 bg-white shadow-sm overflow-hidden">
      {/* ─── Card Header ──────────────────────────────────────────────── */}
      <CardHeader className="flex flex-row items-center justify-between py-3 px-5 bg-zinc-50/80 border-b border-zinc-100 space-y-0">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
            {index + 1}
          </span>
          <span className="text-sm font-semibold text-zinc-800">
            Proces {index + 1}
          </span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          disabled={!canRemove}
          title={canRemove ? "Verwijder proces" : "Minimaal 1 proces vereist"}
          className={cn(
            "h-7 w-7 rounded-md transition-colors",
            canRemove
              ? "text-zinc-400 hover:text-red-500 hover:bg-red-50"
              : "text-zinc-200 cursor-not-allowed"
          )}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      </CardHeader>

      {/* ─── Card Body ────────────────────────────────────────────────── */}
      <CardContent className="px-5 pt-4 pb-5 space-y-4">

        {/* Procesnaam */}
        <FormField
          control={control}
          name={`processen.${index}.procesNaam`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Procesnaam <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="bijv. Facturen verwerken, Planning inroosteren…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Beschrijving */}
        <FormField
          control={control}
          name={`processen.${index}.beschrijving`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Beschrijving <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Beschrijf hoe dit proces nu verloopt, welke stappen er handmatig worden gedaan en waar tijd verloren gaat… (min. 20 tekens)"
                  className="resize-none min-h-[88px] text-sm"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Frequentie + Tijd per keer */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={control}
            name={`processen.${index}.frequentie`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Frequentie <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {FREQUENTIE_OPTIONS.map((o) => (
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
            name={`processen.${index}.tijdPerKeer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tijd per keer <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TIJD_OPTIONS.map((o) => (
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
        </div>

        {/* Aantal mensen + Volume per maand */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={control}
            name={`processen.${index}.aantalMensen`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Aantal mensen <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MENSEN_OPTIONS.map((o) => (
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
            name={`processen.${index}.volumePerMaand`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Volume/maand{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (opt.)
                  </span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Kies" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VOLUME_OPTIONS.map((o) => (
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
        </div>

        {/* Tools checkboxes */}
        <FormField
          control={control}
          name={`processen.${index}.tools`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Gebruikte tools <span className="text-destructive">*</span>
              </FormLabel>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 mt-1">
                {TOOLS_OPTIONS.map((tool) => {
                  const checked = Array.isArray(field.value) && field.value.includes(tool);
                  return (
                    <div key={tool} className="flex items-center gap-2.5">
                      <Checkbox
                        id={`tool-${index}-${tool}`}
                        checked={checked}
                        onCheckedChange={(isChecked) => {
                          const current = Array.isArray(field.value)
                            ? field.value
                            : [];
                          field.onChange(
                            isChecked
                              ? [...current, tool]
                              : current.filter((t) => t !== tool)
                          );
                        }}
                      />
                      <label
                        htmlFor={`tool-${index}-${tool}`}
                        className="text-sm font-normal text-zinc-700 cursor-pointer select-none leading-none"
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

        {/* Conditionale input: "Anders" tool naam */}
        {showToolsAnders && (
          <FormField
            control={control}
            name={`processen.${index}.toolsAnders`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Welke tool(s)? bijv. Airtable, Notion, eigen systeem…"
                    className="bg-zinc-50 border-dashed"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}
