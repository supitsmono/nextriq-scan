"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const KOSTENPOST = ["Personeelskosten (> 50% v/d kosten)", "Inkoopkosten / materialen", "Huisvesting / operationele kosten", "Marketing & acquisitie", "Technologie / software", "Uitbesteding (ZZP/bureau)"];
const BRUTOMARGE = ["< 10%", "10–25%", "25–40%", "40–60%", "> 60%", "Weet ik niet"];
const UURTARIEF = ["< €25/uur", "€25–€40/uur", "€40–€60/uur", "> €60/uur", "Weet ik niet"];
const BUDGET_AI = ["Nee, maar er is ruimte als de ROI klopt", "Ja — < €5.000", "Ja — €5.000–€15.000", "Ja — €15.000–€50.000", "Ja — > €50.000", "Dit beslist de directie / eigenaar"];
const ROI_BEOORDELING = ["ROI moet < 6 maanden zijn", "ROI mag 6–12 maanden duren", "ROI van 1–2 jaar is acceptabel", "Strategische waarde telt, niet alleen ROI"];
const BEWIJS_SUCCES = ["Meetbare tijdsbesparing (uren)", "Meetbare kostenreductie (€)", "Meer omzet / klanten", "Minder fouten / klachten", "Meer schaalcapaciteit zonder extra mensen", "Medewerkers meer op waarde-toevoegende taken"];

export function Step8Financieel() {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
        <strong>Dit helpt ons een eerlijke ROI-berekening te maken</strong> van wat AI-automatisering u concreet oplevert.
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Kostenstructuur</p>

        <FormField control={control} name="grootsteKostenpost" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat is uw grootste kostenpost?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{KOSTENPOST.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="brutomarge" render={({ field }) => (
            <FormItem>
              <FormLabel>Geschatte brutomargepercentage</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{BRUTOMARGE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="gemiddeldUurtarief" render={({ field }) => (
            <FormItem>
              <FormLabel>Gemiddeld uurtarief medewerker (incl. alle kosten)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{UURTARIEF.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Investeringsbereidheid</p>

        <FormField control={control} name="budgetAI" render={({ field }) => (
          <FormItem>
            <FormLabel>Heeft u budget gereserveerd voor AI / procesoptimalisatie? *</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {BUDGET_AI.map((optie) => (
                <button key={optie} type="button" onClick={() => field.onChange(optie)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${field.value === optie ? "border-violet-500 bg-violet-50 text-violet-700 font-medium" : "border-zinc-200 hover:border-zinc-300"}`}>
                  {optie}
                </button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="roiBeoordeling" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe beoordeelt u investeringen in technologie?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{ROI_BEOORDELING.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="eerdereInvesteringen" render={({ field }) => (
          <FormItem>
            <FormLabel>Heeft u eerder geïnvesteerd in software of automatisering? Wat was het resultaat?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. Geïnvesteerd in ERP, nam 6 maanden implementatie, uiteindelijk waardevol..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Verwachte Waarde</p>

        <FormField control={control} name="waarde40Uur" render={({ field }) => (
          <FormItem>
            <FormLabel>Als u één proces kon automatiseren en daarmee 40 uur per maand bespaart, wat is dat waard?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. €2.000/maand, minder stress voor het team, snellere doorlooptijd voor klanten..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="bewijsSuccesAI" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat is voor u het beste bewijs dat een AI-investering geslaagd is?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {BEWIJS_SUCCES.map((optie) => {
                const checked = (field.value ?? []).includes(optie);
                return (
                  <label key={optie} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, optie] : cur.filter((v) => v !== optie));
                    }} />
                    {optie}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation />
    </div>
  );
}
