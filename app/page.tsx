import Link from "next/link";
import { ArrowRight, Sparkles, BarChart3, Clock, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center space-y-10 py-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-700 tracking-wide">
          <Sparkles className="h-3.5 w-3.5" />
          AI Intelligence Scan · Persoonlijk rapport
        </div>

        {/* Logo + headline */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-white font-bold text-lg tracking-tight">N</span>
            </div>
            <span className="font-bold text-zinc-900 text-xl tracking-tight">NEXTRIQ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Ontdek waar AI jouw bedrijf{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              tijd en geld bespaart
            </span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Vul de Intelligence Scan in en ontvang een persoonlijk rapport
            met concrete AI-besparingsmogelijkheden voor jouw organisatie.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/scan"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Sparkles className="h-4 w-4" />
            Start de scan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="text-xs text-zinc-400">Vul de scan in op jouw tempo</p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {[
            { icon: Clock, label: "5 stappen" },
            { icon: BarChart3, label: "Persoonlijk rapport" },
            { icon: Zap, label: "Direct toepasbare inzichten" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-600 shadow-sm"
            >
              <Icon className="h-3.5 w-3.5 text-indigo-500" />
              {label}
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div className="pt-4 border-t border-zinc-100">
          <p className="text-xs text-zinc-400">
            Vertrouwd door 200+ MKB-bedrijven in Nederland &amp; België
          </p>
        </div>
      </div>
    </main>
  );
}
