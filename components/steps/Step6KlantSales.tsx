"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const DOORLOOPTIJD = ["< 1 week", "1–2 weken", "2–4 weken", "1–3 maanden", "> 3 maanden", "Onbekend"];
const CONVERSIERATIO = ["< 5%", "5–15%", "15–30%", "30–50%", "> 50%", "Niet gemeten"];
const TIJD_OFFERTES = ["< 2 uur", "2–5 uur", "5–10 uur", "10–20 uur", "> 20 uur"];
const REACTIETIJD = ["Binnen 1 uur", "Binnen 4 uur", "Zelfde dag", "Volgende dag", "> 1 dag", "Onregelmatig"];
const SOORT_VRAGEN = ["Bestelstatus / tracking", "Productinformatie", "Prijsaanvraag / offerte", "Klachten / retouren", "Factuur / betaling", "Technische support", "Planning / afspraken", "Anders"];
const NPS_OPTIES = ["Zeer ontevreden (NPS < 0)", "Matig (NPS 0–30)", "Goed (NPS 30–50)", "Excellent (NPS > 50)", "Niet gemeten"];
const RETENTIE = ["Nee, klanten blijven lang", "Soms verloop", "Significant verloop", "We meten dit niet"];
const ACTIEVE_KLANTEN = ["< 25", "25–100", "100–500", "500–2.000", "> 2.000"];
const SEGMENTATIE = ["Ja, consequent", "Soms / globaal", "Nee"];
const UPSELL = ["Ja, gestructureerd", "Ad-hoc / intuïtief", "Nauwelijks", "Nee"];

export function Step6KlantSales() {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Sales & Acquisitie</p>

        <FormField control={control} name="salesProces" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe verloopt uw salesproces momenteel? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Van eerste contact tot getekend contract — wie doet wat?</p>
            <FormControl><Textarea placeholder="Bijv. Eerste contact via LinkedIn → kwalificatiegesprek → offerte via email → follow-up..." rows={4} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="leadTotDealDoorlooptijd" render={({ field }) => (
            <FormItem>
              <FormLabel>Doorlooptijd lead → deal</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{DOORLOOPTIJD.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="conversieratio" render={({ field }) => (
            <FormItem>
              <FormLabel>Conversieratio (leads → klanten)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{CONVERSIERATIO.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="leadsAfhaakpunt" render={({ field }) => (
          <FormItem>
            <FormLabel>Waar lopen leads stuk of haken ze af?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. Na de offerte horen we niets meer, follow-up wordt vergeten..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="tijdOftesPerWeek" render={({ field }) => (
          <FormItem>
            <FormLabel>Tijd per week aan offertes / voorstellen maken</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{TIJD_OFFERTES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Klantenservice & Communicatie</p>

        <FormField control={control} name="klantvragenPerDag" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoeveel klantvragen ontvangt u per dag (gemiddeld)?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. 20 e-mails, 10 telefoontjes, 5 WhatsApp-berichten..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="reactietijdKlant" render={({ field }) => (
            <FormItem>
              <FormLabel>Gemiddelde reactietijd klantvragen</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{REACTIETIJD.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="klanttevredenheidNPS" render={({ field }) => (
            <FormItem>
              <FormLabel>Klanttevredenheid (NPS-inschatting)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{NPS_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="soortKlantvragen" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke soorten vragen komen het meest voor?</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {SOORT_VRAGEN.map((vraag) => {
                const checked = (field.value ?? []).includes(vraag);
                return (
                  <label key={vraag} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, vraag] : cur.filter((v) => v !== vraag));
                    }} />
                    {vraag}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="klantretentie" render={({ field }) => (
          <FormItem>
            <FormLabel>Heeft u een klantretentieprobleem?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{RETENTIE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Klantinformatie</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField control={control} name="aantalActieveKlanten" render={({ field }) => (
            <FormItem>
              <FormLabel>Actieve klanten</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{ACTIEVE_KLANTEN.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="klantsegmentatie" render={({ field }) => (
            <FormItem>
              <FormLabel>Klantsegmentatie (A/B/C)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{SEGMENTATIE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="upsellCrossSell" render={({ field }) => (
            <FormItem>
              <FormLabel>Upsell / cross-sell</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{UPSELL.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      <WizardNavigation />
    </div>
  );
}
