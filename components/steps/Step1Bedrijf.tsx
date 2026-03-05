"use client";

import { useFormContext } from "react-hook-form";
import { Building2, Mail, Phone, User, Briefcase } from "lucide-react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WizardNavigation } from "@/components/wizard/WizardNavigation";
import { WizardFormData } from "@/lib/schema";

// ─── Options ─────────────────────────────────────────────────────────────────

const SECTOREN = [
  "Handel & Retail",
  "Productie & Industrie",
  "Zakelijke dienstverlening",
  "Technologie & IT",
  "Bouw & Vastgoed",
  "Transport & Logistiek",
  "Zorg & Welzijn",
  "Horeca & Toerisme",
  "Financiën & Verzekeringen",
  "Onderwijs",
  "Landbouw & Voedsel",
  "Anders",
];

const JAAROMZET_OPTIONS = [
  { value: "lt200k",     label: "< €200k" },
  { value: "200k_500k",  label: "€200k – €500k" },
  { value: "500k_1m",    label: "€500k – €1M" },
  { value: "1m_2_5m",    label: "€1M – €2.5M" },
  { value: "2_5m_5m",    label: "€2.5M – €5M" },
  { value: "5m_10m",     label: "€5M – €10M" },
  { value: "gt10m",      label: "> €10M" },
];

const MEDEWERKERS_OPTIONS = [
  { value: "1_5",     label: "1 – 5" },
  { value: "6_10",    label: "6 – 10" },
  { value: "11_25",   label: "11 – 25" },
  { value: "26_50",   label: "26 – 50" },
  { value: "51_100",  label: "51 – 100" },
  { value: "100plus", label: "100+" },
];

// ─── Helper: Input met icoon links ────────────────────────────────────────────

function IconInput({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
        {icon}
      </span>
      {/* pl-9 via [&_input] zodat het Input component de padding krijgt */}
      <div className="[&_input]:pl-9">{children}</div>
    </div>
  );
}

// ─── Step 1: Bedrijfsinformatie ───────────────────────────────────────────────

export function Step1Bedrijf() {
  const form = useFormContext<WizardFormData>();

  return (
    <div className="mt-6 space-y-5">
      {/* Bedrijfsnaam */}
      <FormField
        control={form.control}
        name="bedrijfsnaam"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Bedrijfsnaam <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <IconInput icon={<Building2 className="h-4 w-4" />}>
                <Input placeholder="ACME B.V." {...field} />
              </IconInput>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Naam + Functie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="naam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Naam <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <IconInput icon={<User className="h-4 w-4" />}>
                  <Input placeholder="Jan Jansen" autoComplete="name" {...field} />
                </IconInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="functie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Functie <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <IconInput icon={<Briefcase className="h-4 w-4" />}>
                  <Input
                    placeholder="Directeur / Manager"
                    autoComplete="organization-title"
                    {...field}
                  />
                </IconInput>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* E-mailadres */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              E-mailadres <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <IconInput icon={<Mail className="h-4 w-4" />}>
                <Input
                  type="email"
                  placeholder="jan@acme.nl"
                  autoComplete="email"
                  {...field}
                />
              </IconInput>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Telefoon — optioneel */}
      <FormField
        control={form.control}
        name="telefoon"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1.5">
              Telefoon
              <span className="text-xs font-normal text-muted-foreground">
                (optioneel)
              </span>
            </FormLabel>
            <FormControl>
              <IconInput icon={<Phone className="h-4 w-4" />}>
                <Input
                  type="tel"
                  placeholder="+31 6 12 34 56 78"
                  autoComplete="tel"
                  {...field}
                />
              </IconInput>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Sector */}
      <FormField
        control={form.control}
        name="sector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Sector <span className="text-destructive">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Kies je sector" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {SECTOREN.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Jaaromzet + Aantal medewerkers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="jaaromzet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jaaromzet <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {JAAROMZET_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="aantalMedewerkers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Medewerkers <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MEDEWERKERS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <WizardNavigation />
    </div>
  );
}
