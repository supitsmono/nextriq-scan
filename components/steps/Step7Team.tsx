"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RatingScale } from "@/components/ui/rating-scale";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const ORGANISATIE_OPTIES = ["Plat (eigenaar doet alles mee)", "Afdelingen met teamleiders", "Functionele specialisten", "Volledig uitbesteed / ZZP-netwerk", "Mix van vast en flexibel"];
const ROLLEN = ["Sales / Business Development", "Operations / Logistiek", "Klantenservice", "Finance / Administratie", "Marketing", "IT / Techniek", "HR / Recruitment", "Inkoop", "Productie / Uitvoering"];
const PERCENTAGE_REP = ["< 20%", "20–40%", "40–60%", "60–80%", "> 80%"];
const ONBOARDING_DUUR = ["< 1 week", "1–4 weken", "1–3 maanden", "> 3 maanden", "Nvt / werken alleen"];
const ONBOARDING_STATUS = ["Ja, volledig uitgewerkt", "Gedeeltelijk", "Nee, leren al doende"];
const AI_HOUDING = ["Enthousiast — we willen dit echt", "Positief maar voorzichtig", "Neutraal / onbekend", "Sceptisch", "Weerstand / angst voor baanverlies"];
const TECH_AFFINITEIT = ["Ja, meerdere", "Eén digitale 'kampioen'", "Nauwelijks", "Nee"];

export function Step7Team() {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
        <strong>Uw team is uw grootste asset.</strong> We kijken hoe AI uw mensen kan ondersteunen, niet vervangen.
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Teamstructuur & Rollen</p>

        <FormField control={control} name="bedrijfsOrganisatie" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe is uw bedrijf georganiseerd?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer organisatievorm" /></SelectTrigger></FormControl>
              <SelectContent>{ORGANISATIE_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="aanwezigeRollen" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke functies / rollen zijn aanwezig?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {ROLLEN.map((rol) => {
                const checked = (field.value ?? []).includes(rol);
                return (
                  <label key={rol} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, rol] : cur.filter((v) => v !== rol));
                    }} />
                    {rol}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="percentageRepetitieveWerkers" render={({ field }) => (
          <FormItem>
            <FormLabel>% medewerkers in uitvoerende / repetitieve taken</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{PERCENTAGE_REP.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Kennisbehoud & Onboarding</p>

        <FormField control={control} name="sleutelmedewerkerRisico" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat gebeurt er als een sleutelmedewerker plotseling uitvalt of vertrekt? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Bijv. Niemand weet hoe het systeem werkt, klanten bellen rechtstreeks naar één persoon...</p>
            <FormControl><Textarea placeholder="Beschrijf het risico..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="onboardingDuur" render={({ field }) => (
            <FormItem>
              <FormLabel>Onboardingduur nieuwe medewerker</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{ONBOARDING_DUUR.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="onboardingGestandaardiseerd" render={({ field }) => (
            <FormItem>
              <FormLabel>Gestandaardiseerde onboarding?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{ONBOARDING_STATUS.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">AI-Acceptatie in het Team</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="teamHoudingAI" render={({ field }) => (
            <FormItem>
              <FormLabel>Houding team t.o.v. AI</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{AI_HOUDING.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="technischeAffiniteit" render={({ field }) => (
            <FormItem>
              <FormLabel>Technische / digitale affiniteit</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{TECH_AFFINITEIT.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="gebruiksgemakBelang" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe belangrijk is dat een AI-oplossing makkelijk te gebruiken is zonder technische kennis?</FormLabel>
            <RatingScale value={field.value ?? ""} onChange={field.onChange} minLabel="Niet belangrijk" maxLabel="Absoluut cruciaal" />
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation />
    </div>
  );
}
