"use client";

import { useState } from "react";

interface Props {
  bedrijf: string;
  naam: string;
  email: string;
  datum: string;
  rapport: string;
}

export default function ScanItem({ bedrijf, naam, email, datum, rapport }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rapport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const date = datum
    ? new Date(datum).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-zinc-50 transition-colors"
      >
        <div>
          <p className="font-semibold text-zinc-800">{bedrijf}</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            {naam} · {email} · {date}
          </p>
        </div>
        <span className="shrink-0 text-xs text-violet-600 font-semibold ml-4">
          {open ? "Sluiten ↑" : "Rapport ↓"}
        </span>
      </button>

      {open && (
        <div className="border-t border-zinc-100">
          <div className="flex items-center justify-between px-5 py-3 bg-zinc-50 border-b border-zinc-100">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Kopieer → plak in Claude voor rapport
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors"
            >
              {copied ? "Gekopieerd ✓" : "Kopieer alles"}
            </button>
          </div>
          <textarea
            readOnly
            value={rapport}
            rows={16}
            className="w-full resize-y px-5 py-3 text-[11px] font-mono text-zinc-500 leading-relaxed bg-white focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
