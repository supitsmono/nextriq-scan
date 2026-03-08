"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RatingScale } from "@/components/ui/rating-scale";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const AI_TOOLS = ["ChatGPT / Claude / Gemini", "AI in Microsoft 365 (Copilot)", "AI in Google Workspace", "AI voor afbeeldingen (Midjourney, DALL-E)", "AI-chatbot op website", "AI in ons ERP/CRM", "Nog geen AI-tools in gebruik"];
const AI_GEBRUIK = ["Teksten schrijven / samenvatten", "E-mails opstellen", "Data analyseren", "Code schrijven", "Informatie zoeken / research", "Nog niet", "Anders"];
const AGENT_BEGRIP = ["Ik weet het niet precies", "Ik heb er over gelezen maar geen ervaring", "Ik heb er mee geëxperimenteerd", "Wij bouwen of gebruiken al agents"];
const AUTO_KANDIDATEN = [
  "Binnenkomende e-mails sorteren & beantwoorden",
  "Leads kwalificeren & follow-up plannen",
  "Offertes automatisch samenstellen",
  "Facturen verwerken & boeken",
  "Klachten registreren & routeren",
  "Rapporten genereren & versturen",
  "Voorraad monitoren & bijbestellen",
  "Onboarding nieuwe medewerkers/klanten",
  "Data synchroniseren tussen systemen",
  "Planningsoptimalisatie",
  "Klanttevredenheidsonderzoek",
  "Social media content publiceren",
];
const COMFORT_AI = ["Niet comfortabel — altijd menselijke goedkeuring", "Comfortabel voor laagrisico-acties", "Comfortabel voor de meeste taken", "Volledig comfortabel — hoe autonomer hoe beter"];
const DATA_TOEGANG = ["Klantcontactgegevens", "Orderhistorie", "Financiële data", "Medewerkersinformatie", "Strategische plannen", "Leveranciersinformatie", "Productdata / prijslijsten", "Communicatiegeschiedenis"];
const REGELGEVING = ["Nee / niet van toepassing", "AVG / GDPR is relevant", "Branchespecifieke regelgeving", "Strenge compliance-eisen (finance, zorg, juridisch)"];
const PRIVACY_OPTIES = ["Verwerkersovereenkomsten aanwezig", "AVG-beleid aanwezig", "We hebben er nauwelijks bij stilgestaan", "We werken met een externe AVG-adviseur"];

export function Step9AIGereedheid() {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="rounded-lg bg-violet-50 border border-violet-200 px-4 py-3 text-sm text-violet-700">
        <strong>Op basis van uw antwoorden</strong> bepalen wij welke AI-oplossingen nu al mogelijk zijn en welke stappen u eerst moet zetten.
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Huidige AI-Ervaring</p>

        <FormField control={control} name="huidigeAITools" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke AI-tools gebruikt u nu al?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {AI_TOOLS.map((tool) => {
                const checked = (field.value ?? []).includes(tool);
                return (
                  <label key={tool} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, tool] : cur.filter((v) => v !== tool));
                    }} />
                    {tool}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="aiGebruikWijze" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe gebruikt u AI op dit moment?</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {AI_GEBRUIK.map((wijze) => {
                const checked = (field.value ?? []).includes(wijze);
                return (
                  <label key={wijze} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, wijze] : cur.filter((v) => v !== wijze));
                    }} />
                    {wijze}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="agentBegrip" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe goed begrijpt u wat een AI-agent is en kan doen?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{AGENT_BEGRIP.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Automatiseringskandidaten</p>

        <FormField control={control} name="automatiseringsKandidaten" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke taken zouden ideaal zijn voor een AI-agent? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Een AI-agent handelt zelfstandig doelen af — niet alleen één actie, maar een hele keten.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {AUTO_KANDIDATEN.map((kandidaat) => {
                const checked = (field.value ?? []).includes(kandidaat);
                return (
                  <label key={kandidaat} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, kandidaat] : cur.filter((v) => v !== kandidaat));
                    }} />
                    {kandidaat}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="comfortNiveauAI" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe comfortabel bent u met AI dat zelfstandig acties uitvoert?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {COMFORT_AI.map((optie) => (
                <button key={optie} type="button" onClick={() => field.onChange(optie)}
                  className={`text-left px-4 py-3 rounded-lg border text-sm transition-all ${field.value === optie ? "border-violet-500 bg-violet-50 text-violet-700 font-medium" : "border-zinc-200 hover:border-zinc-300"}`}>
                  {optie}
                </button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="dataToegangAI" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke informatie mag een AI-agent in uw bedrijf inzien?</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {DATA_TOEGANG.map((data) => {
                const checked = (field.value ?? []).includes(data);
                return (
                  <label key={data} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, data] : cur.filter((v) => v !== data));
                    }} />
                    {data}
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
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Compliance & Vertrouwen</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="sectorRegelgeving" render={({ field }) => (
            <FormItem>
              <FormLabel>Sectorspecifieke regelgeving</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{REGELGEVING.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="klantdataPrivacy" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe gaat u om met klantdata en privacy?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {PRIVACY_OPTIES.map((optie) => {
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

        <FormField control={control} name="aiTraceerbaarheid" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe belangrijk is het dat AI-beslissingen traceerbaar / uitlegbaar zijn?</FormLabel>
            <RatingScale value={field.value ?? ""} onChange={field.onChange} minLabel="Niet van belang" maxLabel="Absoluut noodzakelijk" />
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation />
    </div>
  );
}
