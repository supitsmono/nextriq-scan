"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const PRIORITEITEN_OPTIES = ["Omzet verhogen", "Marges verbeteren", "Kosten verlagen", "Efficiëntie verhogen", "Schaalbaarheid bouwen", "Klanttevredenheid verbeteren", "Nieuw product/dienst lanceren", "Personeel terugdringen"];
const TIMELINE_OPTIES = ["< 1 maand", "1–3 maanden", "3–6 maanden", "6–12 maanden", "1–2 jaar"];
const ROL_AI = ["AI als operationele ruggengraat", "AI als concurrentievoordeel", "AI als kostenbesparingstool", "AI als klantenservice-engine", "Nog geen duidelijke visie", "AI wordt onderdeel van ons product/dienst"];
const EXPERTISE = ["Volledig uitbesteden aan partner zoals NEXTRIQ", "Samenwerken: extern bouwen, intern beheren", "We willen het zelf leren en doen", "Hybride: afhankelijk van de oplossing"];
const SAMENWERKING = ["Eenmalig project (bouw + overdracht)", "Doorlopende samenwerking (beheer + doorontwikkeling)", "Abonnementsmodel (maandelijks)", "Weet ik nog niet"];
const START_SNELHEID = ["Direct / zo snel mogelijk", "Binnen 4 weken", "Binnen 3 maanden", "Over 6+ maanden", "Eerst meer informatie"];
const HOE_GEVONDEN = ["LinkedIn", "Instagram", "Via een kennis / doorverwijzing", "Google / zoekmachine", "Cold call / email van NEXTRIQ", "Event / netwerk", "Anders"];

interface Step10StrategieProps {
  onSubmit?: () => void | Promise<void>;
  isSubmitting?: boolean;
}

export function Step10Strategie({ onSubmit, isSubmitting }: Step10StrategieProps) {
  const { control } = useFormContext<WizardFormData>();

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Kortetermijndoelen (komende 12 maanden)</p>

        <FormField control={control} name="belangrijksteDoel" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat is uw belangrijkste doel voor het komende jaar? *</FormLabel>
            <FormControl><Textarea placeholder="Bijv. 25% omzetgroei, uitbreiding naar nieuwe markt, processen standaardiseren..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="topPrioriteiten" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat zijn uw top 3 prioriteiten? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Selecteer maximaal 3</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {PRIORITEITEN_OPTIES.map((prio) => {
                const checked = (field.value ?? []).includes(prio);
                const maxReached = (field.value ?? []).length >= 3 && !checked;
                return (
                  <label key={prio} className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 cursor-pointer text-sm transition-colors ${checked ? "border-violet-400 bg-violet-50 text-violet-800" : maxReached ? "border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed" : "border-zinc-200 hover:border-zinc-300"}`}>
                    <Checkbox checked={checked} disabled={maxReached} onCheckedChange={(c) => {
                      const cur = field.value ?? [];
                      field.onChange(c ? [...cur, prio] : cur.filter((v) => v !== prio));
                    }} />
                    {prio}
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="grootsteImpact" render={({ field }) => (
          <FormItem>
            <FormLabel>Wat zou het meeste directe impact hebben op uw bedrijfsresultaat? *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Als u één ding kon veranderen dat morgen al effect heeft, wat zou dat zijn?</p>
            <FormControl><Textarea placeholder="Bijv. Als we offertes 50% sneller kunnen maken..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="eersteResultatenTimeline" render={({ field }) => (
          <FormItem>
            <FormLabel>Gewenste timeline voor eerste resultaten</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{TIMELINE_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Langetermijnvisie (3–5 jaar)</p>

        <FormField control={control} name="bedrijfOver3Jaar" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe ziet uw bedrijf er over 3 jaar idealiter uit?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. We draaien €5M omzet met hetzelfde team dankzij AI, of we hebben uitgebreid naar 3 landen..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="rolAIToekomst" render={({ field }) => (
            <FormItem>
              <FormLabel>Welke rol speelt AI in uw toekomstvisie?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{ROL_AI.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="aiExpertiseBeslissing" render={({ field }) => (
            <FormItem>
              <FormLabel>AI-expertise: uitbesteden of intern opbouwen?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{EXPERTISE.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Samenwerking & Start</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="samenwerkingsVorm" render={({ field }) => (
            <FormItem>
              <FormLabel>Hoe wilt u samenwerken met NEXTRIQ?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{SAMENWERKING.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="startSnelheid" render={({ field }) => (
            <FormItem>
              <FormLabel>Hoe snel wilt u starten?</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{START_SNELHEID.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="aanleiding" render={({ field }) => (
          <FormItem>
            <FormLabel>Is er een specifieke aanleiding voor deze scan?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. recent incident, groeiplan, nieuwe investeerder..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="eerderAIBureaus" render={({ field }) => (
          <FormItem>
            <FormLabel>Heeft u al eerder met AI-bureaus gesproken? Wat was uw ervaring?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. We hebben een chatbot laten bouwen maar dat werkte niet goed..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="bijzonderheden" render={({ field }) => (
          <FormItem>
            <FormLabel>Bijzonderheden, specifieke wensen of context</FormLabel>
            <FormControl><Textarea placeholder="Alles wat u wilt delen wat nog niet aan bod is gekomen..." rows={3} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="hoeGevonden" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe bent u bij NEXTRIQ terechtgekomen?</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {HOE_GEVONDEN.map((bron) => (
                <button key={bron} type="button" onClick={() => field.onChange(bron)}
                  className={`px-3 py-2.5 rounded-lg border text-sm transition-all ${field.value === bron ? "border-violet-500 bg-violet-50 text-violet-700 font-medium" : "border-zinc-200 hover:border-zinc-300"}`}>
                  {bron}
                </button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation onSubmit={onSubmit} isSubmitting={isSubmitting} nextLabel="Scan versturen" />
    </div>
  );
}
