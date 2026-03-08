"use client";

import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RatingScale } from "@/components/ui/rating-scale";
import type { WizardFormData } from "@/lib/schema";

const TIJD_OPTIES = [
  { value: "lt10uur", label: "< 10 uur" },
  { value: "10_30uur", label: "10–30 uur" },
  { value: "30_60uur", label: "30–60 uur" },
  { value: "60_100uur", label: "60–100 uur" },
  { value: "100_200uur", label: "100–200 uur" },
  { value: "gt200uur", label: "> 200 uur" },
];

const FOUT_OPTIES = [
  { value: "zelden", label: "Zelden (< 5% fouten)" },
  { value: "soms", label: "Soms (5–15% fouten)" },
  { value: "regelmatig", label: "Regelmatig (15–30% fouten)" },
  { value: "vaak", label: "Vaak (> 30% fouten)" },
];

const DOC_OPTIES = [
  { value: "volledig", label: "Volledig gedocumenteerd" },
  { value: "gedeeltelijk", label: "Gedeeltelijk gedocumenteerd" },
  { value: "hoofden", label: "In hoofden van mensen" },
  { value: "geen", label: "Geen documentatie" },
];

interface ProcesCardProps {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

export function ProcesCard({ index, onRemove, canRemove }: ProcesCardProps) {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/40 p-5 space-y-4 relative">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-2.5 py-1">
          Proces {index + 1}
        </span>
        {canRemove && (
          <Button type="button" variant="ghost" size="sm" onClick={onRemove} className="h-7 w-7 p-0 text-zinc-400 hover:text-red-500 hover:bg-red-50">
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={control} name={`processen.${index}.procesNaam`} render={({ field }) => (
          <FormItem><FormLabel>Naam van het proces *</FormLabel><FormControl><Input placeholder="Bijv. Offerteproces, Orderverwerking..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={control} name={`processen.${index}.afdeling`} render={({ field }) => (
          <FormItem><FormLabel>Afdeling / team *</FormLabel><FormControl><Input placeholder="Bijv. Sales, Finance, Operations..." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>

      <FormField control={control} name={`processen.${index}.stapVoorStap`} render={({ field }) => (
        <FormItem><FormLabel>Beschrijf dit proces stap voor stap *</FormLabel>
          <p className="text-xs text-zinc-400 -mt-1">Wat is de trigger? Welke stappen zijn er? Wie doet wat? Wat is het eindresultaat?</p>
          <FormControl><Textarea placeholder="Stap 1: ... → Stap 2: ... → Eindresultaat: ..." rows={4} {...field} /></FormControl><FormMessage />
        </FormItem>
      )} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={control} name={`processen.${index}.tijdPerMaand`} render={({ field }) => (
          <FormItem><FormLabel>Tijd per maand *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer tijdsduur" /></SelectTrigger></FormControl>
              <SelectContent>{TIJD_OPTIES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select><FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name={`processen.${index}.aantalMensen`} render={({ field }) => (
          <FormItem><FormLabel>Betrokken mensen *</FormLabel><FormControl><Input placeholder="Bijv. 3 medewerkers + 1 manager" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>

      <FormField control={control} name={`processen.${index}.tools`} render={({ field }) => (
        <FormItem><FormLabel>Welke tools / systemen gebruikt u?</FormLabel><FormControl><Input placeholder="Bijv. Excel, Email, ERP, CRM, eigen software..." {...field} /></FormControl><FormMessage /></FormItem>
      )} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField control={control} name={`processen.${index}.foutFrequentie`} render={({ field }) => (
          <FormItem><FormLabel>Hoe vaak gaat dit fout?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{FOUT_OPTIES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select><FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name={`processen.${index}.documentatieStatus`} render={({ field }) => (
          <FormItem><FormLabel>Is dit proces gedocumenteerd?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{DOC_OPTIES.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select><FormMessage />
          </FormItem>
        )} />
      </div>

      <FormField control={control} name={`processen.${index}.kostenPerFout`} render={({ field }) => (
        <FormItem><FormLabel>Geschatte kosten per fout / vertraging</FormLabel><FormControl><Input placeholder="Bijv. €200 verloren tijd, €500 klantclaim..." {...field} /></FormControl><FormMessage /></FormItem>
      )} />

      <FormField control={control} name={`processen.${index}.urgentie`} render={({ field }) => (
        <FormItem>
          <FormLabel>Urgentie voor automatisering</FormLabel>
          <RatingScale value={field.value ?? ""} onChange={field.onChange} minLabel="Laag" maxLabel="Kritiek" />
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
}
