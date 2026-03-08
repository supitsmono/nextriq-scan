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

const INFO_LEEFT_OPTIES = [
  "In systemen (ERP/CRM)",
  "In Excel-bestanden",
  "In e-mails en chats",
  "In hoofden van medewerkers",
  "In gedeelde mappen / Drive",
  "Op papier",
];

const DATA_CONSISTENTIE = [
  "Alles staat op één plek, up-to-date",
  "Meerdere bronnen, soms tegenstrijdig",
  "Versnipperd over systemen en mensen",
  "Grotendeels niet digitaal / niet gestructureerd",
];

const DATA_SOORTEN = [
  "Klantgegevens",
  "Verkoopdata",
  "Financiële data",
  "Voorraad/logistiek",
  "Medewerkerdata",
  "Productiedata",
  "Marketingdata",
  "Klanttevredenheidsdata",
];

const INZICHT_OPTIES = [
  "Realtime dashboard",
  "Wekelijkse Excel-rapportage",
  "Maandelijkse rapportage van boekhouder",
  "Ad-hoc navragen bij medewerkers",
  "Nauwelijks / geen rapportage",
];

const RAPPORT_DUUR = ["< 1 uur (geautomatiseerd)", "2–4 uur", "Een halve dag", "Meerdere dagen", "We doen het niet/nauwelijks"];
const DOC_BEHEER = ["Centraal documentmanagementsysteem", "Gedeelde cloudmap (Drive/SharePoint)", "Lokale schijven / USB", "E-mail als archief", "Geen structuur"];
const ZOEK_DUUR = ["< 1 minuut", "1–5 minuten", "5–15 minuten", "> 15 minuten", "Vaak niet gevonden"];

export function Step4DataBeheer() {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
        <strong>Waarom dit belangrijk is:</strong> AI werkt met data. Hoe uw data nu georganiseerd is, bepaalt grotendeels welke oplossingen direct mogelijk zijn.
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Datastatus</p>

        <FormField control={control} name="informatieWaarLeeft" render={({ field }) => (
          <FormItem>
            <FormLabel>Waar leeft de meeste zakelijke informatie in uw bedrijf? *</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {INFO_LEEFT_OPTIES.map((optie) => {
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

        <FormField control={control} name="dataConsistentie" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe consistent is uw data?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{DATA_CONSISTENTIE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="dataVertrouwen" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoeveel vertrouwen heeft u in uw eigen data?</FormLabel>
            <RatingScale value={field.value ?? ""} onChange={field.onChange} minLabel="Geen vertrouwen" maxLabel="Volledig betrouwbaar" />
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="dataSoorten" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke soorten data verzamelt u structureel?</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {DATA_SOORTEN.map((soort) => {
                const checked = (field.value ?? []).includes(soort);
                return (
                  <label key={soort} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, soort] : cur.filter((v) => v !== soort));
                    }} />
                    {soort}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Rapportage & Inzicht</p>

        <FormField control={control} name="inzichtBedrijfsprestaties" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe krijgt u nu inzicht in uw bedrijfsprestaties?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {INZICHT_OPTIES.map((optie) => {
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

        <FormField control={control} name="metricsGoedZicht" render={({ field }) => (
          <FormItem>
            <FormLabel>Over welke metrics heeft u nu goed zicht?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. omzet, marge, voorraad, klanttevredenheid..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="metricsBeterInzicht" render={({ field }) => (
          <FormItem>
            <FormLabel>Over welke metrics wilt u beter inzicht?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. winstgevendheid per klant, doorlooptijd offertes, churnpercentage..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="rapportageDuur" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe lang duurt het om een managementrapportage op te stellen?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{RAPPORT_DUUR.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Documentbeheer</p>

        <FormField control={control} name="documentenBeheer" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe beheert u contracten, offertes en andere documenten?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {DOC_BEHEER.map((optie) => {
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

        <FormField control={control} name="documentZoekenDuur" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe lang duurt het gemiddeld om een document terug te vinden?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{ZOEK_DUUR.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation />
    </div>
  );
}
