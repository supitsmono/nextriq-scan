import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Clock,
  Shield,
  FileText,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/40 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl space-y-12">

        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-xs font-semibold text-violet-700 tracking-wide">
            <Sparkles className="h-3.5 w-3.5" />
            NEXTRIQ AI Intelligence Scan · Diepgaand bedrijfsanalyse
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <span className="text-white font-bold text-xl tracking-tight">N</span>
            </div>
            <span className="font-bold text-zinc-900 text-2xl tracking-tight">NEXTRIQ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Ontdek het volledige{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              AI-potentieel
            </span>{" "}
            van jouw bedrijf
          </h1>

          <p className="text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            De meest uitgebreide AI-analyse voor het MKB. Ontvang een persoonlijk
            rapport met concrete automatiseringsmogelijkheden, ROI-berekening en
            een implementatieplan op maat.
          </p>
        </div>

        {/* CTA block */}
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/scan"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Start de Intelligence Scan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Shield className="h-3.5 w-3.5 text-zinc-400" />
            Volledig vertrouwelijk · Uw gegevens worden nooit gedeeld
          </div>
        </div>

        {/* 10-section overview */}
        <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-zinc-50 border-b border-zinc-100">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              De scan — 10 diepgaande secties
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x-0">
            {[
              { n: "01", title: "Bedrijfsprofiel",         sub: "Contactgegevens & bedrijfsinformatie",                time: "~3 min" },
              { n: "02", title: "Procesinventarisatie",    sub: "Uw 5 meest tijdsintensieve processen",               time: "~8 min" },
              { n: "03", title: "Pijnpunten & Kosten",     sub: "Bottlenecks, fouten en verborgen kosten",            time: "~4 min" },
              { n: "04", title: "Data & Informatie",       sub: "Datastatus en rapportagekwaliteit",                   time: "~3 min" },
              { n: "05", title: "Technologie & Systemen",  sub: "Techstack, ERP, CRM en integraties",                 time: "~3 min" },
              { n: "06", title: "Klant & Sales",           sub: "Salesproces, klantenservice en retentie",            time: "~3 min" },
              { n: "07", title: "Team & HR",               sub: "Organisatiestructuur en AI-acceptatie",              time: "~3 min" },
              { n: "08", title: "Financieel & ROI",        sub: "Kosten, marge en investeringsbereidheid",            time: "~3 min" },
              { n: "09", title: "AI-Gereedheid",           sub: "Huidige AI-ervaring en automatiseringskansen",       time: "~4 min" },
              { n: "10", title: "Strategie & Visie",       sub: "Doelen, prioriteiten en samenwerkingsvorm",          time: "~4 min" },
            ].map(({ n, title, sub, time }) => (
              <div key={n} className="flex items-start gap-4 px-6 py-4 hover:bg-zinc-50/60 transition-colors">
                <span className="shrink-0 text-[11px] font-bold text-violet-400 mt-0.5 w-5">{n}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-800 truncate">{title}</p>
                  <p className="text-xs text-zinc-400 leading-relaxed">{sub}</p>
                </div>
                <span className="shrink-0 text-[11px] text-zinc-300 ml-auto mt-0.5">{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What you get */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: FileText,
              color: "violet",
              title: "Persoonlijk rapport",
              desc: "Binnen 48 uur ontvangt u een op maat gemaakt rapport met concrete bevindingen.",
            },
            {
              icon: TrendingUp,
              color: "indigo",
              title: "ROI-berekening",
              desc: "Inzicht in verwachte tijds- en kostenbesparing bij iedere aanbeveling.",
            },
            {
              icon: Target,
              color: "purple",
              title: "Implementatieplan",
              desc: "Een concreet stappenplan: wat u morgen al kunt starten.",
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-zinc-100 bg-white p-5 shadow-sm space-y-3"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-${color}-50`}>
                <Icon className={`h-4.5 w-4.5 text-${color}-600`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-800">{title}</p>
                <p className="text-xs text-zinc-500 leading-relaxed mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Clock,        label: "~38 minuten totaal" },
              { icon: Shield,       label: "Volledig vertrouwelijk" },
              { icon: CheckCircle2, label: "Direct starten, later verder" },
              { icon: BarChart3,    label: "Persoonlijk rapport binnen 48 u" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 shadow-sm"
              >
                <Icon className="h-3 w-3 text-violet-400" />
                {label}
              </div>
            ))}
          </div>
          <p className="text-xs text-zinc-400 shrink-0">nextriq.nl</p>
        </div>

      </div>
    </main>
  );
}
