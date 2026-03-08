"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const REPETITIEVE_TAKEN = [
  "Data invoeren / kopiëren",
  "E-mails beantwoorden",
  "Facturen verwerken",
  "Rapporten opstellen",
  "Offertes opmaken",
  "Planningswerk",
  "Klachten registreren",
  "Voorraad bijhouden",
  "Andere",
];

const GEVOLG_FOUTEN = [
  "Klantenklachten / churn",
  "Financieel verlies",
  "Extra uren om te corrigeren",
  "Vertraging in levering",
  "Reputatieschade",
  "Regelgeving / compliance risico",
];

const PERCENTAGE_OPTIES = ["< 10%", "10–20%", "20–35%", "35–50%", "> 50%", "Weet ik niet"];
const FOUT_KOSTEN = ["< €500", "€500–€2.000", "€2.000–€5.000", "€5.000–€15.000", "> €15.000", "Onbekend"];
const GROEI_OPTIES = ["Krimpt", "Stabiel (0–5%)", "Lichte groei (5–15%)", "Sterke groei (15–30%)", "Snelle groei (> 30%)", "Onregelmatig / seizoensgebonden"];
const PERSONEEL_OPTIES = ["Nee, geen probleem", "Soms lastig", "Structureel moeilijk", "We groeien niet meer door personeelstekort"];

export function Step3Pijnpunten() {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Operationele Frustraties</p>

        <FormField control={control} name="drieGrootsFrustraties" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat zijn uw 3 grootste frustraties in de dagelijkse operaties? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Bijv: Offertes maken duurt te lang, facturen worden niet op tijd verzonden...</p>
            <FormControl><Textarea placeholder={"1.\n2.\n3."} rows={4} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="tijdVerliesPerWeek" render={({ field }) => (
          <FormItem>
            <FormLabel>Waar gaat de meeste tijd verloren per week? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Denk aan: wachten op input, dubbel werk, informatie zoeken, handmatige controles...</p>
            <FormControl><Textarea placeholder="Beschrijf de grootste tijdvreters..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="repetitieveTaken" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke taken zijn het meest repetitief voor uw team? *</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {REPETITIEVE_TAKEN.map((taak) => {
                const checked = (field.value ?? []).includes(taak);
                return (
                  <label key={taak} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, taak] : cur.filter((v) => v !== taak));
                    }} />
                    {taak}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="percentageRepetitief" render={({ field }) => (
          <FormItem>
            <FormLabel>Welk percentage werkuren gaat verloren aan repetitief werk?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer percentage" /></SelectTrigger></FormControl>
              <SelectContent>{PERCENTAGE_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Fouten & Kwaliteitsproblemen</p>

        <FormField control={control} name="waarGaanFoutenMis" render={({ field }) => (
          <FormItem>
            <FormLabel>Waar gaan de meeste fouten mis? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Bijv: Overtikfouten, verkeerde prijzen in offertes, dubbele bestellingen...</p>
            <FormControl><Textarea placeholder="Bijv. Bij handmatig invoeren van bestellingen..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="gevolgFouten" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat zijn de gevolgen van deze fouten?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {GEVOLG_FOUTEN.map((gevolg) => {
                const checked = (field.value ?? []).includes(gevolg);
                return (
                  <label key={gevolg} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, gevolg] : cur.filter((v) => v !== gevolg));
                    }} />
                    {gevolg}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="foutKostenPerMaand" render={({ field }) => (
          <FormItem>
            <FormLabel>Geschatte kosten van fouten per maand</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer kostenrange" /></SelectTrigger></FormControl>
              <SelectContent>{FOUT_KOSTEN.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Schaalbaarheid & Groeipijn</p>

        <FormField control={control} name="bedrijfsgroei" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe snel groeit uw bedrijf momenteel? *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer groeifase" /></SelectTrigger></FormControl>
              <SelectContent>{GROEI_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="watAlsOmzetVerdubbelt" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat gebeurt er als uw omzet verdubbelt? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Kunnen huidige processen dat aan? Wat breekt als eerste? Moet u direct mensen aannemen?</p>
            <FormControl><Textarea placeholder="Bijv. We zouden direct 3 extra medewerkers nodig hebben omdat..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="bottlenecksGroei" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke processen zijn nu al een bottleneck voor groei?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. Het offerteproces duurt te lang waardoor we deals mislopen..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="personeelTekort" render={({ field }) => (
          <FormItem>
            <FormLabel>Heeft u moeite om gekwalificeerd personeel te vinden?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{PERSONEEL_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation />
    </div>
  );
}
