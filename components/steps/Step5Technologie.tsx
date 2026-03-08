"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { RatingScale } from "@/components/ui/rating-scale";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const BOEKHOUD_OPTIES = ["Exact", "Moneybird", "Twinfield", "AFAS", "Snelstart", "Boekhoudbureau doet alles", "Anders"];
const DAGELIJKSE_TOOLS = ["Microsoft Office 365", "Google Workspace", "Slack / Teams / Discord", "WhatsApp (zakelijk)", "Zoom / Meet", "Trello / Asana / Monday", "Notion / Confluence", "Email (Outlook/Gmail)", "Anders"];
const INTERNE_COMM = ["Projectmanagementsoftware (Asana, Monday...)", "WhatsApp-groepen", "E-mail", "Mondeling / overleg", "Excel-overzichten", "Geen structuur"];
const SYSTEMEN_AANTAL = ["1–3", "4–6", "7–10", "> 10"];
const INTEGRATIE_OPTIES = ["Volledig geïntegreerd (alles praat met alles)", "Gedeeltelijk (enkele koppelingen)", "Nee — alles staat los van elkaar", "Weet ik niet"];
const AUTO_ERVARING = ["Nee, nog nooit", "Kleine automatiseringen (Zapier, Make.com e.d.)", "Enkele grotere integraties", "Uitgebreide automatisering aanwezig", "Bezig met een AI-project"];

export function Step5Technologie() {
  const { control } = useFormContext<WizardFormData>();
  const erpGebruik = useWatch({ control, name: "erpGebruik" });
  const crmGebruik = useWatch({ control, name: "crmGebruik" });

  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Kernsystemen</p>

        <FormField control={control} name="erpGebruik" render={({ field }) => (
          <FormItem>
            <FormLabel>Gebruikt u een ERP-systeem? *</FormLabel>
            <div className="flex gap-2 mt-1">
              {[{ v: "ja", l: "Ja" }, { v: "nee", l: "Nee" }, { v: "zoeken", l: "Op zoek" }].map(({ v, l }) => (
                <button key={v} type="button" onClick={() => field.onChange(v)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${field.value === v ? "border-violet-500 bg-violet-50 text-violet-700" : "border-zinc-200 hover:border-zinc-300"}`}>
                  {l}
                </button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <AnimatePresence>
          {erpGebruik === "ja" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <FormField control={control} name="erpNaam" render={({ field }) => (
                <FormItem><FormLabel>Welk ERP-systeem? *</FormLabel><FormControl><Input placeholder="Bijv. Exact Online, AFAS, SAP, Odoo..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </motion.div>
          )}
        </AnimatePresence>

        <FormField control={control} name="crmGebruik" render={({ field }) => (
          <FormItem>
            <FormLabel>Gebruikt u een CRM-systeem? *</FormLabel>
            <div className="flex gap-2 mt-1">
              {[{ v: "ja", l: "Ja" }, { v: "nee", l: "Nee" }, { v: "excel", l: "Excel als CRM" }].map(({ v, l }) => (
                <button key={v} type="button" onClick={() => field.onChange(v)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${field.value === v ? "border-violet-500 bg-violet-50 text-violet-700" : "border-zinc-200 hover:border-zinc-300"}`}>
                  {l}
                </button>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <AnimatePresence>
          {crmGebruik === "ja" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <FormField control={control} name="crmNaam" render={({ field }) => (
                <FormItem><FormLabel>Welk CRM-systeem? *</FormLabel><FormControl><Input placeholder="Bijv. HubSpot, Salesforce, Pipedrive, Teamleader..." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </motion.div>
          )}
        </AnimatePresence>

        <FormField control={control} name="boekhoudsoftware" render={({ field }) => (
          <FormItem>
            <FormLabel>Boekhoud- / factuursoftware</FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {BOEKHOUD_OPTIES.map((optie) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="planningsoplossing" render={({ field }) => (
            <FormItem>
              <FormLabel>Planningsoplossing</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="digitaal">Ja — digitaal</SelectItem>
                  <SelectItem value="excel">Ja — Excel/Google Sheets</SelectItem>
                  <SelectItem value="geen">Nee — mondeling/ad-hoc</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="planningsSoftwareNaam" render={({ field }) => (
            <FormItem><FormLabel>Naam planningssoftware</FormLabel><FormControl><Input placeholder="Bijv. SimPRO, Solvice..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Communicatie & Samenwerking</p>

        <FormField control={control} name="dagelijkseTools" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke tools gebruikt u dagelijks? *</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              {DAGELIJKSE_TOOLS.map((tool) => {
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

        <FormField control={control} name="interneCommunicatie" render={({ field }) => (
          <FormItem>
            <FormLabel>Hoe communiceert u intern over taken en projecten?</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {INTERNE_COMM.map((optie) => {
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

      <Separator />

      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Integraties & Automatisering</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="aantalSystemen" render={({ field }) => (
            <FormItem>
              <FormLabel>Hoeveel systemen in totaal? *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{SYSTEMEN_AANTAL.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="integraties" render={({ field }) => (
            <FormItem>
              <FormLabel>Zijn systemen gekoppeld? *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{INTEGRATIE_OPTIES.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={control} name="handmatigeDataOverzet" render={({ field }) => (
          <FormItem>
            <FormLabel>Welke data zet u handmatig over tussen systemen?</FormLabel>
            <FormControl><Textarea placeholder="Bijv. Orders van webshop naar ERP, offertes naar factuurprogramma..." rows={2} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="automatiseringsErvaring" render={({ field }) => (
          <FormItem>
            <FormLabel>Heeft u al ervaring met automatisering?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
              <SelectContent>{AUTO_ERVARING.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={control} name="itVolwassenheid" render={({ field }) => (
          <FormItem>
            <FormLabel>IT-volwassenheid van uw bedrijf</FormLabel>
            <RatingScale value={field.value ?? ""} onChange={field.onChange} minLabel="Zeer laag (papier/Excel)" maxLabel="Geavanceerd (cloud/API)" />
            <FormMessage />
          </FormItem>
        )} />
      </div>

      <WizardNavigation />
    </div>
  );
}
