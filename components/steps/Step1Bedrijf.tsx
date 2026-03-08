"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import type { WizardFormData } from "@/lib/schema";

const SECTOREN = ["Groothandel / Distributie","Productie / Maakindustrie","Zakelijke Dienstverlening","Bouw & Installatie","Transport & Logistiek","IT & Technologie","Gezondheidszorg","Horeca & Retail","Financiële Dienstverlening","Marketing & Communicatie","Juridisch & Advies","Anders"];
const OMZET_RANGES = ["< €250.000","€250K – €500K","€500K – €1M","€1M – €2,5M","€2,5M – €5M","€5M – €10M","> €10M"];
const FTE_RANGES = ["1–5","6–15","16–30","31–60","61–100","> 100"];
const STRUCTUREN = ["Eenmanszaak / ZZP","BV (eigenaar-directeur)","BV met management","Familiebedrijf","Franchiseformule","Onderdeel van groep"];

export function Step1Bedrijf() {
  const { control } = useFormContext<WizardFormData>();
  return (
    <div className="space-y-6 pt-4">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Contactpersoon</p>
        <FormField control={control} name="email" render={({ field }) => (
          <FormItem><FormLabel>E-mailadres *</FormLabel><FormControl><Input type="email" placeholder="uw@bedrijf.nl" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="naam" render={({ field }) => (
            <FormItem><FormLabel>Volledige naam *</FormLabel><FormControl><Input placeholder="Jan de Vries" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={control} name="functie" render={({ field }) => (
            <FormItem><FormLabel>Functietitel *</FormLabel><FormControl><Input placeholder="Directeur, COO, DGA..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="telefoon" render={({ field }) => (
            <FormItem><FormLabel>Telefoonnummer</FormLabel><FormControl><Input placeholder="+31 6 12345678" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={control} name="linkedin" render={({ field }) => (
            <FormItem><FormLabel>LinkedIn-profiel (optioneel)</FormLabel><FormControl><Input placeholder="linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest">Bedrijfsinformatie</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="bedrijfsnaam" render={({ field }) => (
            <FormItem><FormLabel>Bedrijfsnaam *</FormLabel><FormControl><Input placeholder="Bedrijf B.V." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={control} name="kvk" render={({ field }) => (
            <FormItem><FormLabel>KvK-nummer (optioneel)</FormLabel><FormControl><Input placeholder="12345678" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField control={control} name="website" render={({ field }) => (
            <FormItem><FormLabel>Website (optioneel)</FormLabel><FormControl><Input placeholder="www.uwbedrijf.nl" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={control} name="vestigingsplaats" render={({ field }) => (
            <FormItem><FormLabel>Vestigingsplaats *</FormLabel><FormControl><Input placeholder="Amsterdam" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={control} name="aantalVestigingen" render={({ field }) => (
          <FormItem><FormLabel>Aantal vestigingen / locaties</FormLabel><FormControl><Input placeholder="Bijv. 1 hoofdkantoor, 3 filialen" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={control} name="sector" render={({ field }) => (
          <FormItem><FormLabel>Sector / industrie *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer uw sector" /></SelectTrigger></FormControl>
              <SelectContent>{SECTOREN.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select><FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="bedrijfsBeschrijving" render={({ field }) => (
          <FormItem><FormLabel>Beschrijf kort wat uw bedrijf doet *</FormLabel>
            <p className="text-xs text-zinc-400 -mt-1">Wat verkoopt u? Aan wie? Wat maakt u uniek in de markt?</p>
            <FormControl><Textarea placeholder="Bijv. Wij zijn een groothandel in industriële onderdelen, gericht op MKB-machinebouwers in de Benelux..." rows={3} {...field} /></FormControl><FormMessage />
          </FormItem>
        )} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FormField control={control} name="jaaromzet" render={({ field }) => (
            <FormItem><FormLabel>Jaaromzet *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{OMZET_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select><FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="aantalMedewerkers" render={({ field }) => (
            <FormItem><FormLabel>Aantal FTE *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{FTE_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select><FormMessage />
            </FormItem>
          )} />
          <FormField control={control} name="bedrijfsStructuur" render={({ field }) => (
            <FormItem><FormLabel>Bedrijfsstructuur</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecteer" /></SelectTrigger></FormControl>
                <SelectContent>{STRUCTUREN.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select><FormMessage />
            </FormItem>
          )} />
        </div>
      </div>
      <WizardNavigation />
    </div>
  );
}
